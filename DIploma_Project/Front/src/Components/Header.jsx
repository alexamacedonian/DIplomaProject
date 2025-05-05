import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, Menu, X } from 'lucide-react';
import TabButton from './TabButton';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
export default function AirQualityHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const tabs = ['Daily', 'Monthly', 'Yearly'];

  // Читаем query-параметр tab из URL
  const query = new URLSearchParams(location.search);
  const activeTab = query.get('tab');

  return (
    <div className='w-full'>
      {/* Top Bar */}
      <div className='bg-[#2E5C74] text-white flex justify-between items-center px-4 sm:px-6 py-3'>
        <div className='flex items-center gap-2'>
          <img src={logo} alt='icon' />
          <span className='font-bold text-sm uppercase'>Air Quality</span>
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='text-white'
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className='hidden md:flex items-center gap-2'>
          <button
            onClick={() => navigate('/faq')}
            className='bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner'
          >
            FAQ'S
          </button>
          <button
            onClick={() => navigate('/about')}
            className='bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner'
          >
            About
          </button>

          {isAuthenticated ? (
            <>
              <span
                onClick={() => navigate('/profile')}
                className='ml-4 font-bold text-sm cursor-pointer'
              >
                {user.username || 'FREEDOMD1VE'}
              </span>
              <UserCircle
                className='w-6 h-6 cursor-pointer'
                onClick={() => navigate('/profile')}
              />
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className='ml-4 bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner'
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className='bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner'
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-[#2E5C74] text-white px-4 py-2 flex flex-col gap-2'>
          <button
            onClick={() => {
              navigate('/faq');
              setMobileMenuOpen(false);
            }}
            className='bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner w-full text-center'
          >
            FAQ'S
          </button>
          <button
            onClick={() => {
              navigate('/about');
              setMobileMenuOpen(false);
            }}
            className='bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner w-full text-center'
          >
            About
          </button>

          {isAuthenticated ? (
            <div
              className='flex items-center justify-between py-1'
              onClick={() => {
                navigate('/profile');
                setMobileMenuOpen(false);
              }}
            >
              <span className='font-bold text-sm cursor-pointer'>
                {user.username || 'FREEDOMD1VE'}
              </span>
              <UserCircle className='w-6 h-6 cursor-pointer' />
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className='bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner w-full text-center'
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate('/signup');
                  setMobileMenuOpen(false);
                }}
                className='bg-gray-200 text-black text-xs px-3 py-1 rounded-full shadow-inner w-full text-center'
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className='bg-[#4D6F97] to-[#0091BE]/0 py-4 sm:py-6 flex justify-center'>
        <div className='flex flex-wrap justify-center gap-2 sm:gap-4 px-2'>
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => navigate(`/?tab=${tab}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
