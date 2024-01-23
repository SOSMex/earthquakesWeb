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
    accessorKey: 'details',
    header: 'Epicentro',
    cell: ({ row }) => row.getValue('details'),
  },

  {
    accessorKey: 'date',
    header: 'Fecha y hora',
    cell: ({ row }) => row.getValue('date'), // aquí aplicas la función de formato
  },
];
