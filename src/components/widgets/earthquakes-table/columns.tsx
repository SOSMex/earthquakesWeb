'use client';

import Link from 'next/link';
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
    cell: ({ row }) => (
      <Link
        href={`/sismos/${row.original.id}`}
        className="block text-left underline-offset-2 hover:underline"
        onClick={(event) => event.stopPropagation()}
      >
        {row.getValue('details') as string}
      </Link>
    ),
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
