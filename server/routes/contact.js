const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

// ✅ MAILGUN API (100 emails/day FREE FOREVER)
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'a7e182e5a7db1e3c7883a6ae30d4614f-e61ae8dd-c0ce2c9d',
});

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

// ✅ POST /api/contact - MAILGUN API
router.post('/', async (req, res) => {
  try {
    const { sender_name, sender_email, sender_phone, subject, message } = req.body;

    if (!sender_name || !sender_email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message required' 
      });
    }

    // 1. DB FIRST
    const dbResult = await query(
      `INSERT INTO contact_messages (sender_name, sender_email, sender_phone, subject, message, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [sender_name, sender_email, sender_phone || null, subject || 'General Inquiry', message]
    );

    // 2. MAILGUN EMAIL (async)
    const emailData = {
      from: `Portfolio Contact <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: 'ramwork31@gmail.com',
      subject: `Portfolio: ${subject || 'New Message'}`,
      'h:Reply-To': sender_email,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
          <h2 style="color: #1f2937;">🎉 New Portfolio Message</h2>
          <div style="background: #f9fafb; padding: 24px; border-radius: 12px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #374151;">${sender_name}</h3>
            <p><strong>📧 ${sender_email}</strong></p>
            ${sender_phone ? `<p><strong>📱 ${sender_phone}</strong></p>` : ''}
            <p><strong>📋 ${subject || 'General Inquiry'}</strong></p>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
            <div style="background: white; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 8px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #6b7280; text-align: center; font-size: 14px;">
            💾 ID: ${dbResult.rows[0].id} | 📅 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
    };

    mg.messages.create(process.env.MAILGUN_DOMAIN || 'sandbox792de93e370a4c94a682a64e8fb02425.mailgun.org', emailData)
      .then(() => console.log('✅ MAILGUN SENT:', dbResult.rows[0].id))
      .catch(err => console.error('⚠️ MAILGUN FAILED:', err.message));

    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (err) {
    console.error('❌ CONTACT ERROR:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.' 
    });
  }
});

// UPDATE (Admin)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { sender_name, sender_email, sender_phone, subject, message, read, replied } = req.body;
    const result = await query(
      `UPDATE contact_messages SET sender_name=$1, sender_email=$2, sender_phone=$3, subject=$4, 
       message=$5, read=$6, replied=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
      [sender_name, sender_email, sender_phone, subject, message, read, replied, req.params.id]
    );
    res.json({ message: 'Updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (Admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM contact_messages WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;