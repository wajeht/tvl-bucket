const express = require('express');
const router = express.Router();

const { uploadVideo } = require('../../../middlewares/upload.js');
const { VGetVideo } = require('./video.validation.js');
const { validate } = require('../../../middlewares/validator.js');

const {
	getVideo,
	getVideos,
	postVideo,
	updateVideo,
	deleteVideo,
} = require('./video.controller.js');

router.route('/').get(getVideos).post(uploadVideo, postVideo);

router
	.route('/:id')
	.get(validate(VGetVideo), getVideo)
	.patch(uploadVideo, updateVideo)
	.delete(deleteVideo);

module.exports = router;
