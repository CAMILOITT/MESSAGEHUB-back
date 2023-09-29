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
exports.setDescription = exports.setNick = exports.getFile = exports.deleteContact = exports.getListContacts = exports.addContact = exports.getUser = exports.getPerfil = void 0;
const user_services_1 = require("../services/user.services");
const enums_1 = require("../type/http/enums");
function getPerfil(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const infoUser = yield (0, user_services_1.searchPerfil)({ id });
            res.status(enums_1.HttpExitCode.OK).send(infoUser);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getPerfil = getPerfil;
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, user_services_1.searchUser)(req.body);
            res.status(enums_1.HttpExitCode.OK).send(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUser = getUser;
function addContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, user_services_1.addListContacts)(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addContact = addContact;
function getListContacts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, user_services_1.getContacts)(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getListContacts = getListContacts;
function deleteContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, user_services_1.removeContact)(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteContact = deleteContact;
function getFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { file } = req;
            const { _id } = req.body;
            const response = yield (0, user_services_1.uploadImg)({ _id, file });
            res.status(200).sendFile(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getFile = getFile;
function setNick(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, user_services_1.newNick)(req.body);
            res.status(200).send(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.setNick = setNick;
function setDescription(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, user_services_1.newDescription)(req.body);
            res.status(200).send(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.setDescription = setDescription;
