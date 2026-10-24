"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const Port = 5000;
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
        data: null,
        success: true,
        status: "success",
    });
});
app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
});
