"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const apiError_1 = __importDefault(require("../utils/apiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return next(new apiError_1.default('You dont have token JWT', 401));
    }
    try {
        const token = bearerToken.split('Bearer ')[1];
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET || 'SECRET');
        next();
    }
    catch (err) {
        return next(new apiError_1.default('Authorization denied!', 401));
    }
};
