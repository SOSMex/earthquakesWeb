import {
  HomeHeroSection,
  EarthquakesSection,
  SeeMoreSection,
  DownloadSection,
} from '@/components/sections';
import { getEarthquakesData, parseEarthquakes } from '@/services';

export default async function HomePage() {
  const response = await getEarthquakesData();
  const eartquakes = parseEarthquakes(response?.data);

  return (
    <main>
      <HomeHeroSection />
      <EarthquakesSection earthquakes={eartquakes} />
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
