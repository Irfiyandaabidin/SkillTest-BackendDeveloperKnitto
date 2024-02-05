import express from 'express';
import * as ProdukController from '../controllers/produk.js';
const route = express.Router();

// 08. API Endpoint untuk menangani operasi CRUD
route.get('/', ProdukController.getAllProduk);
route.get('/:id', ProdukController.getProduk);
route.post('/', ProdukController.createNewProduk);
route.patch('/:id', ProdukController.updateProduk);
route.delete('/:id', ProdukController.deleteProduk);
route.post('/transaksi', ProdukController.addTransaksi);

export default route;