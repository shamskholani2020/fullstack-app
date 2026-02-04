const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

async function runSQLInSupabase() {
  console.log('🚀 Launching headless browser...');

  const browser = await puppeteer.launch({
    headless: false, // Show browser so we can debug
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log('🔗 Navigating to Supabase admin panel...');
    await page.goto('https://supabase.kholani.store', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for page to load
    await page.waitForTimeout(3000);
    console.log('📄 Page loaded');

    // Look for login form
    // Try different possible login field selectors
    const loginSelectors = [
      'input[type="text"]',
      'input[name="username"]',
      'input[name="email"]',
      '#email',
      '#username',
      '[placeholder*="email"]',
      '[placeholder*="username"]'
    ];

    let usernameField = null;
    for (const selector of loginSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 1000 });
        usernameField = selector;
        console.log(`✅ Found username field with selector: ${selector}`);
        break;
      } catch (e) {
        // Continue trying next selector
      }
    }

    if (!usernameField) {
      console.log('❌ Could not find login form. Taking screenshot...');
      await page.screenshot({ path: '/tmp/supabase-login-page.png' });
      console.log('📸 Screenshot saved to /tmp/supabase-login-page.png');
      await browser.close();
      return;
    }

    // Fill username
    await page.type(usernameField, 'supabase');
    console.log('✅ Username entered');

    // Find password field
    const passwordField = await page.$('input[type="password"]');
    if (!passwordField) {
      console.log('❌ Could not find password field');
      await browser.close();
      return;
    }

    await page.type('input[type="password"]', 'jmgweg9lrkcerpfme02rtjbiapqxaauz');
    console.log('✅ Password entered');

    // Find and click login button
    const loginButton = await page.$('button[type="submit"]');
    if (!loginButton) {
      console.log('❌ Could not find login button, looking for alternatives...');
      const altButton = await page.$('button');
      if (altButton) {
        await altButton.click();
      }
    } else {
      await loginButton.click();
    }

    console.log('⏳ Waiting for login to complete...');
    await page.waitForTimeout(5000);

    // Take screenshot to see what happened
    await page.screenshot({ path: '/tmp/supabase-after-login.png' });
    console.log('📸 Screenshot saved to /tmp/supabase-after-login.png');

    // Look for SQL editor
    const sqlEditorSelectors = [
      'a[href*="sql"]',
      'a[href*="editor"]',
      '[data-testid*="sql"]',
      '[title*="SQL"]',
      'text=SQL',
      'text=Editor'
    ];

    let sqlEditorLink = null;
    for (const selector of sqlEditorSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          sqlEditorLink = selector;
          console.log(`✅ Found SQL editor with selector: ${selector}`);
          await element.click();
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (!sqlEditorLink) {
      console.log('❌ Could not find SQL editor link. Taking full screenshot...');
      await page.screenshot({ path: '/tmp/supabase-dashboard.png', fullPage: true });
      console.log('📸 Full page screenshot saved to /tmp/supabase-dashboard.png');
      await browser.close();
      return;
    }

    await page.waitForTimeout(3000);
    console.log('✅ Clicked on SQL editor');

    // Look for SQL text area
    await page.waitForTimeout(3000);
    const textAreaSelectors = [
      'textarea',
      'textarea[name*="sql"]',
      '[contenteditable="true"]',
      '.CodeMirror textarea',
      '#sql-editor'
    ];

    let sqlEditor = null;
    for (const selector of textAreaSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          sqlEditor = selector;
          console.log(`✅ Found SQL editor text area: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (!sqlEditor) {
      console.log('❌ Could not find SQL editor text area. Taking screenshot...');
      await page.screenshot({ path: '/tmp/supabase-sql-editor.png', fullPage: true });
      console.log('📸 Screenshot saved to /tmp/supabase-sql-editor.png');
      await browser.close();
      return;
    }

    // Read SQL file
    const sql = fs.readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf8');

    console.log('📝 Pasting SQL into editor...');
    await page.click(sqlEditor);

    // Paste SQL
    await page.evaluate((text) => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = text;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, sql);

    await page.waitForTimeout(2000);
    console.log('✅ SQL pasted');

    // Look for run button
    const runButtonSelectors = [
      'button[type="submit"]',
      '[data-testid="run"]',
      '[title*="Run"]',
      'text=Run',
      'text=Execute',
      '.run-btn'
    ];

    let runButton = null;
    for (const selector of runButtonSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          runButton = selector;
          console.log(`✅ Found run button: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (!runButton) {
      console.log('❌ Could not find run button. Taking screenshot...');
      await page.screenshot({ path: '/tmp/supabase-sql-run.png', fullPage: true });
      console.log('📸 Screenshot saved to /tmp/supabase-sql-run.png');
      await browser.close();
      return;
    }

    await page.click(runButton);
    console.log('⏳ Running SQL...');

    await page.waitForTimeout(10000);

    // Final screenshot
    await page.screenshot({ path: '/tmp/supabase-final.png', fullPage: true });
    console.log('📸 Final screenshot saved to /tmp/supabase-final.png');

    console.log('✅ Process completed! Check screenshots for results.');

  } catch (error) {
    console.error('❌ Error:', error.message);

    // Take error screenshot
    try {
      await page.screenshot({ path: '/tmp/supabase-error.png', fullPage: true });
      console.log('📸 Error screenshot saved to /tmp/supabase-error.png');
    } catch (e) {
      // Ignore screenshot errors
    }

  } finally {
    await browser.close();
  }
}

runSQLInSupabase();
