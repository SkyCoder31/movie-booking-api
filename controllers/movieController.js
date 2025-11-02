// Import our database connection
const db = require('../config/db');

// Controller function to get all movies
exports.getAllMovies = async (req, res) => {
  try {
    // 1. Fetch all movies from the 'movies' table
    const movies = await db('movies').select('*');
    
    // 2. Send the list of movies as a JSON response
    res.status(200).json(movies);
  } catch (error) {
    // 3. If an error happens, send a server error response
    console.error(error);
    res.status(500).json({ message: 'Server error fetching movies' });
  }
};