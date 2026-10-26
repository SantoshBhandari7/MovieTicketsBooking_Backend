import "dotenv/config";
import app from "./app";
import { connectDb } from "./config/db.config";
import ENV_CONFIG from "./config/Env.config";

const Port = ENV_CONFIG.port;
const DB_URI = ENV_CONFIG.DB_URI;
connectDb(DB_URI);

app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
