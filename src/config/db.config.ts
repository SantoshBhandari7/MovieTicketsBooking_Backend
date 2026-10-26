import mongoose from "mongoose";

export const connectDb = (DB_URI: string) => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("DataBase is connected");
    })
    .catch((error) => {
      console.log("Database connection failed");
      console.log(error)
    });
};
