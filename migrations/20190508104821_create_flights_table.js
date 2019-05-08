
exports.up = function(knex, Promise) {
  return knex.schema.createTable('flights', function (table) {
    table.increments()
    table.integer('route_id').unsigned()
    table.foreign('route_id').references('routes.id')
    table.date('date')
    table.string('day_of_week')
    table.integer('available_seats')
    table.integer('cash_booked_seats')
    table.integer('upgraded_seats')
    table.integer('waitlist_count')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flights')
};
