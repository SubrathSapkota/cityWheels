import { Car } from "../models/car.model.js";

export const registerCar = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const {
      brand,
      model,
      licensePlateNumber,
      mileage,
      kilometerRun,
      insuranceDetails,
      carImage,
    } = req.body;

    if (
      !vendorId ||
      !brand ||
      !model ||
      !licensePlateNumber ||
      !mileage ||
      !kilometerRun ||
      !insuranceDetails ||
      !carImage
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCar = new Car({
      vendorId,
      brand,
      model,
      licensePlateNumber,
      mileage,
      kilometerRun,
      insuranceDetails,
      carImage,
    });

    await newCar.save();

    res
      .status(201)
      .json({ message: "Car registered successfully", car: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
