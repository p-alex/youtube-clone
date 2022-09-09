import express from 'express';
import validateResource from '../../middleware/validateResource';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
} from './auth.controller';
import { loginUserSchema, logoutUserSchema } from './auth.schema';

const router = express.Router();

router.post('/api/auth', validateResource(loginUserSchema), loginUserController);
router.get('/api/auth/refresh', refreshTokenController);
router.post('/api/auth/logout', validateResource(logoutUserSchema), logoutUserController);

export default router;
