'use client';

import Link from 'next/link';

export function SeeMoreButton() {
  return (
    <div className="flex justify-center">
      <Link
        href="/earthquakes"
        rel="noopener noreferrer"
        className="whitespace-nowrap rounded-3xl bg-brand px-4 py-2 font-medium text-background hover:bg-brand/80 hover:duration-200 "
      >
        Listado de sismos
      </Link>
    </div>
  );
}
