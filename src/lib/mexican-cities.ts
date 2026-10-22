/**
 * City-center coordinates used only to compute distance and bearing.
 * They are not Servicio Sismológico Nacional measurements.
 */
export interface MexicanCity {
  name: string;
  lat: number;
  lng: number;
}

export const MEXICAN_CITIES: MexicanCity[] = [
  { name: 'Acapulco', lat: 16.8531, lng: -99.8237 },
  { name: 'Aguascalientes', lat: 21.8818, lng: -102.2916 },
  { name: 'Cabo San Lucas', lat: 22.8905, lng: -109.9167 },
  { name: 'Campeche', lat: 19.8301, lng: -90.5349 },
  { name: 'Cancún', lat: 21.1619, lng: -86.8515 },
  { name: 'Chetumal', lat: 18.5036, lng: -88.3056 },
  { name: 'Chihuahua', lat: 28.6353, lng: -106.0889 },
  { name: 'Chilpancingo', lat: 17.5515, lng: -99.5005 },
  { name: 'Ciudad de México', lat: 19.4326, lng: -99.1332 },
  { name: 'Ciudad Juárez', lat: 31.6904, lng: -106.4245 },
  { name: 'Coatzacoalcos', lat: 18.1492, lng: -94.4419 },
  { name: 'Colima', lat: 19.2433, lng: -103.7247 },
  { name: 'Córdoba', lat: 18.8942, lng: -96.9348 },
  { name: 'Cuernavaca', lat: 18.9242, lng: -99.2216 },
  { name: 'Culiacán', lat: 24.8091, lng: -107.394 },
  { name: 'Durango', lat: 24.0277, lng: -104.6532 },
  { name: 'Ensenada', lat: 31.8667, lng: -116.5964 },
  { name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
  { name: 'Hermosillo', lat: 29.0729, lng: -110.9559 },
  { name: 'La Paz', lat: 24.1426, lng: -110.3128 },
  { name: 'León', lat: 21.122, lng: -101.6827 },
  { name: 'Manzanillo', lat: 19.0522, lng: -104.3158 },
  { name: 'Matamoros', lat: 25.869, lng: -97.5027 },
  { name: 'Mazatlán', lat: 23.2494, lng: -106.4111 },
  { name: 'Mérida', lat: 20.9674, lng: -89.5926 },
  { name: 'Mexicali', lat: 32.6245, lng: -115.4523 },
  { name: 'Monterrey', lat: 25.6866, lng: -100.3161 },
  { name: 'Morelia', lat: 19.7008, lng: -101.1844 },
  { name: 'Nuevo Laredo', lat: 27.4763, lng: -99.5164 },
  { name: 'Oaxaca', lat: 17.0732, lng: -96.7266 },
  { name: 'Pachuca', lat: 20.1011, lng: -98.7591 },
  { name: 'Playa del Carmen', lat: 20.6296, lng: -87.0739 },
  { name: 'Puebla', lat: 19.0414, lng: -98.2063 },
  { name: 'Puerto Vallarta', lat: 20.6534, lng: -105.2253 },
  { name: 'Querétaro', lat: 20.5888, lng: -100.3899 },
  { name: 'Reynosa', lat: 26.0922, lng: -98.2778 },
  { name: 'Saltillo', lat: 25.4232, lng: -101.0053 },
  { name: 'San Luis Potosí', lat: 22.1565, lng: -100.9855 },
  { name: 'Tampico', lat: 22.2331, lng: -97.8611 },
  { name: 'Tapachula', lat: 14.9056, lng: -92.2618 },
  { name: 'Tepic', lat: 21.5039, lng: -104.8946 },
  { name: 'Tijuana', lat: 32.5149, lng: -117.0382 },
  { name: 'Toluca', lat: 19.2925, lng: -99.6569 },
  { name: 'Torreón', lat: 25.5428, lng: -103.4068 },
  { name: 'Tuxtla Gutiérrez', lat: 16.7516, lng: -93.1029 },
  { name: 'Veracruz', lat: 19.1738, lng: -96.1342 },
  { name: 'Villahermosa', lat: 17.9895, lng: -92.9475 },
  { name: 'Xalapa', lat: 19.5438, lng: -96.9102 },
  { name: 'Zacatecas', lat: 22.7709, lng: -102.5832 },
  { name: 'Zihuatanejo', lat: 17.6434, lng: -101.552 },
];

export interface NearestCity {
  name: string;
  distanceKm: number;
  direction: string;
}

const DIRECTION_LABELS = [
  'norte',
  'noreste',
  'este',
  'sureste',
  'sur',
  'suroeste',
  'oeste',
  'noroeste',
] as const;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function distanceKm(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): number {
  const earthRadiusKm = 6371;
  const latDelta = toRadians(to.lat - from.lat);
  const lngDelta = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);
  const haversine = Math.sin(latDelta / 2) ** 2
    + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.min(1, Math.sqrt(haversine)));
}

function directionFrom(
  origin: { lat: number; lng: number },
  target: { lat: number; lng: number },
): string {
  const lat1 = toRadians(origin.lat);
  const lat2 = toRadians(target.lat);
  const lngDelta = toRadians(target.lng - origin.lng);
  const y = Math.sin(lngDelta) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2)
    - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lngDelta);
  const degrees = (Math.atan2(y, x) * 180) / Math.PI;
  const normalized = (degrees + 360) % 360;
  const index = Math.round(normalized / 45) % 8;

  return DIRECTION_LABELS[index];
}

export function formatDistanceKm(distanceKmValue: number): string {
  if (!Number.isFinite(distanceKmValue)) return '';
  if (distanceKmValue < 1) return 'menos de 1 km';
  return `${Math.round(distanceKmValue)} km`;
}

export function nearestMexicanCities(
  point: { lat: number; lng: number },
  limit = 3,
): NearestCity[] {
  if (!Number.isFinite(point.lat) || !Number.isFinite(point.lng)) return [];

  return MEXICAN_CITIES
    .map((city) => {
      const kilometers = distanceKm(city, point);
      return {
        name: city.name,
        distanceKm: kilometers,
        direction: directionFrom(city, point),
      };
    })
    .sort((left, right) => left.distanceKm - right.distanceKm)
    .slice(0, limit);
}
