import express from 'express';
import { commentEditLimiter, addCommentLimiter } from '../../middleware/rateLimit';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  getCommentsController,
  addCommentController,
  deleteCommentController,
  updateCommentController,
  likeCommentController,
  dislikeCommentController,
} from './comment.controller';
import {
  getCommentsSchema,
  addCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
  likeCommentSchema,
  dislikeCommentSchema,
} from './comment.schema';

const router = express.Router();

router.post(
  '/comments/:videoId/:page',
  validateResource(getCommentsSchema),
  getCommentsController
);

router.post(
  '/comments',
  addCommentLimiter,
  requireAuth,
  validateResource(addCommentSchema),
  addCommentController
);

router.patch(
  '/comments',
  commentEditLimiter,
  requireAuth,
  validateResource(updateCommentSchema),
  updateCommentController
);

router.delete(
  '/comments',
  requireAuth,
  validateResource(deleteCommentSchema),
  deleteCommentController
);

router.post(
  '/comments/react/like/:commentId',
  requireAuth,
  validateResource(likeCommentSchema),
  likeCommentController
);

router.post(
  '/comments/react/dislike/:commentId',
  requireAuth,
  validateResource(dislikeCommentSchema),
  dislikeCommentController
);

export default router;
