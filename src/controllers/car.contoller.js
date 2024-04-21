import { Car } from "../models/car.model.js";

export const registerCar = async function (req, res, next) {
  try {
    const carExists = await Car.findOne({
      licensePlateNumber: req.body.licensePlateNumber,
    });

    if (carExists) {
      throw createError(200, "Car already exists");
    }

    const newCar = await Car.create(req.body);

    return res.json({
      success: true,
      message: "Car registered successfully",
      car: newCar,
    });
  } catch (error) {
    next(error);
  }
};



export const getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.find();
    res.json(cars);
    console.log('all cars');
  } catch (error) {
    next(error);
    console.log(error);
  }
};


//find single car details
export const getSingleCars = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    next(error);
  }
};