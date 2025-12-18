const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all certifications
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM certifications ORDER BY issue_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single certification
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM certifications WHERE id = $1', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE certification (Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { certification_name, issuer, issue_date, expiration_date, credential_id, credential_url, certificate_image_url, category } = req.body;
    const result = await query(
      `INSERT INTO certifications (certification_name, issuer, issue_date, expiration_date, credential_id, credential_url, certificate_image_url, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [certification_name, issuer, issue_date, expiration_date, credential_id, credential_url, certificate_image_url, category]
    );
    res.status(201).json({ message: 'Certification created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE certification (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { certification_name, issuer, issue_date, expiration_date, credential_id, credential_url, certificate_image_url, category } = req.body;
    const result = await query(
      `UPDATE certifications SET certification_name = $1, issuer = $2, issue_date = $3, expiration_date = $4, 
       credential_id = $5, credential_url = $6, certificate_image_url = $7, category = $8, updated_at = NOW() WHERE id = $9 RETURNING *`,
      [certification_name, issuer, issue_date, expiration_date, credential_id, credential_url, certificate_image_url, category, req.params.id]
    );
    res.json({ message: 'Certification updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE certification (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM certifications WHERE id = $1', [req.params.id]);
    res.json({ message: 'Certification deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
