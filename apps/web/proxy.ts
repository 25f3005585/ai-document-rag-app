import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import { DEFAULT_AUTH_REDIRECT_PATH, isAuthPath } from '@/lib/constants';

/**
 * Optimistic gate only — cookie presence, no network.
 * Auth pages are never bounced here (stale cookies after logout would loop).
 * Full session validation lives in `(app)` layout via getServerSession.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isAuthPath(pathname)) {
    return NextResponse.next();
  }

  if (!getSessionCookie(request)) {
    const loginUrl = new URL(DEFAULT_AUTH_REDIRECT_PATH, request.url);
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|map|json|txt)).*)'],
};
