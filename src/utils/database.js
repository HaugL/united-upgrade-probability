require('dotenv').config();

const knexFile = require('../../knexfile.js');
const knex = require('knex')(knexFile[process.env.KNEX_ENVIRONMENT]);
module.exports.Bookshelf = require('bookshelf')(knex);

export const closeConnection = () => {
  knex.destroy();
};
