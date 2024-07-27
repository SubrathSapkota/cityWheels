import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoClose } from "react-icons/io5";

const Card = ({ car, id, handleCardClick }) => {
  const navigate = useNavigate();

  const { authToken, loading } = useAuth();
  console.log(authToken);

  const handleRentNow = (carId) => {
    navigate(`/rent-car/${carId}`);
    console.log('hero');
  };

  const handleViewDetails = (carId) => {
    console.log('hero');
    handleCardClick(carId);
  }


  const { _id, brand, model, rentalRate, status, carImage } = car;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:ring-2 ring-red-500 transition ease-in-out delay-200 cursor-pointer" onClick={() => handleViewDetails(_id)}>
      <img
        className=" h-[200px] w-[400px] object-cover"
        src={`${car.carImage}`}
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
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${status === "available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            } mr-2 mb-2`}
        >
          {status === "available" ? "Available" : "Not Available"}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          12/12/2024
        </span>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center gap-4">
        <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" onClick={() => handleViewDetails(_id)}>
          View Details
        </button>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"  onClick={() => handleRentNow(_id)} >
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default Card;
