import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  getSubscriptionUsersController,
  getSubscriptionVideosController,
} from './subscription.controller';
import { getSubscriptionsSchema } from './subscription.schema';

const router = express.Router();

router.get(
  '/subscriptions/videos/:page',
  requireAuth,
  validateResource(getSubscriptionsSchema),
  getSubscriptionVideosController
);

router.get(
  '/subscriptions/users/:page',
  requireAuth,
  validateResource(getSubscriptionsSchema),
  getSubscriptionUsersController
);

export default router;
