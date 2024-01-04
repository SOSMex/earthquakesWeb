import { BASE_URL } from '@/config';
import { EarthquakeProps } from '@/components/widgets';

export async function getEarthquakesData() {
  try {
    const response = await fetch(
      `${BASE_URL}/api/earthquakes/latest?key=${process.env.SELF_SECRET}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
}

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
  const earthquakeDate = earthquakeDateTime.toLocaleDateString('es-MX');
  const location = earthquake?.detalles as string;
  const locationArray = location.split('de')[1].split(',');
  const locationTown = locationArray[0];
  const locationState = locationArray[1];

  return {
    magnitude: earthquake?.magnitud as number,
    town: locationTown,
    state: locationState,
    lat: earthquake?.laltitud as number,
    lng: earthquake?.longitud as number,
    date: earthquakeDate,
    time: formatAMPM(earthquakeDateTime),
  };
}

export function parseEarthquakes(earthquakes: Record<string, unknown>[]) {
  return earthquakes.map((earthquake) => parseEarthquake(earthquake));
}
