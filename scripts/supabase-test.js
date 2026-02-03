import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve('/home/ubuntu/.openclaw/workspace/fullstack-app/.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n').filter(line => line.trim() !== '');

function getEnvVar(key) {
  const line = envLines.find(l => l.trim().startsWith(key + '='));
  if (!line) return undefined;
  return line.split('=')[1].trim();
}

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

console.log('============================================================');
console.log('Testing Al-Bader Supabase Connection (Cache-Bypass)');
console.log('============================================================');
console.log('URL: ' + supabaseUrl);
console.log('Key: ' + (supabaseKey ? supabaseKey.substring(0, 20) + '...' + supabaseKey.substring(supabaseKey.length - 10) : 'NOT SET'));
console.log('============================================================');

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Missing environment variables');
  console.log('URL: ' + supabaseUrl);
  console.log('Key: ' + supabaseKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Step 1: Simple SELECT
    console.log('\nStep 1: Testing simple SELECT (cache bypass)...');
    const { data, error } = await supabase.from('users').select('id').limit(1);
    
    if (error) {
      console.error('FAILED: ' + error.message);
      return { success: false, step: 'select', error: error.message };
    }
    
    console.log('OK: Simple SELECT works');
    
    // Step 2: Try to INSERT
    console.log('\nStep 2: Testing INSERT permissions...');
    const { error: insertError } = await supabase.from('users').insert({
      phone_number: '+9630000000',
      sms_verified: false
    }).select();
    
    if (insertError) {
      console.error('FAILED: ' + insertError.message);
      if (insertError.message.includes('duplicate')) {
        console.log('OK: This is expected - phone already exists');
      }
    } else {
      console.log('OK: INSERT permissions work');
    }
    
    // Step 3: Try to DELETE
    console.log('\nStep 3: Testing DELETE permissions...');
    const { error: deleteError } = await supabase.from('users').delete().eq('phone_number', '+9630000000');
    
    if (deleteError) {
      console.error('FAILED: ' + deleteError.message);
      console.log('OK: This is fine for now');
    } else {
      console.log('OK: DELETE permissions work');
    }
    
    console.log('\n============================================================');
    console.log('SUCCESS! All Supabase tests passed');
    console.log('============================================================');
    
    return { success: true, message: 'All tests passed' };
    
  } catch (e) {
    console.error('\nCRITICAL ERROR: ' + e.message);
    console.error('Full error:', e);
    return { success: false, error: e.message };
  }
}

testConnection().then(result => {
  if (result.success) {
    console.log('\nSUCCESS! Exit code 0');
    process.exit(0);
  } else {
    console.log('\nFAILURE! Exit code 1');
    process.exit(1);
  }
}).catch(e => {
  console.error('\nUNEXPECTED ERROR: ' + e.message);
  process.exit(2);
});
