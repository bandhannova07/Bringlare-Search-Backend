#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Running database migrations...');

try {
  // Ensure dotenv is loaded for the migration process
  require('dotenv').config();
  
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('Database migrations completed successfully');
} catch (error) {
  console.error('Database migration failed:', error.message);
  process.exit(1);
}