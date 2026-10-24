'use server';

import { BASE_URL } from '@/config';
import { decodePublicEvent, isPublicEventId } from '@/lib/family-links';

export async function getEarthquakesData(limit: number = 10, page: number = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/latest?key=${process.env.SELF_SECRET}&limit=${limit}&page=${page}`,
      { next: { revalidate: 60 } },
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
}

export async function getStatistics(
  startDate: string,
  endDate: string,
) {
  try {
    const params = new URLSearchParams({ startDate, endDate });
    const url = `${BASE_URL}/api/earthquakes/statistics`
      + `?key=${process.env.SELF_SECRET}&${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('[getStatistics] HTTP', response.status);
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getStatistics] Error:', error);
    return {};
  }
}

export async function getEarthquakeDetail(id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/detail?key=${process.env.SELF_SECRET}&id=${id}`,
      { next: { revalidate: 60 } },
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
}

export interface ReportStats {
  earthquakeToken: string;
  totalReports: number;
  intensityBreakdown: {
    leve: number;
    moderado: number;
    fuerte: number;
  };
  featuredReports: {
    intensity: string;
    comment: string | null;
    reportedAt: string;
  }[];
}

export interface ReportLocation {
  latitude: number;
  longitude: number;
  intensity: string;
}

export interface ReportLocationsResponse {
  earthquakeToken: string;
  totalCount: number;
  locations: ReportLocation[];
}

export async function getReportLocations(
  earthquakeToken: string,
): Promise<ReportLocationsResponse | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/report-locations?key=${process.env.SELF_SECRET}&token=${earthquakeToken}`,
    );
    const json = await response.json();

    return json?.data ?? null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getReportLocations] Error:', error);
    return null;
  }
}

// --- Earthquake Event (story page) ---

export interface CityEta {
  intensity?: string;
  eta?: number;
  lat: number;
  lng: number;
}

export interface EarthquakeEventResponse {
  collapseKey: string;
  /**
   * RFC-033 discriminator. `real` (default) for genuine seismic events,
   * `drill` for the national simulacro, `drill_staging` for QA. The web
   * branches OG metadata + body copy off this — the URL pattern stays
   * the same between real and drill so a single shared link works for
   * both.
   *
   * Optional in the type because pre-RFC-033 backends omitted it; the
   * page treats anything not strictly `drill` / `drill_staging` as real.
   */
  eventType?: string;
  intensity: string;
  location: string;
  epicenterLat?: number;
  epicenterLng?: number;
  dateUtc: string;
  latencySeconds?: number;
  etas: Record<string, CityEta>;
}

export async function getEarthquakeEventResult(
  id: string,
): Promise<
  | { status: 'found'; event: EarthquakeEventResponse }
  | { status: 'notFound' }
  | { status: 'error' }
> {
  if (!isPublicEventId(id)) return { status: 'notFound' };
  try {
    const query = new URLSearchParams({ key: process.env.SELF_SECRET ?? '', id });
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/event?${query}`,
      { cache: 'no-store', signal: AbortSignal.timeout(10000) },
    );
    if (response.status === 404) return { status: 'notFound' };
    if (!response.ok) return { status: 'error' };
    const result = decodePublicEvent(await response.json(), id);
    return result.status === 'found'
      ? { status: 'found', event: result.event as EarthquakeEventResponse } : result;
  } catch {
    // Never log the request URL: the existing server transport contains a secret.
    return { status: 'error' };
  }
}

/** Compatibility adapter for existing consumers. New UI preserves errors. */
export async function getEarthquakeEvent(id: string): Promise<EarthquakeEventResponse | null> {
  const result = await getEarthquakeEventResult(id);
  return result.status === 'found' ? result.event : null;
}

export async function getReportStats(
  earthquakeToken: string,
): Promise<ReportStats | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/report-stats?key=${process.env.SELF_SECRET}&token=${earthquakeToken}`,
    );
    const json = await response.json();

    return json?.data ?? null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getReportStats] Error:', error);
    return null;
  }
}
