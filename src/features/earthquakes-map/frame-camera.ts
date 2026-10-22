import { DEFAULT_CENTER } from '@/config';

export const MEXICO_CENTER = { lat: 23.6345, lng: -102.5528 };
export const MOBILE_OVERVIEW_ZOOM = 4.5;
export const DESKTOP_OVERVIEW_ZOOM = 4.7;
export const MAP_MAX_ZOOM = 7;
export const BOUNDS_PADDING = 48;

export type LatLng = { lat: number; lng: number };

export type LatLngBoundsLiteral = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export type CameraFrame =
  | { kind: 'center'; center: LatLng; zoom: number }
  | { kind: 'bounds'; bounds: LatLngBoundsLiteral; maxZoom: number; padding: number };

function finitePoints(points: LatLng[]): LatLng[] {
  return points.filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
}

function boundsOf(points: LatLng[]): LatLngBoundsLiteral {
  return points.reduce<LatLngBoundsLiteral>((bounds, point) => ({
    north: Math.max(bounds.north, point.lat),
    south: Math.min(bounds.south, point.lat),
    east: Math.max(bounds.east, point.lng),
    west: Math.min(bounds.west, point.lng),
  }), {
    north: -90,
    south: 90,
    east: -180,
    west: 180,
  });
}

export function frameEarthquakeCamera({
  points,
  mobile,
  selected,
}: {
  points: LatLng[];
  mobile: boolean;
  selected?: LatLng | null;
}): CameraFrame {
  if (selected && Number.isFinite(selected.lat) && Number.isFinite(selected.lng)) {
    return {
      kind: 'center',
      center: { lat: selected.lat, lng: selected.lng },
      zoom: MAP_MAX_ZOOM,
    };
  }

  const finite = finitePoints(points);

  if (mobile && finite.length <= 1) {
    return { kind: 'center', center: MEXICO_CENTER, zoom: MOBILE_OVERVIEW_ZOOM };
  }

  if (finite.length === 0) {
    return { kind: 'center', center: DEFAULT_CENTER, zoom: DESKTOP_OVERVIEW_ZOOM };
  }

  if (finite.length === 1) {
    return {
      kind: 'center',
      center: { lat: finite[0].lat, lng: finite[0].lng },
      zoom: MAP_MAX_ZOOM,
    };
  }

  return {
    kind: 'bounds',
    bounds: boundsOf(finite),
    maxZoom: MAP_MAX_ZOOM,
    padding: BOUNDS_PADDING,
  };
}
