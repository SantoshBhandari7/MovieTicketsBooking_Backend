import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const Port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
    data: null,
    success: true,
    status: "success",
  });
});

app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
