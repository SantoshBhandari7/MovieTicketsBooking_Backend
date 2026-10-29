import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { error } from "node:console";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone, role } = req.body;

    const user = await User.findOne(email, full_name);
    if (user) {
      const err = new Error("user already exists");
      err.statusCode = 404;
      next(err);
      return;
    }
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
