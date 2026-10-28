import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    seats: {
      type: mongoose.Types.ObjectId,
      ref: "showseats",
      required: true,
    },

    show: {
      type: mongoose.Types.ObjectId,
      ref: "show",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(),
    },
  },
  { timestamps: true },
);
