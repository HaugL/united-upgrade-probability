
exports.up = function(knex, Promise) {
  return knex.schema.createTable('routes', function (table) {
    table.increments()
    table.integer('flight_number')
    table.string('from')
    table.string('to')
    table.time('departure_time')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('routes')
};
