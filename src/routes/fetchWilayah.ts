import express from 'express';
import fetchWilayahIndonesia from '../controllers/fetchWilayah';
const route = express.Router();

route.get('/', fetchWilayahIndonesia);

export default route