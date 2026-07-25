import { Router } from 'express';

import { getMe, getPreferences, putPreferences } from '../controllers/me.controller.js';
import { personalizationPrefsSchema } from '../core/validation/schemas/personalization.schema.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { validateRequest } from '../middlewares/validation.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(getMe));
router.get('/preferences', requireAuth, asyncHandler(getPreferences));
router.put(
  '/preferences',
  requireAuth,
  validateRequest({ body: personalizationPrefsSchema }),
  asyncHandler(putPreferences),
);

export default router;
