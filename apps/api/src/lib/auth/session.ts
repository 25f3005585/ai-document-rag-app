/**
 * Session + cookie-cache settings for Better Auth.
 * Cookie cache avoids a DB round-trip on most getSession / useSession calls.
 * @see https://www.better-auth.com/docs/concepts/session-management#cookie-cache
 */
export const AUTH_SESSION = {
  expiresIn: 60 * 60 * 24 * 7, // 7 days
  updateAge: 60 * 60 * 24, // refresh expiry at most once per day
  cookieCache: {
    enabled: true,
    maxAge: 60 * 30, // 30 minutes — fewer Neon round-trips; revokes lag until expiry
    strategy: 'compact' as const, // smallest signed cookie; best for performance
  },
} as const;
