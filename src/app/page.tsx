import { HomeHeroSection, EarthquakesMapSection, RitcherScaleSection } from '@/components/sections';

async function HomePage() {
  const response = await fetch(`${process.env.API_URL}/api/earthquakes/latest`);
  const earthquakes = await response.json();

  return (
    <>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <RitcherScaleSection />
      {JSON.stringify(earthquakes)}
    </>
  );
}

export default HomePage;
