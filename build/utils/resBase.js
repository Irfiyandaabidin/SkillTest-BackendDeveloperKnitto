"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resSuccess = (message = 'Success', data = null, statusCode = 200) => {
    return {
        message: message,
        statusCode: statusCode,
        error: false,
        data: data
    };
};
exports.default = resSuccess;
