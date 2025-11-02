/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('bookings', (table) => {
    table.increments('id').primary();

    // Foreign key for users
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

    // Foreign key for shows
    table.integer('show_id').unsigned().notNullable();
    table.foreign('show_id').references('id').inTable('shows').onDelete('CASCADE');

    // Foreign key for seats
    table.integer('seat_id').unsigned().notNullable();
    table.foreign('seat_id').references('id').inTable('seats').onDelete('CASCADE');

    table.dateTime('booked_at').defaultTo(knex.fn.now()); // Record when it was booked
    
    // You could add another unique constraint here if a user can't book the same seat twice
    // For now, the 'seats' table status changing to 'booked' will handle this.
    
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('bookings');
};