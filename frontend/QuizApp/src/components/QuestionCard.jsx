import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import Button from './Button';

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const difficultyIcons = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴',
};

const QuestionCard = ({ question, questionIndex, onAnswer, selectedAnswer, showResult = false }) => {
  const { timeRemaining, timerActive } = useQuiz();
  const difficulty = question?.difficulty || 'easy';
  
  const isCorrect = (answer) => showResult && answer === question.correctAnswer;
  const isWrong = (answer) => showResult && 
    selectedAnswer === answer && 
    answer !== question.correctAnswer;
  
  const getOptionClasses = (option) => {
    let classes = 'p-4 rounded-lg border-2 transition-all duration-200 text-left';
    
    if (showResult) {
      if (isCorrect(option)) {
        classes += ' border-green-500 bg-green-50 dark:bg-green-900/20';
      } else if (isWrong(option)) {
        classes += ' border-red-500 bg-red-50 dark:bg-red-900/20';
      } else if (option === selectedAnswer) {
        classes += ' border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      } else {
        classes += ' border-gray-200 dark:border-gray-700';
      }
    } else {
      classes += selectedAnswer === option 
        ? ' border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : ' border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-800';
    }
    
    return classes;
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden dark:bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
            <span className="mr-1" role="img" aria-label={difficulty}>
              {difficultyIcons[difficulty]}
            </span>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
          {timerActive && (
            <div className="flex items-center">
              <span className="text-lg font-mono font-bold text-gray-700 dark:text-gray-300">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          {questionIndex + 1}. {question.question}
        </h2>
        
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <motion.div 
              key={index}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              className={getOptionClasses(option)}
              onClick={() => !showResult && onAnswer(option)}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mr-3 ${
                  showResult 
                    ? isCorrect(option) 
                      ? 'bg-green-500 text-white' 
                      : isWrong(option)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    : selectedAnswer === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {showResult && isCorrect(option) ? '✓' : String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-800 dark:text-gray-200">{option}</span>
                {showResult && isCorrect(option) && (
                  <span className="ml-auto text-green-500">✓ Correct</span>
                )}
                {showResult && isWrong(option) && (
                  <span className="ml-auto text-red-500">✗ Incorrect</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {showResult && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              <span className="font-bold">Explanation:</span> The correct answer is {question.correctAnswer}.
              {question.explanation && ` ${question.explanation}`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
