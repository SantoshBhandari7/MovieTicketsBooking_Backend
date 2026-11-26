import z from "zod";
import { Provider } from "../@types/enum.types";
import mongoose, { mongo } from "mongoose";

export const createPaymentSchema = z.object({
  body: z.object({
    booking: z.string({
      error: (issue) =>
        issue.input === null ? "booking is required" : "booking must be string",
    }),
    user: z.string({
      error: (issue) =>
        issue.input === null ? "user is required" : " user must be string",
    }),
    amount: z.coerce.number({
      error: (issue) =>
        issue.input === null ? "amount is required" : "amount must be number",
    }),
    provider: z.enum(Provider, {
      error: (issue) =>
        issue.input === null
          ? "provider is required"
          : "provider must be valid",
    }),
    transactionId: z.string({
      error: "transactionId must be string",
    }),
  }),
});

export const updatePaymentSchema = z.object({
  body: z.object({
    booking: z.string({
      error: "booking must be string",
    }),
    user: z.string({
      error: "user must be string",
    }),
    amount: z.coerce.number({
      error: "amount must be number",
    }),
    provider: z.enum(Provider, {
      error: "provider must be valid",
    }),
  }),
});

export const deletePaymentSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getByIdPaymentSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});
export const paymentQuery = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
  }),
});
