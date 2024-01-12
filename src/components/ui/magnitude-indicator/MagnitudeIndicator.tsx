import { cn } from '@/utils';
import { MagnitudeIndicatorProps } from './model';

const LIGHT: number = 3;
const MODERATE: number = 5;
const STRONG: number = 7;

const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude < LIGHT) return 'border-ritcher-scales-green';
  if (magnitude < MODERATE) return 'border-ritcher-scales-yellow';
  if (magnitude < STRONG) return 'border-ritcher-scales-orange';
  return 'border-ritcher-scales-red';
};

export function MagnitudeIndicator(props: MagnitudeIndicatorProps) {
  const { magnitude, className } = props;
  const color = getMagnitudeColor(magnitude);

  return (
    <div
      role="presentation"
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full border border-red-500 p-px text-center',
        color,
        className,
      )}
    >
      <div
        role="presentation"
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full border border-red-500 p-px',
          color,
        )}
      >
        <p
          className={cn(
            'flex h-full w-full items-center justify-center rounded-full border border-red-500',
            color,
          )}
        >
          {magnitude?.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
