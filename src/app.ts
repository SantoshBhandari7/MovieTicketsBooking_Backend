import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import AuthRoutes from "./routes/auth.routes";
import MovieRoutes from "./routes/movie.routes";
import CinemaRoutes from "./routes/cinema.routes";
import ScreenRoutes from "./routes/screen.routes";
import ShowRoutes from "./routes/show.routes";
import ShowSeatsRoutes from "./routes/showSeat.routes";
import BookingRoutes from "./routes/booking.routes";
import PaymentRoutes from "./routes/payment.routes";

const app = express();
// app.use();

app.use(cookieParser());
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
app.use("/api/v1/payments", PaymentRoutes);

app.use((req, res, next) => {
  const error: any = new Error(`Cannot on ${req.method} on ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  next(error);
});

app.use(errorHandler);

export default app;
