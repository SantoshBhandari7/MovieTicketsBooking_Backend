import mongoose from "mongoose";
import { SeatStatus, Type } from "../@types/enum.types";

const showSeatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: Number,
      required: true,
    },
    show: {
      type: mongoose.Types.ObjectId,
      ref: "show",
      required: true,
    },
    seatType: {
      type: String,
      enum: Object.values(Type),
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(SeatStatus),
      default: "AVAILABLE",
    },
    holdExpiredAt: {
      type: Date,
      default: null,
    },
    booking: {
      type: mongoose.Types.ObjectId,
      ref: "booking",
      required: true,
    },
  },
  { timestamps: true },
);

const ShowSeat = mongoose.model("showseats", showSeatSchema);
export default ShowSeat;
