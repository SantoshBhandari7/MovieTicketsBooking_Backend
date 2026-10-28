import mongoose from "mongoose";
import { Provider } from "../@types/enum.types";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Types.ObjectId,
      ref: "booking",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    provider: {
      type: String,
      enum: Object.values(Provider),
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("payment", paymentSchema);
export default Payment;
