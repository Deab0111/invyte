exports.seed = async function(knex) {
  await knex('rsvps').del()

  await knex('rsvps').insert([
    {
      event_id: 1,
      user_id: 2,
      name: 'Test User',
      email: 'user@invyte.com',
      status: 'confirmed',
      confirmation_number: 'INVYTE-TEST-001',
      meal_preference: 'Chicken'
    }
  ])
}