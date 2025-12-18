// ============================================
// DATABASE CONNECTION - db.js
// ============================================
// Create this file at: ./config/db.js

const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL (Neon)');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

// Query helper function
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  pool,
  query
};

// ============================================
// EXPLANATION FOR BEGINNERS:
// ============================================
// 1. Pool creates multiple connections for better performance
// 2. connectionString connects to your Neon database
// 3. ssl: { rejectUnauthorized: false } is required for Neon secure connection
// 4. query() is a helper to run SQL queries easily
// 5. Error handling logs if connection fails
