import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fixture = await readFile(new URL('./fixture.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../lib/glass-client.js', import.meta.url), 'utf8');
const server = createServer((_, res) => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.end(fixture.replace('</body>', `<script>${script}</script></body>`));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
const errors = [];
const root = 'dsh-liquid-glass-startup';
const url = `http://127.0.0.1:${server.address().port}`;
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'zh-CN' });
async function page(options = {}) {
  const p = await context.newPage();
  p.on('pageerror', e => errors.push(e.message));
  if (options.reduced) await p.emulateMedia({ reducedMotion: 'reduce' });
  if (options.dark) await p.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => document.body.setAttribute('data-ds-dark-theme', ''), {once: true});
  });
  await p.goto(url);
  return p;
}
async function freeze(p, time) {
  await p.evaluate(({ id, time }) => {
    const host = document.getElementById(id);
    const elements = [host, ...host.shadowRoot.querySelectorAll('*')];
    for (const anim of new Set(elements.flatMap(el => el.getAnimations()))) { anim.pause(); anim.currentTime = time; }
  }, { id: root, time });
}
const assets = new URL('../assets/', import.meta.url);
await mkdir(assets, { recursive: true });
try {
  const p = await page();
  const splash = p.locator('#' + root);
  await splash.waitFor();
  const first = await splash.evaluate(node => { window.__firstSplash = node; return node.shadowRoot.querySelectorAll('.depth use').length; });
  assert.equal(first, 9);
  await p.addScriptTag({ content: script });
  assert.equal(await splash.evaluate(node => node === window.__firstSplash), true);
  assert.equal(await splash.count(), 1);
  console.log('PASS startup survives the early-row to client handoff; one layered whale');
  await freeze(p, 1350);
  await p.screenshot({ path: fileURLToPath(new URL('startup-light.png', assets)), fullPage: true });
  await splash.waitFor({ state: 'detached', timeout: 5000 });
  console.log('PASS startup hard timeout removes decoration even with paused animations');
  await p.addScriptTag({ content: script });
  assert.equal(await splash.count(), 0);
  console.log('PASS enabling / mounting the skin again does not replay startup');

  const ui = p.locator('#dsh-liquid-glass-ui');
  await ui.locator('.launcher').click();
  await ui.locator('[data-tab="boot"]').click();
  await ui.locator('.replay').click();
  await splash.waitFor();
  await p.keyboard.press('Escape');
  await splash.waitFor({ state: 'detached' });
  await ui.locator('.launcher').click();
  await ui.locator('[data-field="startup"]').uncheck();
  await p.reload();
  assert.equal(await splash.count(), 0);
  await ui.locator('.launcher').click();
  await ui.locator('[data-tab="boot"]').click();
  await ui.locator('.replay').click();
  await splash.waitFor();
  await splash.locator('.skip').click();
  assert.equal(await splash.count(), 0);
  console.log('PASS persistent startup toggle, explicit replay, Escape and Skip');

  // A fresh browser origin preference enables auto startup again for the next cases.
  await p.evaluate(() => localStorage.removeItem('dsh.liquid-glass.v1'));
  const dark = await page({dark:true});
  await dark.locator('#' + root).waitFor();
  await dark.waitForFunction(id => document.getElementById(id)?.hasAttribute('data-dark'), root);
  await freeze(dark, 1350);
  await dark.screenshot({ path: fileURLToPath(new URL('startup-dark.png', assets)), fullPage: true });
  await dark.evaluate(() => window[Symbol.for('dsh.liquid-glass.runtime')].dispose());
  assert.equal(await dark.locator('#' + root).count(), 0);
  console.log('PASS live host dark theme and scope-disposal remove the overlay');

  const reduced = await page({ reduced: true });
  assert.equal(await reduced.locator('#' + root).count(), 0);
  await reduced.locator('#dsh-liquid-glass-ui .launcher').click();
  await reduced.locator('#dsh-liquid-glass-ui [data-tab="boot"]').click();
  await reduced.locator('#dsh-liquid-glass-ui .replay').click();
  await reduced.locator('#' + root).waitFor();
  assert.equal(await reduced.locator('#' + root).getAttribute('data-reduced'), '');
  assert.equal(await reduced.locator('#' + root + ' .whale').evaluate(node => getComputedStyle(node).animationName), 'none');
  await reduced.locator('#' + root).waitFor({state:'detached',timeout:2000});
  console.log('PASS reduced motion skips autoplay; replay is a short static reveal');

  const failed = await context.newPage();
  await failed.addInitScript(() => {
    const append = Element.prototype.append;
    Element.prototype.append = function (...nodes) {
      if (nodes.some(n => n?.id === 'dsh-liquid-glass-startup')) throw new Error('simulated decoration failure');
      return append.apply(this, nodes);
    };
  });
  await failed.goto(url);
  await failed.locator('#dsh-liquid-glass-ui .launcher').click();
  assert.equal(await failed.locator('#' + root).count(), 0);
  assert.equal(await failed.locator('#dsh-liquid-glass-ui dialog').evaluate(n => n.open), true);
  console.log('PASS a startup decoration failure leaves the app and skin controls working');
  assert.deepEqual(errors, []);
  console.log('7 startup scenarios passed.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
