/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('roles').del()
  await knex('roles').insert([
    { value: 9**3, description: 'admin'},
    { value: 1, description: 'user'},
    { value: 2**3, description: 'seller'},
  ]);
};
