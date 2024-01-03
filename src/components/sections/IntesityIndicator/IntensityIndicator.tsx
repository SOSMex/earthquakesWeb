'use client';

import React from 'react';
import { cn } from '@/utils';

const LIGHT: number = 2;
const MODERATE: number = 4;
const STRONG: number = 6;

interface IntensityIndicatorProps {
  intensity: number;
}

const getIntensityColor = (intensity: number): string => {
  if (intensity < LIGHT) return 'border-ritcher-scales-green';
  if (intensity < MODERATE) return 'border-ritcher-scales-yellow';
  if (intensity < STRONG) return 'border-ritcher-scales-orange';
  return 'border-ritcher-scales-red';
};

export function IntensityIndicator({ intensity }: IntensityIndicatorProps) {
  return (
    <div
      role="presentation"
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full border border-red-500 p-px text-center',
        getIntensityColor(intensity),
      )}
    >
      <div
        role="presentation"
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full border border-red-500 p-px',
          getIntensityColor(intensity),
        )}
      >
        <p
          className={cn(
            'flex h-full w-full items-center justify-center rounded-full border border-red-500',
            getIntensityColor(intensity),
          )}
        >
          {intensity?.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
