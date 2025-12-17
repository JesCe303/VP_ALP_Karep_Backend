"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../error/response-error");
const errorMiddleware = async (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            error: `Validation error: ${JSON.stringify(error.message)}`,
        });
    }
    else if (error instanceof response_error_1.ResponseError) {
        res.status(error.status).json({
            error: error.message,
        });
    }
    else {
        res.status(400).json({
            error: error.message,
        });
    }
};
exports.errorMiddleware = errorMiddleware;
