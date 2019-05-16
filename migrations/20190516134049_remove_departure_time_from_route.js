
exports.up = function(knex, Promise) {
  return knex.schema.table('routes', function (table) {
    table.dropColumn('departure_time');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('routes', function (table) {
    table.time('departure_time')
  })
};
