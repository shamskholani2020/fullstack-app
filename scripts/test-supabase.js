import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read .env.local file directly
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

console.log('='.repeat(60));
console.log('🧪 Testing Al-Bader Supabase Connection');
console.log('='.repeat(60));
console.log(`📡 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...${supabaseKey.substring(supabaseKey.length - 10)}`);
console.log('='.repeat(60));

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test 1: Basic connection
    console.log('\n📍 Step 1: Testing basic connection...');
    const { data, error } = await supabase.from('products').select('id').limit(1);
    
    if (error) {
      console.error('❌ Connection FAILED:', error.message);
      return {
        success: false,
        step: 'basic_connection',
        error: error.message
      };
    }
    
    console.log('✅ Basic connection: OK');
    
    // Test 2: Try to read products
    console.log('\n📍 Step 2: Testing products table...');
    const { data: products, error: productsError } = await supabase.from('products').select('*').limit(5);
    
    if (productsError) {
      console.error('❌ Products table error:', productsError.message);
      return {
        success: false,
        step: 'products_table',
        error: productsError.message
      };
    }
    
    console.log(`✅ Products table: OK (found ${products.length} products)`);
    if (products.length > 0) {
      console.log(`   📦 Sample: ${products[0].name_ar} (${products[0].category})`);
    }
    
    // Test 3: Try to read users
    console.log('\n📍 Step 3: Testing users table...');
    const { error: usersError } = await supabase.from('users').select('id').limit(1);
    
    if (usersError) {
      console.error('❌ Users table error:', usersError.message);
      return {
        success: false,
        step: 'users_table',
        error: usersError.message
      };
    }
    
    console.log('✅ Users table: OK');
    
    // Test 4: Check exchange_rates
    console.log('\n📍 Step 4: Testing exchange_rates table...');
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
    }
    
    // Final report
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS PASSED! Supabase connection is working perfectly.');
    console.log('='.repeat(60));
    console.log('🚀 Al-Bader can now proceed with database operations!');
    console.log('='.repeat(60));
    
    return {
      success: true,
      message: 'All Supabase tests passed successfully',
      tests: [
        { name: 'Basic Connection', status: 'PASS' },
        { name: 'Products Table', status: 'PASS', count: products.length },
        { name: 'Users Table', status: 'PASS' },
        { name: 'Exchange Rates Table', status: 'PASS', count: rates.length }
      ],
      url: supabaseUrl,
      project_ref: 'bader'
    };
    
  } catch (e) {
    console.error('\n💥 CRITICAL ERROR:', e.message);
    console.error('='.repeat(60));
    console.error('Message:', e.message);
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
    console.log('\n🎉 SUCCESS! Exit code 0');
    process.exit(0);
  } else {
    console.log('\n💥 FAILURE! Exit code 1');
    console.log('Error:', result.error);
    process.exit(1);
  }
}).catch(e => {
  console.error('\n💥 UNEXPECTED ERROR:', e.message);
  process.exit(2);
});
