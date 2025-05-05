import { Navigate, useLocation } from 'react-router-dom';

export default function AuthGuard({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // If no token, redirect to login
  if (!token) {
    // Save the attempted location for redirect after login
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  return children;
}
