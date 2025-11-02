const Redis = require('ioredis');

// Use the REDIS_URL from environment variables if it exists,
// otherwise, fall back to the local default.
const connectionString = process.env.REDIS_URL || 'redis://localhost:6379';

const redis = new Redis(connectionString);

redis.on('connect', () => {
  console.log('Connected to Redis successfully!');
});

redis.on('error', (err) => {
  console.error('Could not connect to Redis:', err);
});

module.exports = redis;