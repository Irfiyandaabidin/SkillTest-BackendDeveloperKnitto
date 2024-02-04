"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    err.message = err.message;
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message
    });
};