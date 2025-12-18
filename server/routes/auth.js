// ============================================
// AUTH MIDDLEWARE & ROUTES - auth.js
// ============================================
// Create this file at: ./routes/auth.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

// ========== MIDDLEWARE: VERIFY JWT TOKEN ==========
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// ========== LOGIN ENDPOINT ==========
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Query admin user
    const result = await query('SELECT * FROM admin_users WHERE username = $1', [username]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Simple password check (in production, hash passwords!)
    // For now: compare MD5 hash of password
    const crypto = require('crypto');
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');

    if (user.password_hash !== passwordHash) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token (valid for 24 hours)
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ========== VERIFY TOKEN ENDPOINT ==========
router.post('/verify', verifyToken, (req, res) => {
  res.json({ message: 'Token is valid', userId: req.userId });
});

// ========== EXPORT FOR USE IN OTHER ROUTES ==========
module.exports = router;
module.exports.verifyToken = verifyToken;

// ============================================
// EXPLANATION FOR BEGINNERS:
// ============================================
// 1. verifyToken() checks if JWT token is present and valid
// 2. /login endpoint authenticates user and returns JWT token
// 3. JWT tokens allow stateless authentication (no sessions needed)
// 4. Token expires in 24 hours for security
// 5. Password is hashed using MD5 (in production, use bcrypt!)
// 6. verifyToken is exported so other routes can use it
