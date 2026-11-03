import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movie.controller";

const router = express.Router();

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.post("/", createMovie);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

export default router;
