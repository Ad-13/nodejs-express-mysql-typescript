/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const isExists = await knex.schema.hasTable('tires');

  if (!isExists) {
    return knex.schema.createTable('tires', table => {
      table.increments('id').primary();
      table.json('images').notNullable();
      table.string('brand').notNullable();
      table.string('model').notNullable();
      table.string('size').notNullable();
      table.integer('loadIndex').notNullable();
      table.string('speedRating').notNullable();
      table.decimal('price', 10, 2).notNullable();
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
  return knex.schema.dropTableIfExists('tires');
};
