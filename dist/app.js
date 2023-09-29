"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const node_cron_1 = __importDefault(require("node-cron"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const mongo_1 = __importDefault(require("./config/mongo"));
const message_model_1 = __importDefault(require("./model/message.model"));
const user_model_1 = __importDefault(require("./model/user.model"));
const auth_1 = __importDefault(require("./router/auth"));
const messagesUser_router_1 = __importDefault(require("./router/messagesUser.router"));
const users_router_1 = __importDefault(require("./router/users.router"));
const deleteFiles_1 = require("./utils/deleteFiles");
const error_handler_1 = require("./utils/error.handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('uploads'));
app.use(auth_1.default);
app.use(users_router_1.default);
app.use(messagesUser_router_1.default);
app.use(error_handler_1.errorHandler);
(0, mongo_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
exports.io.on('connection', socket => {
    socket.on('login', user_id => {
        socket.join(user_id);
    });
    socket.on('sendMessage', ({ _id, id_receiver, id_sender, message }) => {
        socket.to(id_receiver).emit('getMessage', {
            _id,
            id_receiver,
            id_sender,
            message,
        });
    });
    socket.on('addContact', ({ _id, nick, id_contact }) => {
        socket.to(id_contact).emit('addContact', { _id, nick });
    });
});
node_cron_1.default.schedule('0 0 * * 7', () => {
    user_model_1.default.deleteMany({});
    message_model_1.default.deleteMany({});
    const currentDirectory = process.cwd();
    const parentDirectory = path_1.default.join(currentDirectory, 'uploads');
    (0, deleteFiles_1.deleteFile)(parentDirectory);
});
exports.default = server;
