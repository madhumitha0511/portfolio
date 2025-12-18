const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single testimonial
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM testimonials WHERE id = $1', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE testimonial (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, title, company_or_organization, message, rating, image_url, relation } = req.body;
    const result = await query(
      `INSERT INTO testimonials (name, title, company_or_organization, message, rating, image_url, relation)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, title, company_or_organization, message, rating, image_url, relation]
    );
    res.status(201).json({ message: 'Testimonial created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE testimonial (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, title, company_or_organization, message, rating, image_url, relation } = req.body;
    const result = await query(
      `UPDATE testimonials SET name = $1, title = $2, company_or_organization = $3, message = $4, rating = $5, 
       image_url = $6, relation = $7, updated_at = NOW() WHERE id = $8 RETURNING *`,
      [name, title, company_or_organization, message, rating, image_url, relation, req.params.id]
    );
    res.json({ message: 'Testimonial updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE testimonial (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM testimonials WHERE id = $1', [req.params.id]);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
