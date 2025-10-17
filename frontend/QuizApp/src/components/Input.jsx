import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  type = 'text',
  label,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  icon,
  className = '',
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const getIcon = () => {
    if (icon) return icon;
    if (type === 'email') return <FiMail className="text-gray-400" />;
    if (type === 'password') return <FiLock className="text-gray-400" />;
    if (name === 'username' || name === 'name') return <FiUser className="text-gray-400" />;
    return null;
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <motion.div 
          className={`
            absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
            transition-all duration-200
          `}
          animate={{ opacity: isFocused ? 1 : 0.7 }}
        >
          {getIcon()}
        </motion.div>
        
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full py-2 pl-10 pr-10 bg-transparent
            border-b-2 
            ${error 
              ? 'border-red-500 dark:border-red-500' 
              : 'border-gray-300 dark:border-gray-600'
            }
            text-gray-800 dark:text-white
            ${!error && 'focus:border-blue-500 dark:focus:border-blue-400'}
            focus:outline-none transition-all duration-200
            placeholder-gray-400 dark:placeholder-gray-500
          `}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabIndex="-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <FiEyeOff className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            ) : (
              <FiEye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
