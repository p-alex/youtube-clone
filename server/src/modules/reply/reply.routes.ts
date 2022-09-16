import express from "express";
import { requireAuth } from "../../middleware/requireAuth";
import validateResource from "../../middleware/validateResource";
import {
  getRepliesController,
  addReplyController,
  deleteReplyController,
  updateReplyController,
  likeOrDislikeReplyController,
} from "./reply.controller";
import {
  getRepliesSchema,
  addReplySchema,
  deleteReplySchema,
  updateReplySchema,
  likeOrDislikeReplySchema,
} from "./reply.schema";

const router = express.Router();

router.get(
  "/api/replies/:commentId/:page",
  requireAuth,
  validateResource(getRepliesSchema),
  getRepliesController
);

router.post(
  "/api/replies",
  requireAuth,
  validateResource(addReplySchema),
  addReplyController
);

router.patch(
  "/api/replies",
  requireAuth,
  validateResource(updateReplySchema),
  updateReplyController
);

router.delete(
  "/api/replies",
  requireAuth,
  validateResource(deleteReplySchema),
  deleteReplyController
);

router.post(
  "/api/replies/likes",
  requireAuth,
  validateResource(likeOrDislikeReplySchema),
  likeOrDislikeReplyController
);

export default router;
