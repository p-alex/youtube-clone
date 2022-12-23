import express from 'express';
import validateResource from '../../middleware/validateResource';
import { getProfileInfoController, registerUserController } from './user.controller';
import { getProfileInfoSchema, registerUserSchema } from './user.scheme';

const router = express.Router();

router.post('/api/users', validateResource(registerUserSchema), registerUserController);

router.get(
  '/api/users/:username',
  validateResource(getProfileInfoSchema),
  getProfileInfoController
);

export default router;
