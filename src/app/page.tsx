import { HomeHeroSection, EarthquakesMapSection, RitcherScaleSection } from '@/components/sections';
import { SeeMoreSection } from '@/components/sections/SeeMoreSection/SeeMoreSection';

function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <RitcherScaleSection />
      <SeeMoreSection />
    </>
  );
}

export default HomePage;
