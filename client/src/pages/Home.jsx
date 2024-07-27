import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import SingleCar from "../components/SingleCar";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { authToken, loading } = useAuth();
  console.log(authToken.user._id);
  const [cars, setCars] = useState([]);
  const [toggleCard, setToggleCard] = useState(false);
  const [carId, setCarId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/car/getallcars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleCardClick = (carId) => {
    console.log("Card clicked", car => car._id);
    setCarId(carId);
    setToggleCard(true);
  };

  return (
    <div className=" relative">
      <div className="h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar py-10  ">
        {toggleCard && <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm" onClick={()=>setToggleCard(false)}></div>}
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-4 gap-5">
            {cars.map((car) => (
              <Card key={car._id} car={car} handleCardClick={handleCardClick} />
            ))}
          </div>

          {
            toggleCard && (
              <div className=" absolute top-1/4 left-1/4 ">
                {/* <button onClick={()=> setToggleCard(false)}>close</button> */}
                <SingleCar id={carId} setToggleCard={setToggleCard} />
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
};
export default Home;
