import express, { Router } from 'express';
import videoRouter from './video/video.router';
const router: Router = express.Router();

router.use('/video', videoRouter);

export default router;
