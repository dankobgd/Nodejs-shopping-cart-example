const knex = require('knex');
const databaseConfig = require('./knexfile');

const ENV = process.env.NODE_ENV || 'development';
const environmentConfig = databaseConfig[ENV];
const connection = knex(environmentConfig);

module.exports = connection;
