import { apiGuard, isValidSecret } from '@/utils';

export async function GET(request: Request) {
  const apiUrl = process.env.DATA_API_URL!;
  const apiVersion = process.env.DATA_API_VERSION!;

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  const secret = searchParams.get('key') || '';

  if (!secret || !isValidSecret(secret)) return apiGuard();

  const res = await fetch(`${apiUrl}/${apiVersion}/sismos/latest/${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.DATA_API_KEY!,
    },
  });

  const earthquakes = await res.json();

  return Response.json({ data: earthquakes });
}
