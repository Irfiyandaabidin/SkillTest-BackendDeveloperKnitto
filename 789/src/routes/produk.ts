import express from 'express';
import * as ProdukController from '../controller/produk.js';
const route = express.Router();

route.get('/', ProdukController.getAllProduk);
route.post('/', ProdukController.createNewProduk);
route.patch('/:id', ProdukController.updateProduk);
route.delete('/:id', ProdukController.deleteProduk);

export default route;