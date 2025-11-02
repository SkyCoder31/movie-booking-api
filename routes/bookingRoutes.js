const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const { checkIdempotency } = require('../middleware/idempotency');
const { protect } = require('../middleware/authMiddleware');

// A POST request to /api/bookings/ will run the createBooking function
router.post('/', checkIdempotency, protect, bookingController.createBooking);

module.exports = router;