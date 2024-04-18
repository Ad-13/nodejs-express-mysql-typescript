/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('tires').del();
  await knex('tires').insert([
    { name: 'Brake Pad', price: 30.0 },
    { name: 'Oil Filter', price: 5.0 },
  ]);
};
