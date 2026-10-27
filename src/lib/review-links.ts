import { APP_STORE_REVIEW_DEEP_LINK, DEFAULT_PLAY_STORE_URL } from '../config/stores';

export type ReviewPlatform = 'ios' | 'android' | 'unknown';

export function reviewPlatform(
  userAgent: string,
  platform = '',
  maxTouchPoints = 0,
): ReviewPlatform {
  if (/bot|crawler|spider|preview/i.test(userAgent)) return 'unknown';
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)
    || (platform === 'MacIntel' && maxTouchPoints > 1)) return 'ios';
  return 'unknown';
}

export function reviewDestination(platform: ReviewPlatform): string | null {
  if (platform === 'ios') return APP_STORE_REVIEW_DEEP_LINK;
  if (platform === 'android') return DEFAULT_PLAY_STORE_URL;
  return null;
}
