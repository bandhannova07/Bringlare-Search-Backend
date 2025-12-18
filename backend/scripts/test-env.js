#!/usr/bin/env node

require('dotenv').config();

console.log('Testing environment variables...');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not found');
console.log('PORT:', process.env.PORT || 'Not set (using default)');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not found');

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set!');
  process.exit(1);
} else {
  console.log('Environment variables loaded successfully');
}