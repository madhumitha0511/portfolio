// ✅ FIXED server/routes/experience.js - Cast year to INTEGER

const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all experiences - ✅ CAST YEAR TO INTEGER
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, company_name, role, employment_type, 
        start_date, end_date, is_current, description, 
        tech_stack, company_logo_url, location,
        created_at, updated_at,
        CAST(EXTRACT(YEAR FROM start_date::date) AS INTEGER) as year,
        CASE 
          WHEN is_current THEN 
            TO_CHAR(start_date::date, 'DD-MM-YYYY') || ' - Present'
          WHEN end_date IS NOT NULL THEN 
            TO_CHAR(start_date::date, 'DD-MM-YYYY') || ' - ' || 
            TO_CHAR(end_date::date, 'DD-MM-YYYY')
          ELSE TO_CHAR(start_date::date, 'DD-MM-YYYY')
        END as formatted_date_range
      FROM experience 
      ORDER BY start_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('GET /experience error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET single experience - ✅ CAST YEAR TO INTEGER
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, company_name, role, employment_type, 
        start_date, end_date, is_current, description, 
        tech_stack, company_logo_url, location,
        created_at, updated_at,
        CAST(EXTRACT(YEAR FROM start_date::date) AS INTEGER) as year,
        CASE 
          WHEN is_current THEN 
            TO_CHAR(start_date::date, 'DD-MM-YYYY') || ' - Present'
          WHEN end_date IS NOT NULL THEN 
            TO_CHAR(start_date::date, 'DD-MM-YYYY') || ' - ' || 
            TO_CHAR(end_date::date, 'DD-MM-YYYY')
          ELSE TO_CHAR(start_date::date, 'DD-MM-YYYY')
        END as formatted_date_range
      FROM experience 
      WHERE id = $1
    `, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /experience/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE experience (Admin) - ✅ AUTH REQUIRED
router.post('/', verifyToken, async (req, res) => {
  try {
    const { company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location } = req.body;
    
    console.log('Creating experience:', req.body);
    
    const result = await query(
      `INSERT INTO experience (company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [company_name, role, employment_type, start_date, end_date || null, is_current || false, description, tech_stack, company_logo_url, location]
    );
    
    res.status(201).json({ message: 'Experience created', data: result.rows[0] });
  } catch (err) {
    console.error('POST /experience error:', err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE experience (Admin) - ✅ AUTH REQUIRED
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location } = req.body;
    
    console.log('Updating experience:', req.params.id, req.body);
    
    const result = await query(
      `UPDATE experience SET company_name = $1, role = $2, employment_type = $3, start_date = $4, end_date = $5, 
       is_current = $6, description = $7, tech_stack = $8, company_logo_url = $9, location = $10, updated_at = NOW() 
       WHERE id = $11 RETURNING *`,
      [company_name, role, employment_type, start_date, end_date || null, is_current || false, description, tech_stack, company_logo_url, location, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json({ message: 'Experience updated', data: result.rows[0] });
  } catch (err) {
    console.error('PUT /experience/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE experience (Admin) - ✅ AUTH REQUIRED
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    console.log('Deleting experience:', req.params.id);
    
    const result = await query('DELETE FROM experience WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    console.error('DELETE /experience/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;