const { chromium } = require('playwright');

async function findSupabaseAdmin() {
  console.log('🔍 Looking for Supabase admin panel...');

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  try {
    const paths = [
      '',
      '/admin',
      '/studio',
      '/dashboard',
      '/supabase',
      '/api',
      '/supabase/admin'
    ];

    for (const path of paths) {
      const url = `https://supabase.kholani.store${path}`;
      console.log(`\n🔗 Trying: ${url}`);

      try {
        await page.goto(url, {
          waitUntil: 'networkidle',
          timeout: 10000
        });

        const title = await page.title();
        const content = await page.content();

        console.log(`  Title: "${title}"`);

        // Look for login forms
        const inputs = await page.$$('input');
        const forms = await page.$$('form');

        if (inputs.length > 0 || forms.length > 0) {
          console.log(`  ✅ Found ${inputs.length} inputs, ${forms.length} forms`);
          console.log(`  📍 This might be the admin panel!`);

          // Save screenshot
          await page.screenshot({ path: `/tmp/supabase-admin-${path.replace('/', '_') || 'root'}.png` });

          // If we found login form, stop
          if (inputs.length >= 1) {
            console.log(`\n🎯 Admin panel found at: ${url}`);
            break;
          }
        } else {
          console.log(`  ❌ No login form found`);
        }

      } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);

  } finally {
    await browser.close();
  }
}

findSupabaseAdmin();
