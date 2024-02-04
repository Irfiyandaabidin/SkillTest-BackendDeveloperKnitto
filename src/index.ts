import dotenv from 'dotenv';
import express from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import ProdukRoute from "./routes/produk.js"
import FileRoute from "./routes/upload.js";
import FetchWilayahRoute from "./routes/fetchWilayah.js";
import errorController from './controllers/errorController.js';
import ApiError from './utils/apiError.js';
dotenv.config();


const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`)
})

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/v1/produk', ProdukRoute);
app.use('/api/v1/file', FileRoute)
app.use('/api/v1/wilayah', FetchWilayahRoute)

// Untuk test middleware check JWT, generate token dengan endpoint ini
app.post('/api/v1/generate-jwt', ((req, res) => {
  jwt.sign(
    {message: "JWT token for testing middleware"},
    JWT_SECRET || "SECRET",
    {expiresIn: 120000 },
    (err, token) => {
      if(err) throw err;
      res.json({token})
    }
  )
}))
app.all('*', (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});
app.use(errorController)