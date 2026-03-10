import { EarthquakeProps } from '@/components/widgets';
import type { ReportLocation } from '@/services';

export interface EarthquakesMapProps {
  earthquakes: EarthquakeProps[];
  perceptionLocations?: ReportLocation[];
}
