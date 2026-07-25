import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import {
  ALLOWED_ORIGINS,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NODE_ENV,
  WEB_URL,
} from '../../config/env.js';
import { db } from '../../db/index.js';
import * as schema from '../../db/schema/index.js';
import { AUTH_RATE_LIMIT } from './rate-limit.js';
import { AUTH_SESSION } from './session.js';

const googleConfigured = Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
  appName: 'AskDocs',
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  session: AUTH_SESSION,
  rateLimit: AUTH_RATE_LIMIT,
  trustedOrigins: [...new Set([WEB_URL, ...ALLOWED_ORIGINS])],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const { sendResetPasswordEmailMessage } = await import('./send-email.js');
      await sendResetPasswordEmailMessage(user.email, url);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { sendVerificationEmailMessage } = await import('./send-email.js');
      await sendVerificationEmailMessage(user.email, url);
    },
  },
  socialProviders: {
    ...(googleConfigured
      ? {
          google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'lax',
      secure: NODE_ENV === 'production',
    },
  },
});

export type Session = typeof auth.$Infer.Session;
