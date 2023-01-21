import express from 'express';
import multer from 'multer';
import { parseVideoData } from '../../middleware/parseVideoData';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  deleteVideoController,
  dislikeVideoController,
  getSuggestedVideosController,
  getUserVideosController,
  getUserVideosPrivateController,
  getVideoController,
  getVideosController,
  getVideoTagsController,
  likeVideoController,
  searchVideosController,
  updateVideoController,
  uploadVideoController,
} from './video.controller';
import {
  deleteVideoSchema,
  dislikeVideoSchema,
  getSuggestedVideosSchema,
  getUserVideosPrivateSchema,
  getUserVideosSchema,
  getVideoSchema,
  getVideoTagsSchema,
  likeVideoSchema,
  searchVideosSchema,
  updateVideoSchema,
  uploadVideoSchema,
} from './video.schema';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/videos', getVideosController);

router.get(
  '/videos/manage/:sortBy/:page',
  requireAuth,
  validateResource(getUserVideosPrivateSchema),
  getUserVideosPrivateController
);

router.get(
  '/videos/user/:userId/:sortBy/:page',
  validateResource(getUserVideosSchema),
  getUserVideosController
);

router.post(
  '/videos/suggested',
  validateResource(getSuggestedVideosSchema),
  getSuggestedVideosController
);

router.post('/videos/:videoId', validateResource(getVideoSchema), getVideoController);

router.post(
  '/videos',
  requireAuth,
  upload.single('videoFile'),
  parseVideoData,
  validateResource(uploadVideoSchema),
  uploadVideoController
);

router.patch(
  '/videos',
  requireAuth,
  validateResource(updateVideoSchema),
  updateVideoController
);

router.delete(
  '/videos',
  requireAuth,
  validateResource(deleteVideoSchema),
  deleteVideoController
);

router.post(
  '/videos/:videoId/like',
  requireAuth,
  validateResource(likeVideoSchema),
  likeVideoController
);

router.post(
  '/videos/:videoId/dislike',
  requireAuth,
  validateResource(dislikeVideoSchema),
  dislikeVideoController
);

router.get(
  '/videos/:videoId/tags',
  requireAuth,
  validateResource(getVideoTagsSchema),
  getVideoTagsController
);

router.get(
  '/videos/search/:query',
  validateResource(searchVideosSchema),
  searchVideosController
);

export default router;
