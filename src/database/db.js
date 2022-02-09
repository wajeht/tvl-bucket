const { env } = require('../config/env.js');

const options = require('./knexfile.js');

const db = require('knex')(options[env]);

module.exports = db;
