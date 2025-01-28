import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { userSchemas } from "../schemas/userSchemas";

export default fp(async (fastify: FastifyInstance) => {
  for (const scheme of userSchemas) {
    fastify.addSchema(scheme);
  }

  fastify.register(swagger, {
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

  fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "none",
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
});
