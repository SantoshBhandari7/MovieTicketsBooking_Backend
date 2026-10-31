import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { ApiError } from "../utils/apiError.utils";
import { compare, hash } from "../utils/bcrypt.util";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone } = req.body;

    const user = await User.findOne(email, full_name);
    if (user) {
      throw new ApiError("user already exists", 404);
      return;
    }

    const newUser = new User({ full_name, email, phone });

    const hashPass = await hash(password);
    newUser.password = hashPass;

    await newUser.save();

    res.status(201).json({
      message: "User Register Successfully",
      data: newUser,
      status: "success",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new ApiError("Email is required", 404);
      return;
    }

    if (!password) {
      throw new ApiError("password is required", 404);
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError("Invalid Credential", 404);
      return;
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ApiError("Invalid Credential", 404);
      return;
    }

    res.status(201).json({
      message: "Login successfully",
      data: user,
      status: "success",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
