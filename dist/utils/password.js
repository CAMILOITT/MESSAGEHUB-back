"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../const/env");
function generatePassword(password) {
    const saltRounds = env_1.ENV_SALT_ROUND;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const newPassword = bcrypt_1.default.hashSync(password, salt);
    return newPassword;
}
exports.generatePassword = generatePassword;
function comparePassword(password, passwordCompare) {
    return bcrypt_1.default.compareSync(password, passwordCompare);
}
exports.comparePassword = comparePassword;
