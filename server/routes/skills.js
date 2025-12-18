// ============================================
// 4. SKILLS ROUTES - ./routes/skills.js
// ============================================
const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');
// GET all skills
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM skills ORDER BY category, skill_name'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET skills by category
router.get('/category/:category', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM skills WHERE category = $1 ORDER BY skill_name',
      [req.params.category]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE skill (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { skill_name, category, proficiency_level, icon_url, years_experience } = req.body;
    
    const result = await query(
      `INSERT INTO skills (skill_name, category, proficiency_level, icon_url, years_experience)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [skill_name, category, proficiency_level, icon_url, years_experience]
    );
    
    res.status(201).json({ message: 'Skill created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE skill (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { skill_name, category, proficiency_level, icon_url, years_experience } = req.body;
    
    const result = await query(
      `UPDATE skills SET skill_name = $1, category = $2, proficiency_level = $3, icon_url = $4, years_experience = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
      [skill_name, category, proficiency_level, icon_url, years_experience, req.params.id]
    );
    
    res.json({ message: 'Skill updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE skill (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM skills WHERE id = $1', [req.params.id]);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
