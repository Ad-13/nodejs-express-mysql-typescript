/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const isExists = await knex.schema.hasTable('contact_messages');

  if (!isExists) {
    return knex.schema.createTable('contact_messages', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.text('message').notNullable();
      table.integer('carId').unsigned().references('id').inTable('cars').onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('contact_messages');
};
