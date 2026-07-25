import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import {
  DEFAULT_AUTH_REDIRECT_PATH,
  DEFAULT_REDIRECT_PATH,
  isAuthPath,
  safeCallbackUrl,
} from '@/lib/constants';
import { fetchSession } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = sessionCookie
    ? (await fetchSession(request.headers.get('cookie'), request.nextUrl.origin)) !== null
    : false;

  if (isAuthPath(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.next();
    }

    const callbackUrl = safeCallbackUrl(request.nextUrl.searchParams.get('callbackUrl'));
    return NextResponse.redirect(new URL(callbackUrl ?? DEFAULT_REDIRECT_PATH, request.url));
  }

  if (!isAuthenticated) {
    const loginUrl = new URL(DEFAULT_AUTH_REDIRECT_PATH, request.url);
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|map|json|txt)).*)'],
};
