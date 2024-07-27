import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";

const SingleCar = ({ id, setToggleCard }) => {
  // const { id } = useParams();
  const [car, setCar] = useState(null);
  console.log(id);

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
    return () => { };
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-transparent flex items-center overflow-hidden  relative">
      <div className="z-10 absolute top-2 right-2 hover:bg-gray-200 rounded-full text-gray-600 " onClick={() => setToggleCard(false)}><IoClose size={25} /></div>
      <div className="w-full rounded bg-white shadow-xl p-10 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src={car.carImage}
                className="w-[600px] h-[400px] relative z-10 object-cover"
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
