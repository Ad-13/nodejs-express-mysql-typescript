/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    { name: 'admin', email: '1313@1313.com', password: '1313', roles: [9**3] },
    { name: 'user', email: 'user@user.com', password: '111', roles: [1]},
  ]);
};
