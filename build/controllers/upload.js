"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../utils/apiError"));
const resBase_1 = __importDefault(require("../utils/resBase"));
const postFile = (req, res, next) => {
    try {
        if (!req.file) {
            return next(new apiError_1.default('No file selected', 400));
        }
        const file = req.file.path;
        res.status(200).json((0, resBase_1.default)('Upload file successfully.', file, 200));
    }
    catch (err) {
        const error = err;
        next(new apiError_1.default(error.message, 500));
    }
};
exports.default = postFile;
