import { track } from '@vercel/analytics';
import { storePlatform } from './store-platform';

export type Store = 'play' | 'app_store';
export type StorePlacement = 'hero' | 'download_section' | 'download_fallback' | 'review_fallback'
  | 'referral' | 'smart_banner' | 'sticky_bar';
type StoreEvents = {
  store_redirect: { store: Store };
  store_click: { store: Store; placement: StorePlacement };
};
type BrowserContext = { url: string; userAgent: string; platform: string; maxTouchPoints: number };
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

export function analyticsUtm(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const props: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    // Campaign labels only, never email addresses, URLs, phone numbers or free-form text.
    if (value && value.length <= 100 && /^[\p{L}\p{N}_ -]+$/u.test(value)
      && /[\p{L}]/u.test(value)) props[key] = value;
  });
  return props;
}

function analyticsRoute(pathname: string): string {
  if (/^\/invite\//.test(pathname)) return '/invite/[code]';
  if (/^\/join\//.test(pathname)) return '/join/[code]';
  if (/^\/event\//.test(pathname)) return '/event/[id]';
  return pathname;
}

export function analyticsUrl(value: string): string {
  const url = new URL(value);
  const route = analyticsRoute(url.pathname);
  const campaign = route === url.pathname ? analyticsUtm(url.search) : {};
  url.pathname = route;
  url.search = new URLSearchParams(campaign).toString();
  url.hash = '';
  return url.toString();
}

function browserContext(): BrowserContext {
  return {
    url: window.location.href,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints,
  };
}

export function trackStoreEvent<E extends keyof StoreEvents>(
  name: E,
  props: StoreEvents[E],
  context?: BrowserContext,
  send: typeof track = track,
): void {
  try {
    const browser = context ?? browserContext();
    const url = new URL(browser.url);
    const platform = storePlatform(browser.userAgent, browser.platform, browser.maxTouchPoints);
    send(name, {
      route: analyticsRoute(url.pathname),
      platform: platform === 'unknown' ? 'desktop' : platform,
      ...props,
      ...analyticsUtm(url.search),
    });
  } catch {
    // Measurement is best effort and must never prevent navigation.
  }
}

export function redirectToStore(
  destination: string,
  store: Store,
  // eslint-disable-next-line no-unused-vars
  replace: (url: string) => void,
  context?: BrowserContext,
  send: typeof track = track,
): void {
  trackStoreEvent('store_redirect', { store }, context, send);
  replace(destination);
}
