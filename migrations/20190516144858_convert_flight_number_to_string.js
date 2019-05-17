
exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE "routes" ALTER COLUMN "flight_number" TYPE varchar(255)')
};

exports.down = function(knex, Promise) {
  return knex.raw('ALTER TABLE "routes" ALTER COLUMN "flight_number" TYPE integer')
};
