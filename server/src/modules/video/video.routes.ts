import express from 'express';
import multer from 'multer';
import { requireAuth } from '../../middleware/requireAuth';
import validateResource from '../../middleware/validateResource';
import { addNewVideoController, uploadVideoController } from './video.controller';
import { addNewVideoSchema } from './video.schema';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post(
  '/api/videos/upload',
  requireAuth,
  upload.single('video'),
  uploadVideoController
);
router.post(
  '/api/videos',
  requireAuth,
  validateResource(addNewVideoSchema),
  addNewVideoController
);

export default router;
