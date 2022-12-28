import express from 'express';
import validateResource from '../../middleware/validateResource';
import {
  getProfileAboutController,
  getProfileInfoController,
  registerUserController,
} from './user.controller';
import { getProfileInfoSchema, registerUserSchema } from './user.scheme';

const router = express.Router();

router.post('/api/users', validateResource(registerUserSchema), registerUserController);

router.get(
  '/api/users/:username/basic',
  validateResource(getProfileInfoSchema),
  getProfileInfoController
);

router.get(
  '/api/users/:username/about',
  validateResource(getProfileInfoSchema),
  getProfileAboutController
);

export default router;
