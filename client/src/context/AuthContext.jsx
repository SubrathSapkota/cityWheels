// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { setAuth as setAuthStorage, removeAuth  } from '../auth.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const login = async (formData) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        console.log('Login successful');
        const { token } = response.data;
        setAuthToken(token);
        setAuthStorage(response.data);
        return true;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthToken(null);
    removeAuth();
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
