import mongoose from "mongoose";
import { ref } from "node:process";
import { Status } from "../@types/enum.types";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    screen: {
      type: mongoose.Types.ObjectId,
      ref: "screen",
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      //   enum :
      default: " SCHEDULED",
    },
  },
  { timestamps: true },
);
