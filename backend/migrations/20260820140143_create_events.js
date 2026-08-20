exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary()

    table
      .integer('host_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')

    table.string('name').notNullable()
    table.text('description')

    table.date('event_date').notNullable()
    table.time('start_time').notNullable()

    table.string('location').notNullable()

    table.integer('capacity').notNullable()

    table.string('share_code').notNullable().unique()

    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('events')
}