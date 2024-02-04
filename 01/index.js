const express = require('express');
require('dotenv').config();

const app = express();
const productRoute = require('./routes/produk')
const { connection } = require('./database/index');

connection();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`)
})
app.use('/api/v1', productRoute);