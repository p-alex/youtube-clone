import express from 'express';
import { googleOAuthController } from './session.controller';

const router = express.Router();

router.get('/sessions/oauth/google', googleOAuthController);

export default router;
