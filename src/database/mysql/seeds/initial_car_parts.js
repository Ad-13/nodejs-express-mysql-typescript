/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('car_parts').del();
  await knex('car_parts').insert([
    { name: 'Brake Pad', price: 30.0 },
    { name: 'Oil Filter', price: 5.0 },
  ]);
};
