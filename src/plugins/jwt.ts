import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    authJWT: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || "supercodekey",
  });

  fastify.decorate(
    "authJWT",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (error) {
        reply.status(401).send({ error: "Unauthorized" });
      }
    }
  );
});
