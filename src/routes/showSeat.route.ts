import express from "express";
import {
  createSeats,
  deleteSeat,
  getAllSeats,
  getSeatsById,
  updateSeats,
} from "../controllers/showSeat.controller";

const router = express.Router();

router.get("/", getAllSeats);

router.get("/:id", getSeatsById);

router.post("/", createSeats);

router.put("/:id", updateSeats);

router.delete("/:id", deleteSeat);

export default router;
