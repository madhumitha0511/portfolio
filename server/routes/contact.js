const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all contact messages (Admin)
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single contact message (Admin)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const result = await query('SELECT * FROM contact_messages WHERE id = $1', [req.params.id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE contact message (Frontend)
router.post('/', async (req, res) => {
  try {
    const { sender_name, sender_email, sender_phone, subject, message } = req.body;
    const result = await query(
      `INSERT INTO contact_messages (sender_name, sender_email, sender_phone, subject, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [sender_name, sender_email, sender_phone, subject, message]
    );
    res.status(201).json({ message: 'Message sent', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE contact message (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { sender_name, sender_email, sender_phone, subject, message, read, replied } = req.body;
    const result = await query(
      `UPDATE contact_messages SET sender_name = $1, sender_email = $2, sender_phone = $3, subject = $4, 
       message = $5, read = $6, replied = $7, updated_at = NOW() WHERE id = $8 RETURNING *`,
      [sender_name, sender_email, sender_phone, subject, message, read, replied, req.params.id]
    );
    res.json({ message: 'Contact message updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE contact message (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM contact_messages WHERE id = $1', [req.params.id]);
    res.json({ message: 'Contact message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
