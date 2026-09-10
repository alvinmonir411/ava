import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = request.cookies.get('lwcco_admin_secure_session');
  const hasToken = !!sessionCookie?.value;

  // If trying to access any admin route other than /admin/login without session token
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!hasToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated and trying to access /admin/login, redirect to /admin dashboard
  if (pathname === '/admin/login') {
    if (hasToken) {
      const dashboardUrl = new URL('/admin', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
