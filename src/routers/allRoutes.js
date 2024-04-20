import express from 'express'
import { carRouter } from './car.route.js';
import userRouter  from './user.route.js';
import { rentRouter } from './rent.route.js';

const allRoutes = express.Router()

allRoutes.use("/user", userRouter);
allRoutes.use("/vendor", carRouter);
allRoutes.use("/rent", rentRouter);

// Test Route for Checking whether the app is working or not
allRoutes.use("/test", (req, res) => {
  res.send("Hello world")
})

export default allRoutes