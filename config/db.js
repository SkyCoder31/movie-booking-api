const knex = require('knex');
const knexConfig = require('../knexfile'); // Adjust path as needed

// We want to use the 'development' environment
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

// Export the connection
module.exports = knex(config);