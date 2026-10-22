import { EarthquakeProps } from '@/components/widgets';
import {
  formatDateInMexicoCity,
  formatTimeInMexicoCity,
} from '@/utils/dateTime.utility';

const ID_KEYS = ['token', 'id', 'earthquakeToken', 'sismoId', 'guid', 'Id', 'Token'];

function readText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
}

export function earthquakePublicId(earthquake: Record<string, unknown>): string {
  const explicit = ID_KEYS
    .map((key) => readText(earthquake[key]))
    .find((value) => value.length > 0);

  const source = explicit || [
    readText(earthquake.fecha),
    readText(earthquake.magnitud),
    readText(earthquake.laltitud),
    readText(earthquake.longitud),
  ].filter(Boolean).join('-');

  const safe = source.replace(/[^a-zA-Z0-9._~-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return safe.slice(0, 120) || 'sismo';
}

function readDepth(earthquake: Record<string, unknown>): string | undefined {
  const depth = readText(earthquake.profundidad ?? earthquake.depth ?? earthquake.prof);
  return depth || undefined;
}

function parseEarthquake(earthquake: Record<string, unknown> | null): EarthquakeProps | null {
  if (!earthquake || typeof earthquake !== 'object') return null;

  const earthquakeDateTime = readText(earthquake.fecha);
  const when = new Date(earthquakeDateTime);
  if (!earthquakeDateTime || Number.isNaN(when.getTime())) return null;

  const lat = parseFloat(readText(earthquake.laltitud));
  const lng = parseFloat(readText(earthquake.longitud));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const earthquakeDate = formatDateInMexicoCity(when, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const location = readText(earthquake.detalles);
  const locationArray = location.split('de')[1]?.split(',');
  const locationTown = locationArray?.length > 0 ? locationArray[0] : '';
  const locationState = locationArray?.length > 0 ? locationArray[1] : '';
  const magnitude = Number(earthquake.magnitud);

  return {
    id: earthquakePublicId(earthquake),
    magnitude: Number.isFinite(magnitude) ? magnitude : 0,
    town: locationTown,
    state: locationState,
    lat,
    lng,
    depth: readDepth(earthquake),
    date: earthquakeDate,
    time: formatTimeInMexicoCity(when),
    details: location,
    isoDate: when.toISOString(),
  };
}

export function parseEarthquakes(earthquakes: Record<string, unknown>[]) {
  if (!Array.isArray(earthquakes)) return [];

  return earthquakes
    .map((earthquake) => parseEarthquake(earthquake))
    .filter((parsedEarthquake): parsedEarthquake is EarthquakeProps => (
      Boolean(parsedEarthquake?.lat && parsedEarthquake?.lng)
    ));
}
