import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import { DEFAULT_AUTH_REDIRECT_PATH } from '@/lib/constants';
import { isPublicPath } from '@/lib/public-paths';

/**
 * Optimistic gate only — cookie presence, no network.
 * Public routes (landing + auth) are never bounced here.
 * Full session validation lives in `(app)` layout via getServerSession.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicPath(pathname)) {
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
