import { APP_STORE_REVIEW_DEEP_LINK, DEFAULT_PLAY_STORE_URL } from '../config/stores';

import type { StorePlatform } from './store-platform';

export { storePlatform as reviewPlatform } from './store-platform';
export type { StorePlatform as ReviewPlatform } from './store-platform';

export function reviewDestination(platform: StorePlatform): string | null {
  if (platform === 'ios') return APP_STORE_REVIEW_DEEP_LINK;
  if (platform === 'android') return DEFAULT_PLAY_STORE_URL;
  return null;
}
