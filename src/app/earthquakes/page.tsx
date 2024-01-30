'use client';

import { EarthquakesSection, HomeHeroSection, DownloadSection } from '@/components/sections';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
