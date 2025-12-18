const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all extracurricular
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM extracurricular ORDER BY start_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single extracurricular
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM extracurricular WHERE id = $1', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE extracurricular (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { activity_title, position, organization_name, start_date, end_date, description, contributions, image_url } = req.body;
    const result = await query(
      `INSERT INTO extracurricular (activity_title, position, organization_name, start_date, end_date, description, contributions, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [activity_title, position, organization_name, start_date, end_date, description, contributions, image_url]
    );
    res.status(201).json({ message: 'Extracurricular created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE extracurricular (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { activity_title, position, organization_name, start_date, end_date, description, contributions, image_url } = req.body;
    const result = await query(
      `UPDATE extracurricular SET activity_title = $1, position = $2, organization_name = $3, start_date = $4, end_date = $5, 
       description = $6, contributions = $7, image_url = $8, updated_at = NOW() WHERE id = $9 RETURNING *`,
      [activity_title, position, organization_name, start_date, end_date, description, contributions, image_url, req.params.id]
    );
    res.json({ message: 'Extracurricular updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE extracurricular (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM extracurricular WHERE id = $1', [req.params.id]);
    res.json({ message: 'Extracurricular deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
