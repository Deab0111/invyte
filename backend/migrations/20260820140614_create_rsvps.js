exports.up = function(knex) {
  return knex.schema.createTable('rsvps', (table) => {
    table.increments('id').primary()

    table
      .integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')

    table
      .integer('user_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL')

    table.string('name').notNullable()

    table.string('email').notNullable()

    table
      .string('status')
      .notNullable()
      .defaultTo('confirmed')

    table
      .string('confirmation_number')
      .notNullable()
      .unique()

    table.string('meal_preference')

    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('rsvps')
}