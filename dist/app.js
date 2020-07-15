"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const MONGO_DB_URL = 'mongodb+srv://gustavo-rw:0Et9ab0y2WlC438l@cluster0-lqxgu.mongodb.net/users';
class App {
    constructor() {
        this.express = express_1.default();
        this.middlewares();
        this.database();
        this.routes();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    }
    database() {
        mongoose_1.default.connect(MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    routes() {
        this.express.use(routes_1.default);
    }
}
exports.default = new App().express;
