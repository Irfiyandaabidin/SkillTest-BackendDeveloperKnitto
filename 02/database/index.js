const mysql = require('mysql');

const HOST_DB = process.env.HOST_DB;
const USER_DB = process.env.USER_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;
const DATABASE = process.env.DATABASE;

const getConnection = mysql.createConnection({
  host: HOST_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE
});

const connection = () => {
  getConnection.connect((err) => {
    if(err) throw err;
    console.log('Connected DB MySQL!');
  })
}

module.exports = { connection, getConnection }