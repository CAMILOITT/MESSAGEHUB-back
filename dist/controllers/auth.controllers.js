"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const auth_services_1 = require("../services/auth.services");
const enums_1 = require("../type/http/enums");
function registerUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseCreate = yield (0, auth_services_1.createUser)(req.body);
            res.status(enums_1.HttpExitCode.CREATED).send(responseCreate);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resUser = yield (0, auth_services_1.verifyUser)(req.body);
            res.status(enums_1.HttpExitCode.OK).send(resUser);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.loginUser = loginUser;
