import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';

const App = () => {
  return (
    <AuthProvider>
      <div className="h-screen">
        <Routes>
          <PrivateRoute path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
