export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL ?? 'http://localhost:3000';

/** Must match API Google OAuth env — hide the button when unset. */
export const GOOGLE_AUTH_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === 'true';

export const DEFAULT_REDIRECT_PATH = '/chats';
export const DEFAULT_AUTH_REDIRECT_PATH = '/login';
export const VERIFY_EMAIL_PATH = '/verify-email';
export const FORGOT_PASSWORD_PATH = '/forgot-password';
export const RESET_PASSWORD_PATH = '/reset-password';

/** Auth routes — accessible without a session; redirect away when already logged in. */
export const AUTH_PATHS = [
  '/login',
  '/signup',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
] as const;

export type AuthPath = (typeof AUTH_PATHS)[number];

export const isAuthPath = (pathname: string): boolean =>
  (AUTH_PATHS as readonly string[]).includes(pathname);

/**
 * Prevent open redirects: only allow relative same-origin paths.
 */
export const safeCallbackUrl = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }

  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return null;
  }

  return value;
};

/** Absolute frontend URL for Better Auth callback redirects. */
export const toAbsoluteCallbackUrl = (path: string): string => {
  const safePath = safeCallbackUrl(path) ?? DEFAULT_REDIRECT_PATH;
  return new URL(safePath, WEB_URL).toString();
};
