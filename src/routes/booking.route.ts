import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBookingById,
  updateBooking,
} from "../controllers/booking.controller";

const router = express.Router();

router.get("/", getAllBooking);

router.get("/:id", getBookingById);

router.post("/", createBooking);

router.put("/:id", updateBooking);

router.delete("/:id", deleteBooking);

export default router;
