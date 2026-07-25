import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

import {
  ALLOWED_ORIGINS,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NODE_ENV,
  WEB_URL,
} from '../../config/env.js';
import { authDb } from './mongo-client.js';
import { sendResetPasswordEmailMessage, sendVerificationEmailMessage } from './send-email.js';

const googleConfigured = Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
  appName: 'AskDocs',
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  database: mongodbAdapter(authDb),
  trustedOrigins: [...new Set([WEB_URL, ...ALLOWED_ORIGINS])],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: ({ user, url }) => {
      sendResetPasswordEmailMessage(user.email, url);
      return Promise.resolve();
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: ({ user, url }) => {
      sendVerificationEmailMessage(user.email, url);
      return Promise.resolve();
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
