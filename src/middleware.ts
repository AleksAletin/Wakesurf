import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Skip static files and internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/staff') ||
    pathname.startsWith('/parusnik') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Production: parusnik domain → rewrite to /parusnik routes
  if (hostname.includes('parusnik')) {
    const url = request.nextUrl.clone();
    url.pathname = `/parusnik${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default: PandaWake (no rewrite needed)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
