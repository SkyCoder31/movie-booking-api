const db = require('../config/db');

exports.getSeatsForShow = async (req, res) => {
  try {
    // 1. Get the show ID from the URL parameters
    const { showId } = req.params;

    // 2. Find all seats for that specific show
    const seats = await db('seats')
      .where({ show_id: showId })
      .select('id', 'row', 'number', 'status', 'price')
      .orderBy('row', 'asc') // Order them nicely
      .orderBy('number', 'asc');

    // 3. Check if any seats were found
    if (seats.length === 0) {
      return res.status(404).json({ message: 'No seats found for this show' });
    }

    // 4. Send the list of seats
    res.status(200).json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching seats' });
  }
};