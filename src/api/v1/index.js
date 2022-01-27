const express = require('express');
const router = express.Router();

const videoRouter = require('./video/video.router.js');

router.use('/video', videoRouter);

module.exports = router;
