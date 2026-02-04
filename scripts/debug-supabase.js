const { chromium } = require('playwright');
require('dotenv').config();

async function debugSupabase() {
  console.log('🚀 Launching headless browser...');

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  try {
    console.log('🔗 Navigating to Supabase admin panel...');
    await page.goto('https://supabase.kholani.store', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('📄 Page loaded');

    // Get page title
    const title = await page.title();
    console.log(`Title: "${title}"`);

    // Get page content (first 2000 chars)
    const content = await page.content();
    console.log('\n=== PAGE CONTENT (first 2000 chars) ===');
    console.log(content.substring(0, 2000));

    // Get all forms
    const forms = await page.$$('form');
    console.log(`\n=== FORMS ===`);
    console.log(`Found ${forms.length} forms`);

    // Get all inputs
    const inputs = await page.$$('input');
    console.log(`\n=== INPUTS ===`);
    console.log(`Found ${inputs.length} inputs`);

    for (let i = 0; i < Math.min(inputs.length, 10); i++) {
      const input = inputs[i];
      const type = await input.getAttribute('type');
      const name = await input.getAttribute('name');
      const id = await input.getAttribute('id');
      const placeholder = await input.getAttribute('placeholder');

      console.log(`  Input ${i}: type=${type}, name=${name}, id=${id}, placeholder=${placeholder}`);
    }

    // Get all buttons
    const buttons = await page.$$('button');
    console.log(`\n=== BUTTONS ===`);
    console.log(`Found ${buttons.length} buttons`);

    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const button = buttons[i];
      const text = await button.textContent();
      const type = await button.getAttribute('type');

      console.log(`  Button ${i}: "${text?.substring(0, 50)}", type=${type}`);
    }

    // Get all links
    const links = await page.$$('a');
    console.log(`\n=== LINKS ===`);
    console.log(`Found ${links.length} links`);

    for (let i = 0; i < Math.min(links.length, 10); i++) {
      const link = links[i];
      const text = await link.textContent();
      const href = await link.getAttribute('href');

      console.log(`  Link ${i}: "${text?.substring(0, 50)}" -> ${href}`);
    }

    // Look for any text content
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(`\n=== BODY TEXT (first 1000 chars) ===`);
    console.log(bodyText.substring(0, 1000));

  } catch (error) {
    console.error('❌ Error:', error.message);

  } finally {
    await browser.close();
  }
}

debugSupabase();
