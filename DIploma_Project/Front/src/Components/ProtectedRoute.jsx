import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component ensures that only authenticated users can access certain routes.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The components to render if user is authenticated
 * @returns {React.ReactNode}
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // If still loading auth state, show nothing yet
  if (loading) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // If authenticated, render children
  return children;
}
