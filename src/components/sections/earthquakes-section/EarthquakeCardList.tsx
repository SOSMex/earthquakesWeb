'use client';

import { useEarthquakesData } from '@/components/providers';
import { EarthquakeProps } from '@/components/widgets';
import { EarthquakeCard } from '@/components/widgets/earthquake-card/EarthquakeCard';

export function EarthquakeCardList({ earthquakes }: { earthquakes: EarthquakeProps[] }) {
  const { selected, setSelected } = useEarthquakesData();

  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      {earthquakes.map((eq) => (
        <EarthquakeCard
          key={`${eq.magnitude}-${eq.lat}-${eq.lng}-${eq.date}-${eq.time}`}
          earthquake={eq}
          isSelected={selected === eq}
          onSelect={() => setSelected(eq)}
        />
      ))}
    </div>
  );
}
