import { createContext, useContext, useReducer, useEffect } from 'react';
import { questions } from '../data/questions';

const QuizContext = createContext();

const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  currentDifficulty: 'easy',
  questions: [],
  selectedAnswers: [],
  quizCompleted: false,
  timeRemaining: 0,
  timerActive: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'START_QUIZ':
      // Combine all questions with their difficulty levels and shuffle them
      const allQuestions = [
        ...questions.easy.map(q => ({ ...q, difficulty: 'easy' })),
        ...questions.medium.map(q => ({ ...q, difficulty: 'medium' })),
        ...questions.hard.map(q => ({ ...q, difficulty: 'hard' }))
      ].sort(() => 0.5 - Math.random());
      
      return {
        ...state,
        questions: allQuestions,
        totalQuestions: allQuestions.length,
        timeRemaining: 30, // Fixed 30-second timer for all questions
        timerActive: true,
      };

    case 'ANSWER_QUESTION':
      const { answer, questionIndex } = action.payload;
      const currentQuestion = state.questions[questionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;
      
      // Calculate new score and stats
      // Award 2 marks for correct answer, 0 for wrong answer
      const pointsAwarded = isCorrect ? 2 : 0;
      const newScore = state.score + pointsAwarded;
      const newCorrectAnswers = isCorrect ? state.correctAnswers + 1 : state.correctAnswers;
      const newWrongAnswers = isCorrect ? state.wrongAnswers : state.wrongAnswers + 1;
      
      // Determine next difficulty based on performance
      let nextDifficulty = state.currentDifficulty;
      if (isCorrect && state.currentDifficulty !== 'hard') {
        nextDifficulty = state.currentDifficulty === 'easy' ? 'medium' : 'hard';
      } else if (!isCorrect && state.currentDifficulty !== 'easy') {
        nextDifficulty = state.currentDifficulty === 'hard' ? 'medium' : 'easy';
      }
      
      // Get next question based on difficulty
      let nextQuestion;
      const availableQuestions = questions[nextDifficulty].filter(
        q => !state.questions.some(asked => asked.id === q.id)
      );
      
      if (availableQuestions.length > 0) {
        nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      } else {
        // If no more questions in the selected difficulty, try other difficulties
        const allQuestions = Object.values(questions).flat();
        const remainingQuestions = allQuestions.filter(
          q => !state.questions.some(asked => asked.id === q.id)
        );
        nextQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
      }
      
      // Check if quiz is completed (after answering all 15 questions)
      const isQuizCompleted = questionIndex >= state.questions.length - 1;
      
      // Prepare next questions array
      const nextQuestions = [...state.questions];
      if (nextQuestion && !isQuizCompleted) {
        nextQuestions.push(nextQuestion);
      }
      
      return {
        ...state,
        score: newScore,
        correctAnswers: newCorrectAnswers,
        wrongAnswers: newWrongAnswers,
        currentDifficulty: nextDifficulty,
        questions: nextQuestions,
        currentQuestionIndex: questionIndex + 1,
        selectedAnswers: [...state.selectedAnswers, { questionIndex, answer, isCorrect }],
        quizCompleted: isQuizCompleted,
        timeRemaining: isQuizCompleted ? 0 : 30, // Fixed 30-second timer for all questions
        timerActive: !isQuizCompleted,
      };
      
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeRemaining: 30, // Fixed 30-second timer for all questions
      };
      
    case 'UPDATE_TIMER':
      if (state.timeRemaining <= 0) {
        // Auto-submit empty answer when time runs out
        const nextQuestionIndex = state.currentQuestionIndex + 1;
        const isQuizCompleted = nextQuestionIndex >= state.questions.length;
        
        return {
          ...state,
          // Mark current question as answered with empty string (0 points)
          selectedAnswers: [
            ...state.selectedAnswers,
            { 
              questionIndex: state.currentQuestionIndex, 
              answer: '', 
              isCorrect: false 
            }
          ],
          // Move to next question or end quiz
          currentQuestionIndex: nextQuestionIndex,
          quizCompleted: isQuizCompleted,
          timeRemaining: isQuizCompleted ? 0 : 30,
          timerActive: !isQuizCompleted
        };
      }
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
      };
      
    case 'RESET_QUIZ':
      return initialState;
      
    default:
      return state;
  }
}

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (state.timerActive && state.timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.timerActive, state.timeRemaining]);
  
  const startQuiz = () => {
    dispatch({ type: 'START_QUIZ' });
  };
  
  const answerQuestion = (answer, questionIndex) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { answer, questionIndex } });
  };
  
  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };
  
  return (
    <QuizContext.Provider
      value={{
        ...state,
        startQuiz,
        answerQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
