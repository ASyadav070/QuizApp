const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const axios = require("axios");

const router = express.Router();

// RapidAPI QuizAPI configuration
const rapidApiKey = process.env.RAPIDAPI_KEY;
const rapidApiHost = process.env.RAPIDAPI_HOST || "quizapi.io";
const apiBaseUrl = "https://quizapi.io/api/v1";

// Protected route: only logged in users can access
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: `Hello ${req.user.id}, you are authorized!` });
});

/**
 * @route   GET /api/quizzes
 * @desc    Get quizzes from QuizAPI with optional filtering
 * @access  Private (requires authentication)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { 
      category, 
      difficulty, 
      limit = 10, 
      tags 
    } = req.query;

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

/**
 * @route   GET /api/quizzes/categories
 * @desc    Get available quiz categories from QuizAPI
 * @access  Private
 */
router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `${apiBaseUrl}/categories`,
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      msg: 'Failed to fetch quiz categories', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/quizzes/tags
 * @desc    Get available quiz tags from QuizAPI
 * @access  Private
 */
router.get("/tags", authMiddleware, async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `${apiBaseUrl}/tags`,
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ 
      msg: 'Failed to fetch quiz tags', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/quizzes/random
 * @desc    Get random quiz questions
 * @access  Private
 */
router.get("/random", authMiddleware, async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const options = {
      method: 'GET',
      url: `${apiBaseUrl}/questions`,
      params: { limit },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching random quizzes:', error);
    res.status(500).json({ 
      msg: 'Failed to fetch random quizzes', 
      error: error.message 
    });
  }
});

module.exports = router;
