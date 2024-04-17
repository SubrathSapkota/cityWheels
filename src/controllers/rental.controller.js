import { Rental } from "../models/rental.model.js";

export const createRental = async (req, res) => {
  const { carId, startDate, endDate, totalPrice } = req.body;
  const { customerId } = req.params;


  try {
    const rental = await Rental.create({
      customer: customerId,
      car: carId,
      startDate,
      endDate,
      totalPrice,
    });
    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
