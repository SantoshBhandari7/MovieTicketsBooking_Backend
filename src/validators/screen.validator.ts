import z from "zod";
import { Type } from "../@types/enum.types";

export const createScreenSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === null ? "name is required" : "name must be string",
      })
      .min(3, "at least  3 character in name")
      .max(100, "should not exceed than 100 character"),
    cinema: z.string({
      error: (issue) =>
        issue.input === null ? "cinema is required" : "cinema must be string",
    }),
    totalSeats: z.object({
      seats: z.array(
        z.object({
          seatNumber: z.coerce.number({
            error: (issue) =>
              issue.input === null
                ? "seat number is required"
                : "seatNumber must be number",
          }),
          row: z.string({
            error: (issue) =>
              issue.input === null ? "row is required" : "row must be string",
          }),
          type: z.enum(Type, {
            error: "seat type is invalid",
          }),
        }),
      ),
    }),
  }),
});

export const updateScreenSchema = z.object({
  body: z.object({
    name: z.string({
      error: "name must be string",
    }),
    cinema: z.string({
      error: "cinema must be string",
    }),
    totalSeats: z.object({
      seats: z.array(
        z.object({
          seatNumber: z.coerce.number({
            error: "seat number must be number",
          }),
          row: z.string({
            error: "row must be string",
          }),
          type: z.enum(Type, {
            error: "Invalid type",
          }),
        }),
      ),
    }),
  }),
});
