// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from './Home';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      element={authToken ? <Home /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
