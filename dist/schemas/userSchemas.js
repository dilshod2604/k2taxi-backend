"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
const fastify_zod_1 = require("fastify-zod");
const userSchema = zod_1.default.object({
    email: zod_1.default
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email(),
    name: zod_1.default.string(),
});
const createUserSchema = userSchema.extend({
    password: zod_1.default
        .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    })
        .min(8, "Password must be at least 8 characters long"),
});
const createUserResponse = userSchema.extend({
    id: zod_1.default.number(),
    password: zod_1.default
        .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    })
        .min(8),
});
const loginUserSchema = zod_1.default.object({
    email: zod_1.default
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email(),
    password: zod_1.default
        .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    })
        .min(8, "Password must be at least 8 characters long"),
});
const loginUserResponse = zod_1.default.object({
    token: zod_1.default.string(),
});
const getUserByIdSchema = zod_1.default.object({
    id: zod_1.default.string(),
});
const getUserByIdResponseSchema = userSchema.extend({
    id: zod_1.default.number(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createUserSchema,
    createUserResponse,
    loginUserSchema,
    loginUserResponse,
    getUserByIdSchema,
    getUserByIdResponseSchema,
}), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
