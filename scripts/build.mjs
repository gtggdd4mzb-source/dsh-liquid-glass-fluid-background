import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';

await mkdir(new URL('../lib/', import.meta.url), { recursive: true });
await copyFile(new URL('../src/index.js', import.meta.url), new URL('../lib/index.js', import.meta.url));
const logo = await readFile(new URL('../assets/whale-source.svg', import.meta.url), 'utf8');
const whalePath = /\bd="([^"]+)"/.exec(logo)?.[1];
if (!whalePath) throw new Error('Whale logo path missing');
const startup = (await readFile(new URL('../src/startup.js', import.meta.url), 'utf8')).replace('__DSH_WHALE_PATH__', whalePath);
const source = startup + '\n' + await readFile(new URL('../src/optics.js', import.meta.url), 'utf8') + '\n' + await readFile(new URL('../src/client.js', import.meta.url), 'utf8');
await writeFile(new URL('../lib/glass-client.js', import.meta.url), `(() => {\n${source}\nmountLiquidGlass();\n})();\n`);
await writeFile(new URL('../lib/client.js', import.meta.url), `
window.__ModuleLoader__.load({
  id: 'dsh-liquid-glass-fluid-background',
  factory: () => {
${source}
// The client plugin scope owns live disable/re-enable cleanup.
function apply(ctx) {
  ctx.effect(() => {
    mountLiquidGlass();
    const runtime = globalThis[Symbol.for('dsh.liquid-glass.runtime')];
    return () => runtime?.dispose();
  });
}
    return { apply, inject: [] };
  }
});
`);
