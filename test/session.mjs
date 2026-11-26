import assert from 'node:assert/strict';
import { readFile, copyFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fixture = await readFile(new URL('./session-fixture.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../lib/glass-client.js', import.meta.url), 'utf8');
const server = createServer((_, response) => {
  response.setHeader('content-type', 'text/html; charset=utf-8');
  response.end(fixture.replace('</body>', `<script>window[Symbol.for('dsh.liquid-glass.startup.seen')]=true;</script><script>${script}</script></body>`));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, locale: 'zh-CN' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  const root = page.locator('[data-conversation-content]');
  await page.waitForFunction(() => document.body.hasAttribute('data-dsh-session-design') && document.querySelector('[data-conversation-region="composer"]'));
  assert.match(await page.locator('[data-conversation-header-leading]').evaluate(node => getComputedStyle(node).backdropFilter), /blur/);
  assert.equal(await page.locator('[data-conversation-region=chat]').count(), 1);
  assert.equal(await page.locator('[data-chat-flow-kind=user]').count(), 1);
  assert.equal(await page.locator('[data-conversation-region=composer]').evaluate(node => getComputedStyle(node).borderRadius), '25px');
  await page.locator('[contenteditable=true]').fill('仍然可以正常编辑草稿');
  assert.equal(await page.locator('[contenteditable=true]').innerText(), '仍然可以正常编辑草稿');
  const canvas = page.locator('#dsh-liquid-glass-ripple');
  const alpha = () => canvas.evaluate(node => {
    const pixels = node.getContext('2d').getImageData(0, 0, node.width, node.height).data;
    let count = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) count++;
    return count;
  });
  const editorBox = await page.locator('[contenteditable=true]').boundingBox();
  await page.mouse.click(editorBox.x + 20, editorBox.y + 12);
  await page.waitForTimeout(50);
  assert.equal(await alpha(), 0, 'composer interaction must not trigger a background ripple');
  const chatBox = await page.locator('[data-conversation-region=chat]').boundingBox();
  await page.mouse.click(chatBox.x + 20, chatBox.y + 50);
  await page.waitForFunction(() => {
    const node = document.querySelector('#dsh-liquid-glass-ripple');
    const data = node.getContext('2d').getImageData(0, 0, node.width, node.height).data;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 0) return true;
    return false;
  });
  assert.ok(await alpha() > 0);
  await page.screenshot({ path: fileURLToPath(new URL('../assets/session-light.png', import.meta.url)), fullPage: true });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.evaluate(() => document.body.setAttribute('data-ds-dark-theme', ''));
  await page.screenshot({ path: fileURLToPath(new URL('../assets/session-dark.png', import.meta.url)), fullPage: true });
  await page.evaluate(() => document.body.removeAttribute('data-ds-dark-theme'));
  await page.setViewportSize({ width: 390, height: 844 });
  const box = await root.boundingBox();
  assert.ok(box && box.x >= 0 && box.x + box.width <= 391);
  await page.waitForFunction(() => {
    const host=document.querySelector('#dsh-liquid-glass-ui'), button=host.shadowRoot.querySelector('.launcher').getBoundingClientRect();
    const composer=document.querySelector('[data-conversation-region=composer]').getBoundingClientRect();
    return button.bottom <= composer.top;
  }, { timeout: 2500 }).catch(() => {});
  const launcher = await page.evaluate(() => {
    const host=document.querySelector('#dsh-liquid-glass-ui'), button=host.shadowRoot.querySelector('.launcher').getBoundingClientRect();
    const composer=document.querySelector('[data-conversation-region=composer]').getBoundingClientRect();
    return {button:{top:button.top,bottom:button.bottom},composer:{top:composer.top,bottom:composer.bottom},style:host.style.bottom};
  });
  assert.ok(launcher.button.bottom <= launcher.composer.top, JSON.stringify(launcher));
  await page.screenshot({ path: fileURLToPath(new URL('../assets/session-mobile.png', import.meta.url)), fullPage: true });
  await copyFile(new URL('../assets/session-light.png', import.meta.url), new URL('../../液态玻璃会话界面预览.png', import.meta.url));
  console.log('PASS session header, custom transcript, editable composer, live ripples, and mobile bounds');
  console.log('Light and dark session previews exported.');
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
