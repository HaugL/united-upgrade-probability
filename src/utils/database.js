require('dotenv').config();

var knexFile = require('../knexfile.js');
var knex = require('knex')(knexFile[process.env.KNEX_ENVIRONMENT]);
var bookshelf = module.exports = require('bookshelf')(knex);

export const getBookshelf = () => bookshelf;

export const closeConnection = () => {

};
