// ========== 1. PORTFOLIO ROUTES - ./routes/portfolio.js ==========
const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all portfolio owner info
router.get('/owner', async (req, res) => {
  try {
    const result = await query('SELECT * FROM portfolio_owner LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE portfolio owner info (Admin)
router.put('/owner', verifyToken, async (req, res) => {
  try {
    const { first_name, last_name, email, phone, location, bio, profile_image_url, resume_url, github_url, linkedin_url } = req.body;
    
    const result = await query(
      `UPDATE portfolio_owner SET first_name = $1, last_name = $2, email = $3, phone = $4, 
       location = $5, bio = $6, profile_image_url = $7, resume_url = $8, github_url = $9, 
       linkedin_url = $10, updated_at = NOW() WHERE id = 1 RETURNING *`,
      [first_name, last_name, email, phone, location, bio, profile_image_url, resume_url, github_url, linkedin_url]
    );
    
    res.json({ message: 'Portfolio updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET hero section
router.get('/hero', async (req, res) => {
  try {
    const result = await query('SELECT * FROM hero_section LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE hero section (Admin)
router.put('/hero', verifyToken, async (req, res) => {
  try {
    const { title, subtitle, cta_text, background_image_url } = req.body;
    
    const result = await query(
      `UPDATE hero_section SET title = $1, subtitle = $2, cta_text = $3, 
       background_image_url = $4, updated_at = NOW() WHERE id = 1 RETURNING *`,
      [title, subtitle, cta_text, background_image_url]
    );
    
    res.json({ message: 'Hero updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET about section
router.get('/about', async (req, res) => {
  try {
    const result = await query('SELECT * FROM about_section LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE about section (Admin)
router.put('/about', verifyToken, async (req, res) => {
  try {
    const { title, description, image_url, highlights } = req.body;
    
    const result = await query(
      `UPDATE about_section SET title = $1, description = $2, image_url = $3, 
       highlights = $4, updated_at = NOW() WHERE id = 1 RETURNING *`,
      [title, description, image_url, highlights]
    );
    
    res.json({ message: 'About section updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
