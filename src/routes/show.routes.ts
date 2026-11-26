import express from "express";
import {
  createShow,
  deleteShow,
  getAllShow,
  getShowById,
  updateShow,
} from "../controllers/show.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  createShowSchema,
  deleteShowSchema,
  getByIdShowSchema,
  showQuery,
  updateShowSchema,
} from "../validators/show.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", validate(showQuery), getAllShow);

router.get("/:id", validate(getByIdShowSchema), getShowById);

router.post(
  "/",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(createShowSchema),
  createShow,
);

router.put(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(updateShowSchema),
  updateShow,
);

router.delete(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(deleteShowSchema),
  deleteShow,
);

export default router;
