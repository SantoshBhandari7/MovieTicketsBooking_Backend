import express from "express";
import {
  createScreen,
  deleteScreen,
  getAllScreen,
  getScreenById,
  updateScreen,
} from "../controllers/screen.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  createScreenSchema,
  deleteScreenSchema,
  getScreenByIdSchema,
  ScreenQuery,
  updateScreenSchema,
} from "../validators/screen.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", validate(ScreenQuery), getAllScreen);

router.get("/:id", validate(getScreenByIdSchema), getScreenById);

router.post(
  "/",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(createScreenSchema),
  createScreen,
);

router.put(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(updateScreenSchema),
  updateScreen,
);

router.delete(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(deleteScreenSchema),
  deleteScreen,
);

export default router;
