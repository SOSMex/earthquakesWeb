import {
  columns } from '@/components/sections/EarthquakesTableSection/Columns';
import { DataTable } from '@/components/sections/EarthquakesTableSection/DataTable';
import {
  EarthquakesMapSection, HomeHeroSection,
  RitcherScaleSection,
  SeeMoreSection,
} from '@/components/sections';
import { baseUrl } from '@/config';

async function getEarthquakesData() {
  try {
    const response = await fetch(
      `${baseUrl}/api/earthquakes/latest?key=${process.env.SELF_SECRET}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
}

export default async function HomePage() {
  const earthquakes = await getEarthquakesData();

  const data = [
    {
      intensidad: 5.5,
      localidad: 'Chiapas',
      estado: 'pending',
      fecha: '11/02/2025',
      hora: '10:50',
    },
    {
      intensidad: 2.3,
      localidad: 'Acapulco',
      estado: 'pending',
      fecha: '12/02/2025',
      hora: '10:50',
    },
  ];

  return (
    <>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <DataTable columns={columns} data={data} />
      <RitcherScaleSection />
      <SeeMoreSection />
      {JSON.stringify(earthquakes)}
    </>
  );
}
