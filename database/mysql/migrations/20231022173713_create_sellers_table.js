/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const isExists = await knex.schema.hasTable('sellers');

  if (!isExists) {
    return knex.schema.createTable('sellers', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique();
      table.string('password');
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('sellers');
};
