/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const DATA_API_URL = process.env.DATA_API_URL!;
const DATA_API_KEY = process.env.DATA_API_KEY!;
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN!;

function getMagnitudeColor(magnitude: number): string {
  if (magnitude >= 6.0) return '#dc2626';
  if (magnitude >= 5.0) return '#ea580c';
  if (magnitude >= 4.0) return '#f59e0b';
  return '#22c55e';
}

function parseLocation(detalles: string): { town: string; state: string } {
  const parts = detalles?.split('de')[1]?.split(',');
  return {
    town: parts?.length > 0 ? parts[0].trim() : '',
    state: parts?.length > 1 ? parts[1].trim() : '',
  };
}

function formatDate(fecha: string): { date: string; time: string } {
  const dt = new Date(fecha);
  const date = dt.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  let hours = dt.getHours();
  let minutes: number | string = dt.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return { date, time: `${hours}:${minutes} ${ampm}` };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  let earthquake: {
    magnitud: number;
    laltitud: string;
    longitud: string;
    detalles: string;
    fecha: string;
  } | null = null;

  try {
    const res = await fetch(`${DATA_API_URL}/api/sismos/info/detail/${token}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-ApiKey': DATA_API_KEY,
      },
    });
    earthquake = await res.json();
  } catch {
    // Fall through to fallback
  }

  if (!earthquake || !earthquake.laltitud || !earthquake.longitud) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#1a1a2e',
            fontFamily: 'sans-serif',
            color: 'white',
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 800 }}>Sismos México</span>
          <span style={{ fontSize: 28, color: '#a0a0b0', marginTop: 16 }}>
            sismosmx.app
          </span>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }

  const magnitude = typeof earthquake.magnitud === 'string'
    ? parseFloat(earthquake.magnitud)
    : earthquake.magnitud;
  const lat = parseFloat(earthquake.laltitud);
  const lng = parseFloat(earthquake.longitud);
  const { town, state } = parseLocation(earthquake.detalles);
  const { date, time } = formatDate(earthquake.fecha);

  const location = town ? `${town}, ${state}` : state || 'México';

  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l+ef4444(${lng},${lat})/${lng},${lat},6,0/1200x400@2x?access_token=${MAPBOX_ACCESS_TOKEN}&logo=false&attribution=false`;

  // Satori cannot fetch external URLs in <img> — pre-fetch as base64 data URL
  let mapSrc = mapUrl;
  try {
    const mapRes = await fetch(mapUrl);
    if (mapRes.ok) {
      const buffer = await mapRes.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      mapSrc = `data:image/png;base64,${base64}`;
    }
  } catch {
    // If map fetch fails, the image will render without the map background
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a2e',
          fontFamily: 'sans-serif',
        }}
      >
        <img
          src={mapSrc}
          width={1200}
          height={400}
          alt="map"
          style={{ objectFit: 'cover' }}
        />

        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '24px 40px',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: getMagnitudeColor(magnitude),
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 800, color: 'white' }}>
              {magnitude.toFixed(1)}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: 'white',
                lineClamp: 2,
              }}
            >
              {location}
            </span>
            <span style={{ fontSize: 24, color: '#a0a0b0', marginTop: 8 }}>
              {date}
              {' '}
              •
              {' '}
              {time}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'white',
                backgroundColor: '#7c3aed',
                padding: '8px 20px',
                borderRadius: 24,
              }}
            >
              Descarga la app
            </span>
            <span style={{ fontSize: 14, color: '#a0a0b0' }}>
              sismosmx.app
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  );
}
