import { AUTH_PATHS } from '@/lib/constants';

/** Routes anyone can open without a session cookie (proxy optimistic gate). */
export const PUBLIC_PATHS = ['/', ...AUTH_PATHS] as const;

export function isPublicPath(pathname: string): boolean {
  return (PUBLIC_PATHS as readonly string[]).includes(pathname);
}
