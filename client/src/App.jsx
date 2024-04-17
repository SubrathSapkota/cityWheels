import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import SignupForm from "./pages/Signup";

const App = () => {
  const isLoggedin = false;
  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedin ? <Home /> : <SignupForm />} />
      </Routes>
    </>
  );
};

export default App;
