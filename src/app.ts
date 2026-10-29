import express, { NextFunction, Request, Response } from "express";
import { error } from "node:console";
import { register } from "./controllers/auth.controller";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
    data: null,
    success: true,
    status: "success",
  });
});

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);
  res.status(error?.statusCode ?? 500).json({
    message: error?.message ?? "Something went wrong",
    success: false,
    data: null,
  });
};
app.use("/api/v1/auth", register);
app.use(errorHandler);

export default app;
