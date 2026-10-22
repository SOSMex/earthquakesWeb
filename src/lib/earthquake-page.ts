import { EarthquakeProps } from '@/components/widgets';
import {
  getEarthquakeDetail,
  getEarthquakesData,
  parseEarthquakes,
} from '@/services';

export async function loadEarthquakeByPublicId(id: string): Promise<EarthquakeProps | null> {
  const decoded = decodeURIComponent(id);
  const detail = await getEarthquakeDetail(decoded);
  const detailRow = detail?.data && typeof detail.data === 'object' ? detail.data : null;
  const parsedDetail = parseEarthquakes(detailRow ? [detailRow] : []);

  if (parsedDetail[0]) {
    return { ...parsedDetail[0], id: decoded };
  }

  const latest = await getEarthquakesData(50, 1);
  const rows: Record<string, unknown>[] = Array.isArray(latest?.data) ? latest.data : [];
  const parsed = parseEarthquakes(rows).find((earthquake) => earthquake.id === decoded);
  return parsed ?? null;
}

export async function loadRecentEarthquakes(limit = 25): Promise<EarthquakeProps[]> {
  const response = await getEarthquakesData(limit, 1);
  const rows: Record<string, unknown>[] = Array.isArray(response?.data) ? response.data : [];
  return parseEarthquakes(rows);
}
