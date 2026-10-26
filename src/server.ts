import app from "./app";
import { connectDb } from "./config/db.config";

const Port = 5000;
const DB_URI = "mongodb://localhost:27017/MovieTicketBooking";
connectDb(DB_URI);

app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
