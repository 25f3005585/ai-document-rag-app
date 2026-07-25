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

export function isSessionPayload(value: unknown): value is ServerSession {
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

/**
 * Validate a session cookie against Better Auth (cookie-cache → DB).
 * Prefer same-origin `/api/...` so Next rewrites keep cookies first-party.
 */
export async function fetchSession(
  cookie: string | null,
  baseUrl: string = API_URL,
): Promise<ServerSession | null> {
  if (!cookie) {
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/auth/get-session`, {
      headers: { cookie },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    return isSessionPayload(data) ? data : null;
  } catch {
    return null;
  }
}
