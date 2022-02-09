import path from 'path';
import fs from 'fs';
import { root } from './directory';

const makeUserDataFolder = (username: string): string => {
  try {
    const currentWeek = new Date().toLocaleDateString().split('/').join('-');
    const folder = path.join(root, 'src', 'public', 'upload', username, currentWeek);
    if (!fs.existsSync(path)) {
      fs.mkdir(folder, { recursive: true }, err => {
        if (err) throw err;
      });
    }
    return folder;
  } catch (err: any) {
    return err;
  }
};

export default makeUserDataFolder;
