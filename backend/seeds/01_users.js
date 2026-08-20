const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  await knex('users').del()

  const password = await bcrypt.hash('password123', 10)

  await knex('users').insert([
    {
      first_name: 'John',
      last_name: 'Admin',
      email: 'admin@invyte.com',
      password_hash: password,
      role: 'admin',
      rank: 'Captain',
      phone: '555-111-1111'
    },
    {
      first_name: 'Henry',
      last_name: 'Host',
      email: 'host@invyte.com',
      password_hash: password,
      role: 'host',
      rank: 'Major',
      phone: '555-222-2222'
    },
    {
      first_name: 'John',
      last_name: 'User',
      email: 'user@invyte.com',
      password_hash: password,
      role: 'user',
      rank: 'Staff Sergeant',
      phone: '555-333-3333'
    }
  ])
}