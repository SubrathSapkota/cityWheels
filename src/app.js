import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { mongoConnection } from "./db/connection.js";
import { userRouter } from "./routers/user.route.js";
import { carRouter } from "./routers/car.route.js";
import { rentRouter } from "./routers/rent.route.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.use("/user", userRouter);
app.use("/vendor", carRouter);
app.use("/rent", rentRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
  mongoConnection();
});




