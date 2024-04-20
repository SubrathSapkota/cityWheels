import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", formData);
      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        // Handle login failure
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
