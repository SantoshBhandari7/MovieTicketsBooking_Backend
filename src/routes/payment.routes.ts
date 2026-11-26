import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPaymentsById,
  updatePayment,
} from "../controllers/payment.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  createPaymentSchema,
  deletePaymentSchema,
  getByIdPaymentSchema,
  paymentQuery,
  updatePaymentSchema,
} from "../validators/payment.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", validate(paymentQuery), getAllPayments);

router.get("/:id", validate(getByIdPaymentSchema), getPaymentsById);

router.post(
  "/",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(createPaymentSchema),
  createPayment,
);

router.put(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(updatePaymentSchema),
  updatePayment,
);

router.delete(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(deletePaymentSchema),
  deletePayment,
);

export default router;
