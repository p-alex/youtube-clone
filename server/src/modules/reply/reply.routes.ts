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

router.get(
  '/api/replies/:commentId/:page',
  requireAuth,
  validateResource(getRepliesSchema),
  getRepliesController
);

router.post(
  '/api/replies',
  requireAuth,
  validateResource(addReplySchema),
  addReplyController
);

router.patch(
  '/api/replies',
  requireAuth,
  validateResource(updateReplySchema),
  updateReplyController
);

router.delete(
  '/api/replies',
  requireAuth,
  validateResource(deleteReplySchema),
  deleteReplyController
);

router.post(
  '/api/replies/:replyId/like',
  requireAuth,
  validateResource(likeReplySchema),
  likeReplyController
);

router.post(
  '/api/replies/:replyId/dislike',
  requireAuth,
  validateResource(dislikeReplySchema),
  dislikeReplyController
);

export default router;
