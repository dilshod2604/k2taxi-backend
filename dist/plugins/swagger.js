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
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const userSchemas_1 = require("../schemas/userSchemas");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    for (const scheme of userSchemas_1.userSchemas) {
        fastify.addSchema(scheme);
    }
    fastify.register(swagger_1.default, {
        swagger: {
            info: {
                title: "Fastify auth api",
                description: "API документация вашего сервера",
                version: "1.0.0",
            },
            host: "localhost:3000",
            basePath: "/api",
            tags: [
                {
                    name: "Auth",
                    description: "Маршруты для авторизации",
                },
            ],
        },
    });
    fastify.register(swagger_ui_1.default, {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "none",
            deepLinking: false,
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
    });
}));
