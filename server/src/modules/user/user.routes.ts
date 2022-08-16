import express from 'express';
import validateResource from '../../middleware/validateResource';
import { getUserController, registerUserController } from './user.controller';
import { registerUserSchema } from './user.scheme';

const router = express.Router();

router.get('/api/users', getUserController);
router.post('/api/users', validateResource(registerUserSchema), registerUserController);

export default router;
