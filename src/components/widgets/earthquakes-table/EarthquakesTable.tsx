'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SsnSource } from '@/components/widgets/ssn-source/SsnSource';
import { cn } from '@/utils';

const LEFT_ALIGNED_COLUMNS = new Set(['details', 'occurredAt']);

function columnAlignClass(columnId: string, header = false): string {
  if (LEFT_ALIGNED_COLUMNS.has(columnId)) return 'text-left';
  return header ? 'text-center' : 'md:text-center';
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  updatedAt?: string;
  showSource?: boolean;
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (row: TData) => void;
}

export function EarthquakesTable<TData, TValue>({
  columns,
  data,
  updatedAt,
  showSource = true,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: TData) => {
    if (onRowClick) onRowClick(row);
  };

  return (
    <section className="container mx-auto overflow-x-auto">
      <Table className="mx-auto w-full max-w-7xl caption-top">
        {showSource && (
          <caption className="mb-3 px-4 text-left text-sm font-normal">
            <SsnSource updatedAt={updatedAt} />
          </caption>
        )}
        {/* Ocultar TableHeader en resoluciones menores a lg */}
        <TableHeader className="hidden md:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    'whitespace-nowrap text-primary lg:whitespace-normal',
                    columnAlignClass(header.column.id, true),
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border border-primary"
                key={row.id}
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'block md:table-cell md:border md:border-primary',
                      columnAlignClass(cell.column.id),
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
