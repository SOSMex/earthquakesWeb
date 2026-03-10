'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { DEFAULT_CENTER, darkMapStyle } from '@/config';
import { EarthquakeProps } from '@/components/widgets';
import { useEarthquakesData } from '@/components/providers';
import { Markers } from './Markers';
import { PerceptionMarkers } from './PerceptionMarkers';
import { EarthquakesMapProps } from './model';

const parseMarkers = (earthquakes: EarthquakeProps[]) => {
  if (!earthquakes) return [];

  return earthquakes.map((earthquake, idx) => ({
    id: `${earthquake.magnitude}-${idx}`,
    lat: earthquake.lat,
    lng: earthquake.lng,
    magnitude: earthquake.magnitude,
  }));
};

export function EarthquakesMap(props: EarthquakesMapProps) {
  const { earthquakes, perceptionLocations } = props;
  const { selected } = useEarthquakesData();

  const isSingle = earthquakes?.length === 1;
  const initialCenter = isSingle
    ? { lat: earthquakes[0].lat, lng: earthquakes[0].lng }
    : DEFAULT_CENTER;
  const initialZoom = isSingle ? 8 : 4.7;

  const [zoom, setZoom] = useState(initialZoom);
  const [position, setPosition] = useState(initialCenter);
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
    if (earthquakes?.length === 1) {
      setPosition({ lat: earthquakes[0].lat, lng: earthquakes[0].lng });
      setZoom(8);
    }
  }, [earthquakes]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="h-[65vh] md:h-96 lg:h-[31.25rem]" style={{ width: '100%' }}>
        <Map zoom={zoom} center={position} styles={darkMapStyle}>
          {perceptionLocations && perceptionLocations.length > 0 && (
            <PerceptionMarkers locations={perceptionLocations} />
          )}
          <Markers points={markers} />
        </Map>
      </div>
    </APIProvider>
  );
}
