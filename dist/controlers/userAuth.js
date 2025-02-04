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
exports.getMe = exports.loginUser = exports.createUser = void 0;
const prisma_1 = require("../utils/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    try {
        const existingUser = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return reply.status(400).send({ error: "This email already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        reply.status(201).send(user);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal server error" });
    }
});
exports.createUser = createUser;
const loginUser = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return reply.status(401).send({ error: "Invalid email or password" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return reply.status(401).send({ error: "Invalid email or password" });
        }
        const token = req.server.jwt.sign({ id: user.id, email: user.email });
        reply.status(200).send({ token });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send(error);
    }
});
exports.loginUser = loginUser;
const getMe = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id || isNaN(Number(id))) {
            return reply
                .status(400)
                .send({ error: "Invalid or missing 'id' parameter" });
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: parseInt(id, 10),
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        if (!user) {
            return reply.status(404).send({ error: "User not found" });
        }
        return reply.status(200).send(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return reply.status(500).send({ error: "An unexpected error occurred" });
    }
});
exports.getMe = getMe;
