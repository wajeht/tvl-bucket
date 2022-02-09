import app from '../app/app';

import env from '../config/env';
const { port } = env;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
