const route = require('express').Router();
const { getProduct } = require('../controller/produk')

route.get('/produk', getProduct)

module.exports = route;