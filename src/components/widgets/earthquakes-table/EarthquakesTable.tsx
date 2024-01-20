'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isControlled?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isControlled = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const toggleMagnitudeSorting = () => {
    const newSort = magnitudeSort === 'asc' ? 'desc' : 'asc';
    setMagnitudeSort(newSort);
    setSorting([{ id: 'magnitude', desc: newSort === 'desc' }]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      {isControlled ? (
        <section className="flex items-center justify-end space-x-2 py-4">
          <Button
            className="text-backgroun whitespace-nowrap rounded-3xl bg-brand px-4 py-2 font-medium text-white hover:bg-brand-soft hover:duration-200"
            variant="outline"
            size="sm"
            onClick={toggleMagnitudeSorting}
          >
            Ordenar por Intensidad
          </Button>
        </section>
      ) : null}
      <section className="container mx-auto overflow-x-auto">
        <Table className="mx-auto w-full max-w-7xl">
          {/* Ocultar TableHeader en resoluciones menores a lg */}
          <TableHeader className="hidden md:table-header-group">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap text-center text-primary lg:whitespace-normal"
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
                <TableRow className="border border-primary" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="block md:table-cell md:border md:border-primary md:text-center"
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
      {isControlled ? (
        <section className="container mx-auto flex items-center justify-center text-center">
          <Button
            className="mr-3 size-4 bg-transparent font-semibold text-black"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ＜
          </Button>
          <Button
            className="ml-3 size-4 bg-transparent font-semibold text-black"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ＞
          </Button>
        </section>
      ) : null}
    </>
  );
}
