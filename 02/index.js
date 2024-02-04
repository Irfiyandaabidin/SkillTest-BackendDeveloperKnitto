require('dotenv').config();
const express = require('express');

const app = express();
const productRoute = require('./src/routes/produk')
const { connection } = require('./database/index');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

connection();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`)
})
app.use('/api/v1', productRoute);
app.post('/api/v1/generate-jwt', ((req, res) => {
  jwt.sign(
    {message: "JWT token for testing middleware"},
    JWT_SECRET,
    {expiresIn: 120000 },
    (err, token) => {
      if(err) throw err;
      res.json({token})
    }
  )
}))