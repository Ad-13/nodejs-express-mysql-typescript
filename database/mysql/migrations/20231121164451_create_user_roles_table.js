/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const isExists = await knex.schema.hasTable('user_roles');
  
  if (!isExists) {
    await knex.schema.createTable('user_roles', function(table) {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('roleId').unsigned().references('id').inTable('roles').onDelete('CASCADE');
    });
  }
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_roles');
};
