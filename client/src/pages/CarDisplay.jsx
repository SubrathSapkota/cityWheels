import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const CarDisplay = () => {
  const [cars, setCars] = useState([]);

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

 
  return (
    <div className="grid grid-cols-4 gap-5">
      {cars.map((car) => (
        <Card key={car._id} car={car} />
      ))}
    </div>
  );
};

export default CarDisplay;
