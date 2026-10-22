'use client';

import { useEffect, useMemo } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { darkMapStyle } from '@/config';
import { EarthquakeProps } from '@/components/widgets';
import { useEarthquakesData } from '@/components/providers';
import { Markers, getMagnitudeColor } from './Markers';
import { PerceptionMarkers } from './PerceptionMarkers';
import { EarthquakesMapProps } from './model';
import {
  CameraFrame,
  MAP_MAX_ZOOM,
  MEXICO_CENTER,
  MOBILE_OVERVIEW_ZOOM,
  frameEarthquakeCamera,
} from './frame-camera';

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

const MOBILE_MAP_QUERY = '(max-width: 767px)';

const parseMarkers = (earthquakes: EarthquakeProps[]) => {
  if (!earthquakes) return [];

  return earthquakes.map((earthquake, idx) => ({
    id: `${earthquake.magnitude}-${idx}`,
    lat: earthquake.lat,
    lng: earthquake.lng,
    magnitude: earthquake.magnitude,
  }));
};

function applyCamera(map: NonNullable<ReturnType<typeof useMap>>, camera: CameraFrame) {
  if (camera.kind === 'center') {
    map.setCenter(camera.center);
    map.setZoom(camera.zoom);
    return undefined;
  }

  map.fitBounds(camera.bounds, camera.padding);
  const clamp = () => {
    const zoom = map.getZoom();
    if (zoom != null && zoom > camera.maxZoom) map.setZoom(camera.maxZoom);
  };
  clamp();
  return map.addListener('idle', clamp);
}

function MapCamera({
  points,
  selected,
}: {
  points: { lat: number; lng: number }[];
  selected: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return undefined;

    let clampListener: { remove: () => void } | undefined;

    const frame = () => {
      clampListener?.remove();
      const mobile = window.matchMedia(MOBILE_MAP_QUERY).matches;
      const camera = frameEarthquakeCamera({ points, mobile, selected });
      clampListener = applyCamera(map, camera);
      if (selected) window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    frame();
    const media = window.matchMedia(MOBILE_MAP_QUERY);
    media.addEventListener('change', frame);
    return () => {
      media.removeEventListener('change', frame);
      clampListener?.remove();
    };
  }, [map, points, selected]);

  return null;
}

export function EarthquakesMap(props: EarthquakesMapProps) {
  const { earthquakes, perceptionLocations } = props;
  const { selected } = useEarthquakesData();
  const markers = useMemo(() => parseMarkers(earthquakes), [earthquakes]);
  const selectedPoint = useMemo(() => (
    selected && Number.isFinite(selected.lat) && Number.isFinite(selected.lng)
      ? { lat: selected.lat, lng: selected.lng }
      : null
  ), [selected]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="h-[min(320px,60vh)] w-full overflow-hidden md:h-96 lg:h-[31.25rem]">
        <Map
          center={MEXICO_CENTER}
          zoom={MOBILE_OVERVIEW_ZOOM}
          maxZoom={MAP_MAX_ZOOM}
          styles={darkMapStyle}
          style={{ width: '100%', height: '100%' }}
        >
          <MapCamera points={markers} selected={selectedPoint} />
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
