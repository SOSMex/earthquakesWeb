/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const MONITOR_ALERTS_URL = process.env.MONITOR_ALERTS_URL!;
const MONITOR_ALERTS_API_KEY = process.env.MONITOR_ALERTS_API_KEY!;

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
        <span style={{ fontSize: 64, fontWeight: 800 }}>Sismos M&#233;xico</span>
        <span style={{ fontSize: 28, color: '#a0a0b0', marginTop: 16 }}>
          sismosmx.app
        </span>
      </div>
    ),
    { width: 1200, height: 630 },
  );
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
          padding: '60px',
        }}
      >
        {heroEta && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 120, fontWeight: 800, color: '#FFD600' }}>
              {`${heroEta}s`}
            </span>
            <span style={{ fontSize: 36, color: '#a0a0b0', marginTop: 8 }}>
              de anticipaci&#243;n
            </span>
          </div>
        )}

        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: 'white',
            marginTop: heroEta ? 40 : 0,
            textAlign: 'center',
          }}
        >
          {`Sismo ${event.intensity} — ${event.location}`}
        </span>

        <span style={{ fontSize: 28, color: '#a0a0b0', marginTop: 16 }}>
          {dateFormatted}
        </span>

        <span style={{ fontSize: 24, color: '#606070', marginTop: 60 }}>
          Sismos MX &#8212; sismosmx.app
        </span>
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
