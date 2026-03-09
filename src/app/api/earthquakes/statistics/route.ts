import { apiGuard, isValidSecret } from '@/utils';

const DATA_API_KEY = process.env.DATA_API_KEY!;

export async function GET(request: Request) {
  const apiUrl = process.env.DATA_API_URL!;

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('key') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  if (!secret || !isValidSecret(secret)) return apiGuard();

  const params = new URLSearchParams({ startDate, endDate });

  try {
    const url = `${apiUrl}/api/sismos/info/statistics?${params}`;
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-ApiKey': DATA_API_KEY,
      },
    });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('[statistics] Backend error:', res.status);
      return Response.json(
        { success: false, data: null },
        { status: res.status },
      );
    }

    const stats = await res.json();
    return Response.json(stats);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[statistics] Fetch error:', error);
    return Response.json(
      { success: false, data: null },
      { status: 500 },
    );
  }
}
