const express = require('express');
const router = express.Router();

const { getSingleVideo } = require('./video.controller.js');

router.get('/', getSingleVideo);

module.exports = router;
