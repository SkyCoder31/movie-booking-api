/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Use 'await' to make sure operations complete in order

  // 1. Clear out all existing data in reverse order of creation
  await knex('bookings').del();
  await knex('seats').del();
  await knex('shows').del();
  await knex('movies').del();
  await knex('theatres').del();
  await knex('users').del();

  // 1b. Insert a test user
  const [user1] = await knex('users').insert({
    name: 'Test User',
    email: 'test@example.com',
    password_hash: 'dummy_hash_for_testing' // We aren't building auth, so this is fine
  }).returning('id');
  console.log(`Created user with id: ${user1.id}`);

  // 2. Insert new movies and get their IDs
  const [movie1] = await knex('movies').insert({
    title: 'Inception',
    description: 'A mind-bending thriller.'
  }).returning('id');
  
  const [movie2] = await knex('movies').insert({
    title: 'Interstellar',
    description: 'A journey beyond our galaxy.'
  }).returning('id');

  // 3. Insert new theatres and get their IDs
  const [theatre1] = await knex('theatres').insert({
    name: 'Metropolis Cinema',
    location: 'Downtown'
  }).returning('id');

  // 4. Insert new shows using the IDs
  const [show1] = await knex('shows').insert({
    movie_id: movie1.id,
    theatre_id: theatre1.id,
    start_time: new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hours from now
  }).returning('id');
  
  const [show2] = await knex('shows').insert({
    movie_id: movie2.id,
    theatre_id: theatre1.id,
    start_time: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
  }).returning('id');

  // 5. Insert seats for the shows (e.g., a small 5x5 theater)
  const seatsToInsert = [];
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const numbers = [1, 2, 3, 4, 5];
  const price = 15.00;

  // Generate seats for Show 1
  for (const row of rows) {
    for (const number of numbers) {
      seatsToInsert.push({
        show_id: show1.id,
        row: row,
        number: number,
        price: price,
        status: 'available'
      });
    }
  }

  // Generate seats for Show 2
  for (const row of rows) {
    for (const number of numbers) {
      seatsToInsert.push({
        show_id: show2.id,
        row: row,
        number: number,
        price: price,
        status: 'available'
      });
    }
  }

  // Insert all seats in one batch
  await knex('seats').insert(seatsToInsert);
  
  console.log('Seed data inserted successfully!');
};