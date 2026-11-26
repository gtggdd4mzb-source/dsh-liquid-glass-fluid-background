import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fixture = await readFile(new URL('./fixture.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../lib/glass-client.js', import.meta.url), 'utf8');
const client = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8');
const server = createServer((request, response) => {
  response.setHeader('content-type', 'text/html; charset=utf-8');
  response.end(fixture.replace('</body>', `<script>${script}</script></body>`));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'zh-CN' });
// Startup lifecycle/visuals are exercised separately; these checks target the skin controls.
await context.addInitScript(() => {
  try {
    const key = 'dsh.liquid-glass.v1';
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    localStorage.setItem(key, JSON.stringify({ ...current, startup: false }));
  } catch {}
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'warning' && message.text().startsWith('[dsh-liquid-glass]')) errors.push(message.text()); });
let passed = 0;
function ok(name) { passed++; console.log('PASS ' + name); }
const ui = page.locator('#dsh-liquid-glass-ui');
const field = key => Object.fromEntries(['fill','selectOption','check','uncheck','inputValue','isChecked'].map(method => [method, async (...args) => {
  const tab = ['enabled','refraction','shine','interactive','blur','saturate','alpha'].includes(key) ? 'material' : key==='startup' ? 'boot' : key==='sessionDesign' ? 'conversation' : 'background';
  await ui.locator(`[data-tab="${tab}"]`).click();
  return ui.locator(`[data-field="${key}"]`)[method](...args);
}]));
try {
  const url = `http://127.0.0.1:${server.address().port}`;
  await page.goto(url);
  await ui.waitFor();
  await page.waitForFunction(() => document.querySelector('[data-dsh-glass-surface]'));
  assert.equal(await page.locator('body').getAttribute('data-dsh-liquid-glass'), '');
  ok('boot before DOMContentLoaded and real computed-style surface discovery');

  const ripple = page.locator('#dsh-liquid-glass-ripple');
  await page.mouse.click(1060, 720);
  await page.waitForFunction(() => {
    const canvas = document.querySelector('#dsh-liquid-glass-ripple');
    const data = canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
    for (let i=3;i<data.length;i+=4) if (data[i] > 0) return true;
    return false;
  });
  const waveFrame = await ripple.evaluate(canvas => [...canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data].filter((_,i)=>i%4===3).reduce((sum,a)=>sum+a,0));
  await page.mouse.click(1060, 720);
  await page.waitForTimeout(80);
  const interferenceFrame = await ripple.evaluate(canvas => [...canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data].filter((_,i)=>i%4===3).reduce((sum,a)=>sum+a,0));
  assert.ok(interferenceFrame > 0 && waveFrame > 0);
  await ui.locator('.launcher').click();
  await field('ripple').uncheck();
  assert.equal(await ripple.evaluate(canvas => canvas.hidden), true);
  await field('ripple').check();
  assert.equal(await ripple.evaluate(canvas => canvas.hidden), false);
  ok('background clicks create a live wave field, repeated impulses coexist, and ripple control cleans up');

  await ui.locator('[data-tab="conversation"]').click();
  await field('sessionDesign').uncheck();
  assert.equal(await page.locator('body').getAttribute('data-dsh-session-design'), null);
  await field('sessionDesign').check();
  assert.equal(await page.locator('body').getAttribute('data-dsh-session-design'), '');
  const session = await page.evaluate(() => {
    const root=document.createElement('section');root.setAttribute('data-conversation-content','');
    root.innerHTML='<div data-conversation-header-leading>Studio</div><div data-conversation-tabs><button role="tab" aria-selected="true">Chat</button></div><div data-conversation-region="chat"><div data-chat-flow>Message</div></div><div data-conversation-region="composer"><div contenteditable="true">Draft</div></div>';
    document.body.append(root);
    return {header:getComputedStyle(root.querySelector('[data-conversation-header-leading]')).backdropFilter,composer:getComputedStyle(root.querySelector('[data-conversation-region=composer]')).borderRadius};
  });
  assert.match(session.header,/blur/); assert.equal(session.composer,'25px');
  await ui.locator('.close').click();
  await page.locator('[data-conversation-region="composer"] [contenteditable]').fill('Functional draft');
  assert.equal(await page.locator('[data-conversation-region="composer"] [contenteditable]').innerText(),'Functional draft');
  await page.locator('[data-conversation-content]').last().evaluate(node=>node.remove());
  await ui.locator('.launcher').click();
  await ui.locator('[data-tab="background"]').click();
  ok('dedicated iOS-inspired conversation toggle skins semantic host regions and keeps composer editable');
  await field('blur').fill('32');
  await field('preset').selectOption('aurora');
  await field('enabled').uncheck();
  assert.equal(await page.locator('body').getAttribute('data-dsh-liquid-glass'), null);
  assert.equal(await page.locator('body').getAttribute('data-dsh-glass-fluid'), '');
  assert.equal(await page.locator('[data-dsh-glass-surface]').count(), 0);
  await field('fluid').uncheck();
  assert.equal(await page.locator('body').getAttribute('data-dsh-glass-fluid'), null);
  await field('enabled').check();
  assert.equal(await page.locator('body').getAttribute('data-dsh-liquid-glass'), '');
  ok('glass and fluid work independently and disable restores surface attributes');

  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.getElementById('dsh-liquid-glass-ui').shadowRoot.querySelector('.launcher').getAttribute('aria-expanded') === 'false');
  assert.equal(await ui.locator('.launcher').getAttribute('aria-expanded'), 'false');
  assert.equal(await ui.locator('.launcher').evaluate((node) => node === node.getRootNode().activeElement), true);
  await page.reload();
  await ui.locator('.launcher').click();
  assert.equal(await field('blur').inputValue(), '32');
  assert.equal(await field('preset').inputValue(), 'aurora');
  assert.equal(await field('fluid').isChecked(), false);
  ok('Escape returns focus; settings survive reload');

  await page.evaluate(() => document.body.setAttribute('data-ds-dark-theme', ''));
  await page.waitForFunction(() => document.getElementById('dsh-liquid-glass-ui').hasAttribute('data-dark'));
  await page.addStyleTag({content:'body[data-ds-dark-theme]{--dsw-alias-bg-base:#141414}'});
  await page.evaluate(() => document.body.style.setProperty('--dsw-alias-bg-base', '#141414'));
  await field('fluid').check();
  assert.equal(await page.locator('.app').evaluate(node=>getComputedStyle(node).backgroundColor),'rgba(0, 0, 0, 0)');
  await field('fluid').uncheck();
  assert.equal(await page.locator('.app').evaluate(node=>getComputedStyle(node).backgroundColor),'rgb(20, 20, 20)');
  await field('fluid').check();
  ok('late host dark styles and inline tokens cannot hide the backdrop; disabling restores them');
  assert.match(await ui.locator('dialog').evaluate((node) => getComputedStyle(node).color), /228, 234, 247/);
  assert.equal(await ui.locator('select option').first().evaluate(node=>getComputedStyle(node).backgroundColor),'rgb(32, 39, 55)');
  await field('fluid').check();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('body').evaluate((node) => getComputedStyle(node).animationName), 'none');
  await page.emulateMedia({ forcedColors: 'active' });
  assert.equal(await page.locator('body').evaluate((node) => getComputedStyle(node).backgroundImage), 'none');
  await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'no-preference' });
  ok('host dark-theme attribute, reduced motion and forced colors');

  await page.addScriptTag({ content: script });
  assert.equal(await ui.count(), 1);
  assert.equal(await page.locator('#dsh-liquid-glass-style').count(), 1);
  await ui.locator('.launcher').click();
  assert.equal(await field('blur').inputValue(), '32');
  ok('repeat injection replaces the runtime without duplicate UI or settings loss');

  await page.evaluate((code) => {
    const effects = [];
    let module;
    window.__ModuleLoader__ = { load({factory}) { module = factory(); } };
    new Function(code)();
    window.__testLifecycle = module;
    module.apply({ effect(fn) { effects.push(fn()); } });
    window.__testDispose = effects[0];
  }, client);
  await page.evaluate(() => window.__testDispose());
  assert.equal(await ui.count(), 0);
  assert.equal(await page.locator('#dsh-liquid-glass-style').count(), 0);
  assert.equal(await page.locator('[data-dsh-glass-surface]').count(), 0);
  assert.equal(await page.locator('body').getAttribute('data-dsh-liquid-glass'), null);
  await page.evaluate(() => window.__testLifecycle.apply({ effect(fn) { window.__testDispose = fn(); } }));
  await ui.waitFor();
  ok('client plugin scope disable cleans everything; re-enable mounts again');

  await page.evaluate(() => localStorage.setItem('dsh.liquid-glass.v1', JSON.stringify({ enabled: 'yes', blur: 9999, saturate: -1, alpha: null, preset: '__proto__' })));
  await page.reload();
  await ui.locator('.launcher').click();
  assert.equal(await field('blur').inputValue(), '40');
  assert.equal(await field('saturate').inputValue(), '100');
  assert.equal(await field('alpha').inputValue(), '100');
  assert.equal(await field('preset').inputValue(), 'isolation');
  await ui.locator('.reset').click();
  assert.equal(await field('blur').inputValue(), '18');
  await page.evaluate(() => localStorage.setItem('dsh.liquid-glass.v1', '{invalid'));
  await page.reload();
  await ui.waitFor();
  ok('corrupt, out-of-range and prototype-shaped saved settings recover safely');

  await page.evaluate(() => window.dispatchEvent(new StorageEvent('storage', { key: 'dsh.liquid-glass.v1', newValue: JSON.stringify({blur: 25}) })));
  await ui.locator('.launcher').click();
  assert.equal(await field('blur').inputValue(), '25');
  await ui.locator('.reset').click();
  await page.keyboard.press('Escape');
  ok('cross-window settings events and reset');

  await mkdir(new URL('../assets/', import.meta.url), { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.screenshot({ path: fileURLToPath(new URL('../assets/preview-light.png', import.meta.url)), fullPage: true });
  await page.evaluate(() => document.body.setAttribute('data-ds-dark-theme', ''));
  await ui.locator('.launcher').click();
  await page.screenshot({ path: fileURLToPath(new URL('../assets/preview-dark.png', import.meta.url)), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  const rect = await ui.locator('dialog').boundingBox();
  assert.ok(rect.x >= 0 && rect.x + rect.width <= 391 && rect.y >= 0 && rect.height < 844);
  ok('mobile dialog remains within the viewport; light/dark previews exported');

  const privatePage = await context.newPage();
  await privatePage.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage blocked'); } });
  });
  await privatePage.goto(url);
  await privatePage.locator('#dsh-liquid-glass-ui').waitFor();
  await privatePage.locator('#dsh-liquid-glass-ui .launcher').click();
  await privatePage.locator('#dsh-liquid-glass-ui [data-tab="material"]').click();
  await privatePage.locator('#dsh-liquid-glass-ui [data-field="blur"]').fill('20');
  await privatePage.close();
  ok('blocked localStorage still allows session-only use');
  assert.deepEqual(errors, []);
  console.log(`${passed} browser scenarios passed; no uncaught errors or skin warnings.`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
