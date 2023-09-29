"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_DB_URI = exports.ENV_SECRET = exports.ENV_PORT = exports.ENV_SALT_ROUND = void 0;
require("dotenv/config");
exports.ENV_SALT_ROUND = Number(process.env.SALT_ROUND);
exports.ENV_PORT = Number(process.env.PORT);
exports.ENV_SECRET = process.env.SECRET;
exports.ENV_DB_URI = process.env.DB_URI;
