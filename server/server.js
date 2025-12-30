// ============================================
// BACKEND - server.js (BREVO SMTP + Render PERFECT)
// ============================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { query } = require('./config/db');
require('dotenv').config();

// Import routes ONLY
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
const contactRoutes = require('./routes/contact');  // ✅ BREVO HERE

const app = express();

// ========== MIDDLEWARE ==========
app.use(helmet());
app.use(compression());
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
app.use('/api/contact', contactRoutes);  // ✅ SINGLE Brevo endpoint

// ========== HEALTH CHECK (BREVO VERSION) ==========
// ✅ MAILGUN Health Check (Replace Brevo check)
app.get('/api/health', async (req, res) => {
  try {
    const dbTest = await query('SELECT 1');
    res.json({ 
      status: '✅ Backend running!',
      timestamp: new Date(),
      mailgun: process.env.MAILGUN_API_KEY ? '✅ Configured (100/day FREE)' : '⚠️ Missing MAILGUN_API_KEY',
      database: dbTest.rows.length ? '✅ Connected (Neon)' : '❌ Failed',
      endpoint: 'POST /api/contact',
      services: ['auth', 'portfolio', 'experience', 'projects', 'contact']
    });
  } catch (err) {
    res.json({ 
      status: '❌ Database error', 
      error: err.message 
    });
  }
});


// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📡 Health: http://localhost:${PORT}/api/health`);
  console.log(`📧 Contact: POST /api/contact (Brevo)`);
});

module.exports = app;