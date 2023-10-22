/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const isExists = await knex.schema.hasTable('car_parts');

  if (!isExists) {
    return knex.schema.createTable('car_parts', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.decimal('price').notNullable();
      table.integer('car_id').unsigned().references('id').inTable('cars');
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car_parts');
};
