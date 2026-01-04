import {
  HomeHeroSection,
  EarthquakesSection,
  SeeMoreSection,
  DownloadSection,
} from '@/components/sections';
import { getEarthquakeDetail, parseEarthquakes } from '@/services';

export default async function EarthquakeDetailPage({ params: { id } }: { params: { id: string } }) {
  const response = await getEarthquakeDetail(id);
  const detail = parseEarthquakes([response?.data]);

  return (
    <main>
      <HomeHeroSection />
      <EarthquakesSection earthquakes={detail} />
      <SeeMoreSection
        title="¿Quieres enterarte de más sismos?"
        button={{
          label: 'Listado de sismos',
          href: '/earthquakes',
        }}
      />
      <DownloadSection />
    </main>
  );
}
