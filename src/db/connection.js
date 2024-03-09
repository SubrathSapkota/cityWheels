import mongoose from "mongoose";

export const mongoConnection = () =>
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Database connected`);
    })
    .catch((err) => {
      console.log(err);
    });
