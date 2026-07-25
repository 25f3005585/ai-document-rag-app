import { Router } from 'express';

import { getIndex } from '../controllers/index.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import healthRoutes from './health.routes.js';
import meRoutes from './me.routes.js';

const router = Router();

router.get('/', asyncHandler(getIndex));
router.use('/health', healthRoutes);
router.use('/api/me', meRoutes);

export default router;
