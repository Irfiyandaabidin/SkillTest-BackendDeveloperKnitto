"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransaksi = exports.deleteProduk = exports.updateProduk = exports.createNewProduk = exports.getProduk = exports.getAllProduk = void 0;
const ProdukModel = __importStar(require("../models/produk.js"));
const resBase_js_1 = __importDefault(require("../utils/resBase.js"));
const apiError_js_1 = __importDefault(require("../utils/apiError.js"));
const getAllProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield ProdukModel.getAllProduk();
        res.status(200).json((0, resBase_js_1.default)('GET all produk success', data, 200));
    }
    catch (err) {
        const error = err;
        next(new apiError_js_1.default(error.message, 500));
    }
});
exports.getAllProduk = getAllProduk;
// Mengambil data dari dua tabel yang berbeda dengan melakukan join
const getProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [data] = yield ProdukModel.getProduk(parseInt(id));
        res.status(200).json((0, resBase_js_1.default)('GET produk success', data, 200));
    }
    catch (err) {
        const error = err;
        next(new apiError_js_1.default(error.message, 500));
    }
});
exports.getProduk = getProduk;
const createNewProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const requiredFields = ['name', 'price', 'stok', 'description'];
        const validateMessage = requiredFields
            .filter(field => !body[field])
            .map(field => `${field} must be filled `);
        if (validateMessage.length > 0) {
            return next(new apiError_js_1.default(validateMessage.toString(), 400));
        }
        const data = yield ProdukModel.createNewProduk(body);
        res.status(201).json((0, resBase_js_1.default)('CREATE produk success', data, 201));
    }
    catch (err) {
        const error = err;
        next(new apiError_js_1.default(error.message, 500));
    }
});
exports.createNewProduk = createNewProduk;
const updateProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = yield ProdukModel.updateProduk(body, parseInt(id));
        if (Object.keys(data).length === 0) {
            return next(new apiError_js_1.default('Id not found.', 404));
        }
        res.status(200).json((0, resBase_js_1.default)('UPDATE produk success', data, 200));
    }
    catch (err) {
        const error = err;
        next(new apiError_js_1.default(error.message, 500));
    }
});
exports.updateProduk = updateProduk;
const deleteProduk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield ProdukModel.deleteProduk(parseInt(id));
        if (data.affectedRows == 0) {
            return next(new apiError_js_1.default('Id not found', 404));
        }
        res.status(200).json((0, resBase_js_1.default)('DELETE produk success.', null, 200));
    }
    catch (err) {
        const error = err;
        next(new apiError_js_1.default(error.message, 500));
    }
});
exports.deleteProduk = deleteProduk;
const addTransaksi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, total } = req.body;
        yield ProdukModel
            .addTransaksi(product_id, total)
            .then(() => {
            res.status(201).json((0, resBase_js_1.default)('ADD transaksi success', null, 201));
        })
            .catch((err) => {
            return next(new apiError_js_1.default(err, 400));
        });
    }
    catch (err) {
        const error = err;
        next(new apiError_js_1.default(error.message, 500));
    }
});
exports.addTransaksi = addTransaksi;
