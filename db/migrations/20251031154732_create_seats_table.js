/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('seats', (table) => {
    table.increments('id').primary();

    // Foreign key for shows
    table.integer('show_id').unsigned().notNullable();
    table.foreign('show_id').references('id').inTable('shows').onDelete('CASCADE');

    table.string('row').notNullable();
    table.integer('number').notNullable();
    table.decimal('price').notNullable();
    
    // The status of the seat for this show
    table.string('status').notNullable().defaultTo('available'); // e.g., 'available', 'booked'

    // *** CRITICAL CONSTRAINT ***
    // This prevents duplicate seats (e.g., two "A5" seats) for the SAME show.
    table.unique(['show_id', 'row', 'number']);

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('seats');
};