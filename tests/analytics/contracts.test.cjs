const test = require('node:test');
const assert = require('node:assert/strict');
const { analyticsUtm, analyticsUrl, trackStoreEvent, redirectToStore } = require('../../.tmp/analytics/lib/analytics');

test('extracts only bounded campaign labels, using first repeated value', () => {
  assert.deepEqual(analyticsUtm('?utm_source=youtube&utm_source=other&utm_medium=paid+video&utm_campaign=sismos_mx&utm_content=clip-1&email=private'), {
    utm_source: 'youtube', utm_medium: 'paid video', utm_campaign: 'sismos_mx', utm_content: 'clip-1',
  });
  assert.deepEqual(analyticsUtm('?utm_source=a%40b.com&utm_medium=5512345678&utm_campaign=&utm_content=' + 'a'.repeat(101)), {});
});

test('redacts private identifiers, arbitrary queries and fragments', () => {
  for (const [path, expected] of [['invite/REF-secret', 'invite/[code]'], ['join/SECRET', 'join/[code]'], ['event/secret', 'event/[id]']]) {
    const url = new URL(analyticsUrl(`https://sismosmx.app/${path}?utm_source=youtube&code=secret#private`));
    assert.equal(decodeURIComponent(url.pathname), `/${expected}`);
    assert.equal(url.search, '');
    assert.equal(url.hash, '');
  }
  assert.equal(analyticsUrl('https://sismosmx.app/descargar?utm_source=youtube&email=secret#private'), 'https://sismosmx.app/descargar?utm_source=youtube');
});

test('typed event payload does not expose destination or invitation code', () => {
  const events = [];
  trackStoreEvent('store_click', { store: 'play', placement: 'referral' }, {
    url: 'https://sismosmx.app/invite/REF-private?utm_source=youtube',
    userAgent: 'Android', platform: '', maxTouchPoints: 0,
  }, (name, props) => events.push([name, props]));
  assert.deepEqual(events, [['store_click', { route: '/invite/[code]', platform: 'android', store: 'play', placement: 'referral', utm_source: 'youtube' }]]);
});

test('records before redirect without awaiting, and navigation survives tracking failure', () => {
  for (const throws of [false, true]) {
    const calls = [];
    redirectToStore('https://store.example', 'app_store', (url) => calls.push(url), {
      url: 'https://sismosmx.app/calificar?utm_campaign=review', userAgent: 'iPhone', platform: '', maxTouchPoints: 0,
    }, (name, props) => {
      calls.push([name, props]);
      if (throws) throw new Error('blocked');
    });
    assert.deepEqual(calls, [['store_redirect', { route: '/calificar', platform: 'ios', store: 'app_store', utm_campaign: 'review' }], 'https://store.example']);
  }
});

test('iPad desktop mode and desktop click platforms use existing detection', () => {
  for (const [touch, expected] of [[5, 'ios'], [0, 'desktop']]) {
    trackStoreEvent('store_click', { store: 'app_store', placement: 'hero' }, {
      url: 'https://sismosmx.app/', userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: touch,
    }, (_, props) => assert.equal(props.platform, expected));
  }
});
