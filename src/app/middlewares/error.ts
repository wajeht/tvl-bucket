import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config/env';
const { env } = config;

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: 'fail',
    request_url: req.originalUrl,
    message: 'The resource does not exist!',
  });
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    request_url: req.originalUrl,
    message:
      env == 'development'
        ? err.stack
        : 'The server encountered an internal error or misconfiguration and was unable to complete your request.',
  });
};

export { notFoundHandler, errorHandler };
