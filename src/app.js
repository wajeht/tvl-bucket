const express = require('express');
const app = express();

const compression = require('compression');
const helmet = require('helmet');

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const v1 = require('./api/v1/index.js');
app.use('/api/v1', v1);

module.exports = app;
