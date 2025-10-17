import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTheme } from '../context/ThemeContext';
import { FiMoon, FiSun, FiArrowLeft } from 'react-icons/fi';
import { authAPI } from '../utils/api';

const ResetPassword = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resetToken = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Check if token exists
  useEffect(() => {
    if (!resetToken) {
      setError('Invalid password reset token. Please request a new link.');
    }
  }, [resetToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Make API call to reset password
      await authAPI.resetPassword(resetToken, formData.password);
      setIsSuccess(true);
    } catch (error) {
      setError(error.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900 p-4">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all duration-300"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
      </button>
      
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <button 
          onClick={() => navigate('/login')} 
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 mb-6 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          <FiArrowLeft className="mr-2" /> Back to login
        </button>
        
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
        >
          Reset Password
        </motion.h2>

        {!isSuccess ? (
          <>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Enter your new password below to reset your password.
            </p>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4"
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="password"
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth
                disabled={isLoading || !resetToken}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-3"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Password reset successful!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your password has been reset successfully.
            </p>
            <Button 
              onClick={() => navigate('/login')} 
              variant="primary"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Go to Login
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
