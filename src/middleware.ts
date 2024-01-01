import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? 'no-host';
  const allowedOrigins = process.env.ALLOWED_ORIGINS!?.split(',') ?? [];

  if (allowedOrigins.includes(host)) {
    return NextResponse.next();
  }

  return new Response(JSON.stringify({ message: 'Access Denied' }), {
    status: 403,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const config = {
  matcher: '/api/:path*',
};
