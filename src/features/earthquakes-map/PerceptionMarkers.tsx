'use client';

import { Marker } from '@vis.gl/react-google-maps';
import type { ReportLocation } from '@/services';

type PerceptionMarkersProps = {
  locations: ReportLocation[];
};

function getIntensityColor(intensity: string): string {
  switch (intensity) {
    case 'Fuerte':
      return '#ef4444'; // red
    case 'Moderado':
      return '#f97316'; // orange
    case 'Leve':
      return '#22c55e'; // green
    default:
      return '#6b7280'; // grey (not_felt)
  }
}

function createPerceptionIcon(intensity: string) {
  const color = getIntensityColor(intensity);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="${color}" fill-opacity="0.35" stroke="${color}" stroke-width="1.5"/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function PerceptionMarkers({ locations }: PerceptionMarkersProps) {
  return (
    <>
      {locations.map((loc, idx) => (
        <Marker
          // eslint-disable-next-line react/no-array-index-key
          key={`perception_${idx}`}
          position={{ lat: loc.latitude, lng: loc.longitude }}
          icon={{
            url: createPerceptionIcon(loc.intensity),
            scaledSize: { width: 24, height: 24, equals: () => false },
            anchor: { x: 12, y: 12, equals: () => false },
          }}
        />
      ))}
    </>
  );
}
