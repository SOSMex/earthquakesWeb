'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { EarthquakesTable, EarthquakeProps, columns } from '@/components/widgets';
import { getEarthquakesData, parseEarthquakes } from '@/services';
import { Button } from '@/components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEarthquakesData } from '@/components/providers';

const PAGE_SIZE = 25;

export function PaginatedEarthquakesTable() {
  const { earthquakes, setEarthquakes, setSelected } = useEarthquakesData();
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ['earthquakes-data', page],
    queryFn: () => getEarthquakesData(PAGE_SIZE, page),
    placeholderData: keepPreviousData,
  });

  const maxPage = data?.pagination.total ?? 0;

  const handlePrevious = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleRowClick = (row: EarthquakeProps) => {
    setSelected(row);
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      setEarthquakes(parseEarthquakes(data?.data) ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <EarthquakesTable
        columns={columns}
        data={earthquakes}
        onRowClick={(row) => handleRowClick(row)}
      />
      <section className="mx-auto mt-12 flex w-full max-w-7xl items-center justify-center gap-2 pb-12">
        <Button variant="ghost" onClick={handlePrevious} disabled={page === 1}>
          <ChevronLeft size={24} />
        </Button>

        <p className="font-semibold">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <span>{page}</span> - <span> {maxPage} </span> resultados
        </p>
        <Button variant="ghost" onClick={handleNext} disabled={page === maxPage}>
          <ChevronRight size={24} />
        </Button>
      </section>
    </>
  );
}
