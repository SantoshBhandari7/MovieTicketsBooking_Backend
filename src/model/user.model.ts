import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "full name is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true },
);
