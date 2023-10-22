/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('car_parts').del()
  await knex('car_parts').insert([
    { name: 'Brake Pad', price: 30.0, car_id: 1 },
    { name: 'Oil Filter', price: 5.0, car_id: 2 },
  ]);
};
