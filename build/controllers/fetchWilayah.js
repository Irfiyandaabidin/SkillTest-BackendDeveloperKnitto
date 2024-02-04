"use strict";
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
const axios_1 = __importDefault(require("axios"));
const resBase_1 = __importDefault(require("../utils/resBase"));
const apiError_1 = __importDefault(require("../utils/apiError"));
// Fetch data dari API eksternal menggunakan Node.js axios
const fetchWilayahIndonesia = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.get('https://api.binderbyte.com/wilayah/provinsi?api_key=6f4229418963dfb8ffbd6f6f873a45b5c8fb815aa942c5f711fc72ea7d73f57a')
            .then((response) => {
            res.status(200).json((0, resBase_1.default)('FETCH wilayah indonesia success.', response.data.value, 200));
        });
    }
    catch (err) {
        const error = err;
        next(new apiError_1.default(error.message, 500));
    }
});
exports.default = fetchWilayahIndonesia;
