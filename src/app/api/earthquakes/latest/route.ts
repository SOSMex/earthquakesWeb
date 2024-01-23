import { apiGuard, isValidSecret } from '@/utils';

const DATA_API_KEY = process.env.DATA_API_KEY!;

export async function GET(request: Request) {
  const apiUrl = process.env.DATA_API_URL!;
  const apiVersion = process.env.DATA_API_VERSION!;

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  const secret = searchParams.get('key') || '';
  const page = searchParams.get('page') || '1';

  if (!secret || !isValidSecret(secret)) return apiGuard();

  const res = await fetch(`${apiUrl}/${apiVersion}/sismos/latest/${limit}/${page}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-ApiKey': DATA_API_KEY,
    },
  });

  const earthquakes = await res.json();

  return Response.json({
    data: earthquakes.Items,
    pagination: {
      current: earthquakes.CurrentPage,
      next: earthquakes.NextPage,
      total: earthquakes.MaxPage,
    },
  });
}
