# FlexiQuiz - Interactive Quiz Application

FlexiQuiz is a dynamic quiz application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features adaptive difficulty, timed questions, and beautiful UI with dark/light mode support.

## Project Structure

```
/
├── frontend/               # React frontend
│   └── QuizApp/            # Vite-based React application
└── mern-flexiquiz/         # Backend server
    └── server/             # Express.js API
```

## Features

- **Adaptive Quiz Engine**: Questions adjust difficulty based on user performance
- **Timed Questions**: Each question has a countdown timer
- **User Authentication**: Register, login, and user profiles
- **Theme Support**: Dark and light mode with system preference detection
- **Responsive Design**: Works across devices
- **Beautiful UI**: Smooth animations and transitions with Framer Motion
- **Backend API**: RESTful API for quiz data and user management

## Getting Started

### Prerequisites

- Node.js v16+ and npm
- MongoDB instance (local or Atlas)

### Environment Variables

#### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAPIDAPI_KEY=your_rapidapi_key_for_quizapi
RAPIDAPI_HOST=quizapi.io
```

### Setup & Running

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd mern-flexiquiz/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend/QuizApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Development Workflow

### Authentication Flow

1. Users can register or log in through the respective pages
2. Authentication state is managed through AuthContext
3. API calls to `/api/auth/signup` or `/api/auth/login` endpoints

### Quiz Flow

1. Start quiz from the home page
2. Questions adapt difficulty based on performance
3. Timer counts down for each question
4. Results page shows detailed performance statistics

## Connecting Frontend to Backend

The frontend connects to the backend API running on port 5000. Authentication is handled through JWT tokens stored in localStorage.

## Tech Stack

### Frontend
- React with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Context API for state management

### Backend
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
