import {
  HomeHeroSection,
  EarthquakesMapSection,
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

async function HomePage() {
  const earthquakes = await getEarthquakesData();

  return (
    <>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <RitcherScaleSection />
      <SeeMoreSection />
      {JSON.stringify(earthquakes)}
    </>
  );
}

export default HomePage;
