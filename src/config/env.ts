import path from 'path';
import root from '../app/utils/directory';

require('dotenv').config({
  path: path.join(root, '.env'),
});

export default {
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    url: process.env.DATABASE_URL,
  },
  port: process.env.PORT,
  cookie: {
    secret: process.env.COOKIE_SECRET,
  },
  env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
};
