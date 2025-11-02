const db = require('../config/db');

exports.getAllShows = async (req, res) => {
  try {
    // We use .join() to get data from related tables
    const shows = await db('shows')
      .join('movies', 'shows.movie_id', 'movies.id')
      .join('theatres', 'shows.theatre_id', 'theatres.id')
      .select(
        'shows.id',
        'shows.start_time',
        'movies.title as movie_title',
        'theatres.name as theatre_name'
      );

    res.status(200).json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching shows' });
  }
};