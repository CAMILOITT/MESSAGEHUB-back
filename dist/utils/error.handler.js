"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = exports.errorHandler = void 0;
const enums_1 = require("../type/http/enums");
function errorHandler(err, req, res, next) {
    const { status, message } = err;
    return res.status(status).send({ error: message });
}
exports.errorHandler = errorHandler;
class HandleError extends Error {
    constructor(statusCode = enums_1.HttpErrorServerCode.INTERNAL_SERVER_ERROR, message = 'error of server') {
        super(message);
        this.status = statusCode;
    }
}
exports.HandleError = HandleError;
