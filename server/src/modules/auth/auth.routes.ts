import express from 'express';
import { loginLimiter, verifyEmailLimiter } from '../../middleware/rateLimit';
import validateResource from '../../middleware/validateResource';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  verifyEmailController,
} from './auth.controller';
import { loginUserSchema, logoutUserSchema, verifyEmailSchema } from './auth.schema';

const router = express.Router();

router.post(
  '/auth',
  loginLimiter,
  validateResource(loginUserSchema),
  loginUserController
);

router.get('/auth/refresh', refreshTokenController);

router.post('/auth/logout', validateResource(logoutUserSchema), logoutUserController);

router.post(
  '/auth/verify-email',
  verifyEmailLimiter,
  validateResource(verifyEmailSchema),
  verifyEmailController
);

export default router;
