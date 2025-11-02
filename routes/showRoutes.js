const express = require('express');
const router = express.Router();

// Import both controllers
const showController = require('../controllers/showController');
const seatController = require('../controllers/seatController');

// Route for GET /api/shows
router.get('/', showController.getAllShows);

// Route for GET /api/shows/:showId/seats
// We use :showId to capture the ID from the URL
router.get('/:showId/seats', seatController.getSeatsForShow);


module.exports = router;