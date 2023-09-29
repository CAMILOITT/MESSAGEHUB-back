"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorServerCode = exports.HttpErrorUserCode = exports.HttpExitCode = void 0;
var HttpExitCode;
(function (HttpExitCode) {
    HttpExitCode[HttpExitCode["OK"] = 200] = "OK";
    HttpExitCode[HttpExitCode["CREATED"] = 201] = "CREATED";
})(HttpExitCode || (exports.HttpExitCode = HttpExitCode = {}));
var HttpErrorUserCode;
(function (HttpErrorUserCode) {
    HttpErrorUserCode[HttpErrorUserCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpErrorUserCode[HttpErrorUserCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpErrorUserCode[HttpErrorUserCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpErrorUserCode[HttpErrorUserCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpErrorUserCode[HttpErrorUserCode["CONFLICT"] = 409] = "CONFLICT";
})(HttpErrorUserCode || (exports.HttpErrorUserCode = HttpErrorUserCode = {}));
var HttpErrorServerCode;
(function (HttpErrorServerCode) {
    HttpErrorServerCode[HttpErrorServerCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpErrorServerCode || (exports.HttpErrorServerCode = HttpErrorServerCode = {}));
