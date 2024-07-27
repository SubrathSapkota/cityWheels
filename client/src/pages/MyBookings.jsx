import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyBookings = () => {
  const { authToken } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/booking/bookings/${authToken.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken.token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [authToken]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="mb-6 p-6 border rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-2xl font-bold mb-2">{`${booking.car.brand} ${booking.car.model}`}</h2>
            <div className="flex justify-between items-center">
              <div className="text-gray-700">
                <p className="mb-1">
                  <strong>Start Date:</strong>{" "}
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <strong>End Date:</strong>{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <strong>Total Price:</strong> ${booking.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <button
                  type="submit"
                  className="w-full mt-5 bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
              <div>
                <img className="h-[200px]" src={booking.car.carImage} alt="" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
