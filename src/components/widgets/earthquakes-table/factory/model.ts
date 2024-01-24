import { EarthquakeProps } from '@/components/widgets';

export interface EarthquakesTableFactoryProps {
  type: 'default' | 'paginated';
  earthquakes: EarthquakeProps[];
}
