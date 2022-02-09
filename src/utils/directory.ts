import path from 'path';
const cur: string = path.dirname(__dirname);
const root: string = path.join(cur, '../');

// const currentDirectory = path.dirname(require.main.filename);

export {
  root,
  // current: currentDirectory,
};
