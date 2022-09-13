import express from "express";
import { requireAuth } from "../../middleware/requireAuth";
import validateResource from "../../middleware/validateResource";
import {
  getCommentsController,
  addCommentController,
  deleteCommentController,
  updateCommentController,
  likeOrDislikeCommentController,
} from "./comment.controller";
import {
  getCommentsSchema,
  addCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
  likeOrDislikeCommentSchema,
} from "./comment.schema";

const router = express.Router();

router.get(
  "/api/comments/:videoId/:page",
  requireAuth,
  validateResource(getCommentsSchema),
  getCommentsController
);

router.post(
  "/api/comments",
  requireAuth,
  validateResource(addCommentSchema),
  addCommentController
);

router.patch(
  "/api/comments",
  requireAuth,
  validateResource(updateCommentSchema),
  updateCommentController
);

router.delete(
  "/api/comments",
  requireAuth,
  validateResource(deleteCommentSchema),
  deleteCommentController
);

router.post(
  "/api/comments/likes",
  requireAuth,
  validateResource(likeOrDislikeCommentSchema),
  likeOrDislikeCommentController
);

export default router;
