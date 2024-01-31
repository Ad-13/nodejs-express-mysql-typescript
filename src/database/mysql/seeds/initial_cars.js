/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('cars').del();
  await knex('cars').insert([
    { make: 'Toyota', model: 'Camry', year: 2022 },
    { make: 'Honda', model: 'Civic', year: 2021 },
  ]);
};
