import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

const dbPool = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
})

export default dbPool.promise();