exports.seed = async function(knex) {
  await knex('events').del()

  await knex('events').insert([
    {
      host_id: 2,
      name: 'Test Event',
      description: 'A test event for development',
      event_date: '2026-09-15',
      start_time: '18:00',
      location: 'Shreveport, LA',
      capacity: 100,
      share_code: 'test-event-001'
    }
  ])
}