
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { FiArrowRight, FiCheck, FiX, FiClock, FiAward, FiBarChart2 } from 'react-icons/fi';


const Quiz = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    score,
    timeRemaining,
    // eslint-disable-next-line no-unused-vars
    quizCompleted,
    // eslint-disable-next-line no-unused-vars
    selectedAnswers,
    startQuiz,
    answerQuestion,
    resetQuiz,
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  // Use the length of the questions array to ensure we always show the correct total
  const totalQuestions = questions.length;
  // Calculate progress based on current question index (0-based) and total questions
  // Start at 0% and increase as questions are answered
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  useEffect(() => {
    // Initialize quiz when component mounts
    if (questions.length === 0) {
      startQuiz();
    }
    setQuestionStartTime(Date.now());
    
    // Reset result state when question changes
    setShowResult(false);
    setSelectedAnswer('');
  }, [currentQuestionIndex, questions.length, startQuiz]);

  
  // Handle timer expiration
  useEffect(() => {
    if (timeRemaining === 0 && !showResult && currentQuestion) {
      // Auto-submit empty answer when time runs out
      handleAnswer('');
    }
  }, [timeRemaining, showResult, currentQuestion]);

  const handleAnswer = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Calculate time taken to answer
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    
    // Immediately process the answer
    const isLastQuestion = currentQuestionIndex >= questions.length - 1;
    answerQuestion(answer, currentQuestionIndex);
    
    // Add slight delay before moving to next question
    setTimeout(() => {
      if (isLastQuestion) {
        navigate('/results');
      } else {
        setSelectedAnswer('');
        setShowResult(false);
      }
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      navigate('/results');
    }
  };

  const handleQuit = () => {
    if (window.confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
      resetQuiz();
      navigate('/');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Get difficulty from the question object
  const difficulty = currentQuestion.difficulty || 'easy';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Adaptive Quiz
            </h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                <FiAward className="text-yellow-500 mr-1" />
                <span className="font-medium text-gray-900 dark:text-white">{score}</span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                <FiBarChart2 className={`mr-1 ${
                  difficulty === 'easy' ? 'text-green-500' :
                  difficulty === 'medium' ? 'text-yellow-500' :
                  'text-red-500'
                }`} />
                <span className={`font-medium capitalize ${
                  difficulty === 'easy' ? 'text-green-600 dark:text-green-400' :
                  difficulty === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {difficulty}
                </span>
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                <FiClock className="text-red-500 mr-1" />
                <span className="font-mono font-medium text-gray-900 dark:text-white">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <ProgressBar progress={progress} />
        </header>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleQuit}
            className="px-6"
          >
            Quit Quiz
          </Button>
          
          {showResult && (
            <Button 
              onClick={handleNextQuestion}
              className="px-6"
              rightIcon={<FiArrowRight className="ml-2" />}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
