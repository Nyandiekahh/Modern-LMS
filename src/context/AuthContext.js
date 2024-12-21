// src/context/AuthContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (email, password) => {
    // TODO: Replace with actual API call
    try {
      // Simulate API call
      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email,
        role: 'teacher',
        code: 'TECH123', // For teachers
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirect based on role
      navigate(`/dashboard/${mockUser.role}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [navigate]);

  const register = useCallback(async (userData) => {
    // TODO: Replace with actual API call
    try {
      const mockUser = {
        id: '1',
        ...userData,
        code: userData.role === 'teacher' ? 'TECH123' : null,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      navigate(`/dashboard/${mockUser.role}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};