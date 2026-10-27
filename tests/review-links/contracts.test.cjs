const test = require('node:test');
const assert = require('node:assert/strict');
const { reviewPlatform, reviewDestination } = require('../../.tmp/review-links/lib/review-links');
const { APP_STORE_REVIEW_URL } = require('../../.tmp/review-links/config/stores');

const cases = [
  ['iPhone Safari', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 'iPhone', 5, 'ios'],
  ['iPad Safari', 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)', 'iPad', 5, 'ios'],
  ['iPad desktop mode', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 'MacIntel', 5, 'ios'],
  ['Mac desktop', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 'MacIntel', 0, 'unknown'],
  ['Android webview', 'Mozilla/5.0 (Linux; Android 15; Pixel 9; wv)', 'Linux armv8l', 5, 'android'],
  ['Windows touch', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Win32', 10, 'unknown'],
  ['empty client', '', '', 0, 'unknown'],
  ['mobile crawler', 'Mozilla/5.0 (Linux; Android 6) Googlebot/2.1', 'Linux', 0, 'unknown'],
];

for (const [name, ua, platform, touch, expected] of cases) {
  test(name, () => assert.equal(reviewPlatform(ua, platform, touch), expected));
}

test('iOS native and HTTPS destinations preserve the verified app and review action', () => {
  for (const raw of [reviewDestination('ios'), APP_STORE_REVIEW_URL]) {
    const url = new URL(raw);
    assert.equal(url.pathname, '/app/id6473684021');
    assert.equal(url.searchParams.get('action'), 'write-review');
  }
  assert.equal(new URL(reviewDestination('ios')).protocol, 'itms-apps:');
  assert.equal(new URL(APP_STORE_REVIEW_URL).origin, 'https://apps.apple.com');
});

test('Android uses the correct package and official HTTPS destination', () => {
  const url = new URL(reviewDestination('android'));
  assert.equal(url.origin, 'https://play.google.com');
  assert.equal(url.searchParams.get('id'), 'com.oscar.sismos_v2');
});

test('unknown platform never auto-navigates', () => {
  assert.equal(reviewDestination('unknown'), null);
});
