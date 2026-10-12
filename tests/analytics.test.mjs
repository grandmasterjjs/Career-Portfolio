import assert from 'node:assert/strict';
import test from 'node:test';
import { CONSENT_MAX_AGE_MS, parseConsent, isConfigured, publicPage, hasProviderMessageId, createAnalytics, browserAnalyticsPort, createVercelPageviewFilter, isVercelAnalyticsAllowed } from '../src/lib/analytics.ts';

const config = { enabled: true, measurementId: 'G-TEST12345', production: true, pages: [
  { path: '/', title: 'Home' }, { path: '/about', title: 'About' }, { path: '/contact', title: 'Contact' },
  { path: '/projects/public-project', title: 'Public project' },
] };
const flush = () => new Promise((resolve) => setImmediate(resolve));
function harness(overrides = {}) {
  const commands = [], disabled = [], state = { now: 1000, loads: 0, clears: 0, signal: false };
  let resolveLoad, rejectLoad;
  const port = {
    hostname: 'grandmasterj.com', protocol: 'https:', now: () => state.now,
    hasPrivacySignal: () => state.signal,
    load: () => { state.loads++; return new Promise((r, j) => { resolveLoad = r; rejectLoad = j; }); },
    command: (...args) => commands.push(args), disable: (_id, value) => disabled.push(value),
    clearCookies: () => state.clears++, ...overrides,
  };
  const tracker = createAnalytics(config, port);
  return { tracker, commands, disabled, state, consent: { choice: 'granted', expiresAt: 100000 },
    load: async () => { resolveLoad(); await flush(); }, fail: async () => { rejectLoad(new Error('offline')); await flush(); },
    events: () => commands.filter(([type]) => type === 'event'),
  };
}

test('disabled, invalid ID, local, preview and non-HTTPS configurations fail closed', () => {
  assert.equal(isConfigured(config, 'grandmasterj.com', 'https:'), true);
  assert.equal(isConfigured(config, 'www.jjsmiley.net', 'https:'), true);
  for (const host of ['localhost', '127.0.0.1', 'career-preview.vercel.app', 'grandmasterj.com.evil.test', 'studio.grandmasterj.com'])
    assert.equal(isConfigured(config, host, 'https:'), false);
  for (const change of [{ enabled: false }, { production: false }, { measurementId: '' }, { measurementId: 'G-<script>' }, { measurementId: 'UA-123-1' }])
    assert.equal(isConfigured({ ...config, ...change }, 'grandmasterj.com', 'https:'), false);
  assert.equal(isConfigured(config, 'grandmasterj.com', 'http:'), false);
});

test('consent parsing rejects missing, broken, expired or excessive records', () => {
  const now = 1000;
  for (const raw of [null, 'bad', '{}', 'null', '{"choice":"yes","expiresAt":2000}', '{"choice":"granted","expiresAt":1000}', JSON.stringify({ choice: 'granted', expiresAt: now + CONSENT_MAX_AGE_MS + 1 })])
    assert.equal(parseConsent(raw, now), null);
  assert.deepEqual(parseConsent('{"choice":"denied","expiresAt":2000}', now), { choice: 'denied', expiresAt: 2000 });
});

test('only public allowlisted paths are permitted and query/hash are stripped', () => {
  assert.equal(publicPage('/contact/?email=private@example.com#secret', config.pages).path, '/contact');
  for (const path of ['/studio', '/studio/secret', '/admin', '/api/contact', '/people/private@example.com', '//evil.test', '/projects/unknown'])
    assert.equal(publicPage(path, config.pages), undefined);
  assert.equal(publicPage('/studio', [{ path: '/studio', title: 'Oops' }]), undefined);
});

test('no script or commands before acceptance, after decline, or with a privacy signal', async () => {
  const h = harness();
  h.tracker.update('/', null);
  h.tracker.update('/contact', { choice: 'denied', expiresAt: 100000 });
  h.tracker.contactSent({ ok: true, id: 'real-provider-id' });
  h.state.signal = true;
  h.tracker.update('/', h.consent);
  assert.equal(h.state.loads, 0); assert.equal(h.commands.length, 0);
  assert.equal(h.disabled.at(-1), true);
});

test('one initial pageview and one per pathname change, including back/forward', async () => {
  const h = harness(); h.tracker.update('/?email=private@example.com', h.consent);
  h.tracker.update('/', h.consent); assert.equal(h.state.loads, 1);
  await h.load();
  h.tracker.update('/', h.consent); // Strict Mode/repeated render equivalent
  h.tracker.update('/contact?anything=secret#private', h.consent);
  h.tracker.update('/contact#other', h.consent);
  h.tracker.update('/', h.consent);
  h.tracker.update('/contact', h.consent);
  assert.deepEqual(h.events().map((event) => event[2].page_path), ['/', '/contact', '/', '/contact']);
  for (const event of h.events()) { assert.equal(event[2].page_referrer, ''); assert.equal(event[2].page_location.includes('?'), false); }
  const calls = h.commands.filter(([type]) => type === 'config');
  assert.ok(calls.every(([, , value]) => value.send_page_view === false && value.allow_google_signals === false && value.allow_ad_personalization_signals === false));
  assert.equal(JSON.stringify(h.commands).includes('private@example.com'), false);
  assert.equal(JSON.stringify(h.commands).includes('secret'), false);
});

test('route change while script loads records only the latest eligible route', async () => {
  const h = harness(); h.tracker.update('/', h.consent); h.tracker.update('/contact', h.consent);
  await h.load(); assert.deepEqual(h.events().map((event) => event[2].page_path), ['/contact']);
});

test('withdrawal while loading prevents initialization or buffered event replay', async () => {
  const h = harness(); h.tracker.update('/contact', h.consent); h.tracker.update('/contact', { choice: 'denied', expiresAt: 100000 });
  await h.load(); assert.equal(h.commands.length, 0); assert.equal(h.disabled.at(-1), true);
  h.tracker.update('/about', h.consent); assert.deepEqual(h.events().map((event) => event[2].page_path), ['/about']);
});

test('excluded routes stop collection and returning to a public route counts once', async () => {
  const h = harness(); h.tracker.update('/studio', h.consent); assert.equal(h.state.loads, 0);
  h.tracker.update('/contact', h.consent); await h.load();
  h.tracker.update('/studio/content/secret', h.consent);
  h.tracker.contactSent({ ok: true, id: 'provider-id' });
  assert.equal(h.disabled.at(-1), true); assert.equal(h.events().length, 1);
  h.tracker.update('/contact', h.consent); assert.equal(h.events().length, 2);
});

test('revocation and expiry block later events; revocation clears cookies', async () => {
  const h = harness(); h.tracker.update('/contact', h.consent); await h.load();
  h.tracker.update('/contact', { choice: 'denied', expiresAt: 100000 });
  h.tracker.contactSent({ ok: true, id: 'provider-id' }); assert.equal(h.events().length, 1);
  assert.equal(h.disabled.at(-1), true); assert.ok(h.state.clears > 0);
  h.tracker.update('/contact', h.consent); h.state.now = 100001;
  h.tracker.contactSent({ ok: true, id: 'provider-id' }); h.tracker.update('/about', h.consent);
  assert.equal(h.events().length, 2); assert.equal(h.disabled.at(-1), true);
});

test('provider success cannot be inferred from HTTP 200/honeypot; no form fields or ID are sent', async () => {
  const h = harness(); h.tracker.update('/contact', h.consent); await h.load();
  for (const result of [null, {}, { ok: true }, { ok: true, id: '' }, { ok: true, id: ' ' }, { ok: false, id: 'x' }, { ok: true, id: 42 }]) {
    assert.equal(hasProviderMessageId(result), false); h.tracker.contactSent(result);
  }
  h.tracker.contactSent({ ok: true, id: 'provider-secret', name: 'PRIVATE-NAME', email: 'private@example.com', message: 'PRIVATE-TEXT' });
  assert.equal(h.events().length, 2); assert.equal(h.events()[1][1], 'contact_form_success');
  for (const privateValue of ['provider-secret', 'PRIVATE-NAME', 'private@example.com', 'PRIVATE-TEXT'])
    assert.equal(JSON.stringify(h.commands).includes(privateValue), false);
  h.tracker.update('/about', h.consent); h.tracker.contactSent({ ok: true, id: 'id' });
  assert.equal(h.events().filter((event) => event[1] === 'contact_form_success').length, 1);
});

test('failed script load stays nonfatal and may retry on the next update', async () => {
  const h = harness(); h.tracker.update('/', h.consent); await h.fail();
  assert.equal(h.events().length, 0); h.tracker.update('/', h.consent); await h.load();
  assert.equal(h.state.loads, 2); assert.equal(h.events().length, 1);
});

test('disposed Strict Mode mount cannot initialize when its script finally resolves', async () => {
  const h = harness(); h.tracker.update('/', h.consent); h.tracker.dispose(); await h.load();
  assert.equal(h.commands.length, 0); assert.equal(h.disabled.at(-1), true);
});

test('browser adapter does not inject a script until load and sets no-referrer', async () => {
  const scripts = []; let cookies = '_ga=123; _ga_TEST=456; theme=dark'; const writes = [];
  globalThis.window = { location: { hostname: 'grandmasterj.com', protocol: 'https:' } };
  globalThis.document = {
    getElementById: () => scripts[0] || null,
    createElement: () => ({ dataset: {}, listeners: {}, addEventListener(event, handler) { this.listeners[event] = handler; }, remove() { scripts.pop(); } }),
    head: { appendChild: (script) => scripts.push(script) },
    get cookie() { return cookies; }, set cookie(value) { writes.push(value); },
  };
  try {
    const port = browserAnalyticsPort(); assert.equal(scripts.length, 0);
    const loaded = port.load('G-TEST12345'); assert.equal(scripts.length, 1);
    assert.equal(scripts[0].referrerPolicy, 'no-referrer');
    assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-TEST12345');
    assert.equal(window.dataLayer.length, 0);
    scripts[0].listeners.load(); await loaded; await port.load('G-TEST12345'); assert.equal(scripts.length, 1);
    port.disable('G-TEST12345', true); assert.equal(window['ga-disable-G-TEST12345'], true);
    port.clearCookies(); assert.equal(writes.length, 2); assert.ok(writes.every((value) => value.includes('Max-Age=0')));
  } finally { delete globalThis.window; delete globalThis.document; }
});

test('a newly enabled privacy signal disables an already-running engine on refresh', async () => {
  const h = harness(); h.tracker.update('/contact', h.consent); await h.load();
  assert.equal(h.disabled.at(-1), false);
  h.state.signal = true;
  h.tracker.update('/contact', h.consent); // Provider's focus/pageshow path.
  assert.equal(h.disabled.at(-1), true);
  h.tracker.contactSent({ ok: true, id: 'provider-id' });
  assert.equal(h.events().length, 1);
});

test('throwing cookie access cannot interrupt a declined choice or turn GA back on', async () => {
  const h = harness({ clearCookies: () => { throw new Error('Cookies blocked'); } });
  h.tracker.update('/contact', h.consent); await h.load();
  assert.doesNotThrow(() => h.tracker.update('/contact', { choice: 'denied', expiresAt: 100000 }));
  assert.equal(h.disabled.at(-1), true);
  h.tracker.contactSent({ ok: true, id: 'provider-id' });
  assert.equal(h.events().length, 1);
});

test('throwing gtag contact measurement is best-effort and disables the failed tag', async () => {
  let throwEvents = false;
  const h = harness({ command: (...args) => {
    if (throwEvents && args[1] === 'contact_form_success') throw new Error('gtag failed');
  } });
  h.tracker.update('/contact', h.consent); await h.load();
  throwEvents = true;
  assert.doesNotThrow(() => h.tracker.contactSent({ ok: true, id: 'provider-id' }));
  assert.equal(h.disabled.at(-1), true);
});

test('a throwing tag initialization never escapes to React and fails closed', async () => {
  const h = harness({ command: () => { throw new Error('gtag failed'); } });
  h.tracker.update('/', h.consent); await h.load();
  assert.doesNotThrow(() => h.tracker.update('/contact', h.consent));
  assert.equal(h.disabled.at(-1), true);
});

const baseline = { enabled: true, production: true, pages: config.pages };
const baselineContext = { hostname: 'grandmasterj.com', protocol: 'https:', pathname: '/contact', privacySignal: false };

test('Vercel baseline requires production, opt-in configuration, approved HTTPS hostname and public path', () => {
  assert.equal(isVercelAnalyticsAllowed(baseline, baselineContext), true);
  for (const context of [
    { hostname: 'beta.grandmasterj.com' }, { hostname: 'localhost' }, { hostname: 'career.vercel.app' },
    { protocol: 'http:' }, { pathname: '/studio' }, { pathname: '/admin/secret' }, { pathname: '/unknown' }, { privacySignal: true },
  ]) assert.equal(isVercelAnalyticsAllowed(baseline, { ...baselineContext, ...context }), false);
  assert.equal(isVercelAnalyticsAllowed({ ...baseline, production: false }, baselineContext), false);
  assert.equal(isVercelAnalyticsAllowed({ ...baseline, enabled: false }, baselineContext), false);
});

test('Vercel baseline emits only canonical URL/type and strips query/hash and arbitrary extra data', () => {
  const filter = createVercelPageviewFilter(baseline, () => baselineContext, '/contact');
  const result = filter({ type: 'pageview', url: 'https://grandmasterj.com/contact?email=private@example.test#secret', email: 'private@example.test', route: '/[private-query-key]' });
  assert.deepEqual(result, { type: 'pageview', url: 'https://grandmasterj.com/contact' });
});

test('Vercel baseline rejects every custom event, including contact-form events', () => {
  const filter = createVercelPageviewFilter(baseline, () => baselineContext, '/contact');
  assert.equal(filter({ type: 'event', url: 'https://grandmasterj.com/contact' }), null);
});

test('Vercel baseline rejects malformed, off-origin, credentialed, private and stale URLs', () => {
  for (const url of [
    'bad', 'https://evil.test/contact', 'http://grandmasterj.com/contact',
    'https://private:secret@grandmasterj.com/contact', 'https://grandmasterj.com:444/contact',
    'https://grandmasterj.com/studio', 'https://grandmasterj.com/about',
  ]) {
    const filter = createVercelPageviewFilter(baseline, () => baselineContext, '/contact');
    assert.equal(filter({ type: 'pageview', url }), null);
  }
});

test('Vercel baseline deduplicates initial/repeated/query-only views within one pathname visit', () => {
  const filter = createVercelPageviewFilter(baseline, () => baselineContext, '/contact');
  assert.ok(filter({ type: 'pageview', url: 'https://grandmasterj.com/contact?a=1' }));
  assert.equal(filter({ type: 'pageview', url: 'https://grandmasterj.com/contact?a=2#other' }), null);
  assert.equal(filter({ type: 'pageview', url: 'https://grandmasterj.com/contact' }), null);
});

test('fresh pathname visits, including back/forward, each permit one Vercel view', () => {
  const paths = ['/', '/contact', '/', '/contact'];
  const views = paths.map(path => {
    const filter = createVercelPageviewFilter(baseline, () => ({ ...baselineContext, pathname: path }), path);
    return filter({ type: 'pageview', url: 'https://grandmasterj.com' + path });
  });
  assert.deepEqual(views.map(view => new URL(view.url).pathname), paths);
});

test('loaded Vercel hook reads live privacy signals and blocks private-route transitions', () => {
  let current = { ...baselineContext };
  const filter = createVercelPageviewFilter(baseline, () => current, '/contact');
  current.privacySignal = true;
  assert.equal(filter({ type: 'pageview', url: 'https://grandmasterj.com/contact' }), null);
  current = { ...baselineContext, pathname: '/studio' };
  assert.equal(filter({ type: 'pageview', url: 'https://grandmasterj.com/contact' }), null);
});

test('Vercel filter rejects inaccessible privacy state without breaking the site', () => {
  const filter = createVercelPageviewFilter(baseline, () => { throw new Error('Privacy access blocked'); }, '/contact');
  assert.equal(filter({ type: 'pageview', url: 'https://grandmasterj.com/contact' }), null);
});
