import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  getRepliesController,
  addReplyController,
  deleteReplyController,
  updateReplyController,
  likeReplyController,
  dislikeReplyController,
} from './reply.controller';
import {
  getRepliesSchema,
  addReplySchema,
  deleteReplySchema,
  updateReplySchema,
  likeReplySchema,
  dislikeReplySchema,
} from './reply.schema';

const router = express.Router();

router.post(
  '/replies/:commentId/:page',
  validateResource(getRepliesSchema),
  getRepliesController
);

router.post(
  '/replies',
  requireAuth,
  validateResource(addReplySchema),
  addReplyController
);

router.patch(
  '/replies',
  requireAuth,
  validateResource(updateReplySchema),
  updateReplyController
);

router.delete(
  '/replies',
  requireAuth,
  validateResource(deleteReplySchema),
  deleteReplyController
);

router.post(
  '/replies/react/like/:replyId',
  requireAuth,
  validateResource(likeReplySchema),
  likeReplyController
);

router.post(
  '/replies/react/dislike/:replyId',
  requireAuth,
  validateResource(dislikeReplySchema),
  dislikeReplyController
);

export default router;
