/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('sellers').del()
  await knex('sellers').insert([
    { name: 'seller-1', email: 'seller-1@example.com', password: '111' },
    { name: 'seller-2', email: 'seller-2@example.com', password: '111' },
  ]);
};
