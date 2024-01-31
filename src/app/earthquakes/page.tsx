import { EarthquakesSection, HomeHeroSection, DownloadSection } from '@/components/sections';
import { QueryClientWrapper } from '@/components/providers';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listado de últimos sismos en México',
};

export default function EarthquakesPage() {
  return (
    <QueryClientWrapper>
      <main>
        <HomeHeroSection />
        <EarthquakesSection paginated earthquakes={[]} />
        <DownloadSection />
      </main>
    </QueryClientWrapper>
  );
}
