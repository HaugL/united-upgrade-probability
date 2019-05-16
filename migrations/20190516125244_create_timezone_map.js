
exports.up = function(knex, Promise) {
  return knex.schema.createTable('airport_timezone_map', function (table) {
    table.increments()
    table.string('airport_code')
    table.string('city')
    table.string('timezone')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('airport_timezone_map')
};
