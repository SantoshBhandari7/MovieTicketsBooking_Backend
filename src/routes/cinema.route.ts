import express from "express";
import {
  createCinema,
  deleteCinema,
  getAllCinema,
  getCinemaById,
  updateCinema,
} from "../controllers/cinema.controller";

const router = express.Router();

router.get("/", getAllCinema);

router.get("/:id", getCinemaById);

router.post("/", createCinema);

router.put("/:id", updateCinema);

router.delete("/:id", deleteCinema);

export default router;
