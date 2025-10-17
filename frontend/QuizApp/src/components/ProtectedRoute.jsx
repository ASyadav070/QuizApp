import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

/**
 * Protected route component
 * @param {Object} props - Component props
 * @param {Component} props.component - The component to render if authenticated
 * @param {boolean} props.adminOnly - Whether the route is for admins only
 * @returns {Component} The component to render
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If adminOnly and user is not an admin, redirect to home
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
