import z, { input } from "zod";

export const bookingSchema = z.object({
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
