'use client';

import Link from 'next/link';
import { MagnitudeIndicator } from '@/components/ui';
import { EarthquakeProps } from '@/components/widgets';
import { cn } from '@/utils';

interface EarthquakeCardProps {
  earthquake: EarthquakeProps;
  isSelected: boolean;
  onSelect: () => void;
}

export function EarthquakeCard({ earthquake, isSelected, onSelect }: EarthquakeCardProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left',
        isSelected ? 'border-primary' : 'border-border',
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Ver en el mapa el sismo de magnitud ${earthquake.magnitude.toFixed(1)}`}
        className="shrink-0"
      >
        <MagnitudeIndicator magnitude={earthquake.magnitude} />
      </button>

      <div className="min-w-0 flex-1">
        <Link
          href={`/sismos/${earthquake.id}`}
          className="block truncate text-sm font-medium text-card-foreground underline-offset-2 hover:underline"
        >
          {earthquake.details}
        </Link>
        <p className="text-xs text-foreground/80">
          {`${earthquake.date}, ${earthquake.time}`}
        </p>
      </div>
    </div>
  );
}
