import express from 'express';
import validateResource from '../../middleware/validateResource';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  verifyEmailController,
} from './auth.controller';
import { loginUserSchema, logoutUserSchema, verifyEmailSchema } from './auth.schema';

const router = express.Router();

router.post('/api/auth', validateResource(loginUserSchema), loginUserController);
router.get('/api/auth/refresh', refreshTokenController);
router.post('/api/auth/logout', validateResource(logoutUserSchema), logoutUserController);
router.post(
  '/api/auth/verify-email',
  validateResource(verifyEmailSchema),
  verifyEmailController
);

export default router;
