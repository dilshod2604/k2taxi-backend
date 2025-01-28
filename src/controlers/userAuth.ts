import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import { CreateUserInput } from "../schemas/userSchemas";

export const createUser = async (
  req: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return reply.status(400).send({ error: "This email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    reply.status(201).send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Internal server error" });
  }
};

interface LoginBody {
  email: string;
  password: string;
}

export const loginUser = async (
  req: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }
    const token = req.server.jwt.sign({ id: user.id, email: user.email });

    reply.status(200).send({ token });
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};

export const getMe = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  try {
    if (!id || isNaN(Number(id))) {
      return reply
        .status(400)
        .send({ error: "Invalid or missing 'id' parameter" });
    }

    const user = await prisma.user.findUnique({
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
  } catch (error) {
    console.error("Error fetching user:", error);
    return reply.status(500).send({ error: "An unexpected error occurred" });
  }
};
