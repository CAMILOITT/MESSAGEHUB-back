"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../const/env");
function createToken(user_nick, _id) {
    const token = jsonwebtoken_1.default.sign({ user_nick, _id }, env_1.ENV_SECRET, {
        expiresIn: '1 days',
    });
    return token;
}
exports.createToken = createToken;
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.ENV_SECRET);
}
exports.verifyToken = verifyToken;
