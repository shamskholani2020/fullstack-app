const { chromium } = require('playwright');
const fs = require('fs');
require('dotenv').config();

async function runSQLInSupabase() {
  console.log('🚀 Launching Playwright browser...');

  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    console.log('🔗 Navigating to Supabase admin panel...');
    await page.goto('https://supabase.kholani.store', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('📄 Page loaded, waiting for content...');
    await page.waitForTimeout(3000);

    // Take screenshot of login page
    await page.screenshot({ path: '/tmp/supabase-login.png' });
    console.log('📸 Login screenshot saved');

    // Try to find and fill login form
    // Look for any input fields
    const inputs = await page.$$('input');
    console.log(`Found ${inputs.length} input fields`);

    if (inputs.length >= 2) {
      console.log('✅ Found login form');

      // Fill first input (username)
      await inputs[0].fill('supabase');
      console.log('✅ Username entered');

      // Fill second input (password)
      await inputs[1].fill('jmgweg9lrkcerpfme02rtjbiapqxaauz');
      console.log('✅ Password entered');

      // Look for submit button
      const buttons = await page.$$('button, input[type="submit"]');
      console.log(`Found ${buttons.length} buttons`);

      // Click the button that's most likely to be submit
      for (const button of buttons) {
        const text = await button.textContent();
        const type = await button.getAttribute('type');
        const buttonText = text || '';

        console.log(`Button text: "${buttonText}", type: ${type}`);

        if (buttonText.toLowerCase().includes('login') ||
            buttonText.toLowerCase().includes('sign in') ||
            buttonText.toLowerCase().includes('تسجيل') ||
            type === 'submit') {
          console.log('✅ Clicking login button...');
          await button.click();
          break;
        }
      }

      // If no submit button found, click the last one
      if (buttons.length > 0) {
        console.log('⏳ Clicking last button...');
        await buttons[buttons.length - 1].click();
      }

      console.log('⏳ Waiting for login to complete...');
      await page.waitForTimeout(5000);

      // Take screenshot after login
      await page.screenshot({ path: '/tmp/supabase-dashboard.png', fullPage: true });
      console.log('📸 Dashboard screenshot saved');

      // Look for SQL Editor
      const links = await page.$$('a');
      console.log(`Found ${links.length} links`);

      for (const link of links) {
        const text = await link.textContent();
        const href = await link.getAttribute('href');

        if (href && (href.includes('sql') || href.includes('editor'))) {
          console.log(`✅ Found SQL Editor link: "${text}"`);
          await link.click();
          break;
        }

        if (text && (text.toLowerCase().includes('sql') ||
                     text.toLowerCase().includes('editor'))) {
          console.log(`✅ Found SQL Editor by text: "${text}"`);
          await link.click();
          break;
        }
      }

      await page.waitForTimeout(3000);
      console.log('✅ Clicked on SQL Editor');

      // Take screenshot of SQL editor
      await page.screenshot({ path: '/tmp/supabase-sql-editor.png', fullPage: true });
      console.log('📸 SQL Editor screenshot saved');

      // Look for textarea or editable div
      const textareas = await page.$$('textarea');
      const editables = await page.$$('[contenteditable="true"]');

      console.log(`Found ${textareas.length} textareas, ${editables.length} editable divs`);

      // Read SQL file
      const sql = fs.readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf8');
      console.log(`📝 SQL file loaded (${sql.length} characters)`);

      let sqlEditor = null;

      if (textareas.length > 0) {
        sqlEditor = textareas[0];
        console.log('✅ Using textarea as SQL editor');
        await sqlEditor.fill(sql);
      } else if (editables.length > 0) {
        sqlEditor = editables[0];
        console.log('✅ Using editable div as SQL editor');
        await sqlEditor.fill(sql);
      } else {
        console.log('❌ Could not find SQL editor input');
        await browser.close();
        return;
      }

      await page.waitForTimeout(2000);
      console.log('✅ SQL pasted');

      // Take screenshot after pasting
      await page.screenshot({ path: '/tmp/supabase-sql-pasted.png', fullPage: true });
      console.log('📸 SQL pasted screenshot saved');

      // Look for run button
      const runButtons = await page.$$('button');
      console.log(`Found ${runButtons.length} buttons for run`);

      let runClicked = false;
      for (const button of runButtons) {
        const text = await button.textContent() || '';

        if (text.toLowerCase().includes('run') ||
            text.toLowerCase().includes('execute') ||
            text.toLowerCase().includes('تشغيل')) {
          console.log(`✅ Found run button: "${text}"`);
          await button.click();
          runClicked = true;
          break;
        }
      }

      if (!runClicked && runButtons.length > 0) {
        console.log('⏳ Clicking last button...');
        await runButtons[runButtons.length - 1].click();
      }

      console.log('⏳ Waiting for SQL execution...');
      await page.waitForTimeout(10000);

      // Final screenshot
      await page.screenshot({ path: '/tmp/supabase-final.png', fullPage: true });
      console.log('📸 Final screenshot saved');

      console.log('✅ Process completed! Check screenshots in /tmp/');

    } else {
      console.log('❌ Could not find login form (less than 2 input fields)');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);

    // Take error screenshot
    try {
      await page.screenshot({ path: '/tmp/supabase-error.png', fullPage: true });
      console.log('📸 Error screenshot saved to /tmp/supabase-error.png');
    } catch (e) {
      // Ignore
    }

  } finally {
    await browser.close();
  }
}

runSQLInSupabase();
