'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IntensityIndicator } from '@/components/sections/IntesityIndicator/IntensityIndicator';

export type EarthquakeColumns = {
  intensidad: number;
  localidad: string;
  estado: String;
  fecha: string;
  hora: string;
};

export const columns: ColumnDef<EarthquakeColumns>[] = [
  {
    accessorKey: 'intensidad',
    header: 'Intensidad',
    cell: ({ row }) => <IntensityIndicator intensity={row.intensidad} />,
    // cell: ({ row }) => {
    // return <>{JSON.stringify(row)}</>;
    // },
  },
  {
    accessorKey: 'localidad',
    header: 'Localidad',
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
  },
  {
    accessorKey: 'hora',
    header: 'Hora',
  },
];
