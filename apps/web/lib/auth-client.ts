import { createAuthClient } from 'better-auth/react';

import { WEB_URL } from '@/lib/constants';

/**
 * Auth client hits the web origin. Next rewrites `/api/auth/*` to the Express API
 * so session cookies are first-party on the web host (works with `proxy.ts`).
 */
export const authClient = createAuthClient({
  baseURL: WEB_URL,
  fetchOptions: {
    credentials: 'include',
  },
});

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;
export const getSession = authClient.getSession;
export const sendVerificationEmail = authClient.sendVerificationEmail;
export const requestPasswordReset = authClient.requestPasswordReset;
export const resetPassword = authClient.resetPassword;
