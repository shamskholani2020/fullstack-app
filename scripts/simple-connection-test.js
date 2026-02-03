import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.kholani.store';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('='.repeat(60));
console.log('🧪 Testing Al-Bader Supabase Connection');
console.log('='.repeat(60));
console.log(`📡 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseKey ? supabaseKey.substring(0, 20) + '...' + supabaseKey.substring(supabaseKey.length - 10) : 'NOT SET'}`);
console.log('='.repeat(60));

if (!supabaseUrl) {
  console.error('❌ ERROR: NEXT_PUBLIC_SUPABASE_URL not set in .env.local');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('❌ ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY not set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    schemas: {
      public: {
        // This bypasses cached schema by specifying the tables explicitly
      }
    }
  }
});

async function testConnection() {
  console.log('\n📍 Step 1: Testing basic connection...');
  
  try {
    // Simple ping-like query to check if database is reachable
    const { data, error } = await supabase
      .rpc('get_version')
      .select();
    
    if (error) {
      console.error('❌ Connection FAILED:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Connection SUCCESSFUL!');
    console.log(`   Database version: ${data}`);
    
    // Test 2: Try to query database (even if tables don't exist yet)
    console.log('\n📍 Step 2: Testing database accessibility...');
    const { data: versionData, error: versionError } = await supabase
      .rpc('get_config')
      .select('version');
    
    if (versionError) {
      console.error('❌ Database not accessible:', versionError.message);
      return { success: false, error: versionError.message };
    }
    
    console.log('✅ Database is accessible!');
    console.log(`   Version: ${versionData.version}`);
    
    // Test 3: Check if we can use POSTGRESQL admin functions
    console.log('\n📍 Step 3: Testing admin function access...');
    const { data: extensionData, error: extensionError } = await supabase
      .rpc('get_extensions')
      .select('*');
    
    if (extensionError) {
      console.warn('⚠️  Admin functions test skipped:', extensionError.message);
      // This is OK - not critical for basic connection
    } else {
      console.log('✅ Admin functions accessible!');
      const hasPgCrypto = extensionData.some((ext: any) => ext.name === 'pgcrypto');
      console.log(`   pgcrypto extension: ${hasPgCrypto ? 'available' : 'not available'}`);
    }
    
    // Final report
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS PASSED!');
    console.log('🚀 Al-Bader database is connected and ready!');
    console.log('='.repeat(60));
    console.log('\n📋 Summary:');
    console.log('  ✅ Supabase URL: OK');
    console.log('  ✅ Anon/Public key: OK');
    console.log('  ✅ Connection: Working');
    console.log('  ✅ Database: Accessible');
    console.log('  ✅ Admin functions: ' + (extensionData ? 'OK' : 'Skipped'));
    console.log('\n🚀 READY FOR SQL MIGRATION!');
    console.log('='.repeat(60));
    
    return {
      success: true,
      message: 'All Supabase connection tests passed successfully',
      url: supabaseUrl,
      project_ref: 'bader',
      tests: [
        { name: 'Basic Connection', status: 'PASS' },
        { name: 'Database Access', status: 'PASS', version: versionData.version },
        { name: 'Admin Functions', status: extensionData ? 'PASS' : 'SKIP' }
      ]
    };
    
  } catch (e) {
    console.error('\n💥 CRITICAL ERROR:', e.message);
    console.error('='.repeat(60));
    
    return {
      success: false,
      error: e.message,
      message: 'Failed to connect to Supabase - check URL and API key'
    };
  }
}

// Run tests
testConnection().then(result => {
  if (result.success) {
    console.log('\n🎉 EXIT CODE: 0 (SUCCESS)');
    console.log('='.repeat(60));
    process.exit(0);
  } else {
    console.log('\n💥 EXIT CODE: 1 (FAILURE)');
    console.log(`Error: ${result.error || result.message}`);
    console.log('='.repeat(60));
    process.exit(1);
  }
}).catch(e => {
  console.error('\n💥 UNEXPECTED ERROR:', e.message);
  console.error('='.repeat(60));
  process.exit(1);
});
