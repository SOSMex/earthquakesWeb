import { EarthquakesDataProvider } from '@/components/providers';
import { EarthquakesMapSection, RitcherScaleSection } from '@/components/sections';
import { EarthquakeProps, EarthquakesTableFactory } from '@/components/widgets';
import { latestIsoTimestamp, SsnSource } from '@/components/widgets/ssn-source/SsnSource';
import type { ReportLocation } from '@/services';
import { EarthquakeCardList } from './EarthquakeCardList';

export function EarthquakesSection({
  paginated = false,
  earthquakes,
  mapTitle,
  perceptionLocations,
  hideTable = false,
  showSource = true,
}: {
  paginated?: boolean;
  earthquakes: EarthquakeProps[];
  mapTitle?: string;
  perceptionLocations?: ReportLocation[];
  hideTable?: boolean;
  showSource?: boolean;
}) {
  const updatedAt = latestIsoTimestamp(earthquakes.map((earthquake) => earthquake.isoDate));

  return (
    <EarthquakesDataProvider earthquakes={earthquakes}>
      <EarthquakesMapSection title={mapTitle} perceptionLocations={perceptionLocations} />
      <RitcherScaleSection />

      {!hideTable && (
        <>
          {!paginated && (
            <div className="md:hidden">
              {showSource && (
                <SsnSource updatedAt={updatedAt} className="px-4 pt-2 text-center" />
              )}
              <EarthquakeCardList earthquakes={earthquakes} />
            </div>
          )}

          <div className={paginated ? '' : 'hidden md:block'}>
            <EarthquakesTableFactory
              type={paginated ? 'paginated' : 'default'}
              earthquakes={earthquakes}
              updatedAt={updatedAt}
              showSource={showSource}
            />
          </div>
        </>
      )}
    </EarthquakesDataProvider>
  );
}
