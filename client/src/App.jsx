import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleCar from "./components/SingleCar";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        formData
      );
      if (response.data.success) {
        setIsLoggedIn(true);
        console.log("Login successfulsssssssssssss");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="h-screen ">
        <Navbar />
        <Routes>
          {/* <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />}
          /> */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/singlecar/:id" element={<SingleCar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
