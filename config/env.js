const path = require('path');
const { root } = require('../utils/directory.js');

require('dotenv').config({
	path: path.join(root, '.env'),
});

module.exports = {
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
};
