// Import required packages
const express = require('express');
require('dotenv').config(); // Loads .env file contents into process.env


const movieRoutes = require('./routes/movieRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// Initialize the express app
const app = express();

// This allows our app to understand JSON in request bodies
app.use(express.json());

// Define the port. Fallback to 3000 if PORT isn't in the .env file
const PORT = process.env.PORT || 3000;

// A simple "Hello World" route to test
app.get('/', (req, res) => {
  res.send('Movie Booking API is running!');
});

// Tell the app to use your movieRoutes for any URL that starts with '/api/movies'
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});