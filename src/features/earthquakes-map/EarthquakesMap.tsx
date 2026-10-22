'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { DEFAULT_CENTER, darkMapStyle } from '@/config';
import { EarthquakeProps } from '@/components/widgets';
import { useEarthquakesData } from '@/components/providers';
import { Markers, getMagnitudeColor } from './Markers';
import { PerceptionMarkers } from './PerceptionMarkers';
import { EarthquakesMapProps } from './model';

const MAGNITUDE_LEGEND = [
  { label: 'Menor a 3.0', min: 2 },
  { label: '3.0 a 4.9', min: 3 },
  { label: '5.0 a 6.9', min: 5 },
  { label: '7.0 o más', min: 7 },
];

function MapLegend() {
  return (
    <ul className="mx-auto mt-3 flex max-w-5xl flex-col gap-2 px-4 text-left text-xs font-normal text-foreground md:text-sm">
      <li className="flex items-center gap-2">
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-500 text-[10px] font-bold text-white">
          3
        </span>
        <span>Círculo gris: varios sismos en la misma zona. Acerca el mapa para ver cada uno.</span>
      </li>
      <li className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span>Marcador de color: un sismo. El número es la magnitud.</span>
        {MAGNITUDE_LEGEND.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block size-3.5 rounded-full border border-white"
              style={{ backgroundColor: getMagnitudeColor(item.min) }}
            />
            {item.label}
          </span>
        ))}
      </li>
    </ul>
  );
}

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
      <MapLegend />
    </APIProvider>
  );
}
