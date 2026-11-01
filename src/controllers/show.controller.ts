import { NextFunction, Request, Response } from "express";
import Show from "../models/show.model";
import { ApiError } from "../utils/apiError.utils";
import Movie from "../models/movie.model";
import Screen from "../models/screen.model";

export const getAllShow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const shows = await Show.find();

    if (!shows) {
      throw new ApiError("No any show exists", 404);
    }

    res.status(200).json({
      message: "all show fetched",
      data: shows,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getShowById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const show = await Show.findById(id);
    if (!show) {
      throw new ApiError("show does not exists with given id", 404);
    }

    res.status(200).json({
      message: "Show fetched",
      data: show,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createShow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { movie, screen, startTime, endTime, ticketPrice, status } = req.body;

    if (
      !movie ||
      !screen ||
      !startTime ||
      !endTime ||
      !ticketPrice ||
      !status
    ) {
      throw new ApiError("all filed are required", 409);
    }

    const show = new Show({ startTime, endTime, ticketPrice, status });

    const movieShow = await Movie.findOne({ _id: movie });
    if (!movieShow) {
      throw new ApiError(`Movie:${movie} not found `, 404);
    }
    show.movie = movieShow._id;

    const screenShow = await Screen.findOne({ _id: screen });
    if (!screenShow) {
      throw new ApiError(`Screen:${screen} not found`, 404);
    }
    show.screen = screenShow._id;

    show.save();

    res.status(200).json({
      message: "show create successfully",
      data: show,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateShow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { movie, screen, startTime, endTime, ticketPrice, status } = req.body;

    const show = await Show.findById(id);
    if (!show) {
      throw new ApiError("show not found", 404);
    }
    if (movie) show.movie = movie;
    if (screen) show.screen = screen;
    if (startTime) show.startTime = startTime;
    if (endTime) show.endTime = endTime;
    if (status) show.status = status;
    if (ticketPrice) show.ticketPrice = ticketPrice;

    await show.save();

    res.status(201).json({
      message: "show updated",
      data: show,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteShow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const show = await Show.findByIdAndDelete(id);

    if (!show) {
      throw new ApiError("show not found", 404);
    }

    res.status(200).json({
      message: "show deleted successfully",
      data: null,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
