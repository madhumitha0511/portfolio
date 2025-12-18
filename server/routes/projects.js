// ============================================
// 3. PROJECTS ROUTES - ./routes/projects.js
// ============================================
const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM projects ORDER BY start_date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET featured projects
router.get('/featured', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM projects WHERE highlight = true ORDER BY start_date DESC LIMIT 6'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE project (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, short_description, image_url, tech_stack, github_link, demo_link, live_link, start_date, end_date, category, highlight } = req.body;
    
    const result = await query(
      `INSERT INTO projects (title, description, short_description, image_url, tech_stack, github_link, demo_link, live_link, start_date, end_date, category, highlight)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [title, description, short_description, image_url, tech_stack, github_link, demo_link, live_link, start_date, end_date, category, highlight]
    );
    
    res.status(201).json({ message: 'Project created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE project (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, short_description, image_url, tech_stack, github_link, demo_link, live_link, start_date, end_date, category, highlight } = req.body;
    
    const result = await query(
      `UPDATE projects SET title = $1, description = $2, short_description = $3, image_url = $4, tech_stack = $5, 
       github_link = $6, demo_link = $7, live_link = $8, start_date = $9, end_date = $10, category = $11, highlight = $12, updated_at = NOW() WHERE id = $13 RETURNING *`,
      [title, description, short_description, image_url, tech_stack, github_link, demo_link, live_link, start_date, end_date, category, highlight, req.params.id]
    );
    
    res.json({ message: 'Project updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
