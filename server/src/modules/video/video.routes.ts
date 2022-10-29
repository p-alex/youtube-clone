import express from 'express';
import multer from 'multer';
import { getUserFormAccessToken } from '../../middleware/getUserFromAccessToken';
import { parseVideoData } from '../../middleware/parseVideoData';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import {
  deleteVideoController,
  getUserVideosController,
  getVideoController,
  getVideosController,
  getVideoTagsController,
  likeOrDislikeVideoController,
  searchVideosController,
  updateVideoController,
  uploadVideoController,
} from './video.controller';
import {
  deleteVideoSchema,
  getVideoSchema,
  getVideoTagsSchema,
  likeOrDislikeVideoSchema,
  searchVideosSchema,
  updateVideoSchema,
  uploadVideoSchema,
} from './video.schema';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/api/videos', requireAuth, getVideosController);

router.get('/api/videos/manage', requireAuth, getUserVideosController);

router.get(
  '/api/videos/:videoId',
  requireAuth,
  validateResource(getVideoSchema),
  getVideoController
);

router.post(
  '/api/videos',
  requireAuth,
  upload.single('videoFile'),
  parseVideoData,
  validateResource(uploadVideoSchema),
  uploadVideoController
);

router.patch(
  '/api/videos',
  requireAuth,
  validateResource(updateVideoSchema),
  updateVideoController
);

router.delete(
  '/api/videos',
  requireAuth,
  validateResource(deleteVideoSchema),
  deleteVideoController
);

router.post(
  '/api/videos/likes',
  requireAuth,
  validateResource(likeOrDislikeVideoSchema),
  likeOrDislikeVideoController
);

router.get(
  '/api/videos/:videoId/tags',
  requireAuth,
  validateResource(getVideoTagsSchema),
  getVideoTagsController
);

router.get(
  '/api/videos/search/:query',
  requireAuth,
  validateResource(searchVideosSchema),
  searchVideosController
);

export default router;
