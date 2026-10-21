'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MagnitudeIndicator } from '@/components/ui';
import { EarthquakeProps } from './model';

export const columns: ColumnDef<EarthquakeProps>[] = [
  {
    accessorKey: 'magnitude',
    header: 'Magnitud',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 md:justify-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground md:sr-only">
          Magnitud
        </span>
        <MagnitudeIndicator magnitude={row.getValue('magnitude')} className="md:mx-auto" />
      </div>
    ),
  },

  {
    accessorKey: 'details',
    header: 'Epicentro',
    cell: ({ row }) => <span className="block text-left">{row.getValue('details')}</span>,
  },

  {
    id: 'occurredAt',
    header: 'Fecha y hora',
    cell: ({ row }) => {
      const dateTimeLabel = `${row.original.date}, ${row.original.time}`;
      return <span className="font-medium text-foreground">{dateTimeLabel}</span>;
    },
  },
];
