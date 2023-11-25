/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('clients').del()
  await knex('clients').insert([
    { name: 'client-1', email: 'client-1@example.com', password: '111' },
    { name: 'client-2', email: 'client-2@example.com', password: '111' },
  ]);
};
