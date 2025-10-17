import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      // Verify token validity with backend when app loads
      setCurrentUser(JSON.parse(user));
      
      // Optional: Verify token on backend if needed
      // authAPI.verifyToken()
      //  .then(() => setCurrentUser(JSON.parse(user)))
      //  .catch(() => {
      //    // Token invalid or expired
      //    localStorage.removeItem('token');
      //    localStorage.removeItem('user');
      //    setCurrentUser(null);
      //  })
      //  .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  
  // Login user
  const login = async (credentials) => {
    setError(null);
    try {
      const { token, user } = await authAPI.login(credentials);
      
      // Save token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    }
  };
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };
  
  // Register user
  const register = async (userData) => {
    setError(null);
    try {
      const { token, user } = await authAPI.register(userData);
      
      // Save token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    }
  };
  
  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
    error
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
