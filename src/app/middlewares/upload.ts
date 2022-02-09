import uuid from 'uuid';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

import makeUserDataFolder from '../../utils/make-user-data-folder';

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mov|mpeg/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const { username } = req.body;
    const folder: string = makeUserDataFolder(username);
    setTimeout(() => {
      cb(null, folder);
    }, 5);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    cb(null, uuid.v4 + '.' + file.originalname.split('.')[1]);
  },
});

const upload = multer({
  fileFilter: fileFilter,
  storage: fileStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10mb
  },
});

const uploadVideo = upload.single('video');

export { uploadVideo };
