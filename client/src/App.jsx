import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings.jsx';
import SingleCar from './components/SingleCar.jsx';
import HomePageLayout from './pages/HomePageLayout.jsx';
import { useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import RentCar from './pages/RentCar.jsx';

const App = () => {
  const { authToken, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: authToken ? <HomePageLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/singlecar/:id', element: <SingleCar /> },
        { path: '/my-bookings', element: <MyBookings /> },
        { path: '/rent-car/:id', element: <RentCar /> },
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
