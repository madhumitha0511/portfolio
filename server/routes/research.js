// ✅ UPDATED RESEARCH ROUTES - ./routes/research.js

const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all research - ✅ WITH FORMATTED DATES
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, research_title, description, start_date, end_date, 
        research_type, outcomes, publication_link, image_url,
        created_at, updated_at,
        TO_CHAR(start_date::date, 'DD-MM-YYYY') as formatted_start_date,
        CASE 
          WHEN end_date IS NOT NULL THEN 
            TO_CHAR(end_date::date, 'DD-MM-YYYY')
          ELSE NULL
        END as formatted_end_date
      FROM research 
      ORDER BY start_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single research - ✅ WITH FORMATTED DATES
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, research_title, description, start_date, end_date, 
        research_type, outcomes, publication_link, image_url,
        created_at, updated_at,
        TO_CHAR(start_date::date, 'DD-MM-YYYY') as formatted_start_date,
        CASE 
          WHEN end_date IS NOT NULL THEN 
            TO_CHAR(end_date::date, 'DD-MM-YYYY')
          ELSE NULL
        END as formatted_end_date
      FROM research 
      WHERE id = $1
    `, [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE research (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { research_title, description, start_date, end_date, research_type, outcomes, publication_link, image_url } = req.body;
    const result = await query(
      `INSERT INTO research (research_title, description, start_date, end_date, research_type, outcomes, publication_link, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [research_title, description, start_date, end_date, research_type, outcomes, publication_link, image_url]
    );
    res.status(201).json({ message: 'Research created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE research (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { research_title, description, start_date, end_date, research_type, outcomes, publication_link, image_url } = req.body;
    const result = await query(
      `UPDATE research SET research_title = $1, description = $2, start_date = $3, end_date = $4, research_type = $5, outcomes = $6, 
       publication_link = $7, image_url = $8, updated_at = NOW() WHERE id = $9 RETURNING *`,
      [research_title, description, start_date, end_date, research_type, outcomes, publication_link, image_url, req.params.id]
    );
    res.json({ message: 'Research updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE research (Admin) - ✅ UNCHANGED
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM research WHERE id = $1', [req.params.id]);
    res.json({ message: 'Research deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;