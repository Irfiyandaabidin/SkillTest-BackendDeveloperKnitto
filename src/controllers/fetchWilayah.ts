import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import resSuccess from '../utils/resBase';
import ApiError from '../utils/apiError';

// 03. Fetch data dari API eksternal menggunakan Node.js axios
const fetchWilayahIndonesia = async(req: Request, res:Response, next: NextFunction) => {
  try {
    await axios.get('https://api.binderbyte.com/wilayah/provinsi?api_key=6f4229418963dfb8ffbd6f6f873a45b5c8fb815aa942c5f711fc72ea7d73f57a')
    .then((response) => {
      res.status(200).json(resSuccess('FETCH wilayah indonesia success.', response.data.value, 200))
    })
  } catch(err) {
    const error = err as Error
    next(new ApiError(error.message, 500))    
  }
}

export default fetchWilayahIndonesia