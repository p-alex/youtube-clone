import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  getProfileStatsController,
  getProfileInfoController,
  registerUserController,
  changeUsernameController,
  changeProfilePictureController,
  changePasswordController,
} from './user.controller';
import {
  changePasswordSchema,
  changeProfilePictureSchema,
  changeUsernameSchema,
  getProfileInfoSchema,
  registerUserSchema,
} from './user.schema';

const router = express.Router();

router.post('/api/users', validateResource(registerUserSchema), registerUserController);

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

router.get(
  '/api/users/:username/basic',
  validateResource(getProfileInfoSchema),
  getProfileInfoController
);

router.get(
  '/api/users/:username/about',
  validateResource(getProfileInfoSchema),
  getProfileStatsController
);

export default router;
