import  env  from'../config/env';

import options from './knexfile';

import { Knex, knex } from 'knex'


import db from'knex'options[env];

module.exports = db;
