import mongoose from "mongoose";
import z from "zod";

export const createMovieSchema = z.object({
  body: z.object({
    title: z
      .string({
        error: (issue) =>
          issue.input === null ? "title is required" : "title must be string",
      })
      .min(3, "title should at least 3 character long")
      .max(100, "title should not exceed than 100 character"),
    description: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "description is required"
            : "description must be string",
      })
      .min(25, "description should be at least 25 character long")
      .max(500, "description should not be exceed than 500 character"),

    duration: z.coerce
      .number({
        error: (issue) =>
          issue.input === null
            ? "duration is required"
            : "duration must be number",
      })
      .min(0),
    language: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "language is required"
            : "language must be string",
      })
      .default("Nepali"),

    releaseDate: z.coerce.date({
      error: (issue) =>
        issue.input === null
          ? "release date is required"
          : "release date must be in date",
    }),
  }),
});

export const updateMovieSchema = z.object({
  body: z.object({
    title: z.string({
      error: "title must be string",
    }),
    description: z.string({
      error: "description must be string",
    }),
    duration: z.coerce.number({
      error: "duration must be number",
    }),
    language: z.string({
      error: "language must be string",
    }),
    releaseDate: z.date({
      error: "release date must be real time date",
    }),
  }),
});

export const MovieByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const deleteMovieSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const MovieQuery = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
  }),
});
