const express = require('express');
const router = express.Router();

const {
	getVideo,
	getVideos,
	postVideo,
	updateVideo,
  deleteVideo,
} = require('./video.controller.js');

router.route('/')
      .get(getVideos)
      .post(postVideo);

router.route('/:id')
      .get(getVideo)
      .put(updateVideo)
      .delete(deleteVideo);

module.exports = router;
