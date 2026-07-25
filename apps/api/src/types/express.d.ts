import type { Session } from '../lib/auth/auth.js';

declare global {
  namespace Express {
    interface Request {
      /** Set by `requireAuth` when a valid session cookie is present. */
      session?: Session;
    }
  }
}

export {};
