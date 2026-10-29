export type StorePlatform = 'ios' | 'android' | 'unknown';

export function storePlatform(
  userAgent: string,
  platform = '',
  maxTouchPoints = 0,
): StorePlatform {
  if (/bot|crawler|spider|preview/i.test(userAgent)) return 'unknown';
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)
    || (platform === 'MacIntel' && maxTouchPoints > 1)) return 'ios';
  return 'unknown';
}
