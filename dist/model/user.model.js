"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    nick: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 15,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    description: {
        type: String,
        required: false,
        max: 150,
        default: '',
    },
    img_avatar: {
        type: String,
        required: false,
        default: '',
    },
    list_contact: [
        {
            _id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'user',
            },
            nick: { type: mongoose_1.default.Schema.Types.String, ref: 'user' },
            img_avatar: { type: mongoose_1.default.Schema.Types.String, ref: 'user' },
            description: { type: mongoose_1.default.Schema.Types.String, ref: 'user' },
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
// userSchema.virtual('userModel', {
//   ref: 'userSchema',
//   localField: 'list_contact',
//   foreignField: '_id',
//   justOne: true,
// })
const userModel = mongoose_1.default.model('user', userSchema);
exports.default = userModel;
