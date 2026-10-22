'use client';

import Link from 'next/link';
import { MagnitudeIndicator } from '@/components/ui';
import { EarthquakeProps } from '@/components/widgets';
import { cn } from '@/utils';

interface EarthquakeCardProps {
  earthquake: EarthquakeProps;
  isSelected?: boolean;
  onSelect?: () => void;
  linked?: boolean;
}

export function EarthquakeCard({
  earthquake,
  isSelected = false,
  onSelect,
  linked = false,
}: EarthquakeCardProps) {
  const placeAndTime = (
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground">Magnitud</p>
      {linked ? (
        <p className="truncate text-sm font-medium text-card-foreground">
          {earthquake.details}
        </p>
      ) : (
        <Link
          href={`/sismos/${earthquake.id}`}
          className="block truncate text-sm font-medium text-card-foreground underline-offset-2 hover:underline"
        >
          {earthquake.details}
        </Link>
      )}
      <p className="text-xs text-foreground/80">
        {`${earthquake.date}, ${earthquake.time}`}
      </p>
    </div>
  );

  if (linked) {
    return (
      <Link
        href={`/sismos/${earthquake.id}`}
        className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left hover:border-primary"
      >
        <MagnitudeIndicator magnitude={earthquake.magnitude} />
        {placeAndTime}
      </Link>
    );
  }

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
        <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground">Magnitud</p>
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
