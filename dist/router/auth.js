"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const sessionUser = (0, express_1.Router)();
sessionUser.post('/register', auth_controllers_1.registerUser);
sessionUser.post('/login', auth_controllers_1.loginUser);
exports.default = sessionUser;
