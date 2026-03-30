import { apiGuard, isValidSecret } from '@/utils';

const MONITOR_ALERTS_URL = process.env.MONITOR_ALERTS_URL!;
const MONITOR_ALERTS_API_KEY = process.env.MONITOR_ALERTS_API_KEY!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('key') || '';
  const collapseKey = searchParams.get('id') || '';

  if (!secret || !isValidSecret(secret)) return apiGuard();

  const res = await fetch(
    `${MONITOR_ALERTS_URL}/EarthquakeEvent/${collapseKey}`,
    {
      headers: {
        'X-Api-Key': MONITOR_ALERTS_API_KEY,
      },
    },
  );

  if (!res.ok) {
    return Response.json({ data: null }, { status: res.status });
  }

  const data = await res.json();
  return Response.json({ data });
}
