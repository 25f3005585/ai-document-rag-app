import { fromNodeHeaders } from 'better-auth/node';
import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../core/errors/AppError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';
import { auth } from '../lib/auth/auth.js';

/**
 * Requires a valid Better Auth session cookie on the request.
 * Attach to protected routes: `router.get('/me', requireAuth, handler)`.
 */
export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  void auth.api
    .getSession({ headers: fromNodeHeaders(req.headers) })
    .then((session) => {
      if (!session) {
        next(new AppError('Authentication required', 401, ERROR_CODES.UNAUTHORIZED));
        return;
      }

      req.session = session;
      next();
    })
    .catch(next);
};
