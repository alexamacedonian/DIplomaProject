import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://185.4.180.242:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Registration successful

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        // Handle server error
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4D6F97] to-transparent'>
      <div className='rounded-[30px] shadow-md w-[90%] max-w-[400px] bg-[linear-gradient(180deg,rgba(255,255,255,0.915)_0%,#FFFFFF_26%,#A3A3A3_99.99%,rgba(222,222,222,0)_100%)]'>
        <div className='border-b border-gray-300 py-4 text-center'>
          <h1 className='text-2xl font-semibold text-black'>Sign up</h1>
        </div>
        <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-4'>
          {error && (
            <div className='text-red-600 text-sm text-center bg-red-50 p-2 rounded'>
              {error}
            </div>
          )}

          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none'
            disabled={isLoading}
          />
          <input
            type='text'
            placeholder='Create Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none'
            disabled={isLoading}
          />
          <input
            type='password'
            placeholder='Create Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none'
            disabled={isLoading}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none'
            disabled={isLoading}
          />
          <Link
            to='/login'
            className='text-sm text-sky-600 hover:underline w-fit'
            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
          >
            Login
          </Link>
          <button
            type='submit'
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-sky-400' : 'bg-sky-600 hover:bg-sky-700'
            } text-white py-2 rounded-full transition flex justify-center items-center`}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
