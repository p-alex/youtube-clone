import express from 'express';
import { registerLimiter } from '../../middleware/rateLimit';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  getProfileInfoController,
  registerUserController,
  changeUsernameController,
  changeProfilePictureController,
  changePasswordController,
  subscribeToUserController,
  checkIfCurrentUserIsSubscribedToUserController,
  changeUserDescriptionController,
} from './user.controller';
import {
  changePasswordSchema,
  changeProfilePictureSchema,
  changeUserDescriptionSchema,
  changeUsernameSchema,
  checkIfCurrentUserIsSubscribedToUserSchema,
  getProfileInfoSchema,
  registerUserSchema,
  subscribeToUserSchema,
} from './user.schema';

const router = express.Router();

router.post(
  '/users',
  registerLimiter,
  validateResource(registerUserSchema),
  registerUserController
);

router.post(
  '/users/subscribe',
  requireAuth,
  validateResource(subscribeToUserSchema),
  subscribeToUserController
);

router.patch(
  '/users/change/username',
  requireAuth,
  validateResource(changeUsernameSchema),
  changeUsernameController
);

router.patch(
  '/users/change/profilePicture',
  requireAuth,
  validateResource(changeProfilePictureSchema),
  changeProfilePictureController
);

router.patch(
  '/users/change/password',
  requireAuth,
  validateResource(changePasswordSchema),
  changePasswordController
);

router.patch(
  '/users/change/description',
  requireAuth,
  validateResource(changeUserDescriptionSchema),
  changeUserDescriptionController
);

router.post(
  '/users/:username/profile',
  validateResource(getProfileInfoSchema),
  getProfileInfoController
);

router.get(
  '/users/:userId/subscribe-status',
  requireAuth,
  validateResource(checkIfCurrentUserIsSubscribedToUserSchema),
  checkIfCurrentUserIsSubscribedToUserController
);

export default router;
