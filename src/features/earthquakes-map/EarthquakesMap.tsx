'use client';

import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const earthquakeData = [
  { id: 1, lat: 19.24647, lng: -99.10135 },
  { id: 2, lat: 18.134478, lng: -94.458986 },
  { id: 3, lat: 16.849418, lng: -99.908916 },
];

export function EarthquakesMap() {
  const position = { lat: 19.432608, lng: -99.133209 };
  const [zoom, setZoom] = useState(5);
  const [markers, setMarkers] = useState(earthquakeData);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div style={{ height: '350px', width: '100%' }}>
        <Map zoom={5} center={position}>
          {markers.map((marker) => (
            <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
