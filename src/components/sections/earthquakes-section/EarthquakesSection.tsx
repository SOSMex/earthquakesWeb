import { EarthquakesDataProvider } from '@/components/providers';
import { EarthquakesMapSection, RitcherScaleSection } from '@/components/sections';
import { EarthquakeProps, EarthquakesTableFactory } from '@/components/widgets';
import type { ReportLocation } from '@/services';
import { EarthquakeCardList } from './EarthquakeCardList';

export function EarthquakesSection({
  paginated = false,
  earthquakes,
  mapTitle,
  perceptionLocations,
  hideTable = false,
}: {
  paginated?: boolean;
  earthquakes: EarthquakeProps[];
  mapTitle?: string;
  perceptionLocations?: ReportLocation[];
  hideTable?: boolean;
}) {
  return (
    <EarthquakesDataProvider earthquakes={earthquakes}>
      <EarthquakesMapSection title={mapTitle} perceptionLocations={perceptionLocations} />
      <RitcherScaleSection />

      {!hideTable && (
        <>
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
        </>
      )}
    </EarthquakesDataProvider>
  );
}
