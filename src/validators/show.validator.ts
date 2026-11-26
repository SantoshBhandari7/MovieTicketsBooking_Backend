import z from "zod";
import { Status } from "../@types/enum.types";
import mongoose from "mongoose";

export const createShowSchema = z.object({
  body: z.object({
    movie: z
      .string({
        error: (issue) =>
          issue.input === null ? "movie is required" : "movie must be string",
      })
      .min(3, "at least 3 character long")
      .max(100, "should not exceed than 100 character"),
    screen: z.string({
      error: (issue) =>
        issue.input === null ? "screen is required" : "screen must be required",
    }),
    startTime: z.date({
      error: (issue) =>
        issue.input === null
          ? "start time is required"
          : "start time must be date",
    }),
    endTime: z.date({
      error: (issue) =>
        issue.input === null
          ? "start time is required"
          : "start time must be date",
    }),
    ticketPrice: z.coerce
      .number({
        error: (issue) =>
          issue.input === null
            ? "ticketPrice is required"
            : "ticketPrice must be number",
      })
      .min(0),
    status: z.enum(Status, {
      error: "Invalid status",
    }),
  }),
});

export const updateShowSchema = z.object({
  body: z.object({
    movie: z.string({
      error: "movie is required",
    }),
    screen: z.string({
      error: "screen is required",
    }),
    startTime: z.date({
      error: "startTime must be date",
    }),
    endTime: z.date({
      error: "endDate must be date",
    }),
    ticketPrice: z.coerce.number({
      error: "ticketPrice must be number",
    }),
  }),
});

export const deleteShowSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getByIdShowSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const showQuery = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
  }),
});
