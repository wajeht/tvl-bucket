const express = require('express');
const app = express();

const path = require('path');

const { auth } = require('../src/middlewares/auth.js');
const v1 = require('./api/v1/index.js');

const compression = require('compression');
const helmet = require('helmet');
const { errorHandler, notFoundHandler } = require('./middlewares/error.js');

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', auth, v1);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
