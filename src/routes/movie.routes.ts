import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movie.controller";
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import {
  createMovieSchema,
  deleteMovieSchema,
  MovieByIdSchema,
  MovieQuery,
  updateMovieSchema,
} from "../validators/movie.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();
const upload = uploader();

router.get("/", validate(MovieQuery), getAllMovies);

router.get("/:id", validate(MovieByIdSchema), getMovieById);

router.post(
  "/",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  upload.single("poster"),
  validate(createMovieSchema),
  createMovie,
);

router.put(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(updateMovieSchema),
  updateMovie,
);

router.delete(
  "/:id",
  authenticate([Role.SUPER_ADMIN, Role.ADMIN]),
  validate(deleteMovieSchema),
  deleteMovie,
);

export default router;
