import z from "zod";
import { Type } from "../@types/enum.types";
import mongoose from "mongoose";

export const createShowSeatsSchema = z.object({
  body: z.object({
    seatNumber: z.coerce
      .number({
        error: (issue) =>
          issue.input === null
            ? "seatNumber is required"
            : "seatNumber must be number",
      })
      .default(0),
    show: z.string({
      error: (issue) =>
        issue.input === null ? "show is required" : "show must be string",
    }),
    seatType: z.enum(Type, {
      error: (issue) =>
        issue.input === null ? "type is required" : "type must be valid",
    }),
    price: z.coerce
      .number({
        error: (issue) =>
          issue.input === null ? "price is required" : "price must be number",
      })
      .default(0),
    booking: z.string({
      error: (issue) =>
        issue.input === null ? "booking is required" : "booking must be string",
    }),
  }),
});

export const updateShowSeatsSchema = z.object({
  body: z.object({
    seatNumber: z.coerce.number({
      error: "seatNumber must be number",
    }),
    show: z.string({
      error: "show must be string",
    }),
    seatType: z.enum(Type, {
      error: "seatType must be valid",
    }),
    price: z.coerce.number({
      error: "price must be string",
    }),
  }),
});

export const deleteShowSeatsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getByIdShowSeatsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const ShowSeatsQuery = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
  }),
});
