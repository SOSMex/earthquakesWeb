import { EarthquakeProps } from '@/components/widgets';
import {
  formatDateInMexicoCity,
  formatTimeInMexicoCity,
} from '@/utils/dateTime.utility';

// Parsers
function parseEarthquake(earthquake: Record<string, unknown>): EarthquakeProps {
  const earthquakeDateTime = earthquake?.fecha as string;
  const earthquakeDate = formatDateInMexicoCity(earthquakeDateTime, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const location = earthquake?.detalles as string;
  const locationArray = location?.split('de')[1]?.split(',');
  const locationTown = locationArray?.length > 0 ? locationArray[0] : '';
  const locationState = locationArray?.length > 0 ? locationArray[1] : '';

  return {
    magnitude: earthquake?.magnitud as number,
    town: locationTown,
    state: locationState,
    lat: parseFloat(earthquake?.laltitud as string),
    lng: parseFloat(earthquake?.longitud as string),
    date: earthquakeDate,
    time: formatTimeInMexicoCity(earthquakeDateTime),
    details: earthquake?.detalles as string,
    isoDate: new Date(earthquakeDateTime).toISOString(),
  };
}

export function parseEarthquakes(earthquakes: Record<string, unknown>[]) {
  if (!earthquakes) return [];

  return earthquakes
    .map((earthquake) => parseEarthquake(earthquake))
    .filter((parsedEarthquake) => parsedEarthquake.lat && parsedEarthquake.lng);
}
