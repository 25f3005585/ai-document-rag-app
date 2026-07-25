import type { Request, Response } from 'express';

import { AppError } from '../core/errors/AppError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';
import { SuccessResponse } from '../core/responses/SuccessResponse.js';

export const getMe = (req: Request, res: Response): Response => {
  const session = req.session;
  if (!session) {
    throw new AppError('Authentication required', 401, ERROR_CODES.UNAUTHORIZED);
  }

  return new SuccessResponse('Authenticated session', {
    user: session.user,
    session: {
      id: session.session.id,
      expiresAt: session.session.expiresAt,
    },
  }).send(req, res);
};
