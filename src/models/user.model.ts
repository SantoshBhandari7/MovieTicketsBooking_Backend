import mongoose from "mongoose";
import { Role } from "../@types/enum.types";

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
      enum: Object.values(Role),
      default: "USER",
    },

    phone: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);
export default User;
