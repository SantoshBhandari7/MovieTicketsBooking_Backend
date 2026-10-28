import mongoose from "mongoose";
import { BookingStatus, PaymentStatus } from "../@types/enum.types";

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
      enum: Object.values(BookingStatus),
      default: "AVAILABLE",
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: "UNPAID",
    },
    expireAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("booking", bookingSchema);
export default Booking;
