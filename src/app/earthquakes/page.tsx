'use client';

import { EarthquakesSection, HomeHeroSection } from '@/components/sections';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function EarthquakesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <HomeHeroSection />
        <EarthquakesSection paginated earthquakes={[]} />
      </main>
    </QueryClientProvider>
  );
}
