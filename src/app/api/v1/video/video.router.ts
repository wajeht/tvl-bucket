import VideoValidation from './video.validation';
import VideoController from './video.controller';
import validate from '../../../middlewares/validator'; //
import express, { Router } from 'express';
import { uploadVideo } from '../../../middlewares/upload';

const router: Router = express.Router();

router
  .route('/')
  .get(VideoController.getVideos)
  .post(uploadVideo, validate(VideoValidation.postVideo), VideoController.postVideo);

router
  .route('/:id')
  .get(validate(VideoValidation.getVideo), VideoController.getVideo)
  .patch(validate(VideoValidation.updateVideo), uploadVideo, VideoController.updateVideo)
  .delete(validate(VideoValidation.deleteVideo), VideoController.deleteVideo);

export default router;
