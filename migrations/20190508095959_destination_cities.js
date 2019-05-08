
exports.up = function(knex, Promise) {
  return knex.schema.createTable('destination_cities', function (table) {
    table.increments()
    table.string('airport_code')
    table.string('city_name')
    table.string('country')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('destination_cities')
};
