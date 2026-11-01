import { NextFunction, Request, Response } from "express";
import Cinema from "../models/cinema.model";
import { ApiError } from "../utils/apiError.utils";

export const getAllCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cinemas = await Cinema.find();

    if (!cinemas) {
      throw new ApiError("No Cinema is exists here", 404);
    }

    res.status(200).json({
      message: "Cinema is fetched successfully",
      data: cinemas,
      status: "Success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCinemaById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const cinema = await Cinema.findById(id);
    if (!cinema) {
      throw new ApiError("There no cinema is exists with that id", 404);
    }

    res.status(200).json({
      message: "Cinema fetched success fully",
      data: cinema,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, location, phone, isActive } = req.body;

    const oldCinema = await Cinema.findOne({ name, location });
    if (oldCinema) {
      throw new ApiError("This cinema is already exists", 404);
    }

    const cinema = new Cinema({ name, location, phone, isActive });
    await cinema.save();

    res.status(201).json({
      message: "Cinema create successfully",
      data: cinema,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, location, phone, isActive } = req.body;

    const cinema = await Cinema.findByIdAndUpdate(id);
    if (!cinema) {
      throw new ApiError("cinema is not found", 404);
    }

    const newCinema = new Cinema({ name, location, phone, isActive });

    await newCinema.save();

    res.status(200).json({
      message: "Cinema updated",
      data: newCinema,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const cinema = await Cinema.findByIdAndDelete(id);
    if (!cinema) {
      throw new ApiError("cinema not found with given id", 404);
    }
    res.status(200).json({
      message: "cinema delete success",
      data: null,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
