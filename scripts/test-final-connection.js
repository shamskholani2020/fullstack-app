import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read .env.local file
const envContent = readFileSync('/home/ubuntu/.openclaw/workspace/fullstack-app/.env.local', 'utf-8');
const envLines = envContent.split('\n').filter(line => line.trim() !== '');

// Parse environment variables
const getEnvVar = (key) => {
  const line = envLines.find(l => l.startsWith(`${key}=`));
  if (!line) return undefined;
  return line.split('=')[1].trim();
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

console.log('='.repeat(60));
console.log('🧪 Testing Al-Bader Supabase Connection (Final Round)');
console.log('='.repeat(60));
console.log(`📡 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseKey ? supabaseKey.substring(0, 20) + '...' + supabaseKey.substring(supabaseKey.length - 10) : 'NOT SET'}`);
console.log('='.repeat(60));

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ ERROR: Missing environment variables!');
  console.log('📝 NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ SET' : '❌ NOT SET');
  console.log('📝 NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ SET' : '❌ NOT SET');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBasicConnection() {
  console.log('\n📍 Step 1: Testing basic Supabase connection...');
  
  try {
    // Simple connection test - no tables, just see if we can reach the database
    const { data, error } = await supabase
      .rpc('get_table_version')
      .select('version');
    
    if (error) {
      console.log('❌ Connection FAILED:', error.message);
      console.log('\n💡 TIP: This might be because:');
      console.log('   - The Supabase project URL is incorrect');
      console.log('   - The Anon/public key is invalid or expired');
      console.log('   - The project is paused or suspended');
      return false;
    }
    
    console.log('✅ Connection SUCCESSFUL!');
    console.log(`   Database version: ${data.version || 'unknown'}`);
    console.log(`   Project reachable: ${supabaseUrl}`);
    return true;
    
  } catch (e) {
    console.log('❌ Connection FAILED:', e.message);
    return false;
  }
}

async function runTests() {
  const connectionWorks = await testBasicConnection();
  
  console.log('\n' + '='.repeat(60));
  if (connectionWorks) {
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(60));
    console.log('🚀 Al-Bader database is accessible and ready!');
    console.log('='.repeat(60));
    console.log('📋 Next Steps:');
    console.log('   1. Go to Supabase Dashboard: https://supabase.com/dashboard');
    console.log('   2. Select your project (bader)');
    console.log('   3. Go to SQL Editor');
    console.log('   4. Click "New Query" button');
    console.log('   5. Copy and paste contents of: supabase/migrations/001_initial_schema.sql');
    console.log('   6. Click "Run" button to create all tables');
    console.log('   7. Run this test again to verify tables exist');
  } else {
    console.log('💥 CONNECTION FAILED!');
    console.log('='.repeat(60));
    console.log('Please verify:');
    console.log('   1. Supabase URL is correct: ' + supabaseUrl);
    console.log('   2. Anon/public key is valid: ' + (supabaseKey ? '✅' : '❌'));
    console.log('   3. Project is not paused/suspended');
    console.log('   4. You have "anon" permissions on the project');
  }
}

runTests().then(() => {
  process.exit(0);
}).catch(() => {
  process.exit(1);
});
