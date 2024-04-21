import express from "express"
import { getAllCars, getSingleCars, registerCar } from "../controllers/car.contoller.js"

export const carRouter = express.Router()

carRouter.post("/registercar/:id",registerCar)
carRouter.get("/getallcars",getAllCars)
carRouter.get("/singlecar/:id",getSingleCars)