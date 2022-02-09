import express from 'express';
const router = express.Router();

import videoRouter from './video/video.router.js';

router.use('/video', videoRouter);

export default router;
