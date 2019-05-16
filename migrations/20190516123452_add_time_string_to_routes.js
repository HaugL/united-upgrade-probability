
exports.up = function(knex, Promise) {
  return knex.schema.table('routes', function (table) {
    table.string('departure_time_string');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('routes', function (table) {
    table.dropColumn('departure_time_string');
  })
};
