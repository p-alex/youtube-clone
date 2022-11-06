import express from 'express';
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

router.get(
  '/api/comments/:videoId/:page',
  validateResource(getCommentsSchema),
  getCommentsController
);

router.post(
  '/api/comments',
  requireAuth,
  validateResource(addCommentSchema),
  addCommentController
);

router.patch(
  '/api/comments',
  requireAuth,
  validateResource(updateCommentSchema),
  updateCommentController
);

router.delete(
  '/api/comments',
  requireAuth,
  validateResource(deleteCommentSchema),
  deleteCommentController
);

router.post(
  '/api/comments/:commentId/like',
  requireAuth,
  validateResource(likeCommentSchema),
  likeCommentController
);

router.post(
  '/api/comments/:commentId/dislike',
  requireAuth,
  validateResource(dislikeCommentSchema),
  dislikeCommentController
);

export default router;
