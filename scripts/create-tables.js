const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

// Supabase connection
const pool = new Pool({
  user: 'supabase',
  host: 'supabase.kholani.store',
  database: 'postgres',
  password: 'jmgweg9lrkcerpfme02rtjbiapqxaauz',
  port: 5432,
  ssl: { rejectUnauthorized: false } // May need SSL for production
});

async function createTables() {
  console.log('🔗 Connecting to Supabase database...');

  try {
    const client = await pool.connect();
    console.log('✅ Connected! Reading SQL migration file...');

    // Read SQL migration file
    const sql = fs.readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf8');

    console.log('📝 Executing SQL migration...');
    await client.query(sql);

    console.log('✅ Database tables created successfully!');
    console.log('\n📊 Tables created:');
    console.log('   - users');
    console.log('   - products');
    console.log('   - jobs');
    console.log('   - job_items');
    console.log('   - suppliers');
    console.log('   - exchange_rates');
    console.log('   - measurements');
    console.log('   - cut_lists');
    console.log('   - templates');
    console.log('   - checklists');
    console.log('   - invoices');
    console.log('   - indexes');
    console.log('   - triggers');
    console.log('   - functions');
    console.log('   - seed data');

    client.release();
    await pool.end();

  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    await pool.end();
    process.exit(1);
  }
}

createTables();
