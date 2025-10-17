/**
 * API utility functions for making HTTP requests to the backend
 */

// Base API URL - make sure this matches your backend server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Makes a request to the API with the given method, endpoint, and data
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint (e.g., /auth/login)
 * @param {Object} data - Request body data (for POST, PUT requests)
 * @param {boolean} includeToken - Whether to include the auth token in the request
 * @returns {Promise} - Promise that resolves to the API response
 */
export const apiRequest = async (method, endpoint, data = null, includeToken = false) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add auth token to headers if required
  if (includeToken) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
    credentials: 'include', // Include cookies if your API uses them
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(result.msg || 'Something went wrong');
    }

    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Auth API requests
 */
export const authAPI = {
  // Register a new user
  register: (userData) => {
    return apiRequest('POST', '/auth/signup', userData);
  },
  
  // Login a user
  login: (credentials) => {
    return apiRequest('POST', '/auth/login', credentials);
  },
  
  // Request password reset
  requestPasswordReset: (email) => {
    return apiRequest('POST', '/auth/forgot-password', { email });
  },
  
  // Reset password with token
  resetPassword: (token, newPassword) => {
    return apiRequest('POST', '/auth/reset-password', { token, newPassword });
  },
  
  // Verify token validity
  verifyToken: () => {
    return apiRequest('GET', '/auth/verify', null, true);
  },
};

/**
 * Quiz API requests
 */
export const quizAPI = {
  // Get all quizzes
  getQuizzes: (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiRequest('GET', `/quizzes${queryString ? '?' + queryString : ''}`, null, true);
  },
  
  // Get a specific quiz by ID
  getQuiz: (quizId) => {
    return apiRequest('GET', `/quizzes/${quizId}`, null, true);
  },
  
  // Get quiz categories
  getCategories: () => {
    return apiRequest('GET', '/quizzes/categories', null, true);
  },
  
  // Get quiz tags
  getTags: () => {
    return apiRequest('GET', '/quizzes/tags', null, true);
  },
};
