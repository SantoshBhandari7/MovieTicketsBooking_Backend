import mongoose from "mongoose";
import z from "zod";

export const createCinemaSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === null ? "name is required" : "name must be string",
      })
      .min(3, "cinema name should be at least 3 character long")
      .max(100, "cinema name should not be exceed than 100 characters"),
  }),
  location: z.string({
    error: (issue) =>
      issue.input === null ? "location is required" : "location must be string",
  }),
  phone: z
    .string({
      error: (issue) =>
        issue.input === null ? "phone is required" : "phone must be string",
    })
    .regex(/^[0-9]{10}$/, "phone should be exact 10 digit number"),

  isActive: z.boolean({
    error: (issue) =>
      issue.input === null
        ? "isActive is required"
        : "is Active should be in boolean",
  }),
});

export const updateCinemaSchema = z.object({
  body: z.object({
    name: z.string({
      error: "name must be string",
    }),
    location: z.string({
      error: "location should be string",
    }),
    phone: z.string({
      error: "phone should be string",
    }),
    isActive: z.boolean({
      error: "isActive should be boolean",
    }),
  }),
});

export const cinemaByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const deleteCinemaSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const cinemaQuery = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
  }),
});
