import dotenv from 'dotenv';
import express from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ProdukRoute from "./routes/produk.js"
import errorController from './controller/errorController.js';
import ApiError from './utils/apiError.js';
dotenv.config();


const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`)
})

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/v1/produk', ProdukRoute);
app.all('*', (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});
app.use(errorController)