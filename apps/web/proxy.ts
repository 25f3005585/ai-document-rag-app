import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import {
  DEFAULT_AUTH_REDIRECT_PATH,
  DEFAULT_REDIRECT_PATH,
  isAuthPath,
  safeCallbackUrl,
} from '@/lib/constants';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  if (isAuthPath(pathname)) {
    if (!sessionCookie) {
      return NextResponse.next();
    }

    const callbackUrl = safeCallbackUrl(request.nextUrl.searchParams.get('callbackUrl'));
    return NextResponse.redirect(new URL(callbackUrl ?? DEFAULT_REDIRECT_PATH, request.url));
  }

  if (!sessionCookie) {
    const loginUrl = new URL(DEFAULT_AUTH_REDIRECT_PATH, request.url);
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|map|json|txt)).*)'],
};
