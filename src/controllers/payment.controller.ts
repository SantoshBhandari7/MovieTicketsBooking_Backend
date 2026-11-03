import { NextFunction, Request, Response } from "express";
import Payment from "../models/payment.model";
import { ApiError } from "../utils/apiError.utils";
import Booking from "../models/booking.model";
import User from "../models/user.model";

export const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      message: "all payments are fetched",
      data: payments,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPaymentsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);

    if (!payment) {
      throw new ApiError("payment not found", 404);
    }

    res.status(200).json({
      message: "payment fetch",
      data: payment,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { booking, user, amount, provider, transactionId } = req.body;

    if (!booking || !user || !amount || !provider) {
      throw new ApiError("all fields are required", 400);
    }

    const payment = new Payment({
      amount,
      provider,
      transactionId,
    });

    const paymentBooking = await Booking.findOne({ _id: booking });
    if (!paymentBooking) {
      throw new ApiError("payment booking not found", 404);
    }
    payment.booking = paymentBooking._id;

    const paymentUser = await User.findOne({ _id: user });
    if (!paymentUser) {
      throw new ApiError("payment user not found", 404);
    }
    payment.user = paymentUser._id;
    await payment.save();

    res.status(200).json({
      message: "create payment successfully",
      data: payment,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { booking, user, amount, provider, transactionId } = req.body;

    const payment = await Payment.findById(id);
    if (!payment) {
      throw new ApiError("payment not found", 404);
    }

    if (booking) {
      const paymentBooking = await Booking.findOne({ _id: booking });
      if (!paymentBooking) {
        throw new ApiError("payment booking not found", 404);
      }
      payment.booking = paymentBooking._id;
    }
    if (user) {
      const paymentUser = await User.findOne({ _id: user });
      if (!paymentUser) {
        throw new ApiError("payment user not found", 404);
      }
      payment.user = paymentUser._id;
    }
    if (amount) payment.amount = amount;
    if (provider) payment.provider = provider;
    if (transactionId) payment.transactionId = transactionId;

    await payment.save();

    res.status(200).json({
      message: "payment updated successfully",
      data: payment,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      throw new ApiError("payment not found", 404);
    }

    res.status(200).json({
      message: "payment deleted successfully",
      data: payment,
      status: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
