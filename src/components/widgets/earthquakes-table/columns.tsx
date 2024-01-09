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
    header: 'Fecha y hora',
    cell: ({ row }) => {
      const dateTimeLabel = `${row.original.date}, ${row.original.time}`;
      return <span className="text-muted-foreground/60">{dateTimeLabel}</span>;
    },
  },
];
