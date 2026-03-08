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

  const res = await fetch(`${apiUrl}/api/sismos/info/statistics?${params}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-ApiKey': DATA_API_KEY,
    },
  });

  const stats = await res.json();

  return Response.json(stats);
}
