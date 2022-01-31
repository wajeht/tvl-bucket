const express = require('express');
const app = express();

const path = require('path');

const { isAuth } = require('../src/middlewares/auth.js');
const v1 = require('./api/v1/index.js');

const compression = require('compression');
const helmet = require('helmet');

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', isAuth, v1);

app.use('*', (req, res, next) => {
	res.status(403).json({
		request_url: req.originalUrl,
		message: `You don't have permission to access ${req.originalUrl} on this server.!`,
	});
});

app.use((err, req, res, next) => {
	res.status(500).json({ request_url: req.originalUrl, message: err.message });
});

module.exports = app;
