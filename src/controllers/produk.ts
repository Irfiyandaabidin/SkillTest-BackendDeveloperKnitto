import { NextFunction, Request, Response } from 'express';
import { OkPacket } from 'mysql2';
import * as ProdukModel from '../models/produk.js';
import resSuccess from '../utils/resBase.js';
import ApiError from '../utils/apiError.js';

const getAllProduk = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const [data] = await ProdukModel.getAllProduk();
    res.status(200).json(resSuccess(
      'GET all produk success',
      data,
      200,
    ))
  } catch (err) {
    const error = err as Error
    next(new ApiError(error.message, 500))
  }
}

// Mengambil data dari dua tabel yang berbeda dengan melakukan join
const getProduk = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const [data] = await ProdukModel.getProduk(parseInt(id));
    res.status(200).json(resSuccess(
      'GET produk success',
      data,
      200,
    ))
  } catch (err) {
    const error = err as Error
    next(new ApiError(error.message, 500))
  }
}

const createNewProduk = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const requiredFields = ['name', 'price', 'stok', 'description'];
    const validateMessage = requiredFields
      .filter(field => !body[field])
      .map(field => `${field} must be filled `)

    if(validateMessage.length > 0) {
      return next(new ApiError(validateMessage.toString(), 400))
    }
    const data = await ProdukModel.createNewProduk(body);
    res.status(201).json(resSuccess(
      'CREATE produk success',
      data,
      201,
    ))
  } catch (err) {
    const error = err as Error
    next(new ApiError(error.message, 500))
  }
}

const updateProduk = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = await ProdukModel.updateProduk(body, parseInt(id));
    if(Object.keys(data).length === 0) {
      return next(new ApiError('Id not found.', 404))    
    }
    res.status(200).json(resSuccess(
      'UPDATE produk success',
      data,
      200
    ))
  } catch (err) {
    const error = err as Error
    next(new ApiError(error.message, 500))
  }
}

const deleteProduk = async(req: Request, res: Response, next:NextFunction) => {
  try {
    const { id } = req.params;
    const data = await ProdukModel.deleteProduk(parseInt(id));
    if(data.affectedRows == 0){
      return next(new ApiError('Id not found', 404))
    }
    res.status(200).json(resSuccess(
      'DELETE produk success.',
      null,
      200
    ))
  } catch (err) {
    const error = err as Error
    next(new ApiError(error.message, 500))
  }
}

const addTransaksi = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      product_id,
      total
    } = req.body;
    await ProdukModel
    .addTransaksi(product_id, total)
    .then(() => {
      res.status(201).json(resSuccess(
        'ADD transaksi success',
        null,
        201,
      ))
    })
    .catch((err) => {
      return next(new ApiError(err, 400))
    });
  } catch (err) {
    const error = err as Error
    next(new ApiError(error.message, 500))
  }
}

export {
  getAllProduk,
  getProduk,
  createNewProduk,
  updateProduk,
  deleteProduk,
  addTransaksi
}