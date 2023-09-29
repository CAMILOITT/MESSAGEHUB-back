"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageUser = new mongoose_1.default.Schema({
    message: {
        type: String,
        required: true,
        min: 1,
    },
    id_sender: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        min: 1,
    },
    id_receiver: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        min: 1,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = mongoose_1.default.model('Message', messageUser);
