const route = require('express').Router();
const { getProduct } = require('../controller/produk')
const checkJwt = require('../middleware/checkJwt');

route.get('/produk', checkJwt ,getProduct)

module.exports = route;