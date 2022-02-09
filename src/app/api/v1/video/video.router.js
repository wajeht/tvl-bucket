const express = require('express');
const router = express.Router();

const { uploadVideo } = require('../../../middlewares/upload.js');
const { validate } = require('../../../middlewares/validator.js');
const VideoValidation = require('./video.validation.js');
const VideoController = require('./video.controller.js');

router
	.route('/')
	.get(VideoController.getVideos)
	.post(uploadVideo, validate(VideoValidation.postVideo), VideoController.postVideo);

router
	.route('/:id')
	.get(validate(VideoValidation.getVideo), VideoController.getVideo)
	.patch(validate(VideoValidation.updateVideo), uploadVideo, VideoController.updateVideo)
	.delete(validate(VideoValidation.deleteVideo), VideoController.deleteVideo);

module.exports = router;
