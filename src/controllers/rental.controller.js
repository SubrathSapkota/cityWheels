import { Rental } from "../models/rental.model.js";

export const createRental = async (req, res) => {
  const { carId } = req.params;
  const { startDate, endDate, totalPrice, customerId } = req.body;

  try {
    const rental = new Rental({
      customer: customerId,
      car: carId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
    });

    console.log("Rental Data before save:", rental); 

    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    console.error("Error creating rental:", error); 
    res.status(400).json({ message: error.message });
  }
};
