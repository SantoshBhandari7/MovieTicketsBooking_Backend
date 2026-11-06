import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { ApiError } from "../utils/apiError.utils";
import { compare, hash } from "../utils/bcrypt.util";
import { upload } from "../utils/cloudinary.utils";
import ENV_CONFIG from "../config/Env.config";

const uploadFolders = "/profiles";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone } = req.body;
    const profile_image = req.file;

    const user = await User.findOne(email, full_name);
    if (user) {
      throw new ApiError("user already exists", 404);
      return;
    }

    const newUser = new User({ full_name, email, phone });

    const hashPass = await hash(password);
    newUser.password = hashPass;

    if (profile_image) {
      const { path, public_id } = await upload(profile_image, uploadFolders);
      newUser.profile_image = {
        path,
        public_id,
      };
    }

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

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ id });

    if (!user) {
      throw new ApiError("user not found", 404);
    }

    res.status(200).json({
      message: "user profiles fetched",
      data: user,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const Logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: ENV_CONFIG.node_env === "development" ? false : true,
      maxAge: Date.now(),
      sameSite: ENV_CONFIG.node_env === "development" ? "lax" : "none",
      secure: ENV_CONFIG.node_env === "development" ? false : true,
    });
    res.status(200).json({
      message: "logout successfully",
      data: null,
      success: true,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
