import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://185.4.180.242:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage with 15-minute expiration
        console.log(response);
        const accessToken = data.accessToken;

        const expirationTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes in milliseconds
        localStorage.setItem('token', accessToken);
        localStorage.setItem('tokenExpiration', expirationTime.toString());

        // Login successful
        login({ username }, token);

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        // Handle server error
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const token = localStorage.getItem('token');
  const expirationTime = parseInt(localStorage.getItem('tokenExpiration'));
  const isExpired = new Date().getTime() > expirationTime;

  if (!token || isExpired) {
    // Token is missing or expired
    // Handle logout or redirect to login
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4D6F97] to-transparent'>
      <div className='rounded-[30px] shadow-md w-[90%] max-w-[400px] bg-[linear-gradient(180deg,rgba(255,255,255,0.915)_0%,#FFFFFF_26%,#A3A3A3_99.99%,rgba(222,222,222,0)_100%)]'>
        <div className='border-b border-gray-300 py-4 text-center'>
          <h1 className='text-2xl font-semibold text-black'>Login</h1>
        </div>
        <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-4'>
          {error && (
            <div className='text-red-600 text-sm text-center bg-red-50 p-2 rounded'>
              {error}
            </div>
          )}

          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none'
            disabled={isLoading}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none'
            disabled={isLoading}
          />
        
          <button
            type='submit'
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-sky-400' : 'bg-sky-600 hover:bg-sky-700'
            } text-white py-2 rounded-full transition flex justify-center items-center`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className='text-center text-sm text-black'>
            Not a member ?{' '}
            <Link
              to='/signup'
              className='text-sky-600 hover:underline'
              style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
