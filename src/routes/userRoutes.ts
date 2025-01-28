import { FastifyInstance } from "fastify";
import { createUser, getMe, loginUser } from "../controlers/userAuth";
import { $ref } from "../schemas/userSchemas";

export default async function (fastify: FastifyInstance) {
  fastify.post(
    "/sign-up",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponse"),
        },
      },
    },
    createUser
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: $ref("loginUserSchema"),
        response: {
          200: $ref("loginUserResponse"),
        },
      },
    },
    loginUser
  );

  fastify.get(
    "/user/:id",
    {
      preHandler: [fastify.authJWT],
      schema: {
        params: $ref("getUserByIdSchema"),
        response: {
          200: $ref("getUserByIdResponseSchema"),
        },
      },
    },
    getMe
  );
}
