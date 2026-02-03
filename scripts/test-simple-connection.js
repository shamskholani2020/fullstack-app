import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read .env.local file directly from project root
const envPath = resolve('/home/ubuntu/.openclaw/workspace/fullstack-app/.env.local');
const envContent = readFileSync(envPath, 'utf-8');

// Parse environment variables
const getEnvVar = (key) => {
  const lines = envContent.split('\n');
  const line = lines.find(l => l.trim().startsWith(`${key}=`));
  if (!line) return undefined;
  return line.split('=')[1].trim();
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

console.log('='.repeat(60));
console.log('🧪 Testing Al-Bader Supabase Connection (Final Attempt)');
console.log('='.repeat(60));

// Check if variables are loaded
console.log('\n📋 Loaded Environment Variables:');
console.log(`📡 URL: ${supabaseUrl ? supabaseUrl : 'NOT LOADED'}`);
console.log(`🔑 Key: ${supabaseKey ? supabaseKey.substring(0, 20) + '...' + supabaseKey.substring(supabaseKey.length - 10) : 'NOT LOADED'}`);

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ ERROR: Environment variables not loaded!');
  console.error('   File path:', envPath);
  console.error('   File exists:', require('fs').existsSync(envPath));
  process.exit(1);
}

console.log('✅ Environment variables loaded successfully');
console.log('='.repeat(60));

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test 1: Check connection
    console.log('\n📍 Step 1: Testing basic connection...');
    const { data, error } = await supabase.rpc('get_version').select();
    
    if (error) {
      console.error('❌ Connection FAILED:', error.message);
      return { success: false, step: 'connection', error: error.message };
    }
    
    console.log('✅ Basic connection: OK');
    
    // Test 2: Try to query database (tables might not exist, that's OK)
    console.log('\n📍 Step 2: Checking database access (tables may not exist)...');
    const { data: dbData, error: dbError } = await supabase.rpc('list_tables').select('*');
    
    if (dbError) {
      console.error('❌ Database access failed:', dbError.message);
      return { success: false, step: 'database_access', error: dbError.message };
    }
    
    console.log('✅ Database access: OK');
    console.log(`   Found ${dbData.length} tables`);
    
    // Final report
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS PASSED! Supabase connection is working perfectly.');
    console.log('🚀 Al-Bader can now proceed with database operations.');
    console.log('='.repeat(60));
    console.log('\n📋 Summary:');
    console.log('  ✅ Environment variables: LOADED');
    console.log('  ✅ Connection: WORKING');
    console.log('  ✅ Database: ACCESSIBLE');
    console.log('  ✅ Tables: ' + dbData.length + ' (may be empty, that\'s OK)');
    console.log('\n🎯 READY FOR NEXT STEPS:');
    console.log('  1. Run SQL migration to create 13 tables');
    console.log('  2. Set up Prisma ORM');
    console.log('  3. Build authentication system');
    console.log('  4. Create core features');
    console.log('='.repeat(60));
    
    return {
      success: true,
      message: 'Supabase connection successful',
      tests: [
        { name: 'Environment Variables', status: 'PASS' },
        { name: 'Connection', status: 'PASS' },
        { name: 'Database Access', status: 'PASS', tables: dbData.length }
      ],
      url: supabaseUrl,
      tables: dbData
    };
    
  } catch (e) {
    console.error('\n💥 CRITICAL ERROR:', e.message);
    console.error('='.repeat(60));
    
    return {
      success: false,
      error: e.message,
      message: 'Failed to connect to Supabase'
    };
  }
}

testConnection().then(result => {
  if (result.success) {
    console.log('\n🎉 SUCCESS! Exit code 0');
    console.log('='.repeat(60));
    process.exit(0);
  } else {
    console.log('\n💥 FAILURE! Exit code 1');
    console.log('='.repeat(60));
    console.log(`Error: ${result.error}`);
    process.exit(1);
  }
}).catch(e => {
  console.error('\n💥 UNEXPECTED ERROR:', e.message);
  console.log('='.repeat(60));
  process.exit(2);
});
