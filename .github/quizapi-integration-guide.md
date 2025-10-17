# QuizAPI Integration Guide

This document provides guidance on integrating and working with the QuizAPI.io service in FlexiQuiz.

## Overview

FlexiQuiz uses QuizAPI.io to source additional quiz questions beyond the local database. This allows us to provide a wider variety of questions across different categories.

## Configuration

### API Keys

The QuizAPI integration requires valid API keys stored in the backend `.env` file:

```
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=quizapi.io
```

To obtain an API key:

1. Sign up for a RapidAPI account: https://rapidapi.com
2. Subscribe to the QuizAPI service: https://rapidapi.com/apigeek/api/quizapi
3. Copy your API key and add it to the `.env` file

### Endpoints

The QuizAPI offers several endpoints for retrieving questions:

- `/questions` - Get a list of questions with optional filtering
- `/categories` - Get available categories
- `/tags` - Get available tags

## Implementation

### Backend Integration

The integration is implemented in `mern-flexiquiz/server/routes/quizRoutes.js`:

```javascript
// Example: Fetching questions with filters
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { category, difficulty, limit = 10, tags } = req.query;

    // Prepare API request options
    const options = {
      method: 'GET',
      url: `${apiBaseUrl}/questions`,
      params: {
        category,
        difficulty,
        limit,
        tags
      },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost
      }
    };

    // Make request to QuizAPI
    const response = await axios.request(options);
    
    // Return the quiz data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ 
      msg: 'Failed to fetch quizzes', 
      error: error.message 
    });
  }
});
```

### Frontend Usage

Use the `quizAPI` methods in `frontend/QuizApp/src/utils/api.js` to interact with the backend QuizAPI integration:

```javascript
// Example: Fetching questions with category filter
const fetchQuizQuestions = async (category) => {
  try {
    const questions = await quizAPI.getQuizzes({ category });
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
```

## Question Format

QuizAPI returns questions in the following format:

```json
{
  "id": 123,
  "question": "What does CPU stand for?",
  "answers": {
    "answer_a": "Central Processing Unit",
    "answer_b": "Control Program Unit",
    "answer_c": "Computer Power Unit",
    "answer_d": "Central Protocol Utility"
  },
  "correct_answers": {
    "answer_a_correct": "true",
    "answer_b_correct": "false",
    "answer_c_correct": "false",
    "answer_d_correct": "false"
  },
  "multiple_correct_answers": "false",
  "explanation": "CPU stands for Central Processing Unit",
  "category": "Technology",
  "difficulty": "easy"
}
```

### Mapping to FlexiQuiz Format

When using QuizAPI questions, we need to transform them to match our application's format:

```javascript
// Transform QuizAPI question format to FlexiQuiz format
const transformQuestion = (apiQuestion) => {
  // Extract all available answers (filtering out null/undefined)
  const options = [];
  for (const key in apiQuestion.answers) {
    if (apiQuestion.answers[key]) {
      options.push(apiQuestion.answers[key]);
    }
  }

  // Find the correct answer
  let correctAnswer = '';
  for (const key in apiQuestion.correct_answers) {
    if (apiQuestion.correct_answers[key] === "true") {
      // Extract answer letter (e.g., 'answer_a' -> 'a')
      const answerKey = key.split('_')[1].charAt(0);
      correctAnswer = apiQuestion.answers[`answer_${answerKey}`];
      break;
    }
  }

  return {
    id: apiQuestion.id,
    question: apiQuestion.question,
    options,
    correctAnswer,
    difficulty: apiQuestion.difficulty || 'medium',
    category: apiQuestion.category,
    explanation: apiQuestion.explanation,
    timeLimit: 30 // Default time limit
  };
};
```

## Error Handling

When working with the QuizAPI, implement robust error handling:

1. Check for API rate limits and handle 429 errors with appropriate retries
2. Provide fallback to local questions if the API is unavailable
3. Validate the response format before using the data
4. Consider caching frequently used categories/tags to reduce API calls

## Rate Limits

Be aware of the QuizAPI rate limits based on your subscription tier:

- Free tier: 100 requests per day
- Basic tier: 1,000 requests per day
- Pro tier: 10,000 requests per day

Implement appropriate throttling mechanisms to avoid exceeding these limits.

## Recommended Practices

1. Cache API responses when possible to reduce quota usage
2. Implement graceful fallbacks to local questions
3. Log API usage to monitor quota consumption
4. Sanitize and validate API responses before displaying to users
5. Handle various error conditions appropriately with user-friendly messages