require('dotenv').config()
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { error } = require('console');

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/v1/transaksi', async (req, res) => {
  try {
    const { product_id, total } = req.body;

    connection.query(
      `SELECT stok FROM produk WHERE id = ${product_id}`,
      async (err, result, field) => {
        if (err) throw err;

        const currentStock = result[0].stok;

        if (currentStock >= total) {
          try {
            connection.beginTransaction((err) => {
              if (err) {throw err};
              connection.query(
                `INSERT INTO transaksi(product_id, total) VALUES (${product_id}, ${total});`,
                (err, result, field) => {
                  if (err) {
                    console.log('masuk siniiiiiiiiii');
                    return connection.rollback(() => {
                      console.log('Rollback due to error:', err.message);
                      throw err;
                    });
                  }

                  connection.query(
                    `UPDATE produk SET stok = (stok - ${total}) WHERE id = ${product_id};`,
                    (err, result, field) => {
                      if (err) {
                        return connection.rollback(() => {
                          throw err;
                        });
                      }

                      connection.commit((err) => {
                        if (err) {
                          return connection.rollback(() => {
                            throw err;
                          });
                        }

                        res.status(200).send({
                          message: 'SUCCESS',
                          error: false,
                          data: null,
                          statusCode: 200,
                        });
                      });
                    }
                  );
                }
              );
            });
          } catch (err) {
            res.status(400).send({
              message: 'Transaksi failed',
              error: true,
              data: null,
              statusCode: 400,
            });
          }
        } else {
          res.status(404).send({
            message: 'Stok habis',
            error: true,
            data: null,
            statusCode: 404,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      message: err.message,
      error: true,
      data: null,
      statusCode: 500,
    });
  }
});

// SQL Query untuk buat prosedur dan buat transaction
// 
// DELIMITER $
// CREATE OR REPLACE PROCEDURE createTransaction(IN in_idProduct INT, IN in_total INT)
// BEGIN
// 	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING ROLLBACK;
//     START TRANSACTION;
//     	INSERT INTO transaksi(product_id, total) VALUES (in_idProduct, in_total);
//         UPDATE produk set stok = (stok-in_total) WHERE id = in_idProduct;
//         SELECT * FROM transaksi;
//      COMMIT;
// END $
// DELIMITER ;