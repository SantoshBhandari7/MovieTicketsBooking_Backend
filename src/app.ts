import express, { NextFunction, Request, Response } from "express";
import { error } from "node:console";
import { register } from "./controllers/auth.controller";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { nextTick } from "node:process";
import AuthRoutes from "./routes/auth.route";
import MovieRoutes from "./routes/movie.route";

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

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1", MovieRoutes);

app.use((req, res, next) => {
  const error: any = Error(`Cannot on ${req.method} on ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  next(error);
});

app.use(errorHandler);

export default app;
