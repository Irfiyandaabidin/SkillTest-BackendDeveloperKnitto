var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dbPool from '../config/database.js';
const getAllProduk = () => {
    const SQLQuery = 'SELECT * FROM produk';
    return dbPool.execute(SQLQuery);
};
const createNewProduk = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const SQLQuery = `INSERT INTO produk (name, price, description, stok, category_id) VALUES ('${body.name}', '${body.price}', '${body.description}', '${body.stok}', '${body.category_id}')`;
    const [result] = yield dbPool.execute(SQLQuery);
    const [data] = yield dbPool.execute(`SELECT * FROM produk WHERE id=${result.insertId}`);
    return data;
});
const updateProduk = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    const SQLQuery = `UPDATE produk SET name='${body.name}', price='${body.price}', description='${body.description}', stok='${body.stok}', category_id='${body.category_id}' WHERE id=${id}`;
    const [result] = yield dbPool.execute(SQLQuery);
    if (result.affectedRows == 1) {
        const [data] = yield dbPool.execute(`SELECT * FROM produk WHERE id=${id}`);
        return data;
    }
    return {};
});
const deleteProduk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const SQLQuery = `DELETE FROM produk WHERE id=${id}`;
    const [result] = yield dbPool.execute(SQLQuery);
    return result;
});
export { getAllProduk, createNewProduk, updateProduk, deleteProduk };
