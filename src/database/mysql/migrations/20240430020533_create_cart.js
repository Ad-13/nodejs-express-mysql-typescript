/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const isExists = await knex.schema.hasTable('cart');

  if (!isExists) {
    return knex.schema.createTable('cart', function (table) {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('productId');
      table.string('productType', 255);
      table.integer('quantity');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cart');
};
