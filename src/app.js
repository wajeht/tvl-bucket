const express = require('express');
const app = express();

const path = require('path');

const compression = require('compression');
const helmet = require('helmet');

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const v1 = require('./api/v1/index.js');
app.use('/api/v1', v1);

module.exports = app;
