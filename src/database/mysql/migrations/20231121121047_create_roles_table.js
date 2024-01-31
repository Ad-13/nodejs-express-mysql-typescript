/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const isExists = await knex.schema.hasTable('roles');

  if (!isExists) {
    return knex.schema.createTable('roles', table => {
      table.increments('id').primary();
      table.string('description').notNullable().unique();
      table.integer('value').unsigned().notNullable().unique().defaultTo(1);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('roles');
};
