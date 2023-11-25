/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('cars').del()
  await knex('cars').insert([
    { make: 'Toyota', brand: 'Camry', year: 2022 },
    { make: 'Honda', brand: 'Civic', year: 2021 },
  ]);
};
