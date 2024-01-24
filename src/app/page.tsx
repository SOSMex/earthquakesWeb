import { columns } from '@/components/widgets/earthquakes-table/columns';
import { EarthquakesTable } from '@/components/widgets/earthquakes-table/EarthquakesTable';
import {
  EarthquakesMapSection,
  HomeHeroSection,
  RitcherScaleSection,
  SeeMoreSection,
} from '@/components/sections';
import { getEarthquakesData, parseEarthquakes } from '@/services';
import { DownloadSection } from '@/components/sections/DownloadSection/DownloadSection';
import { EarthquakesDataProvider } from '@/components/providers';

export default async function HomePage() {
  const response = await getEarthquakesData();
  const eartquakes = parseEarthquakes(response?.data);

  return (
    <>
      <HomeHeroSection />
      <EarthquakesDataProvider earthquakes={eartquakes}>
        <EarthquakesMapSection />
        <RitcherScaleSection />
        <EarthquakesTable columns={columns} data={eartquakes} />
      </EarthquakesDataProvider>
      <SeeMoreSection
        title="¿Quieres enterarte de más sismos?"
        button={{
          label: 'Listado de sismos',
          href: '/earthquakes',
        }}
      />
      <DownloadSection />
    </>
  );
}
