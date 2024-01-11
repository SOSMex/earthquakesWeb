import { columns } from '@/components/widgets/earthquakes-table/columns';
import { DataTable } from '@/components/widgets/earthquakes-table/EarthquakesTable';
import {
  EarthquakesMapSection,
  HomeHeroSection,
  RitcherScaleSection,
  SeeMoreSection,
} from '@/components/sections';
import { getEarthquakesData, parseEarthquakes } from '@/services';
import { DownloadSection } from '@/components/sections/DownloadSection/DownloadSection';

export default async function HomePage() {
  const response = await getEarthquakesData();
  const eartquakes = parseEarthquakes(response?.data);

  return (
    <>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <RitcherScaleSection />
      <DataTable columns={columns} data={eartquakes} />
      <SeeMoreSection />
      <DownloadSection />
    </>
  );
}
