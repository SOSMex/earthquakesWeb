import { EarthquakeProps } from '@/components/widgets';
import { distanceKm } from '@/lib/mexican-cities';

const NEARBY_KM = 400;

function byNewest(left: EarthquakeProps, right: EarthquakeProps): number {
  return (right.isoDate || '').localeCompare(left.isoDate || '');
}

export function pickRecentEarthquakes(
  current: EarthquakeProps,
  pool: EarthquakeProps[],
  count = 6,
): EarthquakeProps[] {
  const others = pool.filter((earthquake) => earthquake.id && earthquake.id !== current.id);
  const newest = [...others].sort(byNewest);
  const hasPoint = Number.isFinite(current.lat) && Number.isFinite(current.lng);
  const nearby = hasPoint
    ? newest
      .filter((earthquake) => Number.isFinite(earthquake.lat) && Number.isFinite(earthquake.lng))
      .map((earthquake) => ({
        earthquake,
        kilometers: distanceKm(current, earthquake),
      }))
      .filter((entry) => entry.kilometers <= NEARBY_KM)
      .sort((left, right) => (
        left.kilometers - right.kilometers || byNewest(left.earthquake, right.earthquake)
      ))
      .map((entry) => entry.earthquake)
    : [];

  const chosen: EarthquakeProps[] = [];
  const seen = new Set<string>();
  const add = (earthquake: EarthquakeProps) => {
    if (chosen.length >= count || seen.has(earthquake.id)) return;
    seen.add(earthquake.id);
    chosen.push(earthquake);
  };

  nearby.slice(0, 3).forEach(add);
  newest.forEach(add);

  return chosen.sort(byNewest);
}
