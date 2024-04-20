import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { mongoConnection } from "./db/connection.js";
import allRoutes from "./routers/allRoutes.js";

import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.use(`/api`, allRoutes)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
  mongoConnection();
});




