import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import StripeCheckout from "react-stripe-checkout";

const RentCar = () => {
  const publishableKey = "pk_test_51PhCiMRxCtrtCS8sBGVXGYKb7pGXUDEXAfEbgSnuZf5Wqd7nSB0seTl2iLvEr9jOwawCuil3CdjxHuSM1qCvp6wT002jUECZkw"
  const { authToken } = useAuth();
  const { id: carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    totalPrice: 0,
    rentalDays: 0,
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/car/singlecar/${carId}`
        );
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (updatedData.startDate && updatedData.endDate) {
        const startDate = new Date(updatedData.startDate);
        const endDate = new Date(updatedData.endDate);
        const rentalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
        if (rentalDays > 0) {
          updatedData.rentalDays = rentalDays;
          updatedData.totalPrice = rentalDays * car.rentalRate;
        } else {
          updatedData.rentalDays = 0;
          updatedData.totalPrice = 0;
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      customerId: authToken.user._id,
    };
    try {
      const response = await axios.post(
        `http://localhost:3000/api/rent/rentCar/${carId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate("/my-bookings");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  const payNow = async (token) => {
    try {
      const response = await axios.post("/order/payment", {
        amount: formData.totalPrice,
        token,
        // orderId: booking._id,
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={car.carImage}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-64 object-cover"
        />
        <div className="flex justify-between">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{`${car.brand} ${car.model}`}</h1>
            <p className="text-gray-700 mb-4">
              <strong>License Plate Number:</strong> {car.licensePlateNumber}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Mileage:</strong> {car.mileage}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Kilometer Run:</strong> {car.kilometerRun}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Rental Rate:</strong> ${car.rentalRate}/day
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Status:</strong> {car.status}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Insurance Details:</strong> {car.insuranceDetails}
            </p>
          </div>
          <div className="bg-white w-[400px] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Rent Car</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Days</label>
                <div className="w-full p-2 border border-gray-300 rounded mt-1">
                  {formData.rentalDays}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Price</label>
                <div className="w-full p-2 border border-gray-300 rounded mt-1">
                  ${formData.totalPrice.toFixed(2)}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Rent
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentCar;
