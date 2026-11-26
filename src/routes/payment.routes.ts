import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPaymentsById,
  updatePayment,
} from "../controllers/payment.controller";
import { validate } from "../middlewares/validator.middleware";
import { getByIdPaymentSchema, paymentQuery } from "../validators/payment.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/",validate(paymentQuery), getAllPayments);

router.get("/:id",validate(getByIdPaymentSchema), getPaymentsById);

router.post("/",authenticate([Role.SUPER_ADMIN,Role.ADMIN]),validate(cre) createPayment);

router.put("/:id", updatePayment);

router.delete("/:id", deletePayment);

export default router;
