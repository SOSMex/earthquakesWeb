'use client';

import { EarthquakesDataProvider } from '@/components/providers';
import { EarthquakesMapSection, HomeHeroSection, RitcherScaleSection } from '@/components/sections';
import { PaginatedEarthquakesTable } from '@/components/widgets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function EarthquakesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeHeroSection />
      <EarthquakesDataProvider>
        <EarthquakesMapSection />
        <RitcherScaleSection />
        <PaginatedEarthquakesTable />
      </EarthquakesDataProvider>
    </QueryClientProvider>
  );
}
