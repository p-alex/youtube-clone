import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import { getSubscriptionVideosController } from './subscription.controller';
import { getSubscriptionVideosSchema } from './subscription.schema';

const router = express.Router();

router.get(
  '/subscriptions/videos/:page',
  requireAuth,
  validateResource(getSubscriptionVideosSchema),
  getSubscriptionVideosController
);

export default router;
