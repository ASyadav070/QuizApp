import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import Button from '../components/Button';
import { FiAward, FiClock, FiBarChart2, FiCheck, FiX, FiHome, FiRepeat } from 'react-icons/fi';
import { triggerConfetti } from '../utils/confetti';

const Results = () => {
  const navigate = useNavigate();
  const { 
    score, 
    correctAnswers, 
    wrongAnswers, 
    questions, 
    selectedAnswers,
    resetQuiz 
  } = useQuiz();

  const totalQuestions = questions.length;
  const maxPossibleScore = totalQuestions * 2; // 2 marks per question
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const totalTime = questions.reduce((acc, q) => acc + (q.timeLimit || 30), 0);
  const averageTimePerQuestion = totalQuestions > 0 ? Math.round(totalTime / totalQuestions) : 0;

  // Calculate performance by difficulty
  const performanceByDifficulty = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  };

  questions.forEach((question, index) => {
    const difficulty = question.difficulty || 'easy';
    if (difficulty in performanceByDifficulty) {
      performanceByDifficulty[difficulty].total++;
      
      if (selectedAnswers[index]?.isCorrect) {
        performanceByDifficulty[difficulty].correct++;
      }
    }
  });

  const handleRestart = () => {
    resetQuiz();
    navigate('/quiz');
  };

  const handleGoHome = () => {
    resetQuiz();
    navigate('/');
  };

  // Play victory effects when results load
  useEffect(() => {
    // Trigger confetti
    triggerConfetti();
    
    // Cleanup any remaining confetti
    return () => {
      const confettiElements = document.querySelectorAll('.confetti');
      confettiElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiAward className="text-white w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Completed!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Here's how you performed
          </p>
        </motion.div>

        {/* Score Summary */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Total Score */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 mx-auto">
              <FiAward className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
              {score} / {maxPossibleScore}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400">Total Score (2 marks per question)</p>
          </div>

          {/* Correct Answers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4 mx-auto">
              <FiCheck className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
              {correctAnswers} / {totalQuestions}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400">Correct Answers</p>
          </div>

          {/* Accuracy */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 mx-auto">
              <FiBarChart2 className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
              {accuracy}%
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400">Accuracy</p>
          </div>
        </motion.div>

        {/* Performance by Difficulty */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance by Difficulty</h2>
          <div className="space-y-4">
            {Object.entries(performanceByDifficulty).map(([difficulty, { correct, total }]) => (
              total > 0 && (
                <div key={difficulty} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {difficulty} ({correct}/{total})
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {total > 0 ? Math.round((correct / total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className={`h-2.5 rounded-full ${
                        difficulty === 'easy' ? 'bg-green-500' : 
                        difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${total > 0 ? (correct / total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              )
            ))}
          </div>
        </motion.div>

        {/* Question Review */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Question Review</h2>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const answer = selectedAnswers[index];
              const isCorrect = answer?.isCorrect;
              
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect 
                      ? 'border-green-200 bg-green-50 dark:border-green-900/30 dark:bg-green-900/10' 
                      : 'border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                      isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {isCorrect ? <FiCheck className="h-4 w-4" /> : <FiX className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {index + 1}. {question.question}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-start">
                          <span className="inline-block w-24 text-sm text-gray-600 dark:text-gray-400">Your answer:</span>
                          <span className={`text-sm font-medium ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                            {answer?.answer || 'No answer'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="flex items-start">
                            <span className="inline-block w-24 text-sm text-gray-600 dark:text-gray-400">Correct answer:</span>
                            <span className="text-sm font-medium text-green-700 dark:text-green-400">
                              {question.correctAnswer}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button 
            onClick={handleGoHome}
            variant="outline"
            className="px-8 py-3 text-lg"
            leftIcon={<FiHome className="mr-2" />}
          >
            Back to Home
          </Button>
          <Button 
            onClick={handleRestart}
            className="px-8 py-3 text-lg"
            leftIcon={<FiRepeat className="mr-2" />}
          >
            Try Again
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
