/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const MONITOR_ALERTS_URL = process.env.MONITOR_ALERTS_URL!;
const MONITOR_ALERTS_API_KEY = process.env.MONITOR_ALERTS_API_KEY!;
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN!;

const INTENSITY_ORDER = ['Extremo', 'MuyViolento', 'Violento', 'Fuerte', 'Moderado'];

function getHeroEta(event: {
  etas: Record<string, { eta?: number; intensity?: string }>;
  latencySeconds?: number;
}): number | null {
  const etaValues = Object.values(event.etas);
  const byIntensity = INTENSITY_ORDER.reduce<number | null>((found, target) => {
    if (found !== null) return found;
    const match = etaValues.find((c) => c.intensity === target && c.eta && c.eta > 0);
    return match?.eta ?? null;
  }, null);
  if (byIntensity !== null) return byIntensity;
  const allEtas = etaValues
    .filter((c) => c.eta && c.eta > 0)
    .map((c) => c.eta!);
  if (allEtas.length > 0) return Math.min(...allEtas);
  if (event.latencySeconds && event.latencySeconds > 0) return Math.round(event.latencySeconds);
  return null;
}

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
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l+ef4444(${lng},${lat})/${lng},${lat},6,0/1200x350@2x?access_token=${MAPBOX_ACCESS_TOKEN}&logo=false&attribution=false`;
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

  const heroEta = getHeroEta(event);
  const dateFormatted = new Date(event.dateUtc).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Pre-fetch map as base64 (Satori can't fetch external URLs in <img>)
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
        {/* Map header */}
        {mapSrc && (
          <img
            src={mapSrc}
            width={1200}
            height={350}
            alt="map"
            style={{ objectFit: 'cover' }}
          />
        )}

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 60px',
          }}
        >
          {/* Hero stat + earthquake info row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {heroEta && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 96, fontWeight: 800, color: '#FFD600' }}>
                  {`${heroEta}s`}
                </span>
                <span style={{ fontSize: 20, color: '#a0a0b0', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
                  {'de anticipaci\u00F3n'}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: 'white' }}>
                {`Sismo ${event.intensity} \u2014 ${event.location}`}
              </span>
              <span style={{ fontSize: 22, color: '#a0a0b0', marginTop: 8 }}>
                {dateFormatted}
              </span>
            </div>

            {/* Branding */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: 16,
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
