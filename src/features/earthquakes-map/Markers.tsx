'use client';

import { useEffect, useRef, useState } from 'react';
import { MarkerClusterer, Marker as MarkerType } from '@googlemaps/markerclusterer';
import { Marker, useMap } from '@vis.gl/react-google-maps';

type MarkerProps = {
  points: {
    id: string;
    lat: number;
    lng: number;
  }[];
};

export function Markers({ points }: MarkerProps) {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: MarkerType }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
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
        <Marker position={point} key={point.id} ref={(marker) => setMarkerRef(marker, point.id)} />
      ))}
    </>
  );
}
