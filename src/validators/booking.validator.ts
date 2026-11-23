import mongoose from "mongoose";
import z, { input } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    user: z.string({
      error: (issue) =>
        issue.input === null ? "user is required" : "user must be string",
    }),
    bookingNumber: z.coerce
      .number({
        error: (issue) =>
          issue.input === null
            ? "booking number is required"
            : "booking number should be number",
      })
      .min(0),
    seats: z
      .string({
        error: (issue) =>
          issue.input === null ? "seat is required" : "seats must be string",
      })
      .min(0),
  }),
  show: z.string({
    error: (issue) =>
      issue.input === null ? "show is required" : "show must be string",
  }),
  totalAmount: z.coerce
    .number({
      error: (issue) =>
        issue.input === null
          ? "total amount is required"
          : "amount must be in number",
    })
    .min(0)
    .int("number should be positive"),
});

export const updateBookingSchema = z.object({
  body: z.object({
    bookingNumber: z.coerce
      .number({
        error: "bookingNumber is must be number",
      })
      .min(0),
    user: z.string({
      error: "user must be in number",
    }),
    seats: z.string({
      error: "seats must be string",
    }),
    show: z.string({
      error: "show must be string",
    }),
    totalAmount: z.coerce.number({
      error: "amount must be number",
    }),
  }),
});

export const deleteBookingSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getByIdBookingSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const BookingQuerySchema = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
  }),
});
