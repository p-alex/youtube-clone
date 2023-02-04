import express from 'express';

import auth from './auth/auth.routes';
import user from './user/user.routes';
import video from './video/video.routes';
import comment from './comment/comment.routes';
import reply from './reply/reply.routes';
import subscription from './subscription/subscription.routes';
import session from './session/session.routes';

const router = express.Router();

router.use(auth);
router.use(user);
router.use(video);
router.use(comment);
router.use(reply);
router.use(subscription);
router.use(session);

export default router;
