const express = require('express');
const router = express.Router();

const { uploadVideo } = require('../../../middlewares/upload.js');
const { validate } = require('../../../middlewares/validator.js');
const VideoValidation = require('./video.validation.js');

const {
	getVideo,
	getVideos,
	postVideo,
	updateVideo,
	deleteVideo,
} = require('./video.controller.js');

router.route('/')
			.get(getVideos)
			.post(validate(VideoValidation.postVideo), uploadVideo, postVideo);

router.route('/:id')
			.get(validate(VideoValidation.getVideo), getVideo)
			.patch(validate(VideoValidation.updateVideo), uploadVideo, updateVideo)
			.delete(validate(VideoValidation.deleteVideo), deleteVideo);

module.exports = router;
