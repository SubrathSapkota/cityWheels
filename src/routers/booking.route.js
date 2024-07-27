import express from 'express';
import { getBookings, initialPayment } from '../controllers/booking.controller.js';

export const bookingRouter = express.Router();

bookingRouter.get('/bookings/:customerId', getBookings);
bookingRouter.post("/payment", initialPayment)