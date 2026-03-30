'use server';

import { BASE_URL } from '@/config';

export async function getEarthquakesData(limit: number = 10, page: number = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/latest?key=${process.env.SELF_SECRET}&limit=${limit}&page=${page}`,
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
  intensity: string;
  location: string;
  epicenterLat?: number;
  epicenterLng?: number;
  dateUtc: string;
  latencySeconds?: number;
  etas: Record<string, CityEta>;
}

export async function getEarthquakeEvent(
  id: string,
): Promise<EarthquakeEventResponse | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/event?key=${process.env.SELF_SECRET}&id=${id}`,
    );
    const json = await response.json();
    return json?.data ?? null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getEarthquakeEvent] Error:', error);
    return null;
  }
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
