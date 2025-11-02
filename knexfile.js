// We need dotenv to load our .env variables
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg', // This tells knex we are using postgres
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations', // Where to store migration files
    },
    seeds: {
      directory: './db/seeds', // Where to store seed files
    }
  },

  // other environments  (e.g., production, test)
  test: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: 'movie_booking_db_test', // Use the test database
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  },

  // production environment
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL, // Render provides this
      ssl: { rejectUnauthorized: false } // Required for Render connections
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  }
};