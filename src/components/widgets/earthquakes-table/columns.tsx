'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MagnitudeIndicator } from '@/components/ui';
import { EarthquakeProps } from './model';

export const columns: ColumnDef<EarthquakeProps>[] = [
  {
    accessorKey: 'magnitude',
    header: 'Intensidad',
    cell: ({ row }) => (
      <MagnitudeIndicator magnitude={row.getValue('magnitude')} className="md:mx-auto" />
    ),
  },
  {
    accessorKey: 'town',
    header: 'Localidad',
  },
  {
    accessorKey: 'state',
    header: 'Estado',
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
  },
  {
    accessorKey: 'time',
    header: 'Hora',
  },
];
