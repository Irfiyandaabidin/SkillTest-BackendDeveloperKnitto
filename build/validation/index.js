"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    name: joi_1.default.string().required(),
    stok: joi_1.default.number().integer().required(),
    price: joi_1.default.number().integer().required(),
    description: joi_1.default.string().required(),
    category_id: joi_1.default.number().integer().required(),
    id: joi_1.default.number().integer()
});
exports.default = schema;
