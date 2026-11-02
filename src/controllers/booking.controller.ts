import { NextFunction, Request, Response } from "express";
import Booking from "../models/booking.model";
import { ApiError } from "../utils/apiError.utils";
import Show from "../models/show.model";
import User from "../models/user.model";
import ShowSeat from "../models/showSteat.model";
import { BookingStatus, PaymentStatus } from "../@types/enum.types";

export const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const booking = await Booking.find()
      .populate("user")
      .populate("show")
      .populate("seats");

    res.status(200).json({
      message: "booking fetch",
      data: booking,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("user")
      .populate("seats")
      .populate("show");

    if (!booking) {
      throw new ApiError("booking not found", 404);
    }

    res.status(200).json({
      message: "booking fetch",
      data: booking,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookingNumber, user, seats, show } = req.body;

    if (!bookingNumber || !user || !seats || seats.length === 0 || !show) {
      throw new ApiError("All fields are required", 409);
    }

    const booking = await Booking.findOne({ bookingNumber });

    if (booking) {
      throw new ApiError("this show seats already booked ", 409);
    }

    const newBooking = new Booking({
      bookingNumber,
    });

    const bookingUser = await User.findOne({ _id: user });
    if (!bookingUser) {
      throw new ApiError("user not found", 404);
    }
    newBooking.user = bookingUser._id;

    const bookingSeats = await ShowSeat.find({
      _id: { $in: seats },
    });

    if (bookingSeats.length !== seats.length) {
      throw new ApiError("Some seats not found", 404);
    }

    newBooking.seats = bookingSeats.map((seat) => seat._id);

    const bookingShow = await Show.findOne({ show });
    if (!bookingShow) {
      throw new ApiError(`show:${show} not found`, 404);
    }
    newBooking.show = bookingShow._id;

    newBooking.totalAmount = seats.length * bookingShow.ticketPrice;
    newBooking.status = BookingStatus.PENDING;
    newBooking.paymentStatus = PaymentStatus.UNPAID;
    newBooking.expireAt = new Date(Date.now() + 10 * 60 * 1000);

    await newBooking.save();

    res.status(200).json({
      message: "booking created successfully",
      data: newBooking,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { seats, show } = req.body;

    const booking = await Booking.findOne({ _id: id });

    if (!booking) {
      throw new ApiError(`Booking: ${id} not found`, 404);
    }

    if (seats) {
      const bookingSeats = await ShowSeat.find({
        _id: { $in: seats },
      });

      if (bookingSeats.length !== seats.length) {
        throw new ApiError("Some seats not found", 404);
      }

      booking.seats = bookingSeats.map((seat) => seat._id);
    }

    if (show) {
      const bookingShow = await Show.findOne({ _id: show });

      if (!bookingShow) {
        throw new ApiError(`Show: ${show} not found`, 404);
      }

      booking.show = bookingShow._id;
    }

    const bookingShow = await Show.findById(booking.show);

    if (!bookingShow) {
      throw new ApiError("Show not found", 404);
    }

    booking.totalAmount = booking.seats.length * bookingShow.ticketPrice;

    await booking.save();

    res.status(200).json({
      message: "Booking updated successfully",
      data: booking,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({ _id: id });

    if (!booking) {
      throw new ApiError(`Booking: ${id} not found`, 404);
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      message: "Booking deleted successfully",
      data: booking,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
