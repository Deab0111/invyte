exports.up = function(knex) {
  return knex.schema.createTable('audit_logs', (table) => {
    table.increments('id').primary()

    table
      .integer('user_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL')

    table
      .integer('event_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('events')
      .onDelete('SET NULL')

    table.string('action').notNullable()

    table.text('details')

    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('audit_logs')
}