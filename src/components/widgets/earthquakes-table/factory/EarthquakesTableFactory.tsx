'use client';

import { useEarthquakesData } from '@/components/providers';
import {
  EarthquakesTable,
  PaginatedEarthquakesTable,
  columns,
  EarthquakeProps,
} from '@/components/widgets';
import { EarthquakesTableFactoryProps } from './model';

export function EarthquakesTableFactory(props: EarthquakesTableFactoryProps) {
  const { type, earthquakes } = props;
  const { setSelected } = useEarthquakesData();

  const handleRowClick = (row: EarthquakeProps) => {
    setSelected(row);
  };

  switch (type) {
    case 'default':
      return <EarthquakesTable columns={columns} data={earthquakes} onRowClick={handleRowClick} />;

    case 'paginated':
      return <PaginatedEarthquakesTable />;

    default:
      break;
  }
}
