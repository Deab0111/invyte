exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()

    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('rank')
    table.string('phone')

    table.string('email').notNullable().unique()

    table.string('password_hash').notNullable()

    table.string('role').notNullable().defaultTo('user')

    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}