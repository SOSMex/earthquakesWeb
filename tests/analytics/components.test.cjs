const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// Execute the actual components/helpers with browser effects controlled by the test.
// No DOM/network/store launch is performed by this harness.
function harness({ ua = 'Android', device = '', touch = 0, blocked = false, storageBlocked = false, opened = false } = {}) {
  const calls = [];
  const effects = [];
  const cache = new Map();
  const entries = new Map(opened ? [['sismos-review-opened', '1']] : []);
  const storage = {
    getItem(key) { if (storageBlocked) throw Error('blocked storage'); return entries.get(key); },
    setItem(key, value) { if (storageBlocked) throw Error('blocked storage'); entries.set(key, value); },
  };
  const browser = { location: { href: 'https://sismosmx.app/descargar?utm_source=youtube', replace: (url) => calls.push(['replace', url]) } };
  function load(file) {
    let full = path.resolve(__dirname, '../../src', file);
    if (!path.extname(full)) full += fs.existsSync(full + '.ts') ? '.ts' : '.tsx';
    if (cache.has(full)) return cache.get(full).exports;
    const module = { exports: {} };
    cache.set(full, module);
    const output = ts.transpileModule(fs.readFileSync(full, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const localRequire = (id) => {
      if (id === 'react') return { ...React, useEffect: (fn) => effects.push(fn), useRef: (value) => ({ current: value }) };
      if (id === '@vercel/analytics') return { track(name, props) { calls.push([name, props]); if (blocked) throw Error('blocked tracking'); } };
      if (id.startsWith('@/')) return load(id.slice(2));
      if (id.startsWith('.')) return load(path.resolve(path.dirname(full), id));
      return require(id);
    };
    vm.runInNewContext(output, { exports: module.exports, module, require: localRequire,
      window: browser, navigator: { userAgent: ua, platform: device, maxTouchPoints: touch },
      sessionStorage: storage, URL, URLSearchParams, process,
    }, { filename: full });
    return module.exports;
  }
  return { load, calls, effects, browser };
}

for (const [route, component] of [['descargar', 'DownloadRedirect'], ['calificar', 'ReviewRedirect']]) {
  test(`${route}: real effect tracks before replace, even when tracking throws, once per mount`, () => {
    const h = harness({ blocked: true });
    h.browser.location.href = `https://sismosmx.app/${route}?utm_source=youtube`;
    const links = h.load('lib/download-links').downloadLinks({ utm_source: 'youtube' });
    h.load(`app/${route}/${component}`).default({ links });
    h.effects[0](); h.effects[0]();
    assert.equal(h.calls.length, 2);
    assert.equal(h.calls[0][0], 'store_redirect');
    assert.equal(h.calls[0][1].route, `/${route}`);
    assert.equal(h.calls[0][1].store, 'play');
    const expected = route === 'descargar' ? links.playStore : h.load('lib/review-links').reviewDestination('android');
    assert.deepEqual(h.calls[1], ['replace', expected]);
  });
  for (const ua of ['Macintosh', 'Android Googlebot']) {
    test(`${route}: ${ua} has neither navigation nor redirect event`, () => {
      const h = harness({ ua });
      h.load(`app/${route}/${component}`).default({ links: h.load('lib/download-links').downloadLinks() });
      h.effects[0]();
      assert.deepEqual(h.calls, []);
    });
  }
  test(`${route}: iPad desktop mode retains iOS destination`, () => {
    const h = harness({ ua: 'Macintosh', device: 'MacIntel', touch: 5 });
    const links = h.load('lib/download-links').downloadLinks();
    h.load(`app/${route}/${component}`).default({ links }); h.effects[0]();
    assert.equal(h.calls[0][1].platform, 'ios');
    assert.equal(h.calls[0][1].store, 'app_store');
    assert.equal(h.calls[1][1], route === 'descargar' ? links.appStore : h.load('lib/review-links').reviewDestination('ios'));
  });
}

test('review tab guard suppresses both analytics and second navigation', () => {
  const h = harness({ opened: true });
  h.load('app/calificar/ReviewRedirect').default(); h.effects[0]();
  assert.deepEqual(h.calls, []);
});

test('blocked review storage still allows a navigation attempt', () => {
  const h = harness({ storageBlocked: true, blocked: true });
  h.load('app/calificar/ReviewRedirect').default(); h.effects[0]();
  assert.equal(h.calls[1][0], 'replace');
});

test('store link preserves SSR anchor semantics and click survives tracking failure', () => {
  const h = harness({ blocked: true });
  const { StoreLink } = h.load('components/widgets/store-link/StoreLink');
  const props = { href: 'https://apps.apple.com/example', target: '_blank', rel: 'noopener noreferrer',
    store: 'app_store', placement: 'hero', children: 'App Store' };
  const element = StoreLink(props);
  assert.equal(element.type, 'a');
  assert.doesNotThrow(() => element.props.onClick());
  assert.equal(h.calls[0][0], 'store_click');
  const html = renderToStaticMarkup(React.createElement(StoreLink, props));
  assert.match(html, /href="https:\/\/apps.apple.com\/example"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, />App Store<\/a>/);
  assert.doesNotMatch(html, /placement=|store=/);
});
