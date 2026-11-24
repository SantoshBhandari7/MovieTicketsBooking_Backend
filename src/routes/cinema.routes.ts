import express from "express";
import {
  createCinema,
  deleteCinema,
  getAllCinema,
  getCinemaById,
  updateCinema,
} from "../controllers/cinema.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validator.middleware";
import {
  cinemaByIdSchema,
  cinemaQuery,
  createCinemaSchema,
  deleteCinemaSchema,
  updateCinemaSchema,
} from "../validators/cinema.validator";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", validate(cinemaQuery), getAllCinema);

router.get("/:id", validate(cinemaByIdSchema), getCinemaById);

router.post(
  "/",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(createCinemaSchema),
  createCinema,
);

router.put(
  "/:id",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  validate(updateCinemaSchema),
  updateCinema,
);

router.delete(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(deleteCinemaSchema),
  deleteCinema,
);

export default router;
