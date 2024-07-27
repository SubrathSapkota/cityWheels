import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenData = localStorage.getItem('gd-auth');
    if (tokenData) {
      setAuthToken(JSON.parse(tokenData));
    }
    setLoading(false);
  }, []);

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
        const tokenData = response.data;
        setAuthToken(tokenData);
        localStorage.setItem('gd-auth', JSON.stringify(tokenData));
        return true;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('gd-auth');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
