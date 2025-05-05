import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import LoginPage from './Pages/LoginAuth/LoginPage';
import SignUpPage from './Pages/LoginAuth/SignUpPage';
import HomePage from './Pages/HomePage';
import ForgotPasswordPage from './Pages/LoginAuth/ForgotPasswordPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AirQualityPage from './Pages/AirQualityPage';
import ProfilePage from './Pages/ProfilePage';
import SettingsPage from './Pages/SettingsPage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className='min-h-screen flex flex-col'>
          <Navbar />
          <main className='flex-grow'>
            <Routes>
              {/* Public Routes - No Auth Required */}
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/forgot-password' element={<ForgotPasswordPage />} />

              {/* Private Routes - Auth Required */}
              <Route
                path='/*'
                element={
                  <AuthGuard>
                    <Routes>
                      <Route path='/home' element={<HomePage />} />
                      <Route path='/air-quality' element={<AirQualityPage />} />
                      <Route path='/profile' element={<ProfilePage />} />
                      <Route path='/settings' element={<SettingsPage />} />
                      <Route path='/about' element={<AboutPage />} />
                      <Route path='/contact' element={<ContactPage />} />
                    </Routes>
                  </AuthGuard>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
