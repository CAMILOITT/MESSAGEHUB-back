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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const enums_1 = require("../type/http/enums");
const error_handler_1 = require("../utils/error.handler");
const password_1 = require("../utils/password");
const token_1 = require("../utils/token");
function createUser({ nick, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!nick || !password)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const checkUser = yield user_model_1.default.findOne({ nick });
        if (checkUser)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.CONFLICT, 'User already exists');
        const newPassword = (0, password_1.generatePassword)(password);
        yield user_model_1.default.create({
            nick,
            password: newPassword,
        });
        return { message: 'user created' };
    });
}
exports.createUser = createUser;
function verifyUser({ nick, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!nick || !password)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const user = yield user_model_1.default.findOne({ nick });
        if (!user)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.NOT_FOUND, 'User not found');
        const verifyPassword = (0, password_1.comparePassword)(password, user.password);
        if (!verifyPassword)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.UNAUTHORIZED, 'Invalid credentials');
        const { nick: user_nick, _id, list_contact } = user;
        const token = (0, token_1.createToken)(user_nick, _id);
        return { token, data: { nick: user_nick, _id, list_contact } };
    });
}
exports.verifyUser = verifyUser;
