import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    logout();
    navigate('/login');
  };

  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/' className='text-xl font-bold text-sky-600'>
                Air Quality
              </Link>
            </div>
            {isAuthenticated && (
              <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                <Link
                  to='/'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Home
                </Link>
                <Link
                  to='/air-quality'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Air Quality
                </Link>
                <Link
                  to='/profile'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Profile
                </Link>
                <Link
                  to='/settings'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Settings
                </Link>
                <Link
                  to='/about'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  About
                </Link>
                <Link
                  to='/contact'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
          <div className='flex items-center'>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className='ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700'
              >
                Logout
              </button>
            ) : (
              <div className='flex space-x-4'>
                <Link
                  to='/login'
                  className='text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 rounded-md text-sm font-medium'
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
