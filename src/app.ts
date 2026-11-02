import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import AuthRoutes from "./routes/auth.route";
import MovieRoutes from "./routes/movie.route";
import CinemaRoutes from "./routes/cinema.route";
import ScreenRoutes from "./routes/screen.route";
import ShowRoutes from "./routes/show.routes";
import ShowSeatsRoutes from "./routes/showSeat.route";
import BookingRoutes from "./routes/booking.route";

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
app.use("/api/v1/movies", MovieRoutes);
app.use("/api/v1/cinemas", CinemaRoutes);
app.use("/api/v1/screens", ScreenRoutes);
app.use("/api/v1/shows", ShowRoutes);
app.use("/api/v1/showSeats", ShowSeatsRoutes);
app.use("/api/v1/bookings", BookingRoutes);

app.use((req, res, next) => {
  const error: any = Error(`Cannot on ${req.method} on ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  next(error);
});

app.use(errorHandler);

export default app;
