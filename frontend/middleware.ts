import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Logic handled in page components for now
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
