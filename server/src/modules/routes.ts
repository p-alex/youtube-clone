import express from 'express';
import auth from './auth/auth.routes';
import user from './user/user.routes';
import video from './video/video.routes';
const router = express.Router();

router.use(auth);
router.use(user);
router.use(video);

export default router;
