'use client';

import Link from 'next/link';
import { cn } from '@/utils';
import { SeeMoreButtonProps } from './model';

export function SeeMoreButton(props: SeeMoreButtonProps) {
  const { href, label, target, className } = props;
  return (
    <Link
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={cn(
        'mx-auto flex w-fit justify-center whitespace-nowrap rounded-3xl bg-brand px-4 py-2 font-medium text-background hover:bg-brand/80 hover:duration-200',
        className,
      )}
    >
      {label}
    </Link>
  );
}
