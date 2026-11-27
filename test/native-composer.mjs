import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const script = await readFile(new URL('../lib/glass-client.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const cardHtml = '<div class="native-card" data-composer-card><div class="input-wrap"><div contenteditable="true" role="textbox">Draft</div></div><div class="tools"><button>Attach</button><button aria-label="Send">Send</button></div></div>';
try {
  await page.setContent(`<style>
body{margin:0;font:14px sans-serif;background:#eee}
main{height:100vh;display:flex;flex-direction:column}
.chat{flex:1;overflow:auto;padding:20px}
.composer-seat{padding:0 24px 4px;border-radius:30px;background:rgba(220,225,230,.35)}
.input-root{padding:0 24px;border-radius:28px;background:rgba(240,245,248,.5)}
.native-card{box-sizing:border-box;max-width:800px;margin:auto;padding:8px 0 0;border:0;border-radius:22px;background:rgba(255,255,255,.85)}
.input-wrap{padding:10px 12px 0}
[contenteditable]{min-height:40px}
.tools{display:flex;justify-content:space-between;padding:4px 8px 6px}
.stats{height:30px;text-align:center}
</style><main><header>Native host</header><section class="chat">Existing conversation</section><div class="composer-seat"><div class="input-root">${cardHtml}</div><div class="stats">Stats stay outside the card</div></div></main>`);
  const before = await page.locator('[data-composer-card]').boundingBox();
  await page.evaluate(() => { window[Symbol.for('dsh.liquid-glass.startup.seen')] = true; });
  await page.addScriptTag({ content: script });
  async function check(label) {
    await page.waitForTimeout(550);
    const state = await page.evaluate(() => {
      const card = document.querySelector('[data-composer-card]');
      const css = getComputedStyle(card);
      return {
        composers: [...document.querySelectorAll('[data-conversation-region="composer"]')].map(node => node === card),
        wrapperSurfaces: document.querySelectorAll('.composer-seat[data-dsh-glass-surface],.input-root[data-dsh-glass-surface]').length,
        innerSurfaces: card.querySelectorAll('[data-dsh-glass-surface]').length,
        sheens: card.querySelectorAll('.dsh-lg-sheen').length,
        wrapperSheens: document.querySelectorAll('.composer-seat > .dsh-lg-sheen,.input-root > .dsh-lg-sheen').length,
        padding: css.padding,
        radius: css.borderRadius,
        width: card.getBoundingClientRect().width,
      };
    });
    assert.deepEqual(state.composers, [true], label);
    assert.equal(state.wrapperSurfaces, 0, label);
    assert.equal(state.innerSurfaces, 0, label);
    assert.equal(state.wrapperSheens, 0, label);
    assert.ok(state.sheens <= 1, label);
    assert.equal(state.padding, '8px 0px 0px', label);
    assert.equal(state.radius, '25px', label);
    console.log('PASS', label);
    return state;
  }
  assert.equal((await check('native card styled in place, no glass on wrappers or editor children')).width, before.width);
  await page.locator('[contenteditable]').fill('Draft remains editable');
  assert.equal(await page.locator('[contenteditable]').innerText(), 'Draft remains editable');
  for (const width of [760, 390, 1536, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await check(`resize ${width}`);
  }
  await page.locator('[contenteditable]').evaluate(node => { node.style.minHeight = '340px'; window.dispatchEvent(new Event('resize')); });
  await check('tall multiline draft does not move the composer marker to an ancestor');
  await page.locator('.input-root').evaluate((node, html) => { window.oldCard = node.firstElementChild; node.innerHTML = html; }, cardHtml);
  await check('switch conversation replaces the native card without accumulating surfaces');
  assert.equal(await page.evaluate(() => oldCard.hasAttribute('data-conversation-region')), false);
  await page.locator('#dsh-liquid-glass-ui .launcher').click();
  await page.locator('#dsh-liquid-glass-ui [data-tab="conversation"]').click();
  await page.locator('#dsh-liquid-glass-ui [data-field="sessionDesign"]').uncheck();
  await page.waitForTimeout(300);
  assert.equal(await page.locator('[data-conversation-region="composer"]').count(), 0);
  await page.locator('#dsh-liquid-glass-ui [data-field="sessionDesign"]').check();
  await check('conversation skin off/on remains a single native card');
  await page.locator('#dsh-liquid-glass-ui .close').click();
  await page.addScriptTag({ content: script });
  await check('runtime replacement leaves no old wrapper markers or optical layers');
  await page.evaluate(() => window[Symbol.for('dsh.liquid-glass.runtime')].dispose());
  assert.equal(await page.locator('[data-dsh-glass-surface],[data-conversation-region="composer"],.dsh-lg-sheen').count(), 0);
  assert.equal((await page.locator('[data-composer-card]').boundingBox()).width, before.width);
  assert.deepEqual(errors, []);
  console.log('PASS disposal restores original native layout, no page errors');
} finally { await browser.close(); }
