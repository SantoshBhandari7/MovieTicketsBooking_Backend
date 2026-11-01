import express from "express";
import {
  createShow,
  deleteShow,
  getAllShow,
  getShowById,
  updateShow,
} from "../controllers/show.controller";

const router = express.Router();

router.get("/", getAllShow);

router.get("/:id", getShowById);

router.post("/", createShow);

router.put("/:id", updateShow);

router.delete("/:id", deleteShow);

export default router;
