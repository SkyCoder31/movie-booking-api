const db = require('../config/db');

exports.createBooking = async (req, res) => {
  // 1. Get the booking details from the request body
  // We'll get user_id, show_id, and seat_id
  const { show_id, seat_id } = req.body;

  const user_id = req.user.id;

  // 2. Start a database transaction
  const trx = await db.transaction();
  try {
    // 3. (Atomic Update) Try to "claim" the seat
    // We update the seat status to 'booked' ONLY IF it's 'available'
    const updatedSeats = await trx('seats')
      .where({
        id: seat_id,
        status: 'available' // This is the critical check
      })
      .update({
        status: 'booked'
      })
      .returning('id'); // Get the ID of the seat we just booked

    // 4. Check if the update worked
    if (updatedSeats.length === 0) {
      // If 0, it means the seat was NOT 'available' (someone else got it)
      // Throw an error to abort the transaction
      throw new Error('Seat is not available or does not exist.');
    }

    // 5. If the update succeeded, create the booking record
    const [newBooking] = await trx('bookings')
      .insert({
        user_id: user_id,
        show_id: show_id,
        seat_id: seat_id,
      })
      .returning('*');

    // 6. If all went well, commit the transaction
    await trx.commit();

    // 7. Send a success response
    res.status(201).json({
      message: 'Booking successful!',
      booking: newBooking
    });

  } catch (error) {
    // 8. If any error occurred (e.g., seat not available), roll back
    await trx.rollback();
    
    // Send a conflict error if it was our "seat not available" error
    if (error.message.includes('Seat is not available')) {
      return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    
    // Otherwise, send a generic server error
    console.error(error);
    res.status(500).json({ message: 'Server error creating booking' });
  }
};