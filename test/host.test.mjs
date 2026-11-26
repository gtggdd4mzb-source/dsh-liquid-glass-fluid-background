import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { apply } from '../lib/index.js';

test('one boot row per table, no duplicate scripts, no obsolete imports', async () => {
  let event, listener;
  apply({ on(name, fn) { event = name; listener = fn; } });
  assert.equal(event, 'webserver/index-inject');
  const rows = [];
  listener(rows);
  listener(rows);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].kind, 'script');
  assert.equal(rows[0].placement, 'body');
  assert.doesNotMatch(rows[0].text, /<\/script/i);
  assert.doesNotThrow(() => new vm.Script(rows[0].text));
  assert.doesNotThrow(() => vm.runInNewContext(rows[0].text));
  assert.doesNotThrow(() => listener(undefined));
  const nextBoot = [];
  listener(nextBoot);
  assert.equal(nextBoot.length, 1);
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
  assert.deepEqual(manifest.dsh.client.inject, []);
  assert.ok(manifest.dsh.bundle.patch);
  assert.equal(manifest.private, undefined);
  const client = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8');
  assert.doesNotMatch(client, /import\s.+from\s+['"]@deepseek-ai/);
});

test('client lifecycle is safe outside the browser and disposes its scope', async () => {
  let client;
  const code = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8');
  const scope = { window: { __ModuleLoader__: { load({ factory }) { client = factory(); } } } };
  vm.runInNewContext(code, scope);
  let cleanup;
  client.apply({ effect(fn) { cleanup = fn(); } });
  assert.equal(typeof cleanup, 'function');
  assert.doesNotThrow(cleanup);
});
