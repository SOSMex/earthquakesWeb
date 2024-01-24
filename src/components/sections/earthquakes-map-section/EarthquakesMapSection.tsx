'use client';

import { EarthquakesMap } from '@/features';
import { useEarthquakesData } from '@/components/providers';

export function EarthquakesMapSection() {
  const { earthquakes } = useEarthquakesData();

  return (
    <section className="container mx-auto my-8 mt-8 text-center text-5xl font-semibold ">
      <hr className="mx-auto h-px max-w-7xl border-foreground" />
      <h2 className="my-8 mb-8">Últimos sismos</h2>
      <EarthquakesMap earthquakes={earthquakes} />
    </section>
  );
}
