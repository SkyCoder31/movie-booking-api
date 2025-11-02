// Import 'supertest' and our Express app
const request = require('supertest');
const express =require('express'); // We need to create a test app instance
const db = require('../config/db'); // Our database connection
const redis = require('../config/redis'); // Our redis connection

// --- Create a test app ---
// We can't just import 'server.js' because it's already listening.
// We have to re-build the app for testing.
const app = express();
app.use(express.json());
// Import and use our routes
const movieRoutes = require('../routes/movieRoutes');
const showRoutes = require('../routes/showRoutes');
const bookingRoutes = require('../routes/bookingRoutes');
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);
// -------------------------


// 'describe' groups tests together
describe('Booking API Endpoints', () => {

  // Before all tests, migrate and seed the TEST database
  beforeAll(async () => {
    // Note: We are using the 'test' environment thanks to NODE_ENV=test
    await db.migrate.latest();
    await db.seed.run();
  });

  // After all tests, destroy the database connection
  afterAll(async () => {
    await db.destroy();
    await redis.quit();
  });

  // 'it' defines a single test case
  it('should successfully book an available seat', async () => {
    // 1. Define the booking
    const newBooking = {
      user_id: 1, // From our seed file
      show_id: 1, // From our seed file
      seat_id: 3   // Seat A3, which is available
    };

    // 2. Make the POST request
    const response = await request(app)
      .post('/api/bookings')
      .send(newBooking);

    // 3. Assert the results
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Booking successful!');
    expect(response.body.booking.seat_id).toBe(3);
  });

  it('should fail to book an already booked seat (concurrency test)', async () => {
    // 1. Define the booking (for the same seat we just booked)
    const duplicateBooking = {
      user_id: 1,
      show_id: 1,
      seat_id: 3 // Seat A3, which is now 'booked'
    };

    // 2. Make the POST request
    const response = await request(app)
      .post('/api/bookings')
      .send(duplicateBooking);

    // 3. Assert the results
    expect(response.statusCode).toBe(409); // 409 Conflict
    expect(response.body.message).toBe('Seat is not available or does not exist.');
  });
});