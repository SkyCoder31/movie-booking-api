const redis = require('../config/redis');

const checkIdempotency = async (req, res, next) => {
  const idempotencyKey = req.headers['idempotency-key'];

  // 1. If no key, we can't check. Proceed to the controller.
  if (!idempotencyKey) {
    return next(); // 'next()' passes control to the next function (the controller)
  }

  try {
    // 2. Check if we've seen this key before
    const cachedResponse = await redis.get(idempotencyKey);

    if (cachedResponse) {
      // 3. We HAVE seen it! Send the cached response and stop.
      console.log(`[Idempotency] Hit: ${idempotencyKey}`);
      return res.status(200).json(JSON.parse(cachedResponse));
    }

    // 4. We have NOT seen it.
    console.log(`[Idempotency] Miss: ${idempotencyKey}`);

    // We override the 'res.json' function to cache the response
    const originalJson = res.json;
    res.json = (body) => {
      // Store the response in Redis. Set to expire in 24 hours.
      redis.set(idempotencyKey, JSON.stringify(body), 'EX', 60 * 60 * 24);
      originalJson.call(res, body);
    };

    // Proceed to the controller to process the booking
    next();

  } catch (error) {
    console.error('Redis error:', error);
    next(error); // Pass the error
  }
};

module.exports = { checkIdempotency };