/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('user_roles').del();
  await knex('user_roles').insert([
    { userId: 1, roleValue: 1 },
    { userId: 2, roleValue: 2 },
  ]);
};
