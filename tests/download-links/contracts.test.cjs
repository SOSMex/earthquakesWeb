const test = require('node:test');
const assert = require('node:assert/strict');
const { storePlatform } = require('../../.tmp/download-links/lib/store-platform');
const { reviewPlatform, reviewDestination } = require('../../.tmp/download-links/lib/review-links');
const { downloadLinks, downloadDestination } = require('../../.tmp/download-links/lib/download-links');
const { DEFAULT_PLAY_STORE_URL, DEFAULT_APP_STORE_URL } = require('../../.tmp/download-links/config/stores');

const platforms = [
  ['Android', 'Mozilla/5.0 (Linux; Android 15; wv)', 'Linux armv8l', 5, 'android'],
  ['iPhone', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 'iPhone', 5, 'ios'],
  ['iPad', 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)', 'iPad', 5, 'ios'],
  ['iPad desktop mode', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 'MacIntel', 5, 'ios'],
  ['Mac', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 'MacIntel', 0, 'unknown'],
  ['Windows touch', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Win32', 10, 'unknown'],
  ['unknown', '', '', 0, 'unknown'],
  ['mobile crawler', 'Android Googlebot/2.1', 'Linux', 5, 'unknown'],
];
for (const [name, ua, platform, touch, expected] of platforms) {
  test(`${name}: shared detection and destination`, () => {
    assert.equal(storePlatform(ua, platform, touch), expected);
    assert.equal(reviewPlatform(ua, platform, touch), expected);
    const links = downloadLinks({ utm_source: 'youtube', utm_campaign: 'demandgen' }, '123456');
    assert.equal(downloadDestination(expected, links), expected === 'unknown' ? null : links[expected === 'ios' ? 'appStore' : 'playStore']);
  });
}

test('no UTM keeps exact clean store defaults', () => {
  assert.deepEqual(downloadLinks(), { playStore: DEFAULT_PLAY_STORE_URL, appStore: DEFAULT_APP_STORE_URL });
  assert.deepEqual(downloadLinks({ utm_source: '', utm_medium: '' }, '123'), downloadLinks());
});

test('Android preserves four UTM values through a single referrer decode', () => {
  const input = { utm_source: 'YouTube', utm_medium: 'paid video', utm_campaign: 'México & familia + 50% #1', utm_content: 'clip=a&b?x=1' };
  const url = new URL(downloadLinks(input).playStore);
  assert.equal(url.origin, 'https://play.google.com');
  assert.equal(url.searchParams.get('id'), 'com.oscar.sismos_v2');
  assert.equal(url.searchParams.get('hl'), 'es_MX');
  assert.equal(url.searchParams.get('gl'), 'MX');
  const referrer = new URLSearchParams(url.searchParams.get('referrer'));
  assert.deepEqual(Object.fromEntries(referrer), input);
  assert.equal(url.searchParams.has('utm_source'), false);
});

test('iOS preserves UTMs and adds account campaign tokens for valid campaign', () => {
  const input = { utm_source: 'youtube', utm_medium: 'video', utm_campaign: 'demandgen', utm_content: 'ad1' };
  const url = new URL(downloadLinks(input, '123456').appStore);
  assert.equal(url.origin, 'https://apps.apple.com');
  assert.equal(url.pathname, new URL(DEFAULT_APP_STORE_URL).pathname);
  assert.equal(url.searchParams.get('action'), null);
  for (const [key, value] of Object.entries(input)) assert.equal(url.searchParams.get(key), value);
  assert.equal(url.searchParams.get('pt'), '123456');
  assert.equal(url.searchParams.get('ct'), 'demandgen');
  assert.equal(url.searchParams.get('mt'), '8');
});

for (const provider of [undefined, '', 'not-a-token', '123&ct=other', ' 123 ', '123\n']) {
  test(`missing/invalid provider ${JSON.stringify(provider)} keeps install link without false campaign tuple`, () => {
    const url = new URL(downloadLinks({ utm_campaign: 'demandgen' }, provider).appStore);
    assert.equal(url.searchParams.get('utm_campaign'), 'demandgen');
    for (const key of ['pt', 'ct', 'mt', 'action']) assert.equal(url.searchParams.has(key), false);
  });
}
for (const campaign of ['', 'a'.repeat(31), ' campaign', 'campaign ', 'hello\nworld', 'hello😀']) {
  test(`unsupported Apple campaign ${JSON.stringify(campaign)} is not silently truncated`, () => {
    const url = new URL(downloadLinks({ utm_campaign: campaign }, '123').appStore);
    assert.equal(url.searchParams.has('ct'), false);
    assert.equal(url.searchParams.has('pt'), false);
    assert.equal(url.searchParams.get('utm_campaign'), campaign || null);
  });
}

test('Apple accepts supported punctuation and 30-character boundary', () => {
  for (const campaign of ['a'.repeat(30), 'México 2026 & familia', 'ad/[test]+50%#1']) {
    assert.equal(new URL(downloadLinks({ utm_campaign: campaign }, '123').appStore).searchParams.get('ct'), campaign);
  }
});

test('first repeated value wins; caller cannot override destination or attribution account', () => {
  const links = downloadLinks({ utm_source: ['youtube', 'other'], utm_campaign: ['demandgen'], utm_content: [], redirect: 'https://evil.test', url: 'https://evil.test', id: 'evil', referrer: 'secret', action: 'write-review', pt: '999', ct: 'other', token: 'private' }, '123');
  const play = new URL(links.playStore);
  assert.equal(play.searchParams.get('id'), 'com.oscar.sismos_v2');
  assert.deepEqual(Object.fromEntries(new URLSearchParams(play.searchParams.get('referrer'))), { utm_source: 'youtube', utm_campaign: 'demandgen' });
  const apple = new URL(links.appStore);
  assert.equal(apple.searchParams.get('pt'), '123');
  assert.equal(apple.searchParams.get('ct'), 'demandgen');
  for (const key of ['redirect', 'url', 'id', 'action', 'token', 'referrer']) assert.equal(apple.searchParams.has(key), false);
});

test('review flow retains its original action and ignores download attribution configuration', () => {
  downloadLinks({ utm_campaign: 'demandgen' }, '123');
  assert.equal(new URL(reviewDestination('ios')).protocol, 'itms-apps:');
  assert.equal(new URL(reviewDestination('ios')).searchParams.get('action'), 'write-review');
  assert.equal(reviewDestination('android'), DEFAULT_PLAY_STORE_URL);
  assert.equal(reviewDestination('unknown'), null);
});
