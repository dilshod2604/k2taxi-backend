import fp from "fastify-plugin";
import { FastifyInstance } from "fastify/types/instance";
import fastifyCors from "@fastify/cors";

export default fp(async (fastify: FastifyInstance) => {
  // const domens = ["http://192.168.200.92:3000", "http://localhost:8081"];
  fastify.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });
});
