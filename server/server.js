// ============================================
// BACKEND - server.js (Main Express Server)
// ============================================
// Place this in your backend root directory

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const experienceRoutes = require('./routes/experience');
const projectsRoutes = require('./routes/projects');
const skillsRoutes = require('./routes/skills');
const educationRoutes = require('./routes/education');
const certificationsRoutes = require('./routes/certifications');
const achievementsRoutes = require('./routes/achievements');
const hackathonsRoutes = require('./routes/hackathons');
const researchRoutes = require('./routes/research');
const extracurricularRoutes = require('./routes/extracurricular');
const testimonialsRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contact');

const app = express();

// ========== MIDDLEWARE ==========
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ========== ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/hackathons', hackathonsRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/extracurricular', extracurricularRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);

// ========== HEALTH CHECK ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!', timestamp: new Date() });
});

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📡 API Ready: /api/health`);
});

module.exports = app;

// ============================================
// EXPLANATION FOR BEGINNERS:
// ============================================
// 1. require('dotenv').config() - Loads environment variables from .env file
// 2. express() - Creates Express app instance
// 3. helmet() - Adds security headers to protect from vulnerabilities
// 4. compression() - Compresses responses for faster transfer
// 5. cors() - Allows frontend to make requests from different domain
// 6. app.use() - Applies middleware to all routes
// 7. app.listen() - Starts the server on specified PORT
// 8. Routes are modular - each feature has its own file (auth, projects, etc.)
// 9. Error handling middleware catches and sends errors properly
