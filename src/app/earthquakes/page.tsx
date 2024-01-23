'use client';

import { EarthquakesMapSection, HomeHeroSection, RitcherScaleSection } from '@/components/sections';
import { PaginatedEarthquakesTable } from '@/components/widgets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function EarthquakesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeHeroSection />
      <EarthquakesMapSection />
      <RitcherScaleSection />
      <PaginatedEarthquakesTable />
    </QueryClientProvider>
  );
}
