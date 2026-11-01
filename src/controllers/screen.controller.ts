import { NextFunction, Request, Response } from "express";
import Screen from "../models/screen.model";
import { ApiError } from "../utils/apiError.utils";
import Cinema from "../models/cinema.model";

export const getAllScreen = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const screens = await Screen.find().populate("cinema");

    res.status(200).json({
      message: "Screen fetched success",
      data: screens,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getScreenById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const screen = await Screen.findById(id).populate("cinema");
    if (!screen) {
      throw new ApiError("Screen not found", 404);
    }

    res.status(200).json({
      message: "screen fetch successfully",
      data: screen,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createScreen = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, cinema, totalSeats } = req.body;
    if (!name || !cinema || !totalSeats) {
      throw new ApiError("All field are required", 400);
    }

    const screen = await Screen.findOne({ name, cinema });
    if (screen) {
      throw new ApiError("Screen already exists", 409);
    }

    const newScreen = new Screen({ name, totalSeats });

    const screenCinema = await Cinema.findOne({ _id: cinema });
    if (!screenCinema) {
      throw new ApiError(`screenCinema:${screenCinema} not found`, 404);
    }
    newScreen.cinema = screenCinema._id;

    await newScreen.save();

    res.status(201).json({
      message: "screen create successfully",
      data: newScreen,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateScreen = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, cinema, totalSeats } = req.body;

    const screen = await Screen.findById(id);
    if (!screen) {
      throw new ApiError("screen not found", 404);
    }

    if (name) screen.name = name;
    if (cinema) screen.cinema = cinema;
    if (totalSeats) screen.totalSeats = totalSeats;

    await screen.save();

    res.status(201).json({
      message: "screen updated successfully",
      data: screen,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteScreen = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const screen = await Screen.findByIdAndDelete(id);

    if (!screen) {
      throw new ApiError("screen not found", 404);
    }

    res.status(200).json({
      message: "screen deleted",
      data: null,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
