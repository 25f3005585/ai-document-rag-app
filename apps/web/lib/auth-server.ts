import { headers } from 'next/headers';
import { cache } from 'react';

import { API_URL } from '@/lib/constants';

export type ServerSession = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
  };
  session: {
    id: string;
    expiresAt: string;
  };
};

/**
 * Server-side session for RSC / Server Actions.
 * Forwards the browser Cookie header straight to Express (cookies live on the web origin
 * via the `/api` rewrite; Better Auth only needs the cookie value in the header).
 */
export const getServerSession = cache(async (): Promise<ServerSession | null> => {
  const headerStore = await headers();
  const cookie = headerStore.get('cookie');
  if (!cookie) {
    return null;
  }

  const response = await fetch(`${API_URL}/api/auth/get-session`, {
    headers: { cookie },
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();
  if (!isSessionPayload(data)) {
    return null;
  }

  return data;
});

function isSessionPayload(value: unknown): value is ServerSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const user = (value as { user?: unknown }).user;
  if (!user || typeof user !== 'object') {
    return false;
  }

  const { id, name, email } = user as Record<string, unknown>;
  return typeof id === 'string' && typeof name === 'string' && typeof email === 'string';
}
