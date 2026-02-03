import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.kholani.store';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('='.repeat(60));
  console.log('🧪 Testing Al-Bader Supabase Connection');
  console.log('='.repeat(60));
  console.log(`📡 URL: ${supabaseUrl}`);
  console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...${supabaseKey.substring(supabaseKey.length - 10)}`);
  console.log('='.repeat(60));

  try {
    // Test 1: Check connection
    console.log('\n📍 Step 1: Testing basic connection...');
    const { data: connectionData, error: connectionError } = await supabase.from('products').select('id').limit(1);
    
    if (connectionError) {
      console.error('❌ Connection FAILED:', connectionError.message);
      if (connectionError.message.includes('does not exist')) {
        console.log('📝 This is expected - tables not created yet');
      }
      return {
        success: false,
        step: 'basic_connection',
        error: connectionError.message
      };
    }
    
    console.log('✅ Basic connection: OK');

    // Test 2: Try to read products (might be empty, that's OK)
    console.log('\n📍 Step 2: Testing products table...');
    const { data: products, error: productsError } = await supabase.from('products').select('*').limit(1);
    
    if (productsError) {
      console.error('❌ Products table error:', productsError.message);
      return {
        success: false,
        step: 'products_table',
        error: productsError.message
      };
    }
    
    console.log(`✅ Products table: OK (${products.length} products found)`);
    
    // Test 3: Check users table
    console.log('\n📍 Step 3: Checking users table...');
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

    // Test 4: Check exchange_rates table
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

    // Test 5: Try to write (INSERT)
    console.log('\n📍 Step 5: Testing write permissions...');
    const { error: writeError } = await supabase
      .from('test_table')
      .insert({ name: 'connection_test' })
      .select();
    
    if (writeError) {
      console.error('❌ Write permission error:', writeError.message);
      return {
        success: false,
        step: 'write_permission',
        error: writeError.message
      };
    }
    
    console.log('✅ Write permissions: OK (created test record)');

    // Clean up
    await supabase.from('test_table').delete().eq('name', 'connection_test');

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
        { name: 'Exchange Rates Table', status: 'PASS', count: rates.length },
        { name: 'Write Permissions', status: 'PASS' }
      ],
      url: supabaseUrl,
      project_ref: 'bader'
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

// Run tests if this file is executed directly
testConnection().then(result => {
  if (result.success) {
    console.log('\n🎉 SUCCESS! Exiting with code 0');
    process.exit(0);
  } else {
    console.log('\n💥 FAILURE! Exiting with code 1');
    process.exit(1);
  }
});
