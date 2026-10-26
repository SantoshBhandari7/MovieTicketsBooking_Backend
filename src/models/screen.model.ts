import mongoose from "mongoose";
import { Type } from "../@types/enum.types";

const screenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    cinema: {
      type: mongoose.Types.ObjectId,
      ref: "cinema",
      required: true,
    },
    totalSeats: {
      seats: [
        {
          seatNumber: {
            type: Number,
          },
          row: {
            type: String,
          },
          type: {
            enum: Object.values(Type),
            default: "REGULAR",
          },
        },
      ],
      isActive: {
        type: Boolean,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const Screen = mongoose.model("screen", screenSchema);
export default Screen;
