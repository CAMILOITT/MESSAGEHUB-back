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
exports.getListMessage = exports.createMessage = void 0;
const message_model_1 = __importDefault(require("../model/message.model"));
const enums_1 = require("../type/http/enums");
const error_handler_1 = require("../utils/error.handler");
function createMessage({ message, id_sender, id_receiver, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!message || !id_sender || !id_receiver)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const newMessage = yield message_model_1.default.create({
            message,
            id_sender,
            id_receiver,
        });
        return newMessage;
    });
}
exports.createMessage = createMessage;
function getListMessage({ id_sender, id_receiver, limit = 5, skip = 0, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id_sender || !id_receiver)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const listMessages = yield message_model_1.default.find({
            $or: [
                { $and: [{ id_sender }, { id_receiver }] },
                { $and: [{ id_receiver: id_sender }, { id_sender: id_receiver }] },
            ],
        }, ['id_sender', 'id_receiver', 'message', 'createdAt'], { sort: { createdAt: -1 }, limit, skip });
        if (!listMessages)
            return {
                message: 'nuevos mensajes',
            };
        return listMessages;
    });
}
exports.getListMessage = getListMessage;
