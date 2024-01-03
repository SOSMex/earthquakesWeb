import { columns } from '@/components/sections/EarthquakesTableSection/Columns';
import { DataTable } from '@/components/sections/EarthquakesTableSection/DataTable';
import { EarthquakesMapSection, HomeHeroSection } from '@/components/sections';

export default async function HomePage() {
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
    </>
  );
}
