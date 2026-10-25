const test = require('node:test');
const assert = require('node:assert/strict');
const links = require('../../.tmp/family-links/lib/family-links.js');

test('only six unambiguous invitation characters; no URL or path injection', () => {
  assert.equal(links.normalizeInviteCode(' k7m2q9 '), 'K7M2Q9');
  for (const code of ['ABC', 'ABC123', 'AAAAA0', '../ABC234', 'ABC234?x=1', 'ABC234/']) {
    assert.equal(links.normalizeInviteCode(code), null, code);
  }
});
test('launch destinations are explicit and never map a public event id to catalog', () => {
  assert.equal(links.appLaunchUrl('other'), 'sismosmx://open');
  assert.equal(links.appLaunchUrl('ios', 'K7M2Q9'), 'sismosmx://join/K7M2Q9');
  assert.equal(links.appLaunchUrl('android', 'K7M2Q9'),
    'intent://join/K7M2Q9#Intent;scheme=sismosmx;package=com.oscar.sismos_v2;end');
  assert.equal(links.appLaunchUrl('ios', 'bad/code'), null);
});
test('false differs from malformed validation; no expired/used reason is invented', () => {
  assert.deepEqual(links.decodeInvitation({valid: false}), {status: 'unavailable'});
  assert.deepEqual(links.decodeInvitation({valid: true, expiresAt: '2030-01-01T12:00:00Z'}),
    {status: 'available', expiresAt: '2030-01-01T12:00:00Z'});
  for (const value of [null, {}, {valid: true}, {valid: 'true'}, {valid: true, expiresAt: 'bad'}]) {
    assert.deepEqual(links.decodeInvitation(value), {status: 'error'});
  }
});
test('validation transport is no-store and errors do not become unavailable', async () => {
  let called = 0;
  const fetcher = async (url, options) => {
    called += 1;
    assert.match(url, /code=K7M2Q9$/);
    assert.equal(options.cache, 'no-store');
    assert.ok(options.signal);
    return new Response(JSON.stringify({valid: false}), {status: 200});
  };
  assert.deepEqual(await links.lookupInvitation('K7M2Q9', fetcher), {status: 'unavailable'});
  assert.equal(called, 1);
  assert.deepEqual(await links.lookupInvitation('bad', fetcher), {status: 'unavailable'});
  assert.equal(called, 1);
  for (const response of [new Response('', {status: 500}), new Response('bad-json')]) {
    assert.deepEqual(await links.lookupInvitation('K7M2Q9', async () => response), {status: 'error'});
  }
  assert.deepEqual(await links.lookupInvitation('K7M2Q9', async () => { throw new Error('fixture'); }),
    {status: 'error'});
});
test('event envelope must match public identity and contain real data', () => {
  const event = {collapseKey: 'eq_42', intensity: 'Fuerte', location: 'Oaxaca',
    dateUtc: '2026-10-24T12:00:00Z', etas: {}};
  assert.equal(links.decodePublicEvent({data: event}, 'eq_42').status, 'found');
  assert.equal(links.decodePublicEvent({data: event}, 'eq_other').status, 'error');
  assert.equal(links.decodePublicEvent({data: null}, 'eq_42').status, 'notFound');
  assert.equal(links.decodePublicEvent({}, 'eq_42').status, 'error');
  assert.equal(links.decodePublicEvent({data: {...event, dateUtc: 'unknown'}}, 'eq_42').status, 'error');
});
test('store destinations use the product identities, never placeholder IDs', () => {
  assert.match(links.APP_STORE_URL, /id6473684021$/);
  assert.match(links.PLAY_STORE_URL, /com.oscar.sismos_v2/);
});

test('automatic page metrics strip invitation codes, event IDs, queries and fragments', () => {
  assert.equal(links.familyAnalyticsUrl('https://sismosmx.app/join/K7M2Q9?from=private#x'),
    'https://sismosmx.app/join');
  assert.equal(links.familyAnalyticsUrl('https://sismosmx.app/event/eq_private?source=message'),
    'https://sismosmx.app/event');
  assert.equal(links.familyAnalyticsUrl('https://sismosmx.app/legal'), 'https://sismosmx.app/legal');
});

test('public event identity rejects path, query and trailing newline injection', () => {
  for (const id of ['../private', 'a?key=x', 'event\n', ' event', '', 'x'.repeat(129)]) {
    assert.equal(links.isPublicEventId(id), false);
  }
  assert.equal(links.isPublicEventId('eq_public-2026'), true);
});
