#!/usr/bin/env node

/**
 * Database Integration Test Script
 * Tests all CRUD operations for Supabase tables
 */

const { createClient } = require('@supabase/supabase-js');

// Configuration
const supabaseUrl = 'https://supabase.kholani.store';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzAxNTE5NzIsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.2OFTnDKqV42NvGDOtc7oieh8wR6HTQIdYJjGH_KW8wU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test results tracker
const tests = {
  passed: 0,
  failed: 0,
  results: []
};

function logTest(testName, passed, message = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} - ${testName}${message ? ': ' + message : ''}`);

  if (passed) {
    tests.passed++;
  } else {
    tests.failed++;
  }

  tests.results.push({ testName, passed, message });
}

// ============================================================================
// TEST 1: Database Connection
// ============================================================================
async function testConnection() {
  console.log('\n=== TEST 1: Database Connection ===');
  try {
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .limit(1);

    if (error) {
      logTest('Database Connection', false, error.message);
      return false;
    }

    logTest('Database Connection', true, 'Connected successfully');
    return true;
  } catch (e) {
    logTest('Database Connection', false, e.message);
    return false;
  }
}

// ============================================================================
// TEST 2: Products CRUD
// ============================================================================
async function testProducts() {
  console.log('\n=== TEST 2: Products CRUD ===');

  // CREATE
  try {
    const testProduct = {
      name_ar: 'منتج تجريبي',
      name_en: 'Test Product',
      category: 'أخشاب',
      product_type: 'لوح',
      price_usd: 50,
      specifications: { length: 200, width: 20, thickness: 1.8 },
      stock: 100
    };

    const { data, error } = await supabase
      .from('products')
      .insert(testProduct)
      .select()
      .single();

    if (error) {
      logTest('Products: CREATE', false, error.message);
      return false;
    }

    logTest('Products: CREATE', true, `Product ID: ${data.id}`);

    // READ
    const { data: readData, error: readError } = await supabase
      .from('products')
      .select('*')
      .eq('id', data.id)
      .single();

    if (readError || !readData) {
      logTest('Products: READ', false, readError?.message || 'No data returned');
      return false;
    }

    logTest('Products: READ', true, `Product: ${readData.name_ar}`);

    // UPDATE
    const { data: updateData, error: updateError } = await supabase
      .from('products')
      .update({ stock: 150 })
      .eq('id', data.id)
      .select()
      .single();

    if (updateError) {
      logTest('Products: UPDATE', false, updateError.message);
      return false;
    }

    logTest('Products: UPDATE', true, `Stock updated to: ${updateData.stock}`);

    // DELETE
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      logTest('Products: DELETE', false, deleteError.message);
      return false;
    }

    logTest('Products: DELETE', true, 'Test product removed');

    return true;
  } catch (e) {
    logTest('Products CRUD', false, e.message);
    return false;
  }
}

// ============================================================================
// TEST 3: Jobs CRUD
// ============================================================================
async function testJobs() {
  console.log('\n=== TEST 3: Jobs CRUD ===');

  try {
    const testJob = {
      client_name: 'عميل تجريبي',
      client_phone: '+963900000000',
      client_address: 'دمشق، سوريا',
      status: 'pending',
      notes: 'اختبار النظام',
      estimated_cost: 500
    };

    // CREATE
    const { data, error } = await supabase
      .from('jobs')
      .insert(testJob)
      .select()
      .single();

    if (error) {
      logTest('Jobs: CREATE', false, error.message);
      return false;
    }

    logTest('Jobs: CREATE', true, `Job ID: ${data.id}`);

    // READ
    const { data: readData, error: readError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', data.id)
      .single();

    if (readError || !readData) {
      logTest('Jobs: READ', false, readError?.message || 'No data returned');
      return false;
    }

    logTest('Jobs: READ', true, `Job: ${readData.client_name}`);

    // UPDATE
    const { data: updateData, error: updateError } = await supabase
      .from('jobs')
      .update({ status: 'in_progress' })
      .eq('id', data.id)
      .select()
      .single();

    if (updateError) {
      logTest('Jobs: UPDATE', false, updateError.message);
      return false;
    }

    logTest('Jobs: UPDATE', true, `Status: ${updateData.status}`);

    // DELETE
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      logTest('Jobs: DELETE', false, deleteError.message);
      return false;
    }

    logTest('Jobs: DELETE', true, 'Test job removed');

    return true;
  } catch (e) {
    logTest('Jobs CRUD', false, e.message);
    return false;
  }
}

// ============================================================================
// TEST 4: Measurements CRUD
// ============================================================================
async function testMeasurements() {
  console.log('\n=== TEST 4: Measurements CRUD ===');

  try {
    const testMeasurement = {
      user_id: null,
      job_id: null,
      project_name: 'مشروع تجريبي',
      project_type: 'أثاث منزلي',
      room_name: 'غرفة نوم',
      measurements: { length: 4, width: 3, height: 2.5 },
      notes: 'قياسات تجريبية'
    };

    // CREATE
    const { data, error } = await supabase
      .from('measurements')
      .insert(testMeasurement)
      .select()
      .single();

    if (error) {
      logTest('Measurements: CREATE', false, error.message);
      return false;
    }

    logTest('Measurements: CREATE', true, `Measurement ID: ${data.id}`);

    // READ
    const { data: readData, error: readError } = await supabase
      .from('measurements')
      .select('*')
      .eq('id', data.id)
      .single();

    if (readError || !readData) {
      logTest('Measurements: READ', false, readError?.message || 'No data returned');
      return false;
    }

    logTest('Measurements: READ', true, `Project: ${readData.project_name}`);

    // DELETE
    const { error: deleteError } = await supabase
      .from('measurements')
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      logTest('Measurements: DELETE', false, deleteError.message);
      return false;
    }

    logTest('Measurements: DELETE', true, 'Test measurement removed');

    return true;
  } catch (e) {
    logTest('Measurements CRUD', false, e.message);
    return false;
  }
}

// ============================================================================
// TEST 5: Checklists CRUD
// ============================================================================
async function testChecklists() {
  console.log('\n=== TEST 5: Checklists CRUD ===');

  try {
    const testChecklist = {
      user_id: null,
      job_id: null,
      checklist_data: [
        { id: 1, text: 'مهمة تجريبية 1', completed: false },
        { id: 2, text: 'مهمة تجريبية 2', completed: true },
        { id: 3, text: 'مهمة تجريبية 3', completed: false }
      ]
    };

    // CREATE
    const { data, error } = await supabase
      .from('checklists')
      .insert(testChecklist)
      .select()
      .single();

    if (error) {
      logTest('Checklists: CREATE', false, error.message);
      return false;
    }

    logTest('Checklists: CREATE', true, `Checklist ID: ${data.id}`);

    // READ
    const { data: readData, error: readError } = await supabase
      .from('checklists')
      .select('*')
      .eq('id', data.id)
      .single();

    if (readError || !readData) {
      logTest('Checklists: READ', false, readError?.message || 'No data returned');
      return false;
    }

    logTest('Checklists: READ', true, `${readData.checklist_data.length} items`);

    // DELETE
    const { error: deleteError } = await supabase
      .from('checklists')
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      logTest('Checklists: DELETE', false, deleteError.message);
      return false;
    }

    logTest('Checklists: DELETE', true, 'Test checklist removed');

    return true;
  } catch (e) {
    logTest('Checklists CRUD', false, e.message);
    return false;
  }
}

// ============================================================================
// TEST 6: Exchange Rates
// ============================================================================
async function testExchangeRates() {
  console.log('\n=== TEST 6: Exchange Rates ===');

  try {
    // READ
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) {
      logTest('Exchange Rates: READ', false, error.message);
      return false;
    }

    if (!data || data.length === 0) {
      logTest('Exchange Rates: READ', false, 'No exchange rates found');
      return false;
    }

    const rate = data[0];
    logTest('Exchange Rates: READ', true,
      `1 USD = ${rate.usd_to_new_syp} new SYP (${rate.usd_to_old_syp} old SYP)`);

    return true;
  } catch (e) {
    logTest('Exchange Rates', false, e.message);
    return false;
  }
}

// ============================================================================
// TEST 7: Suppliers CRUD
// ============================================================================
async function testSuppliers() {
  console.log('\n=== TEST 7: Suppliers CRUD ===');

  try {
    const testSupplier = {
      name: 'مورد تجريبي',
      phone: '+963900000001',
      last_purchase_price: 45,
      lead_time_days: 3
    };

    // CREATE
    const { data, error } = await supabase
      .from('suppliers')
      .insert(testSupplier)
      .select()
      .single();

    if (error) {
      logTest('Suppliers: CREATE', false, error.message);
      return false;
    }

    logTest('Suppliers: CREATE', true, `Supplier ID: ${data.id}`);

    // READ
    const { data: readData, error: readError } = await supabase
      .from('suppliers')
      .select('*')
      .eq('id', data.id)
      .single();

    if (readError || !readData) {
      logTest('Suppliers: READ', false, readError?.message || 'No data returned');
      return false;
    }

    logTest('Suppliers: READ', true, `Supplier: ${readData.name}`);

    // UPDATE
    const { data: updateData, error: updateError } = await supabase
      .from('suppliers')
      .update({ last_purchase_price: 47 })
      .eq('id', data.id)
      .select()
      .single();

    if (updateError) {
      logTest('Suppliers: UPDATE', false, updateError.message);
      return false;
    }

    logTest('Suppliers: UPDATE', true, `Price: ${updateData.last_purchase_price} USD`);

    // DELETE
    const { error: deleteError } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      logTest('Suppliers: DELETE', false, deleteError.message);
      return false;
    }

    logTest('Suppliers: DELETE', true, 'Test supplier removed');

    return true;
  } catch (e) {
    logTest('Suppliers CRUD', false, e.message);
    return false;
  }
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================
async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║           البدر (Al-Bader) - Database Integration Tests        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log(`\nDatabase: ${supabaseUrl}`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  await testConnection();
  await testProducts();
  await testJobs();
  await testMeasurements();
  await testChecklists();
  await testExchangeRates();
  await testSuppliers();

  // Print summary
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                         TEST SUMMARY                            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log(`\nTotal Tests: ${tests.passed + tests.failed}`);
  console.log(`✅ Passed: ${tests.passed}`);
  console.log(`❌ Failed: ${tests.failed}`);

  if (tests.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Database is ready for production.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  SOME TESTS FAILED! Please check the errors above.\n');
    process.exit(1);
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('\n❌ Fatal Error:', error.message);
  process.exit(1);
});
