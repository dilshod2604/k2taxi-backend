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
exports.default = default_1;
const userAuth_1 = require("../controlers/userAuth");
const userSchemas_1 = require("../schemas/userSchemas");
function default_1(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/sign-up", {
            schema: {
                body: (0, userSchemas_1.$ref)("createUserSchema"),
                response: {
                    201: (0, userSchemas_1.$ref)("createUserResponse"),
                },
            },
        }, userAuth_1.createUser);
        fastify.post("/login", {
            schema: {
                body: (0, userSchemas_1.$ref)("loginUserSchema"),
                response: {
                    200: (0, userSchemas_1.$ref)("loginUserResponse"),
                },
            },
        }, userAuth_1.loginUser);
        fastify.get("/user/:id", {
            preHandler: [fastify.authJWT],
            schema: {
                params: (0, userSchemas_1.$ref)("getUserByIdSchema"),
                response: {
                    200: (0, userSchemas_1.$ref)("getUserByIdResponseSchema"),
                },
            },
        }, userAuth_1.getMe);
    });
}
