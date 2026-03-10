import { apiGuard, isValidSecret } from '@/utils';

const DATA_API_KEY = process.env.DATA_API_KEY!;

export async function GET(request: Request) {
  const apiUrl = process.env.DATA_API_URL!;

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('key') || '';
  const earthquakeToken = searchParams.get('token') || '';

  if (!secret || !isValidSecret(secret)) return apiGuard();

  if (!earthquakeToken) {
    return Response.json({ data: null }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${apiUrl}/api/sismos/info/reports/earthquake/${earthquakeToken}/locations`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-ApiKey': DATA_API_KEY,
        },
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      return Response.json({ data: null });
    }

    const data = await res.json();

    return Response.json({ data });
  } catch {
    return Response.json({ data: null });
  }
}
