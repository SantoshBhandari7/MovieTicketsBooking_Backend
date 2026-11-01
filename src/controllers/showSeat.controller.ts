import { NextFunction, Request, Response } from "express";
import ShowSeat from "../models/showSteat.model";
import { ApiError } from "../utils/apiError.utils";
import Show from "../models/show.model";
import Booking from "../models/booking.model";

export const getAllSeats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const seats = await ShowSeat.find();

    res.status(200).json({
      message: "all seats fetched",
      data: seats,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSeatsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const seat = await ShowSeat.findById(id);
    if (!seat) {
      throw new ApiError("Seat not found", 404);
    }

    res.status(200).json({
      message: "seat fetch",
      data: seat,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createSeats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      seatNumber,
      show,
      seatType,
      price,
      status,
      holdExpiredAt,
      booking,
    } = req.body;

    const seat = await ShowSeat.findOne({ seatNumber, show });
    if (seat) {
      throw new ApiError("seat already exists", 409);
    }

    const newSeat = new ShowSeat({
      seatNumber,
      seatType,
      price,
      status,
      holdExpiredAt,
    });

    const showSeat = await Show.findOne({ _id: show });
    if (!showSeat) {
      throw new ApiError(`showSeat:${showSeat} not found`, 404);
    }
    newSeat.show = showSeat._id;

    const showBooking = await Booking.findOne({ _id: booking });
    if (!showBooking) {
      throw new ApiError(`bookingShow:${showBooking} not found`, 404);
    }
    newSeat.booking = showBooking._id;

    await newSeat.save();

    res.status(201).json({
      message: "show seats create successfully",
      data: newSeat,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateSeats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const {
      seatNumber,
      show,
      seatType,
      price,
      status,
      holdExpiredAt,
      booking,
    } = req.body;

    const seat = await ShowSeat.findById(id);
    if (!seat) {
      throw new ApiError("seat not found", 404);
    }

    if (seatNumber) seat.seatNumber = seatNumber;
    if (seatType) seat.seatType = seatType;
    if (show) seat.show = show;
    if (price) seat.price = price;
    if (status) seat.status = status;

    await seat.save();
    res.status(200).json({
      message: "seat update success",
      data: seat,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteSeat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const seat = await ShowSeat.findByIdAndDelete(id);

    if (!seat) {
      throw new ApiError("seat not found", 404);
    }
    res.status(200).json({
      message: "seat delete success",
      data: null,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
