import mongoose from "mongoose";

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
          type:{
            enum:
          }
        },
      ],
    },
  },
  { timestamps: true },
);
