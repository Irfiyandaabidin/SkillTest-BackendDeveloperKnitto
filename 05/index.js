require('dotenv').config()
const express = require('express');
const app = express();
const mysql = require('mysql');

const HOST_DB = process.env.HOST_DB;
const USER_DB = process.env.USER_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;
const DATABASE = process.env.DATABASE;

const connection = mysql.createConnection({
  host: HOST_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE
});

connection.connect((err) => {
  if(err) throw err;
  console.log('Connected DB MySQL!');
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

app.get('/api/v1/produk', ((req, res) => {
  const { category } = req.query
  try {
    let query = `SELECT produk.*, category.name as category_name FROM produk INNER JOIN category ON produk.category_id = category.id`;
    if(category) {
      query += ` WHERE produk.category_id = ${category}`
    }
    connection.query(query, (err, results,fields) => {
      if (err) throw err
      return res.status(200).json({
        message: 'Get Produk successfully',
        error: false,
        statusCode: 200,
        data: results
      });
    })
  } catch(err) {
    res.status(500).send({
      message: err,
      error: true,
      data: null,
      statusCode: 500
    })
  }
}))