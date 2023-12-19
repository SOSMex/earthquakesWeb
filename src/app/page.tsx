import { HomeHeroSection, EarthquakesMapSection } from '@/components/sections';
import RitcherCards from '@/components/sections/Cards/RitcherCard';

function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <RitcherCards />
    </>
  );
}

export default HomePage;
