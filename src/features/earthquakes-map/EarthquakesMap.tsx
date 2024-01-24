'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { DEFAULT_CENTER } from '@/config';
import { EarthquakeProps } from '@/components/widgets';
import { useEarthquakesData } from '@/components/providers';
import { Markers } from './Markers';
import { EarthquakesMapProps } from './model';

const parseMarkers = (earthquakes: EarthquakeProps[]) => {
  if (!earthquakes) return [];

  return earthquakes.map((earthquake, idx) => ({
    id: `${earthquake.magnitude}-${idx}`,
    lat: earthquake.lat,
    lng: earthquake.lng,
  }));
};

export function EarthquakesMap(props: EarthquakesMapProps) {
  const { earthquakes } = props;
  const { selected } = useEarthquakesData();
  const [zoom, setZoom] = useState(4.7);
  const [position, setPosition] = useState(DEFAULT_CENTER);
  const [markers, setMarkers] = useState(parseMarkers(earthquakes));

  useEffect(() => {
    if (selected) {
      setPosition({ lat: selected.lat, lng: selected.lng });
      setZoom(10);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else setPosition(DEFAULT_CENTER);
  }, [selected]);

  useEffect(() => {
    setMarkers(parseMarkers(earthquakes));
  }, [earthquakes]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="h-96 lg:h-[31.25rem]" style={{ width: '100%' }}>
        <Map zoom={zoom} center={position}>
          <Markers points={markers} />
        </Map>
      </div>
    </APIProvider>
  );
}
