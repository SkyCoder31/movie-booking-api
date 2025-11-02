/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('shows', (table) => {
    table.increments('id').primary();
    
    // Foreign key for movies
    table.integer('movie_id').unsigned().notNullable();
    table.foreign('movie_id').references('id').inTable('movies').onDelete('CASCADE'); // If a movie is deleted, delete its shows

    // Foreign key for theatres
    table.integer('theatre_id').unsigned().notNullable();
    table.foreign('theatre_id').references('id').inTable('theatres').onDelete('CASCADE'); // If a theatre is deleted, delete its shows

    table.dateTime('start_time').notNullable(); // When the show starts
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('shows');
};