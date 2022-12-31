import express from 'express';
import validateResource from '../../middleware/validateResource';
import {
  getProfileStatsController,
  getProfileInfoController,
  registerUserController,
} from './user.controller';
import { getProfileInfoSchema, registerUserSchema } from './user.schema';

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
  getProfileStatsController
);

export default router;
