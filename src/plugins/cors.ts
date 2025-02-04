import fp from "fastify-plugin";
import { FastifyInstance } from "fastify/types/instance";
import fastifyCors from "@fastify/cors";

export default fp(async (fastify: FastifyInstance) => {
  const domens = [
    "http://192.168.200.92:3000",
    "http://localhost:3000",
    "http://192.168.68.103:8081",
    "http://192.168.32.92:3000",
    "http://10.0.2.2:3000",
    "http://192.168.128.92:8081",
    "http://192.168.128.92:3000",
  ];
  fastify.register(fastifyCors, {
    origin: domens,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });
});
