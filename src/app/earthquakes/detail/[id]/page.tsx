import {
  HomeHeroSection,
  EarthquakesSection,
  SeeMoreSection,
  DownloadSection,
} from '@/components/sections';
// import { getEarthquakesData, parseEarthquakes } from '@/services';

export default async function EarthquakeDetailPage() {
  // const response = await getEarthquakesData();
  // const eartquakes = parseEarthquakes(response?.data);

  return (
    <main>
      <HomeHeroSection />
      <EarthquakesSection
        earthquakes={[
          {
            magnitude: 3.8,
            town: '  SAN MARCOS',
            state: ' GRO ',
            lat: 16.06,
            lng: -99.12,
            date: '19 de febrero de 2024',
            time: '11:46 am',
            details: '3.8, 86 km al SURESTE de  SAN MARCOS, GRO ',
          },
        ]}
      />
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
