import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ car, onGetSingleCar }) => {
  const navigate = useNavigate();

  const handleRentNow = (carId) => {
    // onGetSingleCar(carId);
    navigate(`/singlecar/${carId}`);
  };

  const { _id, brand, model, rentalRate, status, carImage } = car;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={carImage}
        alt={`${brand} ${model}`}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${brand} ${model}`}</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, accusantium.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
            status === "available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          } mr-2 mb-2`}
        >
          {status === "available" ? "Available" : "Not Available"}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          12/12/2024
        </span>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="font-semibold text-xl">{`${rentalRate}/day`}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRentNow(_id)}>
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default Card;
