/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const isExists = await knex.schema.hasTable('cars');

  if (!isExists) {
    return knex.schema.createTable('cars', table => {
      table.increments('id').primary();
      table.json('images').notNullable();
      table.string('make', 255).notNullable();
      table.string('model', 255).notNullable();
      table.integer('year').notNullable();
      table.integer('price').notNullable();
      table.integer('quantity', 255).notNullable().defaultTo(0);
      table.text('description').nullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
