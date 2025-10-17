# FlexiQuiz Deployment Guide

This document provides instructions for deploying the FlexiQuiz application to production environments.

## Prerequisites

- Node.js v16+ and npm
- MongoDB Atlas account (or other MongoDB hosting)
- Web hosting service for both frontend and backend (e.g., Vercel, Heroku, Netlify)
- Domain name (optional but recommended)

## Environment Setup

### Backend Environment Variables

Create a production `.env` file with the following variables:

```
NODE_ENV=production
PORT=5000 (or your preferred port)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=quizapi.io
```

Best practices:

- Use a strong, randomly generated JWT_SECRET (at least 32 characters)
- Store sensitive environment variables securely using your hosting provider's tools
- Don't commit `.env` files to version control

### Frontend Environment Variables

Create a production `.env` file in the frontend directory with:

```
VITE_API_URL=https://your-backend-api-url.com/api
```

## Backend Deployment

### Preparing for Deployment

1. Update `package.json` with a proper start script:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

2. Ensure CORS is configured correctly for your production domain:

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-frontend-domain.com'
    : 'http://localhost:5173',
  // ... other CORS options
};
```

3. Add security middleware:

```javascript
const helmet = require('helmet');
app.use(helmet()); // Adds security headers
```

### Deployment Options

#### Option 1: Heroku

1. Create a new Heroku application
2. Set environment variables in Heroku dashboard
3. Deploy using Heroku CLI or GitHub integration:

```bash
heroku login
git add .
git commit -m "Prepare for Heroku deployment"
heroku git:remote -a your-heroku-app-name
git push heroku main
```

#### Option 2: Digital Ocean App Platform

1. Create a new App Platform application
2. Link to your GitHub repository
3. Configure environment variables
4. Deploy app

#### Option 3: AWS Elastic Beanstalk

1. Create a new Elastic Beanstalk environment
2. Configure environment variables
3. Deploy using the AWS CLI or console

## Frontend Deployment

### Building for Production

1. Update `vite.config.js` with any production-specific settings:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false
  }
});
```

2. Build the production bundle:

```bash
npm run build
```

3. Test the production build locally:

```bash
npm run preview
```

### Deployment Options

#### Option 1: Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
cd frontend/QuizApp
vercel
```

3. For production:

```bash
vercel --prod
```

#### Option 2: Netlify

1. Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy using Netlify CLI or GitHub integration

## Database Setup

### MongoDB Atlas Configuration

1. Create a MongoDB Atlas cluster
2. Configure network access (IP whitelist)
3. Create a database user with appropriate permissions
4. Get your connection string
5. Add connection string to backend environment variables

### Data Indexing

Create appropriate indexes for performance:

```javascript
// Example: Index user emails for faster lookups
db.users.createIndex({ email: 1 }, { unique: true });
```

## Post-Deployment Verification

### Backend Health Check

1. Create a health check endpoint:

```javascript
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});
```

2. Verify MongoDB connection:

```javascript
app.get('/api/db-health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
```

### Frontend Tests

1. Test user authentication flows
2. Verify quiz functionality works
3. Check mobile responsiveness
4. Verify theme switching works correctly

## Monitoring and Logging

### Backend Logging

1. Implement a structured logger (e.g., Winston):

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

2. Use logger throughout your application:

```javascript
logger.info('Server started on port ' + port);
logger.error('Database connection failed', { error: err.message });
```

### Frontend Error Tracking

Consider adding an error tracking service like Sentry:

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});
```

## Performance Optimization

### Backend

1. Implement response caching for quiz questions
2. Use pagination for large data sets
3. Optimize database queries with proper indexing

### Frontend

1. Implement code splitting using React.lazy
2. Optimize image loading with lazy loading
3. Use service worker for caching and offline support

## Security Best Practices

1. Keep dependencies updated
2. Implement rate limiting for API endpoints
3. Sanitize user inputs
4. Use secure HTTP headers (helmet.js)
5. Implement proper authentication and authorization checks