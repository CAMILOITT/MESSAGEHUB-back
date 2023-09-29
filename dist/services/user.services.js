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
exports.newDescription = exports.newNick = exports.uploadImg = exports.removeContact = exports.getContacts = exports.addListContacts = exports.searchUser = exports.searchPerfil = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const enums_1 = require("../type/http/enums");
const error_handler_1 = require("../utils/error.handler");
function searchPerfil({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const responseUser = yield user_model_1.default.findById(id, [
            'nick',
            'description',
            'img_avatar',
            'list_contact',
        ]);
        if (!responseUser)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.NOT_FOUND, 'User not found');
        return responseUser;
    });
}
exports.searchPerfil = searchPerfil;
function searchUser({ nick, user_nick = '', limit = 5, skip = 0, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!nick)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const responseUser = yield user_model_1.default.find({ nick: { $regex: nick, $ne: user_nick, $options: 'i' } }, ['nick', 'img_avatar'], { limit, skip });
        if (!responseUser.length)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.NOT_FOUND, 'User not found');
        return responseUser;
    });
}
exports.searchUser = searchUser;
function addListContacts({ id, id_contact }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id === id_contact)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'You cannot add yourself as a contact');
        if (!id || !id_contact)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const user = yield user_model_1.default.findOne({
            _id: id,
            list_contact: { $not: { $elemMatch: { _id: id_contact } } },
        }, ['nick', 'img_avatar']);
        const contact = yield user_model_1.default.findOne({
            _id: id_contact,
            list_contact: { $not: { $elemMatch: { _id: id } } },
        }, ['nick', 'img_avatar']);
        if (!user && !contact)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.CONFLICT, 'User is already added');
        if (user && !contact) {
            const contact = yield user_model_1.default.findById(id_contact, ['nick']);
            yield user_model_1.default.findByIdAndUpdate(user._id, {
                $push: {
                    list_contact: contact,
                },
            });
            if (!contact)
                throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.CONFLICT, 'could not add user');
            const { _id, nick, img_avatar, description } = contact;
            return { _id, nick, img_avatar, description, message: 'contact added' };
        }
        if (user)
            yield user_model_1.default.findByIdAndUpdate(user._id, {
                $push: {
                    list_contact: contact,
                },
            });
        if (contact)
            yield user_model_1.default.findByIdAndUpdate(contact._id, {
                $push: {
                    list_contact: { _id: user === null || user === void 0 ? void 0 : user._id, nick: user === null || user === void 0 ? void 0 : user.nick },
                },
            });
        if (!contact)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.CONFLICT, 'could not add user');
        const { _id, nick, img_avatar, description } = contact;
        return { _id, nick, img_avatar, description, message: 'contact added' };
    });
}
exports.addListContacts = addListContacts;
function getContacts({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const contacts = yield user_model_1.default.findById(id, ['list_contact']);
        return contacts;
    });
}
exports.getContacts = getContacts;
function removeContact({ id, id_contact }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id_contact || !id)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        yield user_model_1.default.findByIdAndUpdate(id, {
            $pull: {
                list_contact: { _id: id_contact },
            },
        });
        const contacts = yield user_model_1.default.findById(id, ['list_contact']);
        return contacts;
    });
}
exports.removeContact = removeContact;
// arreglar
function uploadImg({ _id, file, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!_id || !file)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const { filename, path } = file;
        yield user_model_1.default.findByIdAndUpdate(_id, { img_avatar: filename });
        yield user_model_1.default.updateMany({ list_contact: { $elemMatch: { _id } } }, { $set: { 'list_contact.$.img_avatar': filename } });
        return path;
    });
}
exports.uploadImg = uploadImg;
// a;adir update description and nick
function newNick({ _id, description, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!_id || !description)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        const user = yield user_model_1.default.findByIdAndUpdate({ _id }, { nick: description });
        if (user)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.NOT_FOUND, 'nick already exists');
        yield user_model_1.default.findByIdAndUpdate({ _id }, { nick: description });
        const res = yield user_model_1.default.updateMany({ list_contact: { $elemMatch: { _id } } }, { $set: { 'list_contact.$.nick': description } }, { new: true });
        return { message: 'user updated' };
    });
}
exports.newNick = newNick;
function newDescription({ _id, description, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!_id || !description)
            throw new error_handler_1.HandleError(enums_1.HttpErrorUserCode.BAD_REQUEST, 'All fields are required');
        yield user_model_1.default.updateOne({ _id }, { description });
        yield user_model_1.default.updateMany({ list_contact: { $elemMatch: { _id } } }, { $set: { 'list_contact.$.description': description } });
        return { message: 'user updated' };
    });
}
exports.newDescription = newDescription;
