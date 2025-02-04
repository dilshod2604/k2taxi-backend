import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import AutoLoad from "@fastify/autoload";
import path from "path";

const server = Fastify({ logger: false });
//plugins allways at fist then others
server.register(AutoLoad, {
  dir: path.join(__dirname, "plugins"),
});

server.get("/", (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Hello from Fastify on Vercel!" });
}),
  server.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: { prefix: "api" },
  });

export default server;
