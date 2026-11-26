/* Presentation only: no remote requests, host API calls, or application data reads. */
function mountLiquidGlass() {
  'use strict';
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const RUNTIME = Symbol.for('dsh.liquid-glass.runtime');
  const STORAGE_KEY = 'dsh.liquid-glass.v1';
  const BODY_ATTR = 'data-dsh-liquid-glass';
  const FLUID_ATTR = 'data-dsh-glass-fluid';
  const SURFACE_ATTR = 'data-dsh-glass-surface';
  const DEFAULTS = { enabled: true, fluid: true, motion: true, blur: 18, saturate: 150, alpha: 100, preset: 'isolation' };
  const PRESETS = {
    isolation: ['#cbb4cf', '#6582d2', '#aa3c8b', '#eef1f7'],
    aurora: ['#61d9ba', '#6887f0', '#ba98dd', '#edf6f7'],
    sunset: ['#f1bb92', '#ed9db8', '#8e9eda', '#fbf2ec'],
    violet: ['#b3a1e4', '#88bde8', '#c991c6', '#f1eef8'],
    ocean: ['#7bd0d0', '#669edb', '#a1bbdd', '#edf4f8'],
    mono: ['#b9c4d1', '#98a8ba', '#c5cdd7', '#f0f2f5'],
  };
  const LIGHT_TOKENS = [
			["--dsw-alias-bg-layer-1", [255, 255, 255, 0.22]],
			["--dsw-alias-bg-layer-2", [255, 255, 255, 0.4]],
			["--dsw-alias-bg-layer-3", [255, 255, 255, 0.46]],
			["--dsw-alias-bg-overlay", [245, 246, 247, 0.42]],
			["--dsw-alias-bg-module-platform", [245, 246, 247, 0.34]],
			["--dsw-specific-sidebar-fill", [250, 250, 250, 0.2]],
			["--dsw-specific-menu", [255, 255, 255, 0.4]],
			["--dsw-specific-selector", [245, 246, 247, 0.36]],
			["--dsw-specific-bubble", [237, 243, 254, 0.4]],
			["--dsw-specific-input-major", [255, 255, 255, 0.38]],
			["--dsw-specific-tip", [245, 246, 247, 0.38]],
			["--dsw-alias-toast-bg", [41, 41, 41, 0.56]],
			["--dsw-alias-tooltip-bg", [33, 33, 35, 0.58]],
			["--dsw-alias-button-elevated-fill", [255, 255, 255, 0.36]],
			["--dsw-alias-button-floating-fill", [255, 255, 255, 0.32]],
			["--dsw-alias-interactive-bg-hover", [255, 255, 255, 0.32]],
			["--dsw-alias-interactive-bg-active", [255, 255, 255, 0.44]],
			["--dsw-alias-interactive-bg-hover-solid", [255, 255, 255, 0.38]],
			["--dsw-alias-border-l1", [255, 255, 255, 0.45]],
			["--dsw-alias-border-l2", [255, 255, 255, 0.6]],
			["--dsw-alias-border-l3", [255, 255, 255, 0.7]],
			["--dsw-alias-border-l4", [255, 255, 255, 0.8]]
		];

		const DARK_TOKENS = [
			["--dsw-alias-bg-layer-1", [44, 44, 46, 0.24]],
			["--dsw-alias-bg-layer-2", [53, 54, 56, 0.4]],
			["--dsw-alias-bg-layer-3", [67, 69, 74, 0.44]],
			["--dsw-alias-bg-overlay", [53, 54, 56, 0.46]],
			["--dsw-alias-bg-module-platform", [35, 35, 36, 0.36]],
			["--dsw-specific-sidebar-fill", [21, 21, 23, 0.24]],
			["--dsw-specific-menu", [53, 54, 56, 0.44]],
			["--dsw-specific-selector", [44, 44, 46, 0.38]],
			["--dsw-specific-bubble", [44, 44, 46, 0.4]],
			["--dsw-specific-input-major", [44, 44, 46, 0.4]],
			["--dsw-specific-tip", [35, 35, 36, 0.38]],
			["--dsw-alias-toast-bg", [67, 69, 74, 0.56]],
			["--dsw-alias-tooltip-bg", [67, 69, 74, 0.58]],
			["--dsw-alias-button-elevated-fill", [67, 69, 74, 0.4]],
			["--dsw-alias-button-floating-fill", [53, 54, 56, 0.38]],
			["--dsw-alias-interactive-bg-hover", [255, 255, 255, 0.1]],
			["--dsw-alias-interactive-bg-active", [255, 255, 255, 0.16]],
			["--dsw-alias-interactive-bg-hover-solid", [255, 255, 255, 0.1]],
			["--dsw-alias-border-l1", [255, 255, 255, 0.1]],
			["--dsw-alias-border-l2", [255, 255, 255, 0.16]],
			["--dsw-alias-border-l3", [255, 255, 255, 0.2]],
			["--dsw-alias-border-l4", [255, 255, 255, 0.24]]
		];

  const zh = (navigator.language || document.documentElement.lang || '').toLowerCase().startsWith('zh');
  const T = zh ? {
    title: '液态玻璃', subtitle: '玻璃、光线与缓慢流动的色彩', glass: '玻璃表面', fluid: '流体背景',
    motion: '背景动画', preset: '背景配色', blur: '磨砂模糊', saturate: '色彩饱和度', alpha: '表面不透明度',
    reset: '恢复默认', close: '关闭设置', hint: '设置保存在此设备；跟随系统的低动态效果偏好。',
    presets: ['隔离', '极光', '日落', '紫雾', '海洋', '银灰'],
  } : {
    title: 'Liquid Glass', subtitle: 'Glass, light and slowly drifting color', glass: 'Glass surfaces', fluid: 'Fluid background',
    motion: 'Background animation', preset: 'Palette', blur: 'Frost blur', saturate: 'Saturation', alpha: 'Surface opacity',
    reset: 'Reset defaults', close: 'Close settings', hint: 'Saved on this device. Respects reduced motion.',
    presets: ['Isolation', 'Aurora', 'Sunset', 'Violet', 'Ocean', 'Silver'],
  };
  const CSS = `
body[data-dsh-glass-fluid]{--dsw-alias-bg-base:transparent;background-color:var(--dsh-lg-base)!important;background-image:radial-gradient(ellipse at 12% 18%,var(--dsh-lg-c1),transparent 64%),radial-gradient(ellipse at 88% 16%,var(--dsh-lg-c2),transparent 65%),radial-gradient(ellipse at 80% 90%,var(--dsh-lg-c3),transparent 65%)!important;background-size:160% 160%!important;background-attachment:fixed!important;background-repeat:no-repeat!important}
body[data-ds-dark-theme][data-dsh-glass-fluid]{background-color:#10131c!important;background-blend-mode:soft-light}
body[data-dsh-glass-fluid][data-dsh-glass-motion]{animation:dsh-lg-flow 32s ease-in-out infinite alternate}
body[data-dsh-liquid-glass] [data-dsh-glass-surface]{-webkit-backdrop-filter:blur(var(--dsh-lg-blur)) saturate(var(--dsh-lg-sat));backdrop-filter:blur(var(--dsh-lg-blur)) saturate(var(--dsh-lg-sat));box-shadow:0 8px 28px #101c3410,inset 0 1px 0 #ffffffa0,inset 0 0 0 1px #ffffff40}
body[data-ds-dark-theme][data-dsh-liquid-glass] [data-dsh-glass-surface]{box-shadow:0 8px 28px #0003,inset 0 1px 0 #ffffff28,inset 0 0 0 1px #ffffff14}
@keyframes dsh-lg-flow{from{background-position:0% 0%,100% 0%,80% 100%}to{background-position:70% 30%,40% 65%,10% 60%}}
@media(prefers-reduced-motion:reduce){body[data-dsh-glass-fluid][data-dsh-glass-motion]{animation:none}}
@media(prefers-reduced-transparency:reduce){body[data-dsh-liquid-glass] [data-dsh-glass-surface]{backdrop-filter:none;-webkit-backdrop-filter:none;background-color:Canvas}}
@media(forced-colors:active){body[data-dsh-glass-fluid]{background:Canvas!important;animation:none}body[data-dsh-liquid-glass] [data-dsh-glass-surface]{backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none;background-color:Canvas}}
`;
  const UI_CSS = `
:host{all:initial;position:fixed;right:20px;bottom:88px;z-index:2147483000;font:13px/1.5 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;color:#222a3b;color-scheme:light}
*{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #4278ee;outline-offset:3px}
.launcher{display:flex;align-items:center;gap:8px;padding:9px 14px;border:1px solid #ffffffa0;border-radius:99px;color:inherit;background:#ffffffb8;backdrop-filter:blur(18px);box-shadow:0 6px 24px #14264b18;font-weight:600}
.dot{width:10px;height:10px;border-radius:50%;background:#98a2b3}.launcher[data-active] .dot{background:linear-gradient(135deg,#8edfe4,#7a84ef)}
dialog{position:fixed;inset:0;margin:auto;padding:24px;width:min(360px,calc(100vw - 32px));max-height:calc(100dvh - 40px);overflow:auto;border:1px solid #ffffffb0;border-radius:24px;color:inherit;background:#f6f8fbeF;backdrop-filter:blur(28px);box-shadow:0 24px 96px #12213c38;color-scheme:inherit}
dialog::backdrop{background:#15234230;backdrop-filter:blur(3px)}
header{display:flex;align-items:start;justify-content:space-between;gap:12px;margin-bottom:20px}h2{margin:0 0 4px;font-size:21px;letter-spacing:-.5px}p{margin:0;font-size:12px;color:#59677e}
.close{background:transparent;border:0;color:inherit;font-size:24px;line-height:1;padding:4px;border-radius:8px}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:40px}.range{display:grid;grid-template-columns:1fr 48px;gap:6px;margin-top:14px}.range input{grid-column:1/-1;width:100%;margin:3px 0;accent-color:#6380df}output{text-align:right;color:#59677e;font-variant-numeric:tabular-nums}input[type=checkbox]{width:18px;height:18px;accent-color:#6380df;cursor:pointer}select{max-width:55%;border:1px solid #778baa40;border-radius:9px;background:#fff9;color:inherit;padding:5px 8px}
.footer{border-top:1px solid #778baa25;margin-top:20px;padding-top:16px;display:flex;justify-content:flex-end}.reset{border:1px solid #778baa40;border-radius:10px;background:#fff7;color:inherit;padding:7px 12px}.hint{margin-top:12px;font-size:11px}
:host([data-dark]){color:#e4eaf7;color-scheme:dark}:host([data-dark]) .launcher{background:#242b3cce;border-color:#ffffff25}:host([data-dark]) dialog{background:#202737f5;border-color:#ffffff25}:host([data-dark]) p,:host([data-dark]) output{color:#a5b1c8}:host([data-dark]) select,:host([data-dark]) .reset{background:#ffffff0d}
@media(max-width:480px){:host{right:12px;bottom:76px}.launcher{padding:9px 11px}}
@media(prefers-reduced-transparency:reduce){.launcher,dialog{backdrop-filter:none;background:Canvas;color:CanvasText}}
@media(forced-colors:active){.launcher,dialog,.reset,select{background:Canvas;color:CanvasText;border:1px solid ButtonText;backdrop-filter:none}.dot,.launcher[data-active] .dot{background:Highlight}p,output{color:CanvasText}}
`;

  const clamp = (value, min, max, fallback) => {
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) && value !== null && value !== '' ? Math.round(Math.min(max, Math.max(min, n))) : fallback;
  };
  function readConfig(raw) {
    const cfg = { ...DEFAULTS };
    try {
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return cfg;
      for (const key of ['enabled', 'fluid', 'motion']) if (typeof saved[key] === 'boolean') cfg[key] = saved[key];
      cfg.blur = clamp(saved.blur, 0, 40, DEFAULTS.blur);
      cfg.saturate = clamp(saved.saturate, 100, 220, DEFAULTS.saturate);
      cfg.alpha = clamp(saved.alpha, 10, 100, DEFAULTS.alpha);
      if (Object.hasOwn(PRESETS, saved.preset)) cfg.preset = saved.preset;
    } catch { /* Invalid old settings fall back to defaults. */ }
    return cfg;
  }
  let raw = null;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch { /* Storage is optional. */ }
  let config = readConfig(raw);
  let disposed = false;
  let timer;
  let observer;
  let style;
  let ui;
  let dialog;
  let launcher;
  let shadow;
  const marked = new Set();
  const listeners = new AbortController();

  function dispose() {
    if (disposed) return;
    disposed = true;
    clearTimeout(timer);
    observer?.disconnect();
    listeners.abort();
    if (dialog?.open) dialog.close();
    for (const node of marked) node.removeAttribute(SURFACE_ATTR);
    marked.clear();
    for (const attr of [BODY_ATTR, FLUID_ATTR, 'data-dsh-glass-motion']) document.body?.removeAttribute(attr);
    style?.remove();
    ui?.remove();
    if (window[RUNTIME]?.dispose === dispose) delete window[RUNTIME];
  }
  function guard(fn) {
    return (...args) => {
      if (disposed) return;
      try { return fn(...args); }
      catch (error) {
        dispose();
        console.warn('[dsh-liquid-glass] Restored the host theme after a skin error.', error);
      }
    };
  }
  function listen(target, type, fn) {
    target.addEventListener(type, guard(fn), { signal: listeners.signal });
  }
  function tokens(table) {
    return table.map(([name, rgb]) => `${name}:rgba(${rgb.slice(0, 3).join(',')},${(rgb[3] * config.alpha / 100).toFixed(3)});`).join('');
  }
  function paint() {
    if (!document.body) return;
    document.body.toggleAttribute(BODY_ATTR, config.enabled);
    document.body.toggleAttribute(FLUID_ATTR, config.fluid);
    document.body.toggleAttribute('data-dsh-glass-motion', config.motion && config.fluid);
    const colors = PRESETS[config.preset];
    style.textContent = `body[${BODY_ATTR}]{--dsh-lg-blur:${config.blur}px;--dsh-lg-sat:${config.saturate}%;${tokens(LIGHT_TOKENS)}}
body[data-ds-dark-theme][${BODY_ATTR}]{${tokens(DARK_TOKENS)}}
body[${FLUID_ATTR}]{--dsh-lg-c1:${colors[0]};--dsh-lg-c2:${colors[1]};--dsh-lg-c3:${colors[2]};--dsh-lg-base:${colors[3]}}` + CSS;
    if (!config.enabled) {
      for (const node of marked) node.removeAttribute(SURFACE_ATTR);
      marked.clear();
    }
    syncUi();
    schedule();
  }
  function syncUi() {
    if (!shadow) return;
    ui.toggleAttribute('data-dark', document.body.hasAttribute('data-ds-dark-theme'));
    launcher.toggleAttribute('data-active', config.enabled || config.fluid);
    for (const input of shadow.querySelectorAll('[data-field]')) {
      const key = input.dataset.field;
      if (input.type === 'checkbox') input.checked = config[key];
      else input.value = config[key];
    }
    for (const output of shadow.querySelectorAll('output')) output.value = config[output.dataset.output] + (output.dataset.output === 'blur' ? ' px' : '%');
  }
  function scan() {
    timer = undefined;
    if (!config.enabled || !document.body) return;
    for (const node of marked) if (!node.isConnected) marked.delete(node);
    // ponytail: bound one scan to 1,600 nodes / 100 surfaces; expand only if real layouts need it.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (['SCRIPT', 'STYLE', 'SVG', 'PRE', 'CODE', 'P', 'INPUT', 'TEXTAREA'].includes(node.tagName) || node === ui) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let node;
    let inspected = 0;
    while ((node = walker.nextNode()) && ++inspected <= 1600 && marked.size < 100) {
      if (marked.has(node)) continue;
      const rect = node.getBoundingClientRect();
      if (rect.width < 72 || rect.height < 32 || rect.width * rect.height < 4000) continue;
      const css = getComputedStyle(node);
      const color = /^rgba?\(([^)]+)\)$/.exec(css.backgroundColor);
      const alpha = color ? Number(color[1].split(/[,\s/]+/)[3] ?? 1) : 0;
      if (alpha <= .02 || alpha >= .995) continue;
      if (css.borderTopLeftRadius === '0px' && css.boxShadow === 'none') continue;
      node.setAttribute(SURFACE_ATTR, '');
      marked.add(node);
    }
  }
  function schedule() {
    if (!disposed && !timer && config.enabled) timer = setTimeout(guard(scan), 240);
  }
  function start() {
    style = document.createElement('style');
    style.id = 'dsh-liquid-glass-style';
    document.head.append(style);
    ui = document.createElement('div');
    ui.id = 'dsh-liquid-glass-ui';
    ui.dataset.dshPlugin = 'dsh-liquid-glass-fluid-background';
    shadow = ui.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<style>${UI_CSS}</style>
<button class="launcher" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="glass-settings"><span class="dot" aria-hidden="true"></span>${T.title}</button>
<dialog id="glass-settings" aria-labelledby="glass-title" aria-describedby="glass-subtitle">
<header><div><h2 id="glass-title">${T.title}</h2><p id="glass-subtitle">${T.subtitle}</p></div><button class="close" type="button" aria-label="${T.close}">×</button></header>
${['enabled', 'fluid', 'motion'].map((key) => `<label class="row"><span>${T[key === 'enabled' ? 'glass' : key]}</span><input data-field="${key}" type="checkbox"></label>`).join('')}
<label class="row"><span>${T.preset}</span><select data-field="preset">${Object.keys(PRESETS).map((key, i) => `<option value="${key}">${T.presets[i]}</option>`).join('')}</select></label>
${[['blur', 0, 40], ['saturate', 100, 220], ['alpha', 10, 100]].map(([key, min, max]) => `<label class="range"><span>${T[key]}</span><output data-output="${key}"></output><input data-field="${key}" type="range" min="${min}" max="${max}" step="1"></label>`).join('')}
<div class="footer"><button class="reset" type="button">${T.reset}</button></div><p class="hint">${T.hint}</p></dialog>`;
    dialog = shadow.querySelector('dialog');
    launcher = shadow.querySelector('.launcher');
    listen(launcher, 'click', () => { dialog.showModal(); launcher.setAttribute('aria-expanded', 'true'); });
    listen(shadow.querySelector('.close'), 'click', () => dialog.close());
    listen(dialog, 'close', () => { launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); });
    listen(shadow.querySelector('.reset'), 'click', () => { config = { ...DEFAULTS }; save(); });
    for (const input of shadow.querySelectorAll('[data-field]')) {
      listen(input, input.type === 'range' ? 'input' : 'change', () => {
        const key = input.dataset.field;
        config[key] = input.type === 'checkbox' ? input.checked : input.type === 'range' ? Number(input.value) : input.value;
        save();
      });
    }
    document.body.append(ui);
    paint();
    observer = new MutationObserver(guard((records) => {
      let added = false;
      for (const record of records) {
        if (record.type === 'attributes') syncUi();
        // Ignore streamed text and our own style rewrites.
        if (record.type === 'childList' && record.target !== style && [...record.addedNodes].some((n) => n.nodeType === 1 && n !== ui)) added = true;
      }
      if (added) schedule();
    }));
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-ds-dark-theme'] });
    listen(window, 'resize', schedule);
    listen(window, 'storage', (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      config = readConfig(event.newValue);
      paint();
    });
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch { /* Continue for this session. */ }
    paint();
  }
  // A second boot row or a reloaded skin replaces the old instance, including observers.
  window[RUNTIME]?.dispose();
  window[RUNTIME] = { dispose };
  listen(window, 'pagehide', (event) => { if (!event.persisted) dispose(); });
  if (document.readyState === 'loading') listen(document, 'DOMContentLoaded', start);
  else guard(start)();
}
