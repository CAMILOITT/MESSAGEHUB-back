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
exports.getMessages = exports.sendMessage = void 0;
const userMessages_services_1 = require("../services/userMessages.services");
function sendMessage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseMessage = yield (0, userMessages_services_1.createMessage)(req.body);
            res.status(200).json(responseMessage);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.sendMessage = sendMessage;
function getMessages(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseMessage = yield (0, userMessages_services_1.getListMessage)(req.body);
            res.status(200).json(responseMessage);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getMessages = getMessages;
