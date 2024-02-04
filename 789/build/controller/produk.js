var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ProdukModel from '../models/produk.js';
import resSuccess from '../utils/resBase.js';
import ApiError from '../utils/apiError.js';
const getAllProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield ProdukModel.getAllProduk();
        res.status(200).json(resSuccess('GET all produk success', data, 200));
    }
    catch (err) {
        const error = err;
        next(new ApiError(error.message, 500));
    }
});
const createNewProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const requiredFields = ['name', 'price', 'stok', 'description'];
        const validateMessage = requiredFields
            .filter(field => !body[field])
            .map(field => `${field} must be filled `);
        if (validateMessage.length > 0) {
            return next(new ApiError(validateMessage.toString(), 400));
        }
        const data = yield ProdukModel.createNewProduk(body);
        res.status(201).json(resSuccess('CREATE produk success', data, 201));
    }
    catch (err) {
        const error = err;
        next(new ApiError(error.message, 500));
    }
});
const updateProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = yield ProdukModel.updateProduk(body, parseInt(id));
        if (Object.keys(data).length === 0) {
            return next(new ApiError('Id not found.', 404));
        }
        res.status(200).json(resSuccess('UPDATE produk success', data, 200));
    }
    catch (err) {
        const error = err;
        next(new ApiError(error.message, 500));
    }
});
const deleteProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield ProdukModel.deleteProduk(parseInt(id));
        if (data.affectedRows == 0) {
            return next(new ApiError('Id not found', 404));
        }
        res.status(200).json(resSuccess('DELETE produk success.', null, 200));
    }
    catch (err) {
        const error = err;
        next(new ApiError(error.message, 500));
    }
});
export { getAllProduk, createNewProduk, updateProduk, deleteProduk };
