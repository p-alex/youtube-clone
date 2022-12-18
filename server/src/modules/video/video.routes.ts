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
  getVideoSchema,
  getVideoTagsSchema,
  likeVideoSchema,
  searchVideosSchema,
  updateVideoSchema,
  uploadVideoSchema,
} from './video.schema';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/api/videos', getVideosController);

router.get('/api/videos/manage', requireAuth, getUserVideosController);

router.post(
  '/api/videos/suggested',
  validateResource(getSuggestedVideosSchema),
  getSuggestedVideosController
);

router.post('/api/videos/:videoId', validateResource(getVideoSchema), getVideoController);

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
  '/api/videos/:videoId/like',
  requireAuth,
  validateResource(likeVideoSchema),
  likeVideoController
);

router.post(
  '/api/videos/:videoId/dislike',
  requireAuth,
  validateResource(dislikeVideoSchema),
  dislikeVideoController
);

router.get(
  '/api/videos/:videoId/tags',
  requireAuth,
  validateResource(getVideoTagsSchema),
  getVideoTagsController
);

router.get(
  '/api/videos/search/:query',
  validateResource(searchVideosSchema),
  searchVideosController
);

export default router;
