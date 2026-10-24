/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { formatDateTimeInMexicoCity } from '@/utils/dateTime.utility';

export const runtime = 'edge';

const MONITOR_ALERTS_URL = process.env.MONITOR_ALERTS_URL!;
const MONITOR_ALERTS_API_KEY = process.env.MONITOR_ALERTS_API_KEY!;
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN!;

function fallbackImage() {
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
        <span style={{ fontSize: 64, fontWeight: 800 }}>
          {'Sismos M\u00E9xico'}
        </span>
        <span style={{ fontSize: 28, color: '#a0a0b0', marginTop: 16 }}>
          sismosmx.app
        </span>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

async function fetchMapBase64(lat: number, lng: number): Promise<string | null> {
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l+ef4444(${lng},${lat})/${lng},${lat},6,0/1200x240@2x?access_token=${MAPBOX_ACCESS_TOKEN}&logo=false&attribution=false`;
  try {
    const res = await fetch(mapUrl);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch {
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let event: {
    intensity: string;
    eventType?: string;
    location: string;
    dateUtc: string;
    latencySeconds?: number;
    epicenterLat?: number;
    epicenterLng?: number;
    etas: Record<string, { eta?: number; intensity?: string }>;
  } | null = null;

  try {
    const res = await fetch(
      `${MONITOR_ALERTS_URL}/EarthquakeEvent/${id}`,
      { headers: { 'X-Api-Key': MONITOR_ALERTS_API_KEY } },
    );
    if (res.ok) event = await res.json();
  } catch {
    // Fall through to fallback
  }

  if (!event) return fallbackImage();

  const eventLabel = event.eventType === 'drill' || event.eventType === 'drill_staging' ? 'Simulacro' : 'Sismo';
  const dateFormatted = formatDateTimeInMexicoCity(event.dateUtc, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const hasCoords = event.epicenterLat != null && event.epicenterLng != null;
  const mapSrc = hasCoords
    ? await fetchMapBase64(event.epicenterLat!, event.epicenterLng!)
    : null;

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
        {/* Map — slim strip at top */}
        {mapSrc && (
          <img
            src={mapSrc}
            width={1200}
            height={240}
            alt="map"
            style={{ objectFit: 'cover' }}
          />
        )}

        {/* Content — vertically centered in remaining space */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 60px',
          }}
        >
          {/* Earthquake info */}
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
            }}
          >
            {`${eventLabel} ${event.intensity} \u2014 ${event.location}`}
          </span>

          <span style={{ fontSize: 24, color: '#a0a0b0', marginTop: 12 }}>
            {dateFormatted}
          </span>

          {/* Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'white',
                backgroundColor: '#7c3aed',
                padding: '6px 18px',
                borderRadius: 20,
              }}
            >
              Descarga la app
            </span>
            <span style={{ fontSize: 16, color: '#606070' }}>
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
