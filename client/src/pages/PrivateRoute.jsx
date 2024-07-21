import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { authToken } = useAuth();
  return authToken ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
