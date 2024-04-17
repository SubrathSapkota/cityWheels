import express from "express"
import { registerCar } from "../controllers/car.contoller.js"

export const carRouter = express.Router()

carRouter.post("/registercar/:id",registerCar)