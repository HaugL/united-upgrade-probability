require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  version: '11.2',
  connection: {
    host : '127.0.0.1',
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
  }
});

export const getBookshelf = () => {

}

export const closeConnection = () => {

}
