import { NextFunction, Request, Response } from "express";
import Movie from "../models/movie.model";
import { ApiError } from "../utils/apiError.utils";

export const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movies = await Movie.find();

    if (!movies) {
      throw new ApiError("movies are not exists", 404);
    }

    res.status(200).json({
      message: "Movies fetched successfully",
      data: movies,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      throw new ApiError("movie with this id is not found", 404);
    }

    res.status(200).json({
      message: "Movie fetch",
      data: movie,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, duration, language, releaseDate } = req.body;

    const oldMovie = await Movie.findOne({ title });
    if (oldMovie) {
      throw new ApiError("Movie with this name is already exists", 404);
    }

    const movie = new Movie({
      title,
      description,
      duration,
      language,
      releaseDate,
    });

    await movie.save();

    res.status(201).json({
      message: "movie created successfully",
      data: movie,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { title, description, duration, language, releaseDate } = req.body;

    const movie = await Movie.findByIdAndUpdate(id);
    if (!movie) {
      throw new ApiError("Movie not found with given id", 404);
    }

    const newMovie = new Movie({
      title,
      description,
      duration,
      language,
      releaseDate,
    });

    res.status(201).json({
      message: "movie updated successfully",
      data: newMovie,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      throw new ApiError("movie not found with that id", 404);
    }

    res.status(200).json({
      message: "movie deleted successfully",
      data: null,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
