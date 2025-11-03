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

exports.getShowsForMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await db('shows')
      .where({ movie_id: movieId })
      .join('theatres', 'shows.theatre_id', 'theatres.id')
      .select(
        'shows.id',
        'shows.start_time',
        'theatres.name as theatre_name'
      )
      .orderBy('shows.start_time', 'asc');

    if (shows.length === 0) {
      return res.status(404).json({ message: 'No shows found for this movie' });
    }

    res.status(200).json(shows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching shows' });
  }
};