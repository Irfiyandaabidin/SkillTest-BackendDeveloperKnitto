"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransaksi = exports.deleteProduk = exports.updateProduk = exports.createNewProduk = exports.getProduk = exports.getAllProduk = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const database_js_1 = __importDefault(require("../config/database.js"));
const pool = mysql2_1.default.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
});
const getAllProduk = () => {
    const SQLQuery = 'SELECT * FROM produk';
    return database_js_1.default.execute(SQLQuery);
};
exports.getAllProduk = getAllProduk;
// Mengambil data dari dua tabel yang berbeda dengan melakukan join
const getProduk = (id) => {
    const SQLQuery = `SELECT produk.*, category.name as category_name FROM produk INNER JOIN category ON produk.category_id = category.id WHERE produk.id = ${id}`;
    return database_js_1.default.execute(SQLQuery);
};
exports.getProduk = getProduk;
const createNewProduk = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const SQLQuery = `INSERT INTO produk (name, price, description, stok, category_id) VALUES ('${body.name}', '${body.price}', '${body.description}', '${body.stok}', '${body.category_id}')`;
    const [result] = yield database_js_1.default.execute(SQLQuery);
    const [data] = yield database_js_1.default.execute(`SELECT * FROM produk WHERE id=${result.insertId}`);
    return data;
});
exports.createNewProduk = createNewProduk;
const updateProduk = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    const SQLQuery = `UPDATE produk SET name='${body.name}', price='${body.price}', description='${body.description}', stok='${body.stok}', category_id='${body.category_id}' WHERE id=${id}`;
    const [result] = yield database_js_1.default.execute(SQLQuery);
    if (result.affectedRows == 1) {
        const [data] = yield database_js_1.default.execute(`SELECT * FROM produk WHERE id=${id}`);
        return data;
    }
    return {};
});
exports.updateProduk = updateProduk;
const deleteProduk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const SQLQuery = `DELETE FROM produk WHERE id=${id}`;
    const [result] = yield database_js_1.default.execute(SQLQuery);
    return result;
});
exports.deleteProduk = deleteProduk;
const addTransaksi = (product_id, total) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject("Error occured while getting the connection");
            }
            return connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return reject("Error occured while getting the connection");
                }
                return connection.execute(`INSERT INTO transaksi(product_id, total) VALUES (${product_id}, ${total});`, (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            return reject("Inserting to TRANSAKSI table failed");
                        });
                    }
                    return connection.execute(`UPDATE produk SET stok = (stok - ${total}) WHERE id = ${product_id};`, (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return reject("Update PRODUK table failed");
                            });
                        }
                        return connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    return reject("Commit failed");
                                });
                            }
                            connection.release();
                            return resolve();
                        });
                    });
                });
            });
        });
    });
};
exports.addTransaksi = addTransaksi;
