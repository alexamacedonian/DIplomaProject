import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // If user is not logged in, redirect to login page
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#4D6F97] to-[#A9C9D5] p-4 sm:p-6 md:p-10'>
      <div className='mb-4'>
        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-1 text-white hover:text-gray-200 transition-colors'
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className='flex items-center justify-center'>
        <div className='bg-white text-black p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-xs sm:max-w-sm text-center space-y-4'>
          <div className='flex justify-center'>
            <div className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-gray-400 rounded-full'>
              <span className='text-2xl sm:text-3xl'>👤</span>
            </div>
          </div>
          <h2 className='text-lg font-semibold'>
            {user.username || 'FREEDOMD1VE'}
          </h2>
          <p className='text-gray-600 text-xs sm:text-sm'>
            {user.email || 'YOUR EMAIL ADDRESS'}
          </p>
          <div className='h-3 sm:h-4'></div>
          <p className='text-gray-600 text-xs sm:text-sm'>
            YOUR NUMBER (OPTIONAL)
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 pt-4'>
            <button
              className='bg-red-500 text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm w-full'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
