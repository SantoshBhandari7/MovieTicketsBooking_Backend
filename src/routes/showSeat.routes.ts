import express from "express";
import {
  createSeats,
  deleteSeat,
  getAllSeats,
  getSeatsById,
  updateSeats,
} from "../controllers/showSeat.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  createShowSeatsSchema,
  deleteShowSeatsSchema,
  getByIdShowSeatsSchema,
  ShowSeatsQuery,
  updateShowSeatsSchema,
} from "../validators/showSeat.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", validate(ShowSeatsQuery), getAllSeats);

router.get("/:id", validate(getByIdShowSeatsSchema), getSeatsById);

router.post(
  "/",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(createShowSeatsSchema),
  createSeats,
);

router.put(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(updateShowSeatsSchema),
  updateSeats,
);

router.delete(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(deleteShowSeatsSchema),
  deleteSeat,
);

export default router;
