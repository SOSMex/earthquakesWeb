import { DEFAULT_APP_STORE_URL, DEFAULT_PLAY_STORE_URL } from '../config/stores';
import type { StorePlatform } from './store-platform';

export type DownloadQuery = Readonly<Record<string, string | string[] | undefined>>;
export type DownloadLinks = Readonly<{ playStore: string; appStore: string }>;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
// Apple campaign tokens support letters/numbers, spaces and the listed punctuation.
const APPLE_CAMPAIGN = /^[\p{L}\p{N} [\]/\\~+=<>:;,. _‘“*&$%#@?!|{}()'"-]+$/u;

function appleCampaignSupported(value: string): boolean {
  return Array.from(value).length <= 30 && value.trim() === value && APPLE_CAMPAIGN.test(value);
}

export function downloadLinks(query: DownloadQuery = {}, providerToken = ''): DownloadLinks {
  const campaign = new URLSearchParams();
  UTM_KEYS.forEach((key) => {
    const raw = query[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value) campaign.set(key, value);
  });

  const play = new URL(DEFAULT_PLAY_STORE_URL);
  const apple = new URL(DEFAULT_APP_STORE_URL);
  if (campaign.size > 0) {
    play.searchParams.set('referrer', campaign.toString());
    campaign.forEach((value, key) => apple.searchParams.set(key, value));
  }

  const name = campaign.get('utm_campaign');
  if (providerToken && !/[^0-9]/.test(providerToken) && name && appleCampaignSupported(name)) {
    apple.searchParams.set('pt', providerToken);
    apple.searchParams.set('ct', name);
    apple.searchParams.set('mt', '8');
  }
  return { playStore: play.toString(), appStore: apple.toString() };
}

export function downloadDestination(platform: StorePlatform, links: DownloadLinks): string | null {
  if (platform === 'android') return links.playStore;
  if (platform === 'ios') return links.appStore;
  return null;
}
