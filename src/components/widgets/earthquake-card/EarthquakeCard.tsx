'use client';

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
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left transition-colors',
        isSelected ? 'border-primary' : 'border-border',
      )}
    >
      <MagnitudeIndicator magnitude={earthquake.magnitude} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-card-foreground">{earthquake.details}</p>
        <p className="text-xs text-muted-foreground">
          {`${earthquake.date}, ${earthquake.time}`}
        </p>
      </div>
    </button>
  );
}
