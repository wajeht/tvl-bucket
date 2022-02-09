import Knex from 'knex';
import options from './knexfile';
// import config from '../config/env';
// const { env } = config;

export default Knex(options.development);
