import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    citizenshipId: "",
    drivingLicense: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/register", formData);
      setSuccessMessage(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
      setSuccessMessage(null);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <h2 className="text-4xl">Register User</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form flex flex-col space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="citizenshipId"
          placeholder="Citizenship ID"
          value={formData.citizenshipId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="drivingLicense"
          placeholder="Driving License"
          value={formData.drivingLicense}
          onChange={handleChange}
        />
        <button type="submit" className="border px-2 py-2 bg-blue-400 text-white text-2xl hover:bg-blue-500">Register</button>
      </form>
    </div>
  );
};

export default SignupForm;
