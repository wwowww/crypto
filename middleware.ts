import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from '@/constants/routes';
import { cookies } from 'next/headers';
import { verify } from '@/actions/sessions';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  const cookie = (await cookies()).get('session')?.value;
  let session = null;
  if (cookie) {
    try {
      session = await verify(cookie);
    } catch (error) {
      console.error("Session verification failed:", error);
    }
  }

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/auth/:path*',
    '/mypage/:path*',
  ],
};
