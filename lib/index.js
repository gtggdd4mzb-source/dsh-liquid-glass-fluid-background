import { readFileSync } from 'node:fs';

export const name = 'liquid-glass-fluid-background';
export const ROW_ID = 'ui-theme-liquid-glass';
const MARKER = '/* dsh-liquid-glass-inline */';

/** The public index-inject protocol is shared by Desktop and the web server. */
export function apply(ctx) {
  let script;
  try {
    script = MARKER + readFileSync(new URL('./glass-client.js', import.meta.url), 'utf8');
    // Inline script text must never close its own HTML element.
    script = script.replace(/<\/script/gi, '<\\/script');
  } catch (error) {
    console.warn('[dsh-liquid-glass] Skin payload unavailable; using the host theme.', error);
    return;
  }
  // Cordis owns this listener and removes it when the plugin scope is disposed.
  ctx.on('webserver/index-inject', (rows) => {
    if (!Array.isArray(rows)) return;
    if (rows.some((row) => row?.kind === 'script' && typeof row.text === 'string' && row.text.startsWith(MARKER))) return;
    rows.push({ kind: 'script', placement: 'body', text: script });
  });
}
