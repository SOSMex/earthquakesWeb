import { cn } from '@/utils';
import { MagnitudeIndicatorProps } from './model';
import { getMagnitudeColors } from './helpers';

export function MagnitudeIndicator(props: MagnitudeIndicatorProps) {
  const { magnitude, className } = props;
  const { border, background, shadow } = getMagnitudeColors(magnitude);

  return (
    <div
      role="presentation"
      className={cn(
        'flex size-11 items-center justify-center rounded-full border-[0.156rem] border-red-500 p-[0.094rem] text-center drop-shadow-sm',
        border,
        className,
        shadow,
      )}
    >
      <div
        role="presentation"
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full border-[0.156rem] border-red-500 p-0.5',
          border,
        )}
      >
        <p
          className={cn(
            'flex h-full w-full items-center justify-center rounded-full border-red-500 text-xs text-black',
            background,
          )}
        >
          {magnitude?.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
