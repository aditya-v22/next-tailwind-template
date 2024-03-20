import type { NextRequest } from 'next/server';

const protectedRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (token && request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/', request.url));
  }

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
