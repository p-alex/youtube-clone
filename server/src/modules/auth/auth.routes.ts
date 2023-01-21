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

router.post('/auth', validateResource(loginUserSchema), loginUserController);
router.get('/auth/refresh', refreshTokenController);
router.post('/auth/logout', validateResource(logoutUserSchema), logoutUserController);
router.post(
  '/auth/verify-email',
  validateResource(verifyEmailSchema),
  verifyEmailController
);

export default router;
