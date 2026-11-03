import express from "express";
import {
  createScreen,
  deleteScreen,
  getAllScreen,
  getScreenById,
  updateScreen,
} from "../controllers/screen.controller";

const router = express.Router();

router.get("/", getAllScreen);

router.get("/:id", getScreenById);

router.post("/", createScreen);

router.put("/:id", updateScreen);

router.delete("/:id", deleteScreen);

export default router;
