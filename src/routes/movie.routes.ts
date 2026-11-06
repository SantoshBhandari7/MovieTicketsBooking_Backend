import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movie.controller";
import { uploader } from "../middlewares/multer.middleware";

const router = express.Router();
const upload = uploader();

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.post("/", upload.single("poster"), createMovie);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

export default router;
