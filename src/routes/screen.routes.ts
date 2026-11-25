import express from "express";
import {
  createScreen,
  deleteScreen,
  getAllScreen,
  getScreenById,
  updateScreen,
} from "../controllers/screen.controller";
import { validate } from "../middlewares/validator.middleware";
import { ScreenQuery } from "../validators/screen.validator";

const router = express.Router();

router.get("/", validate(ScreenQuery), getAllScreen);

router.get("/:id", validate(schema), getScreenById);

router.post("/", createScreen);

router.put("/:id", updateScreen);

router.delete("/:id", deleteScreen);

export default router;
