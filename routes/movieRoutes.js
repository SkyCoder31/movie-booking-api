const express = require('express');
const router = express.Router();

// Import the controller function
const movieController = require('../controllers/movieController');

// Define the route
// A GET request to /api/movies/ will run the getAllMovies function
router.get('/', movieController.getAllMovies);

router.get('/:movieId/shows', movieController.getShowsForMovie);

module.exports = router;