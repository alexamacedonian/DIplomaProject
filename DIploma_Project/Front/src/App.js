// import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Faq from './Pages/FAQPage';
import Main from './Pages/AirPage';
import About from './Pages/AboutPage';
import Profile from './Pages/ProfilePage';
import SignUpPage from './Pages/LoginAuth/SignUpPage';
import LoginPage from './Pages/LoginAuth/LoginPage';
import PasswordRecoveryPage from './Pages/LoginAuth/PasswordRecoveryPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';

// Component to render routes after authentication is loaded
function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4D6F97] to-[#A9C9D5]'>
        <div className='text-white text-xl'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen max-w-screen overflow-x-hidden antialiased text-base'>
      <Routes>
        <Route path='/' element={<Main />} />

        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/forgot-password' element={<PasswordRecoveryPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/faq' element={<Faq />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
