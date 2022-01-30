const express = require('express');
const router = express.Router();

const { uploadVideo } = require('../../../middlewares/upload.js');

const {
	getVideo,
	getVideos,
	postVideo,
	updateVideo,
	deleteVideo,
} = require('./video.controller.js');

router.get('/', getVideos);
router.post('/', uploadVideo, postVideo);

router.get('/:id', getVideo);
router.put('/:id', uploadVideo, updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
