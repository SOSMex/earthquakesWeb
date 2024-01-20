import { columns } from '@/components/widgets/earthquakes-table/columns';
import { DataTable } from '@/components/widgets/earthquakes-table/EarthquakesTable';
import { EarthquakesMapSection, HomeHeroSection, RitcherScaleSection } from '@/components/sections';
import { getEarthquakesData, parseEarthquakes } from '@/services';

export default async function EarthquakesPage() {
  const response = await getEarthquakesData();
  const eartquakes = parseEarthquakes(response?.data);

  return (
    <>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <RitcherScaleSection />
      <DataTable columns={columns} data={eartquakes} isControlled />
    </>
  );
}
