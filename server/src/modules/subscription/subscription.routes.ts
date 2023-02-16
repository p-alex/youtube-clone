import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  checkIfCurrentUserIsSubscribedToUserController,
  getSubscriptionsUsersMiniController,
  getSubscriptionUsersController,
  getSubscriptionVideosController,
  subscribeToUserController,
} from './subscription.controller';
import {
  checkIfCurrentUserIsSubscribedToUserSchema,
  getSubscriptionsSchema,
  subscribeToUserSchema,
} from './subscription.schema';

const router = express.Router();

router.get('/subscriptions/mini', requireAuth, getSubscriptionsUsersMiniController);

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

router.get(
  '/subscriptions/:userId/subscribe-status',
  requireAuth,
  validateResource(checkIfCurrentUserIsSubscribedToUserSchema),
  checkIfCurrentUserIsSubscribedToUserController
);

router.post(
  '/subscriptions/subscribe',
  requireAuth,
  validateResource(subscribeToUserSchema),
  subscribeToUserController
);

export default router;
