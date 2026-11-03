import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPaymentsById,
  updatePayment,
} from "../controllers/payment.controller";

const router = express.Router();

router.get("/", getAllPayments);

router.get("/:id", getPaymentsById);

router.post("/", createPayment);

router.put("/:id", updatePayment);

router.delete("/:id", deletePayment);

export default router;
