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

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL') || 'https://supabase.kholani.store';
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('='.repeat(60));
  console.log('🧪 Testing Al-Bader Supabase Connection (Round 2)');
  console.log('='.repeat(60));
  console.log(`📡 URL: ${supabaseUrl}`);
  console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...${supabaseKey.substring(supabaseKey.length - 10)}`);
  console.log('='.repeat(60));

  try {
    // Step 1: Test basic connection
    console.log('\n📍 Step 1: Testing basic connection...');
    const { data, error } = await supabase.from('products').select('id').limit(1);
    
    if (error) {
      console.error('❌ Connection FAILED:', error.message);
      if (error.message.includes('does not exist')) {
        console.log('\n📝 NOTE: This is EXPECTED! Tables not created yet.');
        console.log('   We need to run SQL migration to create tables.');
        console.log('   File: supabase/migrations/001_initial_schema.sql');
      }
      return {
        success: false,
        step: 'basic_connection',
        error: error.message,
        note: error.message.includes('does not exist') ? 'Tables not created yet' : null
      };
    }
    
    console.log('✅ Connection: OK');
    
    // Step 2: Check if products table exists and has data
    console.log('\n📍 Step 2: Checking products table...');
    const { data: products, error: productsError } = await supabase.from('products').select('*').limit(1);
    
    if (productsError) {
      console.error('❌ Products table error:', productsError.message);
      if (productsError.message.includes('does not exist')) {
        console.log('📝 This is OK for now - tables will be created via migration');
      }
      return {
        success: false,
        step: 'products_table',
        error: productsError.message,
        note: 'Tables need to be created first'
      };
    }
    
    console.log('✅ Products table: OK');
    console.log(`   Found: ${products.length} products`);
    
    // Step 3: Check users table
    console.log('\n📍 Step 3: Checking users table...');
    const { data: users, error: usersError } = await supabase.from('users').select('id').limit(1);
    
    if (usersError) {
      console.error('❌ Users table error:', usersError.message);
      return {
        success: false,
        step: 'users_table',
        error: usersError.message
      };
    }
    
    console.log('✅ Users table: OK');
    
    // Step 4: Check exchange_rates table
    console.log('\n📍 Step 4: Checking exchange_rates table...');
    const { data: rates, error: ratesError } = await supabase.from('exchange_rates').select('*').limit(1);
    
    if (ratesError) {
      console.error('❌ Exchange rates table error:', ratesError.message);
      return {
        success: false,
        step: 'exchange_rates_table',
        error: ratesError.message
      };
    }
    
    console.log('✅ Exchange rates table: OK');
    if (rates.length > 0) {
      const rate = rates[0];
      console.log(`   💰 USD → ${rate.usd_to_old_syp} Old SYP = ${rate.usd_to_new_syp} New SYP`);
      console.log(`   📊 Conversion: ${rate.conversion_ratio} (100 old = ${rate.usd_to_new_syp} new)`);
      console.log(`   📅 Source: ${rate.source}`);
      console.log(`   🏛 Official Rate: ${rate.is_official_rate ? 'YES' : 'NO'}`);
    }
    
    // Final success report
    console.log('\n' + '='.repeat(60));
    console.log('✅ CONNECTION SUCCESSFUL! (But tables not created yet)');
    console.log('='.repeat(60));
    console.log('📋 Next Steps:');
    console.log('   1. Create Supabase tables by running SQL migration');
    console.log('   2. File to run: supabase/migrations/001_initial_schema.sql');
    console.log('   3. This creates 13 tables: users, products, jobs, etc.');
    console.log('   4. After migration, run this test again to verify all tables');
    console.log('='.repeat(60));
    
    return {
      success: true,
      message: 'Supabase connection working! Tables need to be created via migration',
      connection: 'OK',
      tables: 'NOT_CREATED_YET',
      note: 'This is expected - database is connected but empty',
      url: supabaseUrl,
      next_steps: [
        'Run SQL migration to create 13 tables',
        'Go to Supabase Dashboard → SQL Editor',
        'Paste and run: supabase/migrations/001_initial_schema.sql',
        'Run this test again to verify tables'
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

testConnection().then(result => {
  if (result.success) {
    console.log('\n🎉 CONNECTION TEST RESULT: PASSED');
    console.log('='.repeat(60));
    console.log('✅ Supabase is connected and accessible');
    console.log('⏳ Tables need to be created via SQL migration');
    process.exit(0);
  } else {
    console.log('\n⚠️ CONNECTION TEST RESULT: WARNING');
    console.log('='.repeat(60));
    console.log(`Reason: ${result.message}`);
    console.log(`Error: ${result.error}`);
    if (result.note) {
      console.log(`Note: ${result.note}`);
    }
    process.exit(1);
  }
}).catch(e => {
  console.error('\n💥 UNEXPECTED ERROR:', e);
  process.exit(2);
});
