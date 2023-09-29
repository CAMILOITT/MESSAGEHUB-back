"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUserSession = void 0;
const token_1 = require("../utils/token");
const error_handler_1 = require("../utils/error.handler");
const enums_1 = require("../type/http/enums");
function hasUserSession(req, res, next) {
    try {
        const { authorization } = req.headers;
        const hasToken = (0, token_1.verifyToken)(authorization);
        if (!hasToken)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.UNAUTHORIZED, 'User not logged in');
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.hasUserSession = hasUserSession;
