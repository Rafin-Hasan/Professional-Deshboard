import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // NEW: Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load initial data (Simulating a session check)
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, check for a token here
        const data = await api.getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Update User Data
  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  // Login Function (Simulated)
  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true); // Unlock the app
        resolve();
      }, 1000);
    });
  };

  // Logout Function
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);