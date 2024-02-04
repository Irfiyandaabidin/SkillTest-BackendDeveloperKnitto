"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadFile_1 = __importDefault(require("../middlewares/uploadFile"));
const upload_1 = __importDefault(require("../controllers/upload"));
const checkJwt_1 = __importDefault(require("../middlewares/checkJwt"));
const route = express_1.default.Router();
route.post('/', checkJwt_1.default, (0, multer_1.default)({ storage: uploadFile_1.default }).single("file"), upload_1.default);
exports.default = route;
