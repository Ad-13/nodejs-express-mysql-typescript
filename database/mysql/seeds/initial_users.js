/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    { name: 'John Doe', email: 'john@example.com', password: '111' },
    { name: 'Jane Smith', email: 'jane@example.com', password: '111' },
  ]);
};
