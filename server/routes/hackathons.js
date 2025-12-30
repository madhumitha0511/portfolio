// ✅ UPDATED HACKATHONS ROUTES - ./routes/hackathons.js

const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all hackathons - ✅ WITH FORMATTED DATE
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, event_name, event_date, location, description,
        role_or_achievement, team_size, outcome_or_result,
        image_url, project_link, event_link, category,
        created_at, updated_at,
        EXTRACT(YEAR FROM event_date::date) as year,
        TO_CHAR(event_date::date, 'DD-MM-YYYY') as formatted_date
      FROM hackathons 
      ORDER BY event_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single hackathon - ✅ WITH FORMATTED DATE
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, event_name, event_date, location, description,
        role_or_achievement, team_size, outcome_or_result,
        image_url, project_link, event_link, category,
        created_at, updated_at,
        EXTRACT(YEAR FROM event_date::date) as year,
        TO_CHAR(event_date::date, 'DD-MM-YYYY') as formatted_date
      FROM hackathons 
      WHERE id = $1
    `, [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE hackathon (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { event_name, event_date, location, description, role_or_achievement, team_size, outcome_or_result, image_url, project_link, event_link, category } = req.body;
    const result = await query(
      `INSERT INTO hackathons (event_name, event_date, location, description, role_or_achievement, team_size, outcome_or_result, image_url, project_link, event_link, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [event_name, event_date, location, description, role_or_achievement, team_size, outcome_or_result, image_url, project_link, event_link, category]
    );
    res.status(201).json({ message: 'Hackathon created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE hackathon (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { event_name, event_date, location, description, role_or_achievement, team_size, outcome_or_result, image_url, project_link, event_link, category } = req.body;
    const result = await query(
      `UPDATE hackathons SET event_name = $1, event_date = $2, location = $3, description = $4, role_or_achievement = $5, team_size = $6, 
       outcome_or_result = $7, image_url = $8, project_link = $9, event_link = $10, category = $11, updated_at = NOW() WHERE id = $12 RETURNING *`,
      [event_name, event_date, location, description, role_or_achievement, team_size, outcome_or_result, image_url, project_link, event_link, category, req.params.id]
    );
    res.json({ message: 'Hackathon updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE hackathon (Admin) - ✅ UNCHANGED
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM hackathons WHERE id = $1', [req.params.id]);
    res.json({ message: 'Hackathon deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;