import z from "zod";

export const userRegisterSchema = z.object({
  body: z.object({
    full_name: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "fullname is required"
            : "fullname must be string",
      })
      .min(3, "fullname must be 3 character long")
      .max(100, "fullname must not exceed 100 character"),
    password: z.string({
      error: (issue) =>
        issue.input === null
          ? "password is required"
          : "password must be string",
    }),
    email: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "email is required"
          : "Invalid email format",
    }),
    // phone:z.string()
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "email is required"
          : "Invalid email format",
    }),
    password: z.string({
      error: (issue) =>
        issue.input === null
          ? "password is required"
          : "password must be string",
    }),
  }),
});
