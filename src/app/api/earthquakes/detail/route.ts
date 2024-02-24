import { apiGuard, isValidSecret } from '@/utils';

const DATA_API_KEY = process.env.DATA_API_KEY!;

export async function GET(request: Request) {
  const apiUrl = process.env.DATA_API_URL!;
  const apiVersion = process.env.DATA_API_VERSION!;

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('key') || '';
  const earthquakeId = searchParams.get('id') || '';

  if (!secret || !isValidSecret(secret)) return apiGuard();

  const res = await fetch(`${apiUrl}/${apiVersion}/sismos/detail/${earthquakeId}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-ApiKey': DATA_API_KEY,
    },
  });

  const detail = await res.json();

  return Response.json({
    data: detail,
  });
}
