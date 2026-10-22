import { getCanonicalSiteUrl } from '@/lib/seo';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;
const submittedUrls = new Set<string>();

function indexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim() ?? '';
  return KEY_PATTERN.test(key) ? key : null;
}

function toAbsoluteUrl(pathOrUrl: string, origin: string): string | null {
  try {
    const url = pathOrUrl.startsWith('http')
      ? new URL(pathOrUrl)
      : new URL(pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`, origin);
    return url.toString();
  } catch {
    return null;
  }
}

export function quakeIndexPaths(earthquakes: { id?: string }[]): string[] {
  return earthquakes
    .map((earthquake) => earthquake.id?.trim())
    .filter((id): id is string => Boolean(id))
    .map((id) => `/sismos/${id}`);
}

/**
 * Tell IndexNow about URLs the first time this server process sees them.
 * A missing key, a build, or a failed request does not affect the page.
 */
export async function notifyIndexNow(paths: string[]): Promise<void> {
  if (process.env.NEXT_PHASE === 'phase-production-build') return;

  const key = indexNowKey();
  if (!key || paths.length === 0) return;

  const origin = getCanonicalSiteUrl();
  const fresh: string[] = [];
  paths.forEach((path) => {
    const url = toAbsoluteUrl(path, origin);
    if (!url || submittedUrls.has(url) || fresh.includes(url)) return;
    fresh.push(url);
  });

  if (fresh.length === 0) return;

  fresh.forEach((url) => submittedUrls.add(url));

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(origin).host,
        key,
        keyLocation: `${origin}/${key}.txt`,
        urlList: fresh,
      }),
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      fresh.forEach((url) => submittedUrls.delete(url));
      // eslint-disable-next-line no-console
      console.error('[indexnow] HTTP', response.status);
    }
  } catch (error) {
    fresh.forEach((url) => submittedUrls.delete(url));
    // eslint-disable-next-line no-console
    console.error('[indexnow]', error);
  }
}
