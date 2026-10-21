'use client';

import { useEffect, useRef, useState } from 'react';
import { MarkerClusterer, Renderer, Marker as MarkerType } from '@googlemaps/markerclusterer';
import { Marker, useMap } from '@vis.gl/react-google-maps';

type MarkerProps = {
  points: {
    id: string;
    lat: number;
    lng: number;
    magnitude: number;
  }[];
};

export function getMagnitudeColor(magnitude: number): string {
  if (magnitude >= 7) return '#ef4444';
  if (magnitude >= 5) return '#f97316';
  if (magnitude >= 3) return '#eab308';
  return '#22c55e';
}

const CLUSTER_GRAY = '#6b7280';

type GoogleMapsApi = {
  maps: {
    // Constructor parameter names are type-only; ESLint has no TS unused-vars plugin.
    // eslint-disable-next-line no-unused-vars
    Marker: new (options: Record<string, unknown>) => MarkerType;
    // eslint-disable-next-line no-unused-vars
    Size: new (width: number, height: number) => object;
    // eslint-disable-next-line no-unused-vars
    Point: new (x: number, y: number) => object;
  };
};

function googleMaps(): GoogleMapsApi['maps'] {
  const maps = (window as unknown as { google?: GoogleMapsApi }).google?.maps;
  if (!maps) {
    throw new Error('Google Maps is not loaded');
  }
  return maps;
}

const grayClusterRenderer: Renderer = {
  render({ count, position }) {
    const maps = googleMaps();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="${CLUSTER_GRAY}">
      <circle cx="120" cy="120" r="90" />
    </svg>`;
    const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

    return new maps.Marker({
      position,
      icon: {
        url,
        scaledSize: new maps.Size(44, 44),
        anchor: new maps.Point(22, 22),
      },
      label: {
        text: String(count),
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: '700',
      },
      title: `${count} sismos agrupados`,
      zIndex: 1000 + count,
    });
  },
};

function createMarkerIcon(magnitude: number) {
  const color = getMagnitudeColor(magnitude);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="2"/>
    <text x="16" y="21" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="sans-serif">${magnitude.toFixed(1)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function Markers({ points }: MarkerProps) {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: MarkerType }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map, renderer: grayClusterRenderer });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  useEffect(() => {
    if (!map) return;
    if (!points) return;
    if (!clusterer.current) return;

    setMarkers({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const setMarkerRef = (marker: MarkerType | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      }
      const newMarkers = { ...prev };
      delete newMarkers[key];
      return newMarkers;
    });
  };

  return (
    <>
      {points.map((point) => (
        <Marker
          position={point}
          key={point.id}
          ref={(marker) => setMarkerRef(marker, point.id)}
          icon={{
            url: createMarkerIcon(point.magnitude),
            scaledSize: { width: 32, height: 32, equals: () => false },
            anchor: { x: 16, y: 16, equals: () => false },
          }}
        />
      ))}
    </>
  );
}
