"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const path_1 = __importDefault(require("path"));
const server = (0, fastify_1.default)({ logger: false });
//plugins allways at fist then others
server.register(autoload_1.default, {
    dir: path_1.default.join(__dirname, "plugins"),
});
server.register(autoload_1.default, {
    dir: path_1.default.join(__dirname, "routes"),
    options: { prefix: "api" },
});
exports.default = server;
