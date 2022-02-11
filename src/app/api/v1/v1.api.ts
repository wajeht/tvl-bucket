import express from 'express';
const router = express.Router();

import videoRouter from './video/video.router';

router.use('/video', videoRouter);

export default router;
