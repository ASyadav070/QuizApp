// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/useAuth';
import Button from '../components/Button';
import { 
  FiSun, 
  FiMoon, 
  FiPlay, 
  FiInfo, 
  FiX,
  FiUser,
  FiLogOut
} from 'react-icons/fi';
import { useState } from 'react';


const Home = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const startQuiz = () => {
    setIsLoading(true);
    
    // If user is authenticated, navigate to quiz page
    // Otherwise navigate to login page
    if (currentUser) {
      setTimeout(() => {
        navigate('/quiz');
        setIsLoading(false);
      }, 1000);
    } else {
      navigate('/login');
    }
  };

  const toggleHowToPlay = () => {
    setShowHowToPlay(!showHowToPlay);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header - Blended with background */}
      <header className="z-10 bg-gradient-to-b from-blue-50/90 to-blue-50/50 dark:from-gray-900/90 dark:to-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 py-1 px-3 rounded-md bg-white/50 dark:bg-gray-800/50 shadow-sm">
                  <FiUser className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{currentUser.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="text-sm py-1 px-3 rounded-md bg-red-500/80 text-white shadow-sm hover:shadow transition-all duration-300 flex items-center space-x-1"
                >
                  <FiLogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm py-1 px-3 rounded-md bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow transition-all duration-300 text-indigo-600 dark:text-indigo-400"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-sm py-1 px-3 rounded-md bg-indigo-600/90 text-white shadow-sm hover:shadow transition-all duration-300"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
          <div className="bg-white/10 dark:bg-gray-800/20 px-6 py-2 rounded-xl backdrop-blur-sm">
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-center">
              FlexiQuiz
            </h1>
          </div>
          <div className="w-10">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Hero Section */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 p-8 md:p-12 text-white mb-16 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.span 
              className="inline-block text-yellow-300 text-sm font-medium bg-yellow-500/20 px-3 py-1 rounded-full mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              🎯 New & Improved
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Smarter Quizzes.
              <span className="block text-blue-100">Just for You.</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Take adaptive quizzes that get harder or easier based on how you perform. 
              <span className="block">Learn faster. Challenge yourself better.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button 
                onClick={startQuiz}
                disabled={isLoading}
                className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    <FiPlay className="w-5 h-5" />
                    Start Quiz
                  </>
                )}
              </button>
              
              <button 
                onClick={toggleHowToPlay}
                className="group px-6 py-3.5 bg-white/10 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-95"
              >
                <FiInfo className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span>How it works</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* How to Play Section */}
        <AnimatePresence mode="wait">
          {showHowToPlay && (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto mb-16 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -10,
                scale: 0.98,
                transition: {
                  duration: 0.2
                }
              }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Play</h2>
                <button 
                  onClick={toggleHowToPlay}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  aria-label="Close"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <ul className="space-y-4">
                {[
                  'Answer each question before the timer runs out',
                  'Earn 2 points for each correct answer',
                  'The quiz adapts to your skill level in real-time',
                  'Questions get harder after correct answers and easier after incorrect ones',
                  'Try to achieve the highest score possible!'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>


        </div>
      </main>

      {/* Footer with Social Links - Blended with background */}
      <footer className="bg-gradient-to-t from-blue-50/90 to-blue-50/50 dark:from-gray-900/90 dark:to-gray-900/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-800/50 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Connect with me
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/ashvini-singh-yadav/" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://www.linkedin.com/in/ashvini-singh-yadav/', '_blank', 'noopener,noreferrer');
                }}
                className="group p-4 w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
              >
                <svg className="w-10 h-10 text-white mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.413v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-white font-medium">LinkedIn</span>
              </a>

              {/* Gmail */}
              <a 
                href="mailto:ash942954@gmail.com" 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'mailto:ash942954@gmail.com';
                }}
                className="group p-4 w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
              >
                <svg className="w-10 h-10 text-white mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                <span className="text-white font-medium">Gmail</span>

              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/GodEye119" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://github.com/GodEye119', '_blank', 'noopener,noreferrer');
                }}
                className="group p-4 w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
              >
                <svg className="w-10 h-10 text-white mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-medium">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} FlexiQuiz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
