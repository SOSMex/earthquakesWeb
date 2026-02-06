import { EarthquakesDataProvider } from '@/components/providers';
import { EarthquakesMapSection, RitcherScaleSection } from '@/components/sections';
import { EarthquakeProps, EarthquakesTableFactory } from '@/components/widgets';
import { EarthquakeCardList } from './EarthquakeCardList';

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

      {!paginated && (
        <div className="md:hidden">
          <EarthquakeCardList earthquakes={earthquakes} />
        </div>
      )}

      <div className={paginated ? '' : 'hidden md:block'}>
        <EarthquakesTableFactory
          type={paginated ? 'paginated' : 'default'}
          earthquakes={earthquakes}
        />
      </div>
    </EarthquakesDataProvider>
  );
}
