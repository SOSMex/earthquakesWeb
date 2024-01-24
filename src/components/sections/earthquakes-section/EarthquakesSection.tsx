import { EarthquakesDataProvider } from '@/components/providers';
import { EarthquakesMapSection, RitcherScaleSection } from '@/components/sections';
import { EarthquakeProps, EarthquakesTableFactory } from '@/components/widgets';

export function EarthquakesSection({
  paginated = false,
  earthquakes,
}: {
  paginated?: boolean;
  earthquakes: EarthquakeProps[];
}) {
  return (
    <EarthquakesDataProvider earthquakes={earthquakes}>
      <EarthquakesMapSection />
      <RitcherScaleSection />
      <EarthquakesTableFactory
        type={paginated ? 'paginated' : 'default'}
        earthquakes={earthquakes}
      />
    </EarthquakesDataProvider>
  );
}
