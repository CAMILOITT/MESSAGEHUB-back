"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function deleteFile(folderPath) {
    console.log('eliminando archivos');
    fs_1.default.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }
        files.forEach(file => {
            const filePath = path_1.default.join(folderPath, file);
            fs_1.default.stat(filePath, (statErr, stats) => {
                if (statErr) {
                    console.error(`Error getting file stats for ${file}:`, statErr);
                    return;
                }
                if (stats.isFile() && /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(file)) {
                    fs_1.default.unlink(filePath, unlinkErr => {
                        if (unlinkErr) {
                            console.error(`Error deleting ${file}:`, unlinkErr);
                        }
                    });
                }
            });
        });
    });
}
exports.deleteFile = deleteFile;
