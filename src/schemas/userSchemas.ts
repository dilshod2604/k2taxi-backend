import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
});

const createUserSchema = userSchema.extend({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});

const createUserResponse = userSchema.extend({
  id: z.number(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});

const loginUserResponse = z.object({
  token: z.string(),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;

const getUserByIdSchema = z.object({
  id: z.string(),
});

const getUserByIdResponseSchema = userSchema.extend({
  id: z.number(),
});

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponse,
  loginUserSchema,
  loginUserResponse,
  getUserByIdSchema,
  getUserByIdResponseSchema,
});
