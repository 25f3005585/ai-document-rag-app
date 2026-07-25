import { getSessionCookie } from 'better-auth/cookies';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { DEFAULT_REDIRECT_PATH } from '@/lib/constants';

/**
 * Optimistic bounce for logged-in users — cookie presence only (no Express round-trip).
 * `(app)` layout still validates the session for real.
 */
export default async function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();

  if (getSessionCookie(headerStore)) {
    redirect(DEFAULT_REDIRECT_PATH);
  }

  return children;
}
