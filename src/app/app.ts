import express, { Application } from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import v1 from './api/v1/v1.api';
import auth from './middlewares/auth';
import { errorHandler, notFoundHandler } from './middlewares/error';

const app: Application = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', auth, v1);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
