# FlexiQuiz - GitHub Copilot Instructions

This document provides guidance for GitHub Copilot and other AI coding assistants working with the FlexiQuiz codebase. It includes architectural overviews, workflows, patterns, and important implementation details.

## Project Overview

FlexiQuiz is a MERN stack (MongoDB, Express.js, React, Node.js) application that provides an adaptive quiz system with the following features:

- **User Authentication**: Registration, login, password reset
- **Adaptive Quiz Engine**: Questions adjust difficulty based on user performance
- **Interactive UI**: Modern interface with animations and transitions
- **Theme Support**: Toggle between dark and light modes
- **Responsive Design**: Works across different device sizes

## Project Structure

```
/
├── frontend/               # React frontend
│   └── QuizApp/            # Vite-based React application
│       ├── src/
│       │   ├── assets/     # Static assets (images, icons)
│       │   ├── components/ # Reusable UI components
│       │   ├── context/    # React Context API providers
│       │   ├── data/       # Mock quiz data and models
│       │   ├── pages/      # Page components
│       │   └── utils/      # Utility functions
│       ├── index.html      # HTML entry point
│       ├── tailwind.config.js # Tailwind CSS configuration
│       └── vite.config.js  # Vite configuration
│
└── mern-flexiquiz/         # Backend server
    └── server/             # Express.js API
        ├── controllers/    # Request handlers
        ├── middleware/     # Express middleware
        ├── models/         # Mongoose models
        └── routes/         # API routes
```

## Technical Stack

### Frontend
- **Framework**: React 18 with functional components and hooks
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **HTTP Client**: Native fetch with custom api.js utility

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt for password hashing
- **External APIs**: QuizAPI.io for additional quiz questions

## Authentication Flow

The application uses JWT-based authentication:

1. User registers or logs in via frontend forms
2. Backend validates credentials and returns a JWT token
3. Token is stored in localStorage and used for protected API calls
4. AuthContext provides authentication state and methods across the app

### Important Authentication Files:
- `frontend/QuizApp/src/context/AuthContext.jsx` - Context provider for auth state
- `frontend/QuizApp/src/utils/api.js` - API utility with auth endpoints
- `mern-flexiquiz/server/routes/authRoutes.js` - Backend auth endpoints
- `mern-flexiquiz/server/middleware/auth.js` - JWT verification middleware

## Quiz System Architecture

The quiz system features an adaptive difficulty mechanism:

1. Questions are stored by difficulty level (easy, medium, hard)
2. Correct answers increase difficulty, incorrect answers decrease it
3. Each question has a timer that automatically submits when expired
4. Results page provides detailed feedback on performance

### Key Quiz Files:
- `frontend/QuizApp/src/context/QuizContext.jsx` - Quiz state and logic
- `frontend/QuizApp/src/pages/Quiz.jsx` - Quiz interface
- `frontend/QuizApp/src/pages/Results.jsx` - Results display
- `mern-flexiquiz/server/routes/quizRoutes.js` - Quiz API endpoints

## Theme System

The app supports dark and light modes:

1. ThemeContext manages theme state
2. Theme preference is stored in localStorage
3. System preference detection on first load
4. Tailwind CSS handles styling via dark mode variant

### Key Theme Files:
- `frontend/QuizApp/src/context/ThemeContext.jsx` - Theme context provider
- `frontend/QuizApp/tailwind.config.js` - Tailwind dark mode configuration

## API Integration

The frontend communicates with the backend through a centralized API utility:

1. `api.js` provides grouped methods for different API domains (auth, quiz)
2. Authentication tokens are automatically included when needed
3. Error handling and response parsing are centralized

### API Related Files:
- `frontend/QuizApp/src/utils/api.js` - Frontend API client
- `mern-flexiquiz/server/routes/` - Backend API routes
- `mern-flexiquiz/server/controllers/` - API logic and handlers

## Development Workflows

### Adding a New API Endpoint

1. Create or update controller function in appropriate controller file
2. Add route handler in corresponding route file
3. Update or add API method in frontend's `api.js`
4. Implement UI components that utilize the endpoint

### Adding a New Page

1. Create page component in `frontend/QuizApp/src/pages/`
2. Add route in `App.jsx`
3. If protected, wrap with `<ProtectedRoute>` component
4. Add navigation to the page from relevant locations

### Implementing New Quiz Features

1. Update QuizContext with new state or methods
2. Modify UI components to utilize new features
3. If needed, extend backend API to support new functionality

## Common Patterns

### Component Structure

React components follow this general pattern:
- Import statements
- Component function with destructured props
- State and hook declarations
- Event handlers and local functions
- Return statement with JSX
- Export statement

### Context Usage

The app uses the React Context API for global state:
- ThemeContext: Dark/light mode
- AuthContext: User authentication
- QuizContext: Quiz state and logic

### Style Conventions

- Tailwind CSS utility classes for styling
- Framer Motion for animations
- Consistent naming conventions for components and files
- Component organization by feature (pages, components, etc.)

## Environment Configuration

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `RAPIDAPI_KEY` - RapidAPI key for QuizAPI.io
- `RAPIDAPI_HOST` - RapidAPI host (default: quizapi.io)

## Testing

The project currently has no automated tests. When implementing tests:

- Use Jest for unit and integration tests
- React Testing Library for component tests
- Supertest for API endpoint tests

## Common Issues and Solutions

### CORS Issues
If encountering CORS errors, ensure:
- Backend CORS configuration in `server.js` includes the correct frontend URL
- Requests include proper headers

### Authentication Problems
- Check token expiration (default: 1 hour)
- Verify localStorage for token persistence
- Ensure protected routes are properly wrapped with ProtectedRoute component

### MongoDB Connection
- Verify MONGO_URI is correct and accessible
- Check for MongoDB Atlas whitelist restrictions

## Future Development Considerations

When extending the application, consider:

1. **State Management**: For complex features, consider migrating from Context API to Redux or Zustand
2. **Testing**: Implement comprehensive test suite
3. **Pagination**: Add pagination for quiz history and results
4. **Performance**: Implement caching for frequently accessed quiz data
5. **Accessibility**: Enhance a11y support across components