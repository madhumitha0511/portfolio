// ✅ UPDATED ACHIEVEMENTS ROUTES - ./routes/achievements.js

const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all achievements - ✅ WITH FORMATTED DATE
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, achievement_title, description, achievement_date, 
        badge_icon_url, category, organization,
        created_at, updated_at,
        TO_CHAR(achievement_date::date, 'DD-MM-YYYY') as formatted_date
      FROM achievements 
      ORDER BY achievement_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single achievement - ✅ WITH FORMATTED DATE
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, achievement_title, description, achievement_date, 
        badge_icon_url, category, organization,
        created_at, updated_at,
        TO_CHAR(achievement_date::date, 'DD-MM-YYYY') as formatted_date
      FROM achievements 
      WHERE id = $1
    `, [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE achievement (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { achievement_title, description, achievement_date, badge_icon_url, category, organization } = req.body;
    const result = await query(
      `INSERT INTO achievements (achievement_title, description, achievement_date, badge_icon_url, category, organization)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [achievement_title, description, achievement_date, badge_icon_url, category, organization]
    );
    res.status(201).json({ message: 'Achievement created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE achievement (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { achievement_title, description, achievement_date, badge_icon_url, category, organization } = req.body;
    const result = await query(
      `UPDATE achievements SET achievement_title = $1, description = $2, achievement_date = $3, badge_icon_url = $4, 
       category = $5, organization = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
      [achievement_title, description, achievement_date, badge_icon_url, category, organization, req.params.id]
    );
    res.json({ message: 'Achievement updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE achievement (Admin) - ✅ UNCHANGED
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM achievements WHERE id = $1', [req.params.id]);
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;