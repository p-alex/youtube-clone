import express from 'express';
import { googleOAuthHandler } from './session.controller';

const router = express.Router();

router.get('/sessions/oauth/google', googleOAuthHandler);

export default router;
