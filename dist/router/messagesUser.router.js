"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagesUser_controllers_1 = require("../controllers/messagesUser.controllers");
const hasSession_1 = require("../middleware/hasSession");
const messagesUser = (0, express_1.Router)();
messagesUser.post('/sendMessage', hasSession_1.hasUserSession, messagesUser_controllers_1.sendMessage);
messagesUser.post('/getMessages', hasSession_1.hasUserSession, messagesUser_controllers_1.getMessages);
exports.default = messagesUser;
