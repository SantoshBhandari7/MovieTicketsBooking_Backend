import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBookingById,
  updateBooking,
} from "../controllers/booking.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  BookingQuerySchema,
  createBookingSchema,
  deleteBookingSchema,
  getByIdBookingSchema,
  updateBookingSchema,
} from "../validators/booking.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get(
  "/",
  authenticate([Role.ADMIN || Role.SUPER_ADMIN]),
  validate(BookingQuerySchema),
  getAllBooking,
);

router.get(
  "/:id",
  authenticate([Role.USER]),
  validate(getByIdBookingSchema),
  getBookingById,
);

router.post("/", authenticate(), validate(createBookingSchema), createBooking);

router.put(
  "/:id",
  authenticate([Role.ADMIN || Role.SUPER_ADMIN]),
  validate(updateBookingSchema),
  updateBooking,
);

router.delete(
  "/:id",
  authenticate([Role.ADMIN || Role.SUPER_ADMIN]),
  validate(deleteBookingSchema),
  deleteBooking,
);

export default router;
