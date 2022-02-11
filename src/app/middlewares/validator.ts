import fs from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validate = (schemas: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(schemas.map((schema: any) => schema.run(req)));

      const result = validationResult(req);

      if (result.isEmpty()) {
        return next();
      }

      if (req.file) {
        const { path } = req.file;
        const removed = await fs.unlink(path);
        // TODO: currently the file is still being uploaded
        // TODO: even after validation errors occurred
        // TODO: this little hack will delete the file
      }

      // TODO: Fix this
      // const { errors  } = result;

      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'failed',
        request_url: req.originalUrl,
        message: 'Validation errors in your request!',
        result, // TODO: suposed to be errors from above
      });
    } catch (err) {
      next(err);
    }
  };
};

export default validate;
