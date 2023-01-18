import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  getProfileInfoController,
  registerUserController,
  changeUsernameController,
  changeProfilePictureController,
  changePasswordController,
  subscribeToUserController,
} from './user.controller';
import {
  changePasswordSchema,
  changeProfilePictureSchema,
  changeUsernameSchema,
  getProfileInfoSchema,
  registerUserSchema,
  subscribeToUserSchema,
} from './user.schema';

const router = express.Router();

router.post('/api/users', validateResource(registerUserSchema), registerUserController);

router.post(
  '/api/users/subscribe',
  requireAuth,
  validateResource(subscribeToUserSchema),
  subscribeToUserController
);

router.patch(
  '/api/users/change/username',
  requireAuth,
  validateResource(changeUsernameSchema),
  changeUsernameController
);

router.patch(
  '/api/users/change/profilePicture',
  requireAuth,
  validateResource(changeProfilePictureSchema),
  changeProfilePictureController
);

router.patch(
  '/api/users/change/password',
  requireAuth,
  validateResource(changePasswordSchema),
  changePasswordController
);

router.post(
  '/api/users/:username/profile',
  validateResource(getProfileInfoSchema),
  getProfileInfoController
);

export default router;
