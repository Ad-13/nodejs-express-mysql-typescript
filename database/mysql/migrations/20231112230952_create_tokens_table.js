/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const isExists = await knex.schema.hasTable('tokens');

  if (!isExists) {
    return knex.schema.createTable('tokens', (table) => {
      table.increments('id').primary();
      table.string('refreshToken', 255).notNullable();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.timestamp('expiresAt').nullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tokens');
};
