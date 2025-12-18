const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all education
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM education ORDER BY start_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single education
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM education WHERE id = $1', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE education (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { institution_name, degree, field_of_study, start_date, end_date, gpa, description, institution_logo_url, location } = req.body;
    const result = await query(
      `INSERT INTO education (institution_name, degree, field_of_study, start_date, end_date, gpa, description, institution_logo_url, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [institution_name, degree, field_of_study, start_date, end_date, gpa, description, institution_logo_url, location]
    );
    res.status(201).json({ message: 'Education created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE education (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { institution_name, degree, field_of_study, start_date, end_date, gpa, description, institution_logo_url, location } = req.body;
    const result = await query(
      `UPDATE education SET institution_name = $1, degree = $2, field_of_study = $3, start_date = $4, end_date = $5, 
       gpa = $6, description = $7, institution_logo_url = $8, location = $9, updated_at = NOW() WHERE id = $10 RETURNING *`,
      [institution_name, degree, field_of_study, start_date, end_date, gpa, description, institution_logo_url, location, req.params.id]
    );
    res.json({ message: 'Education updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE education (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM education WHERE id = $1', [req.params.id]);
    res.json({ message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;