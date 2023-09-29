"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const file_1 = __importDefault(require("../middleware/file"));
const hasSession_1 = require("../middleware/hasSession");
const user = (0, express_1.Router)();
user.get('/getPerfil/:id', hasSession_1.hasUserSession, user_controllers_1.getPerfil);
user.post('/searchUser', hasSession_1.hasUserSession, user_controllers_1.getUser);
user.post('/addUser', hasSession_1.hasUserSession, user_controllers_1.addContact);
user.post('/getContacts', hasSession_1.hasUserSession, user_controllers_1.getListContacts);
user.put('/deleteContact', hasSession_1.hasUserSession, user_controllers_1.deleteContact);
user.put('/setAvatar', hasSession_1.hasUserSession, file_1.default.single('imgAvatar'), user_controllers_1.getFile);
user.put('/setNick', hasSession_1.hasUserSession, user_controllers_1.setNick);
user.put('/setDescription', hasSession_1.hasUserSession, user_controllers_1.setDescription);
exports.default = user;
