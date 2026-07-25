import { headers } from 'next/headers';
import { cache } from 'react';

import { fetchSession, type ServerSession } from '@/lib/session';

export type { ServerSession };

/**
 * Server-side session for RSC / Server Actions.
 * Forwards the browser Cookie header straight to Express (cookies live on the web origin
 * via the `/api` rewrite; Better Auth only needs the cookie value in the header).
 */
export const getServerSession = cache(async (): Promise<ServerSession | null> => {
  const headerStore = await headers();
  return fetchSession(headerStore.get('cookie'));
});
