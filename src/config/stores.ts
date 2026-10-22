const PLAY_STORE_ID = 'com.oscar.sismos_v2';
const APP_STORE_ID = '6473684021';

export const DEFAULT_PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}&hl=es_MX&gl=MX`;
export const DEFAULT_APP_STORE_URL = `https://apps.apple.com/mx/app/sismos-m%C3%A9xico/id${APP_STORE_ID}`;

export function playStoreUrl(raw?: string | null): string {
  const candidate = raw && raw.startsWith('http') ? raw : DEFAULT_PLAY_STORE_URL;

  try {
    const url = new URL(candidate);
    if (!url.searchParams.get('id')) url.searchParams.set('id', PLAY_STORE_ID);
    url.searchParams.set('hl', url.searchParams.get('hl') || 'es_MX');
    url.searchParams.set('gl', 'MX');
    return url.toString();
  } catch {
    return DEFAULT_PLAY_STORE_URL;
  }
}

export function appStoreUrl(raw?: string | null): string {
  if (raw && raw.includes(APP_STORE_ID)) return raw;
  return DEFAULT_APP_STORE_URL;
}
