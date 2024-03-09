import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { mongoConnection } from "./db/connection.js";
import { userRouter } from "./routers/user.route.js";

const app = express();
app.use(express.json());

app.use("/user", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
  mongoConnection();
});




