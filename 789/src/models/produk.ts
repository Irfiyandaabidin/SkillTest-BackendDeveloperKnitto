import { OkPacket } from 'mysql2';
import dbPool from '../config/database.js';

interface IBody {
  id: number,
  name: string,
  price: number,
  description: string,
  stok: number,
  category_id: number
}

const getAllProduk = () => {
  const SQLQuery = 'SELECT * FROM produk';
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

export {
  getAllProduk,
  createNewProduk,
  updateProduk,
  deleteProduk
}