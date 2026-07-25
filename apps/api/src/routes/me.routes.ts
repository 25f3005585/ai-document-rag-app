import { Router } from 'express';

import { getMe } from '../controllers/me.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(getMe));

export default router;
