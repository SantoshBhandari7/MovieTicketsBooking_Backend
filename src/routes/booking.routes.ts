import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBookingById,
  updateBooking,
} from "../controllers/booking.controller";
import { validate } from "../middlewares/validator.middleware";
import { bookingSchema } from "../validators/booking.validator";

const router = express.Router();

router.get("/", getAllBooking);

router.get("/:id", getBookingById);

router.post("/", validate(bookingSchema), createBooking);

router.put("/:id", validate(bookingSchema), updateBooking);

router.delete("/:id", deleteBooking);

export default router;
