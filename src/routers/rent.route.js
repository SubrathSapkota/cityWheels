import express from "express"
import { createRental } from "../controllers/rental.controller.js"

export const rentRouter = express.Router()

rentRouter.post("/rentCar/:customerId",createRental)