import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/car/singlecar/${id}`
        );
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching single car:", error);
      }
    };

    fetchCar();
    return () => {};
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-w-screen min-h-screen  bg-yellow-300 flex items-center overflow-hidden relative">
      <div className="w-full max-w-7xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/dw-burnett-pcoty22-8260-1671143390.jpg?crop=0.668xw:1.00xh;0.184xw,0&resize=640:*"
                className="w-full relative z-10"
                alt="care name"
              />
              <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl mb-5">
                {car.brand} {car.model}
              </h1>
              <p className="text-sm">
                <strong>License Plate Number:</strong> {car.licensePlateNumber}
                <br />
                <strong>Mileage:</strong> {car.mileage}
                <br />
                <strong>Kilometer Run:</strong> {car.kilometerRun}
                <br />
                <strong>Rental Rate:</strong> ${car.rentalRate}/day
                <br />
                <strong>Status:</strong> {car.status}
                <br />
                <strong>Insurance Details:</strong> {car.insuranceDetails}
              </p>
            </div>
            <div>
              <div className="inline-block align-bottom mr-5">
                <span className="text-2xl leading-none align-baseline">$</span>
                <span className="font-bold text-5xl leading-none align-baseline">
                  {car.rentalRate}
                </span>
                <span className="text-2xl leading-none align-baseline">
                  .00
                </span>
              </div>
              <div className="inline-block align-bottom">
                <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                  <i className="mdi mdi-cart -ml-2 mr-2"></i> RENT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCar;
