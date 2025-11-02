/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // 'exports.up' is run when we "migrate"
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID column
    table.string('name').notNullable();
    table.string('email').notNullable().unique(); // Email must be unique
    table.string('password_hash').notNullable();
    table.timestamps(true, true); // Adds 'created_at' and 'updated_at'
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // 'exports.up' is run when we "migrate"
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID column
    table.string('name').notNullable();
    table.string('email').notNullable().unique(); // Email must be unique
    table.string('password_hash').notNullable();
    table.timestamps(true, true); // Adds 'created_at' and 'updated_at'
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // 'exports.down' is run when we "rollback"
  return knex.schema.dropTable('users');
};