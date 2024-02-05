import { OkPacket } from 'mysql2';
import mysql from "mysql2";
import dbPool from '../config/database.js';

interface IBody {
  id: number,
  name: string,
  price: number,
  description: string,
  stok: number,
  category_id: number
}

const pool = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
})

const getAllProduk = () => {
  const SQLQuery = 'SELECT * FROM produk';
  return dbPool.execute(SQLQuery);
}

// 05. Query untuk mengambil data dari dua tabel yang berbeda dengan melakukan join
const getProduk = (id:number) => { 
  const SQLQuery = `SELECT produk.*, category.name as category_name FROM produk INNER JOIN category ON produk.category_id = category.id WHERE produk.id = ${id}`;
  return dbPool.execute(SQLQuery);
}

const createNewProduk = async(body: IBody) => {
  const SQLQuery = `INSERT INTO produk (name, price, description, stok, category_id) VALUES ('${body.name}', '${body.price}', '${body.description}', '${body.stok}', '${body.category_id}')`;
  const [result] = await dbPool.execute<OkPacket>(SQLQuery);
  const [data] = await dbPool.execute(`SELECT * FROM produk WHERE id=${result.insertId}`);
  return data;
}

const updateProduk = async(body:IBody, id: number) => {
  const SQLQuery = `UPDATE produk SET name='${body.name}', price='${body.price}', description='${body.description}', stok='${body.stok}', category_id='${body.category_id}' WHERE id=${id}`;
  const [result] = await dbPool.execute<OkPacket>(SQLQuery);
  if(result.affectedRows == 1){
    const [data] = await dbPool.execute(`SELECT * FROM produk WHERE id=${id}`);
    return data;
  }
  return {}
}

const deleteProduk = async( id: number ) => {
  const SQLQuery = `DELETE FROM produk WHERE id=${id}`;
  const [result] = await dbPool.execute<OkPacket>(SQLQuery);
  return result;
}

// 06. Menerapkan transaksi pada MySQL
const addTransaksi = (product_id: number, total: number) => {
  return new Promise<void>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject("Error occured while getting the connection");
      }
      return connection.beginTransaction(err => {
        if(err) {
          connection.release();
          return reject("Error occured while getting the connection");
        }
        return connection.execute(
          `INSERT INTO transaksi(product_id, total) VALUES (${product_id}, ${total});`, (err) => {
            if(err) {
              return connection.rollback(() => {
                connection.release();
                return reject("Inserting to TRANSAKSI table failed")
              });
            }
            return connection.execute(
              `UPDATE produk SET stok = (stok - ${total}) WHERE id = ${product_id};`, (err) => {
                if(err) {
                  return connection.rollback(() => {
                    connection.release();
                    return reject("Update PRODUK table failed");
                  });
                }
                return connection.commit((err) => {
                  if(err) {
                    return connection.rollback(() => {
                      connection.release();
                      return reject("Commit failed");
                    })
                  }
                  connection.release();
                  return resolve();
                })
              }
            )
          }
        )
      })
    })
  })
}

export {
  getAllProduk,
  getProduk,
  createNewProduk,
  updateProduk,
  deleteProduk,
  addTransaksi
}