// Load environment variables at the top of the file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // ADDED: For security headers
const morgan = require('morgan'); // ADDED: For request logging

const authRoutes = require('./routes/authRoutes');
const quizRoutes =require('./routes/quizRoutes');
// const resultRoutes = require('./routes/resultRoutes');

const app = express();

// --- Middleware Setup ---

// Configure CORS with options
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend URL from env vars
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(helmet()); // ADDED: Use helmet to set various security headers
app.use(express.json());

// ADDED: Use morgan for logging in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
// app.use('/api/results', resultRoutes);


// --- Standard API Endpoints ---

// ADDED: Root endpoint for simple server check
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the FlexiQuiz API. The server is running!" });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});


// --- Global Error Handler ---
// ADDED: This middleware will catch any errors that occur in your routes
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong on the server!' });
});


// --- Database Connection and Server Start ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if DB connection fails
  });
