import { NextFunction, Request, Response } from "express";
import { Role } from "../@types/enum.types";
import { ApiError } from "../utils/apiError.utils";
import { verifyJwtToken } from "../utils/jwt.utils";

export const authenticate = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.cookies["access_token"];
      if (!access_token) {
        throw new ApiError("Unauthorized, Access denied", 401);
      }

      const decoded_date = verifyJwtToken(access_token);

      if (!decoded_date) {
        throw new ApiError("Unauthorized, access denied", 401);
      }

      if (decoded_date.exp * 60 * 60 * 1000 <= Date.now()) {
        throw new ApiError("Unauthorized, token is expired", 401);
      }

      if (roles && !roles.includes(decoded_date.role)) {
        throw new ApiError("Unauthorized, Access denied", 403);
      }

      req.user = {
        _id: decoded_date._id,
        email: decoded_date.email,
        full_name: decoded_date.full_name,
        role: decoded_date.role,
      };

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};
