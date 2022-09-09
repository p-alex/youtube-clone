import express from 'express';
import auth from './auth/auth.routes';
import user from './user/user.routes';
import video from './video/video.routes';
import comment from './comment/comment.routes';
const router = express.Router();

router.use(auth);
router.use(user);
router.use(video);
router.use(comment);

export default router;
