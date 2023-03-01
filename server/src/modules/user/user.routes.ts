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
  changeUserDescriptionController,
  searchUsersController,
} from './user.controller';
import {
  changePasswordSchema,
  changeProfilePictureSchema,
  changeUserDescriptionSchema,
  changeUsernameSchema,
  getProfileInfoSchema,
  registerUserSchema,
  searchChannelsSchema,
} from './user.schema';

const router = express.Router();

router.get(
  '/users/search',
  validateResource(searchChannelsSchema),
  searchUsersController
);

router.get(
  '/users/:userId/profile',
  validateResource(getProfileInfoSchema),
  getProfileInfoController
);

router.post(
  '/users',
  registerLimiter,
  validateResource(registerUserSchema),
  registerUserController
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

export default router;
