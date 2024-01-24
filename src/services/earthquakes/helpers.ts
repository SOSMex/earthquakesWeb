import { EarthquakeProps } from '@/components/widgets';

function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

// Parsers
function parseEarthquake(earthquake: Record<string, unknown>): EarthquakeProps {
  const earthquakeDateTime = new Date(earthquake?.fecha as string);
  const earthquakeDate = earthquakeDateTime.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const location = earthquake?.detalles as string;
  const locationArray = location.split('de')[1].split(',');
  const locationTown = locationArray[0];
  const locationState = locationArray[1];

  return {
    magnitude: earthquake?.magnitud as number,
    town: locationTown,
    state: locationState,
    lat: parseFloat(earthquake?.laltitud as string),
    lng: parseFloat(earthquake?.longitud as string),
    date: earthquakeDate,
    time: formatAMPM(earthquakeDateTime),
    details: earthquake?.detalles as string,
  };
}

export function parseEarthquakes(earthquakes: Record<string, unknown>[]) {
  if (!earthquakes) return [];

  return earthquakes.map((earthquake) => parseEarthquake(earthquake));
}
