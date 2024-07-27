import { Rental } from "../models/rental.model.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "pk_test_51PhCiMRxCtrtCS8sBGVXGYKb7pGXUDEXAfEbgSnuZf5Wqd7nSB0seTl2iLvEr9jOwawCuil3CdjxHuSM1qCvp6wT002jUECZkw"
);

export const getBookings = async (req, res) => {
  const { customerId } = req.params;

  try {
    const bookings = await Rental.find({ customer: customerId }).populate(
      "car"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const initialPayment = async (eq, res, next) => {
  let status;
  const { token, amount, orderId } = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    await Rental.findByIdAndUpdate(orderId, {
      $set: {
        isPaid: true,
      },
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }
  return res.json({ error, status });
};
