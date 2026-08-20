const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  await knex('users').del()

  const password = await bcrypt.hash('password123', 10)

  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@invyte.com',
      password_hash: password,
      role: 'admin'
    },
    {
      name: 'Test User',
      email: 'user@invyte.com',
      password_hash: password,
      role: 'user'
    }
  ])
}