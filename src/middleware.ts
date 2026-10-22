import { NextRequest, NextResponse } from 'next/server';

const KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;

export function middleware(request: NextRequest) {
  const key = process.env.INDEXNOW_KEY?.trim() ?? '';
  if (!KEY_PATTERN.test(key)) return NextResponse.next();

  if (request.nextUrl.pathname === `/${key}.txt`) {
    return new NextResponse(key, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:key.txt',
};
