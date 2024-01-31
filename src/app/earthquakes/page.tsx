import { EarthquakesSection, HomeHeroSection } from '@/components/sections';
import { QueryClientWrapper } from '@/components/providers';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listado de sismos',
};

export default function EarthquakesPage() {
  return (
    <QueryClientWrapper>
      <main>
        <HomeHeroSection />
        <EarthquakesSection paginated earthquakes={[]} />
      </main>
    </QueryClientWrapper>
  );
}
