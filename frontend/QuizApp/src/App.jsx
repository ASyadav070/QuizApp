import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './App.css';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/quiz" 
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
