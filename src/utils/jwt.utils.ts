import { IJwtDecodedData, IPayload } from "../@types/global.types";
import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/Env.config";

export const generateJwtToken = (payload: IPayload) => {
  try {
    return jwt.sign(payload, ENV_CONFIG.jwt_secrete, {
      expiresIn: (ENV_CONFIG.jwt_expiries_in as any) ?? "7d",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyJwtToken = (token: string): IJwtDecodedData => {
  try {
    return jwt.verify(token, ENV_CONFIG.jwt_secrete) as IJwtDecodedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
