'use client';

import { EarthquakesMap } from '@/features';
import { useEarthquakesData } from '@/components/providers';
import type { ReportLocation } from '@/services';

interface EarthquakesMapSectionProps {
  title?: string;
  perceptionLocations?: ReportLocation[];
}

export function EarthquakesMapSection({ title = 'Últimos sismos', perceptionLocations }: EarthquakesMapSectionProps) {
  const { earthquakes } = useEarthquakesData();

  return (
    <section className="mx-auto mt-4 text-center font-semibold md:container md:my-8 md:mt-8 md:text-5xl">
      <hr className="mx-auto hidden h-px max-w-7xl border-foreground md:block" />
      <h2 className="my-4 text-xl md:my-8 md:mb-8 md:text-5xl">{title}</h2>
      <EarthquakesMap earthquakes={earthquakes} perceptionLocations={perceptionLocations} />
    </section>
  );
}
