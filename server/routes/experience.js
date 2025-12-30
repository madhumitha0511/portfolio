// ✅ UPDATED EXPERIENCE ROUTES - ./routes/experience.js
// ============================================

const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const { verifyToken } = require('./auth');

// GET all experiences - ✅ WITH FORMATTED DATES
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, company_name, role, employment_type, 
        start_date, end_date, is_current, description, 
        tech_stack, company_logo_url, location,
        created_at, updated_at,
        EXTRACT(YEAR FROM start_date::date) as year,
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
    res.status(500).json({ error: err.message });
  }
});

// GET single experience - ✅ WITH FORMATTED DATES
router.get('/:id', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id, company_name, role, employment_type, 
        start_date, end_date, is_current, description, 
        tech_stack, company_logo_url, location,
        created_at, updated_at,
        EXTRACT(YEAR FROM start_date::date) as year,
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
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE experience (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location } = req.body;
    
    const result = await query(
      `INSERT INTO experience (company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location]
    );
    
    res.status(201).json({ message: 'Experience created', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE experience (Admin) - ✅ UNCHANGED (accepts raw ISO dates)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location } = req.body;
    
    const result = await query(
      `UPDATE experience SET company_name = $1, role = $2, employment_type = $3, start_date = $4, end_date = $5, 
       is_current = $6, description = $7, tech_stack = $8, company_logo_url = $9, location = $10, updated_at = NOW() WHERE id = $11 RETURNING *`,
      [company_name, role, employment_type, start_date, end_date, is_current, description, tech_stack, company_logo_url, location, req.params.id]
    );
    
    res.json({ message: 'Experience updated', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE experience (Admin) - ✅ UNCHANGED
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await query('DELETE FROM experience WHERE id = $1', [req.params.id]);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;