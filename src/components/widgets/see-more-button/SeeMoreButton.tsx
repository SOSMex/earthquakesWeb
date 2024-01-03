'use client';

import Link from 'next/link';

export function SeeMoreButton() {
  return (
    <Link
      href="/earthquakes"
      rel="noopener noreferrer"
      className="mx-auto flex w-fit justify-center whitespace-nowrap rounded-3xl bg-brand px-4 py-2 font-medium text-background hover:bg-brand/80 hover:duration-200"
    >
      Listado de sismos
    </Link>
  );
}
