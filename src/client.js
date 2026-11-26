/* Presentation only: no remote requests, host API calls, or application data reads. */
function createWaterSurface(canvas, backdrop) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return { sync() {}, dispose() {} };
  const controller = new AbortController();
  let width = 1, height = 1, previous = new Float32Array(1), current = new Float32Array(1);
  let pixels, frame = 0, last = 0, accumulator = 0, running = false, strength = 65, enabled = false;
  const spacing = 8, damping = 0.992, waveSpeed = 0.19;
  function resize() {
    width = Math.max(2, Math.min(220, Math.ceil(innerWidth / spacing)));
    height = Math.max(2, Math.min(140, Math.ceil(innerHeight / spacing)));
    canvas.width = width; canvas.height = height;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    previous = new Float32Array(width * height); current = new Float32Array(width * height);
    pixels = ctx.createImageData(width, height); accumulator = 0; last = 0;
  }
  function energy() {
    let sum = 0;
    for (let i = 0; i < current.length; i += 8) sum += Math.abs(current[i]);
    return sum;
  }
  function add(x, y) {
    const cx = Math.round(x / innerWidth * (width - 1)), cy = Math.round(y / innerHeight * (height - 1));
    const radius = Math.max(2, Math.min(width, height) * 0.045), reach = Math.ceil(radius * 3.2);
    const amp = 3.6 * strength / 65;
    for (let yy = Math.max(1, cy - reach); yy < Math.min(height - 1, cy + reach); yy++) {
      for (let xx = Math.max(1, cx - reach); xx < Math.min(width - 1, cx + reach); xx++) {
        const d = Math.hypot(xx - cx, yy - cy);
        if (d < reach) current[yy * width + xx] += amp * Math.exp(-d * d / (2 * radius * radius));
      }
    }
    if (!running) { running = true; last = 0; frame = requestAnimationFrame(draw); }
  }
  function color(css, fallback) {
    const m = /^#([0-9a-f]{6})$/i.exec(css.trim());
    return m ? [parseInt(m[1].slice(0,2),16), parseInt(m[1].slice(2,4),16), parseInt(m[1].slice(4),16)] : fallback;
  }
  function draw(time) {
    frame = 0;
    if (!enabled || document.hidden) { running = false; last = 0; return; }
    const dt = Math.min(50, last ? time - last : 16.667); last = time; accumulator += dt;
    const step = 16.667, coefficient = waveSpeed * waveSpeed;
    let steps = 0;
    while (accumulator >= step && steps++ < 2) {
      for (let y = 1; y < height - 1; y++) {
        const row = y * width;
        for (let x = 1; x < width - 1; x++) {
          const i = row + x;
          const lap = current[i - 1] + current[i + 1] + current[i - width] + current[i + width] - 4 * current[i];
          const value = (2 * current[i] - previous[i] + coefficient * lap) * damping;
          previous[i] = value;
        }
      }
      const swap = current; current = previous; previous = swap; accumulator -= step;
    }
    const style = getComputedStyle(document.body);
    const c1 = color(style.getPropertyValue('--dsh-lg-c1'), [105,190,193]);
    const c2 = color(style.getPropertyValue('--dsh-lg-c2'), [104,139,202]);
    const data = pixels.data;
    for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
      const i = y * width + x, dx = current[i + 1] - current[i - 1], dy = current[i + width] - current[i - width];
      const slope = Math.min(1, Math.hypot(dx, dy) * 2.8), h = current[i];
      const shine = Math.max(0, (dx * -.48 - dy * .72 + h * .09) * 32);
      const shade = Math.max(0, (-dx * .3 + dy * .45 - h * .08) * 15);
      const p = i * 4;
      data[p] = Math.max(0, Math.min(255, c1[0] * .66 + c2[0] * .34 + shine - shade));
      data[p + 1] = Math.max(0, Math.min(255, c1[1] * .66 + c2[1] * .34 + shine - shade));
      data[p + 2] = Math.max(0, Math.min(255, c1[2] * .66 + c2[2] * .34 + shine - shade));
      data[p + 3] = Math.min(228, slope * 175 + Math.min(80, Math.abs(h) * 25));
    }
    ctx.putImageData(pixels, 0, 0);
    if (energy() > 0.035) frame = requestAnimationFrame(draw);
    else { ctx.clearRect(0,0,width,height); current.fill(0); previous.fill(0); running = false; last = 0; }
  }
  function pointer(event) {
    if (!enabled || event.button !== 0 || event.isPrimary === false) return;
    const path = event.composedPath();
    if (path.some(node => node instanceof Element && (node.matches('button,a,input,textarea,select,[contenteditable=true],[role=button],[data-conversation-region="composer"],[data-dsh-glass-owned]') || node.id === 'dsh-liquid-glass-ui'))) return;
    add(event.clientX, event.clientY);
  }
  // The backdrop is pointer-transparent; listen at document for clicks on the host's empty canvas.
  document.addEventListener('pointerdown', pointer, { signal: controller.signal });
  window.addEventListener('resize', resize, { signal: controller.signal });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && running && !frame) frame = requestAnimationFrame(draw); }, { signal: controller.signal });
  resize();
  return {
    sync(config) {
      enabled = config.fluid && config.ripple;
      strength = config.rippleStrength;
      canvas.hidden = !enabled;
      if (!enabled) { cancelAnimationFrame(frame); frame = 0; running = false; current.fill(0); previous.fill(0); ctx.clearRect(0,0,width,height); }
    },
    dispose() { cancelAnimationFrame(frame); controller.abort(); ctx.clearRect(0,0,width,height); },
  };
}

function mountLiquidGlass() {
  'use strict';
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const RUNTIME = Symbol.for('dsh.liquid-glass.runtime');
  const STARTUP = Symbol.for('dsh.liquid-glass.startup');
  const STARTUP_SEEN = Symbol.for('dsh.liquid-glass.startup.seen');
  const STORAGE_KEY = 'dsh.liquid-glass.v1';
  const BODY_ATTR = 'data-dsh-liquid-glass';
  const FLUID_ATTR = 'data-dsh-glass-fluid';
  const SURFACE_ATTR = 'data-dsh-glass-surface';
  const DEFAULTS = {
    enabled:true, fluid:true, motion:true, ripple:true, sessionDesign:true, rippleStrength:65, startup:true, blur:18, saturate:150, alpha:100, preset:'isolation',
    speed:100, flow:'drift', amount:55, depth:50, colorSaturation:100, refraction:24, shine:45, interactive:true,
    customColors:['#cbb4cf', '#6582d2', '#aa3c8b', '#eef1f7'],
  };
  const FLOWS = ['drift', 'wave', 'orbit', 'aurora'];
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
    title: '液态玻璃', subtitle: '玻璃、光线与缓慢流动的色彩', glass: '玻璃表面', fluid: '流体背景', ripple:'点击水面涟漪', rippleStrength:'涟漪力度', sessionDesign:'iOS 会话界面', sessionTab:'会话',
    motion: '背景动画', preset: '背景配色', blur: '磨砂模糊', saturate: '色彩饱和度', alpha: '表面不透明度',
    startup: '鲸鱼启动动画', replay: '重播启动动画', reset: '恢复默认', close: '关闭设置', hint: '设置保存在此设备；跟随系统的低动态效果偏好。',
    presets: ['隔离', '极光', '日落', '紫雾', '海洋', '银灰'],
    background:'背景', material:'玻璃', boot:'启动', custom:'自定义', flow:'流动方式', flows:['柔和漂移','水波流动','环绕旋流','极光漫游'],
    speed:'流动速度', amount:'流动幅度', depth:'颜色深浅', colorSaturation:'色彩浓度', refraction:'边缘折射', shine:'玻璃高光', interactive:'跟随指针高光',
    palette:'四色调色盘', color:'颜色', opticalHint:'折射弯曲背景，表面文字保持清晰。低模糊更通透。',
  } : {
    title: 'Liquid Glass', subtitle: 'Glass, light and slowly drifting color', glass: 'Glass surfaces', fluid: 'Fluid background', ripple:'Interactive ripples', rippleStrength:'Ripple strength', sessionDesign:'iOS conversation', sessionTab:'Chat',
    motion: 'Background animation', preset: 'Palette', blur: 'Frost blur', saturate: 'Saturation', alpha: 'Surface opacity',
    startup: 'Whale startup animation', replay: 'Replay startup', reset: 'Reset defaults', close: 'Close settings', hint: 'Saved on this device. Respects reduced motion.',
    presets: ['Isolation', 'Aurora', 'Sunset', 'Violet', 'Ocean', 'Silver'],
    background:'Background', material:'Glass', boot:'Startup', custom:'Custom', flow:'Flow style', flows:['Soft drift','Waves','Orbit','Aurora'],
    speed:'Flow speed', amount:'Flow amplitude', depth:'Color depth', colorSaturation:'Color richness', refraction:'Edge refraction', shine:'Glass highlight', interactive:'Pointer highlights',
    palette:'Four-color palette', color:'Color', opticalHint:'Refraction bends the backdrop, keeping foreground text sharp. Lower blur gives clearer glass.',
  };
  const CSS = `
/* Host theme sheets can arrive after the boot row; its dark palette also sets
 * bg-base on body. Own this token only while the fluid backdrop is active. */
body[data-dsh-glass-fluid]{--dsw-alias-bg-base:transparent!important;isolation:isolate;background-color:var(--dsh-lg-base)!important;background-image:radial-gradient(ellipse at 12% 18%,var(--dsh-lg-c1),transparent 64%),radial-gradient(ellipse at 88% 16%,var(--dsh-lg-c2),transparent 65%),radial-gradient(ellipse at 80% 90%,var(--dsh-lg-c3),transparent 65%)!important;background-attachment:fixed!important;background-repeat:no-repeat!important}
#dsh-liquid-glass-backdrop{display:none;position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;background:var(--dsh-lg-base);filter:saturate(var(--dsh-lg-richness,100%))}
body[data-dsh-glass-fluid] #dsh-liquid-glass-backdrop{display:block}
#dsh-liquid-glass-backdrop .dsh-lg-blob{position:absolute;width:95vw;height:110vh;border-radius:50%;background:radial-gradient(ellipse,currentColor 0%,transparent 67%);opacity:.85;will-change:transform;animation:dsh-lg-drift var(--dsh-lg-duration,32s) ease-in-out infinite alternate;animation-play-state:paused}
#dsh-liquid-glass-backdrop .dsh-lg-blob:nth-child(1){left:-30%;top:-40%;color:var(--dsh-lg-c1)}
#dsh-liquid-glass-backdrop .dsh-lg-blob:nth-child(2){left:42%;top:-25%;color:var(--dsh-lg-c2);animation-delay:calc(var(--dsh-lg-duration)*-.37);animation-direction:alternate-reverse}
#dsh-liquid-glass-backdrop .dsh-lg-blob:nth-child(3){left:28%;top:38%;color:var(--dsh-lg-c3);animation-delay:calc(var(--dsh-lg-duration)*-.71)}
#dsh-liquid-glass-backdrop .dsh-lg-blob:nth-child(4){left:-35%;top:35%;color:var(--dsh-lg-c4);animation-delay:calc(var(--dsh-lg-duration)*-.53);animation-direction:alternate-reverse}
body[data-dsh-glass-motion] #dsh-liquid-glass-backdrop .dsh-lg-blob{animation-play-state:running}
#dsh-liquid-glass-backdrop[data-flow=wave] .dsh-lg-blob{animation-name:dsh-lg-wave}
#dsh-liquid-glass-backdrop[data-flow=orbit] .dsh-lg-blob{animation-name:dsh-lg-orbit;animation-timing-function:linear;animation-direction:normal}
#dsh-liquid-glass-backdrop[data-flow=aurora] .dsh-lg-blob{animation-name:dsh-lg-aurora;width:110vw;height:85vh;border-radius:40%}
@keyframes dsh-lg-drift{from{transform:translate(calc(var(--dsh-lg-travel)*-.5),calc(var(--dsh-lg-travel)*-.25)) rotate(-12deg) scale(1)}to{transform:translate(var(--dsh-lg-travel),calc(var(--dsh-lg-travel)*.45)) rotate(25deg) scale(1.12)}}
@keyframes dsh-lg-wave{0%{transform:translateX(calc(var(--dsh-lg-travel)*-1)) scale(1,.7)}50%{transform:translate(calc(var(--dsh-lg-travel)*.5),calc(var(--dsh-lg-travel)*-.25)) scale(1.2,1)}100%{transform:translate(var(--dsh-lg-travel),calc(var(--dsh-lg-travel)*.3)) scale(.9,1.2)}}
@keyframes dsh-lg-orbit{from{transform:rotate(0deg) translateX(var(--dsh-lg-travel)) rotate(0deg)}to{transform:rotate(360deg) translateX(var(--dsh-lg-travel)) rotate(-360deg)}}
@keyframes dsh-lg-aurora{from{transform:translate(calc(var(--dsh-lg-travel)*-.6),calc(var(--dsh-lg-travel)*-.2)) rotate(-32deg) scale(.8,1.4)}to{transform:translate(var(--dsh-lg-travel),calc(var(--dsh-lg-travel)*.35)) rotate(32deg) scale(1.4,.7)}}
body[data-dsh-liquid-glass] [data-dsh-glass-surface]{-webkit-backdrop-filter:blur(var(--dsh-lg-blur)) saturate(var(--dsh-lg-sat));backdrop-filter:blur(var(--dsh-lg-blur)) saturate(var(--dsh-lg-sat));box-shadow:0 8px 28px #101c3410,inset 0 1px 0 #ffffffa0,inset 0 0 0 1px #ffffff40}
body[data-ds-dark-theme][data-dsh-liquid-glass] [data-dsh-glass-surface]{box-shadow:0 8px 28px #0003,inset 0 1px 0 #ffffff28,inset 0 0 0 1px #ffffff14}
body[data-dsh-liquid-glass] [data-dsh-lg-lens]{-webkit-backdrop-filter:var(--dsh-lg-lens-filter);backdrop-filter:var(--dsh-lg-lens-filter)}
.dsh-lg-sheen{position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:var(--dsh-lg-shine,.45);background:radial-gradient(ellipse at var(--dsh-lg-light-x,25%) var(--dsh-lg-light-y,0%),#ffffff60,transparent 58%),linear-gradient(145deg,#ffffff45,transparent 28%,transparent 72%,#d5eeff35);box-shadow:inset 0 1px 0 #fffffff0,inset 1px 0 0 #ffffff60,inset -1px -1px 0 #ffffff35}
#dsh-liquid-glass-ripple{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;image-rendering:auto;opacity:.86}
body[data-dsh-session-design] [data-conversation-content]{--dsh-session-ink:#25313d;--dsh-session-muted:#788692;--dsh-session-glass:#ffffff9c;--dsh-session-line:#ffffffbd;--dsh-session-accent:#6d9da0;min-width:0;color:var(--dsh-session-ink)}
body[data-dsh-session-design][data-ds-dark-theme] [data-conversation-content]{--dsh-session-ink:#edf3f2;--dsh-session-muted:#a3b3b4;--dsh-session-glass:#1d2a2dd6;--dsh-session-line:#ffffff20;--dsh-session-accent:#9dd8d1}
body[data-dsh-session-design] [data-conversation-header-leading]{padding:7px 12px;border:1px solid var(--dsh-session-line);border-radius:16px;background:var(--dsh-session-glass);backdrop-filter:blur(18px) saturate(150%);box-shadow:0 8px 26px #17272d10}
body[data-dsh-session-design] [data-conversation-tabs]{gap:8px;padding:4px 10px;border:1px solid var(--dsh-session-line);border-radius:14px;background:var(--dsh-session-glass);backdrop-filter:blur(18px) saturate(145%)}
body[data-dsh-session-design] [data-conversation-tabs] [role=tab]{min-height:30px;margin:0;padding:6px 12px;border-radius:10px;color:var(--dsh-session-muted)}
body[data-dsh-session-design] [data-conversation-tabs] [role=tab][aria-selected=true]{color:var(--dsh-session-ink);background:#ffffff9c;box-shadow:0 2px 7px #14243214}
body[data-dsh-session-design][data-ds-dark-theme] [data-conversation-tabs] [role=tab][aria-selected=true]{background:#ffffff18}
body[data-dsh-session-design] [data-conversation-region=chat]{padding-inline:clamp(16px,4vw,64px)}
body[data-dsh-session-design] [data-conversation-region=composer]{margin-inline:auto;margin-bottom:18px;width:min(920px,calc(100% - 40px));padding:8px 14px;border:1px solid var(--dsh-session-line);border-radius:25px;background:var(--dsh-session-glass);backdrop-filter:blur(24px) saturate(155%);box-shadow:0 14px 42px #14252e18,inset 0 1px 0 #ffffffa8}
body[data-dsh-session-design] [data-conversation-region=composer] [contenteditable=true]{color:var(--dsh-session-ink)}
body[data-dsh-session-design] [data-conversation-region=composer] button[aria-label*=Send],body[data-dsh-session-design] [data-conversation-region=composer] button[aria-label*=发送]{border-radius:14px}
body[data-dsh-session-design] [data-chat-flow-kind=user]>div,body[data-dsh-session-design] [data-chat-flow-kind=steering]>div{max-width:min(78%,680px);padding:12px 16px;border:1px solid #ffffffba;border-radius:20px 20px 6px 20px;background:linear-gradient(145deg,#e7f3f1dc,#eaf0f9dd);box-shadow:0 6px 20px #27444b0c}
body[data-dsh-session-design][data-ds-dark-theme] [data-chat-flow-kind=user]>div,body[data-dsh-session-design][data-ds-dark-theme] [data-chat-flow-kind=steering]>div{border-color:#ffffff20;background:linear-gradient(145deg,#314342cc,#30384ad9)}
body[data-dsh-session-design] [data-chat-flow] [data-turn-process-member]{border-radius:14px}
body[data-dsh-session-design] [data-conversation-region=chat] a{color:var(--dsh-session-accent)}
@media(prefers-reduced-motion:reduce){body #dsh-liquid-glass-backdrop .dsh-lg-blob{animation-play-state:paused!important;will-change:auto}}
@media(prefers-reduced-transparency:reduce){body[data-dsh-liquid-glass] [data-dsh-glass-surface]{backdrop-filter:none;-webkit-backdrop-filter:none;background-color:Canvas}}
@media(forced-colors:active){body[data-dsh-glass-fluid]{background:Canvas!important;animation:none}#dsh-liquid-glass-backdrop,.dsh-lg-sheen{display:none!important}body[data-dsh-liquid-glass] [data-dsh-glass-surface]{backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none;background-color:Canvas}}
`;
  const UI_CSS = `
:host{all:initial;position:fixed;right:20px;bottom:88px;z-index:2147483000;font:13px/1.5 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;color:#222a3b;color-scheme:light}
:host([data-session-design]){bottom:180px}
*{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #4278ee;outline-offset:3px}
.launcher{display:flex;align-items:center;gap:8px;padding:9px 14px;border:1px solid #ffffffa0;border-radius:99px;color:inherit;background:#ffffffb8;backdrop-filter:blur(18px);box-shadow:0 6px 24px #14264b18;font-weight:600}
.dot{width:10px;height:10px;border-radius:50%;background:#98a2b3}.launcher[data-active] .dot{background:linear-gradient(135deg,#8edfe4,#7a84ef)}
dialog{position:fixed;inset:0;margin:auto;padding:24px;width:min(460px,calc(100vw - 32px));max-height:calc(100dvh - 40px);overflow:auto;border:1px solid #ffffffb0;border-radius:24px;color:inherit;background:#f6f8fbf5;backdrop-filter:blur(28px);box-shadow:0 24px 96px #12213c38;color-scheme:inherit}
dialog::backdrop{background:#15234230;backdrop-filter:blur(3px)}
header{display:flex;align-items:start;justify-content:space-between;gap:12px;margin-bottom:20px}h2{margin:0 0 4px;font-size:21px;letter-spacing:-.5px}p{margin:0;font-size:12px;color:#59677e}
.tabs{display:flex;gap:4px;padding:4px;background:#8194b218;border-radius:12px;margin-bottom:18px}.tabs button{flex:1;border:0;background:transparent;color:inherit;padding:7px;border-radius:9px}.tabs button[aria-selected=true]{background:#ffffffd0;box-shadow:0 2px 8px #172e4b10}.pane[hidden]{display:none}.swatches{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin:12px 0 18px}.swatch{height:36px;border-radius:10px;border:2px solid #ffffff90;background:var(--palette);cursor:pointer}.swatch[aria-pressed=true]{outline:2px solid #6d8ad9;outline-offset:2px}.palette-title{font-size:12px;font-weight:600;margin:18px 0 10px}.palette{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.color-card{display:grid;gap:6px;min-width:0}.color-card input[type=color]{padding:0;width:100%;height:36px;border:0;border-radius:9px;background:transparent;cursor:pointer}.color-card input[type=text]{width:100%;border:1px solid #8a9bb433;border-radius:7px;background:#ffffff80;color:inherit;text-align:center;font:11px/1.8 ui-monospace,monospace}.color-card span{font-size:10px;color:#70809b}.pane .hint{margin:14px 0}
.close{background:transparent;border:0;color:inherit;font-size:24px;line-height:1;padding:4px;border-radius:8px}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:40px}.range{display:grid;grid-template-columns:1fr 48px;gap:6px;margin-top:14px}.range input{grid-column:1/-1;width:100%;margin:3px 0;accent-color:#6380df}output{text-align:right;color:#59677e;font-variant-numeric:tabular-nums}input[type=checkbox]{width:18px;height:18px;accent-color:#6380df;cursor:pointer}select{max-width:55%;border:1px solid #778baa40;border-radius:9px;background:#fff9;color:inherit;padding:5px 8px}
.footer{border-top:1px solid #778baa25;margin-top:20px;padding-top:16px;display:flex;justify-content:space-between;gap:8px}.reset,.replay{border:1px solid #778baa40;border-radius:10px;background:#fff7;color:inherit;padding:7px 12px}.hint{margin-top:12px;font-size:11px}
:host([data-dark]){color:#e4eaf7;color-scheme:dark}:host([data-dark]) .launcher{background:#242b3cce;border-color:#ffffff25}:host([data-dark]) dialog{background:#202737f5;border-color:#ffffff25}:host([data-dark]) p,:host([data-dark]) output{color:#a5b1c8}:host([data-dark]) select,:host([data-dark]) .reset{background:#ffffff0d}
:host([data-dark]) .tabs button[aria-selected=true]{background:#ffffff18}:host([data-dark]) .color-card input[type=text]{background:#ffffff09}
select option{background:#f6f8fb;color:#222a3b}:host([data-dark]) select option{background:#202737;color:#e4eaf7}
@media(max-width:480px){:host{right:12px;bottom:76px}.launcher{padding:9px 11px}}
@media(prefers-reduced-transparency:reduce){.launcher,dialog{backdrop-filter:none;background:Canvas;color:CanvasText}}
@media(forced-colors:active){.launcher,dialog,.reset,select{background:Canvas;color:CanvasText;border:1px solid ButtonText;backdrop-filter:none}.dot,.launcher[data-active] .dot{background:Highlight}p,output{color:CanvasText}}
`;

  const clamp = (value, min, max, fallback) => {
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) && value !== null && value !== '' ? Math.round(Math.min(max, Math.max(min, n))) : fallback;
  };
  function readConfig(raw) {
    const cfg = { ...DEFAULTS, customColors:[...DEFAULTS.customColors] };
    try {
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return cfg;
    for (const key of ['enabled', 'fluid', 'motion', 'ripple', 'sessionDesign', 'startup', 'interactive']) if (typeof saved[key] === 'boolean') cfg[key] = saved[key];
      cfg.blur = clamp(saved.blur, 0, 40, DEFAULTS.blur);
      cfg.saturate = clamp(saved.saturate, 100, 220, DEFAULTS.saturate);
      cfg.alpha = clamp(saved.alpha, 10, 100, DEFAULTS.alpha);
      for (const [key, min, max] of [['speed',10,300],['amount',0,100],['depth',0,100],['colorSaturation',0,180],['rippleStrength',10,100],['refraction',0,50],['shine',0,100]]) cfg[key] = clamp(saved[key], min, max, DEFAULTS[key]);
      if (FLOWS.includes(saved.flow)) cfg.flow = saved.flow;
      if (Object.hasOwn(PRESETS, saved.preset) || saved.preset === 'custom') cfg.preset = saved.preset;
      if (Array.isArray(saved.customColors) && saved.customColors.length === 4) cfg.customColors = saved.customColors.map((color,i) => /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : DEFAULTS.customColors[i]);
    } catch { /* Invalid old settings fall back to defaults. */ }
    return cfg;
  }
  let raw = null;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch { /* Storage is optional. */ }
  let config = readConfig(raw);
  let disposed = false;
  let timer;
  let observer;
  let composerObserver;
  let observedComposer;
  let style;
  let ui;
  let dialog;
  let launcher;
  let shadow;
  let backdrop;
  let water;
  let optics;
  const marked = new Set();
  const sessionMarked = new Set();
  const listeners = new AbortController();

  function dispose({ handoff = false } = {}) {
    if (disposed) return;
    disposed = true;
    clearTimeout(timer);
    observer?.disconnect();
    composerObserver?.disconnect();
    optics?.dispose();
    water?.dispose();
    backdrop?.remove();
    listeners.abort();
    if (!handoff) window[STARTUP]?.finish();
    if (dialog?.open) dialog.close();
    for (const node of marked) node.removeAttribute(SURFACE_ATTR);
    for (const node of sessionMarked) for (const attr of ['data-conversation-content','data-conversation-header-leading','data-conversation-tabs','data-conversation-region','data-chat-flow-kind']) node.removeAttribute(attr);
    marked.clear();
    sessionMarked.clear();
    for (const attr of [BODY_ATTR, FLUID_ATTR, 'data-dsh-glass-motion', 'data-dsh-session-design']) document.body?.removeAttribute(attr);
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
  function selectedColors() { return config.preset === 'custom' ? config.customColors : PRESETS[config.preset]; }
  function shaded(hex, dark) {
    const amount = dark ? -(.35 + config.depth * .006) : .7 - config.depth * .014;
    const target = amount < 0 ? 0 : 255;
    return '#' + hex.slice(1).match(/../g).map(channel => {
      const n = parseInt(channel,16);
      return Math.round(n + (target - n) * Math.abs(amount)).toString(16).padStart(2,'0');
    }).join('');
  }
  function colorRules(dark) {
    const colors = selectedColors().map(color => shaded(color, dark));
    return colors.map((color,i) => `--dsh-lg-c${i+1}:${color};`).join('') + `--dsh-lg-base:${colors[3]};`;
  }
  function paint() {
    if (!document.body) return;
    document.body.toggleAttribute(BODY_ATTR, config.enabled);
    document.body.toggleAttribute(FLUID_ATTR, config.fluid);
    document.body.toggleAttribute('data-dsh-glass-motion', config.motion && config.fluid && config.amount > 0);
    document.body.toggleAttribute('data-dsh-session-design', config.sessionDesign);
    if (!config.sessionDesign) {
      for (const node of sessionMarked) for (const attr of ['data-conversation-content','data-conversation-header-leading','data-conversation-tabs','data-conversation-region','data-chat-flow-kind']) node.removeAttribute(attr);
      sessionMarked.clear();
    }
    backdrop.dataset.flow = config.flow;
    style.textContent = `body[${BODY_ATTR}]{--dsh-lg-blur:${config.blur}px;--dsh-lg-sat:${config.saturate}%;${tokens(LIGHT_TOKENS)}}
body[data-ds-dark-theme][${BODY_ATTR}]{${tokens(DARK_TOKENS)}}
body[${FLUID_ATTR}]{${colorRules(false)}--dsh-lg-duration:${3200/config.speed}s;--dsh-lg-travel:${config.amount*.4}vw;--dsh-lg-richness:${config.colorSaturation}%}
body[data-ds-dark-theme][${FLUID_ATTR}]{${colorRules(true)}}` + CSS;
    if (!config.enabled) {
      for (const node of marked) node.removeAttribute(SURFACE_ATTR);
      marked.clear();
    }
    syncUi();
    optics?.sync([...marked], config);
    water?.sync(config);
    schedule();
  }
  function syncUi() {
    if (!shadow) return;
    ui.toggleAttribute('data-dark', document.body.hasAttribute('data-ds-dark-theme'));
    ui.toggleAttribute('data-session-design', config.sessionDesign);
    window[STARTUP]?.updateTheme(document.body.hasAttribute('data-ds-dark-theme'));
    launcher.toggleAttribute('data-active', config.enabled || config.fluid);
    positionLauncher();
    for (const input of shadow.querySelectorAll('[data-field]')) {
      const key = input.dataset.field;
      if (input.type === 'checkbox') input.checked = config[key];
      else input.value = config[key];
    }
    for (const output of shadow.querySelectorAll('output')) {
      const key = output.dataset.output;
      output.value = key === 'speed' ? (config.speed/100).toFixed(2)+'×' : config[key] + (key === 'blur' || key === 'refraction' ? ' px' : '%');
    }
    const colors = selectedColors();
    for (const input of shadow.querySelectorAll('[data-color]')) if (shadow.activeElement !== input) input.value = colors[Number(input.dataset.color)];
    for (const swatch of shadow.querySelectorAll('[data-preset]')) swatch.setAttribute('aria-pressed',String(swatch.dataset.preset === config.preset));
  }
  function positionLauncher() {
    if (!ui || !launcher) return;
    const composer = config.sessionDesign ? document.querySelector('[data-conversation-region="composer"]') : null;
    if (composer !== observedComposer) {
      composerObserver?.disconnect(); composerObserver = undefined; observedComposer = composer;
      if (composer && typeof ResizeObserver !== 'undefined') {
        composerObserver = new ResizeObserver(positionLauncher);
        composerObserver.observe(composer);
      }
    }
    if (!composer) { ui.style.removeProperty('bottom'); return; }
    const button = launcher.getBoundingClientRect(), seat = composer.getBoundingClientRect();
    const overlap = button.bottom > seat.top - 8 && button.top < seat.bottom + 8 && button.right > seat.left && button.left < seat.right;
    ui.style.bottom = overlap ? `${Math.max(180, innerHeight - seat.top + button.height + 16)}px` : '';
  }
  function tagSession(node, attr, value = '') {
    if (node.getAttribute(attr) === value) return;
    node.setAttribute(attr, value);
    sessionMarked.add(node);
  }
  function discoverSession() {
    if (!config.sessionDesign) return;
    const editor = document.querySelector('[contenteditable="true"],[role="textbox"],textarea');
    if (!editor) return;
    const viewport = innerWidth * innerHeight;
    let composer;
    let scrollRegion;
    let current = editor;
    for (let depth = 0; current?.parentElement && depth < 9; depth++) {
      current = current.parentElement;
      const rect = current.getBoundingClientRect();
      if (!composer && rect.width >= Math.min(240, innerWidth * .32) && rect.height >= 64 && rect.height <= Math.min(280, innerHeight * .42)) composer = current;
      if (composer) break;
    }
    const composerRect = composer?.getBoundingClientRect();
    if (composerRect) for (const candidate of document.querySelectorAll('main,section,div')) {
      if (candidate.contains(editor) || candidate.contains(composer)) continue;
      const rect = candidate.getBoundingClientRect();
      const overflow = getComputedStyle(candidate).overflowY;
      if (rect.width < 180 || rect.height < innerHeight * .24 || rect.width * rect.height < viewport * .04 || rect.top >= composerRect.top || !/auto|scroll|overlay/.test(overflow)) continue;
      if (!candidate.innerText?.trim()) continue;
      if (!scrollRegion || rect.width * rect.height < scrollRegion.getBoundingClientRect().width * scrollRegion.getBoundingClientRect().height) scrollRegion = candidate;
    }
    if (composer) {
      tagSession(composer, 'data-conversation-region', 'composer');
      const content = composer.parentElement?.parentElement;
      if (content) tagSession(content, 'data-conversation-content');
    }
    if (scrollRegion) {
      tagSession(scrollRegion, 'data-conversation-region', 'chat');
      const section = scrollRegion.parentElement;
      const tablist = section?.querySelector('[role="tablist"]') || document.querySelector('[role="tablist"]');
      if (tablist) tagSession(tablist, 'data-conversation-tabs');
      const heading = section?.querySelector('header,[role="heading"],[class*="head"],[class*="Head"],[class*="identity"],[class*="title"]') || document.querySelector('header,[role="heading"],[class*="head"],[class*="Head"],[class*="identity"],[class*="title"]');
      if (heading) tagSession(heading, 'data-conversation-header-leading');
      const bounds = scrollRegion.getBoundingClientRect();
      for (const candidate of scrollRegion.querySelectorAll('article, [role="article"], div')) {
        const rect = candidate.getBoundingClientRect();
        const text = candidate.innerText?.trim();
        if (!text || text.length > 1200 || rect.width < 56 || rect.height < 28 || rect.width > bounds.width * .84) continue;
        if (rect.left + rect.width / 2 < bounds.left + bounds.width * .54) continue;
        const style = getComputedStyle(candidate);
        const color = /^rgba?\(([^)]+)\)$/.exec(style.backgroundColor);
        const alpha = color ? Number(color[1].split(/[\s,\/]+/)[3] ?? 1) : 0;
        if ((alpha > .02 && alpha < .995 || style.backgroundImage !== 'none') && Number.parseFloat(style.borderTopLeftRadius) >= 8) tagSession(candidate, 'data-chat-flow-kind', 'user');
      }
    }
  }
  function scan() {
    timer = undefined;
    if (!document.body || (!config.enabled && !config.sessionDesign)) return;
    if (config.sessionDesign) discoverSession();
    if (!config.enabled) return;
    discoverSession();
    for (const node of marked) if (!node.isConnected) marked.delete(node);
    // ponytail: bound one scan to 1,600 nodes / 100 surfaces; expand only if real layouts need it.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (['SCRIPT', 'STYLE', 'SVG', 'PRE', 'CODE', 'P', 'INPUT', 'TEXTAREA'].includes(node.tagName) || node === ui || node.id === 'dsh-liquid-glass-startup' || node.hasAttribute('data-dsh-glass-owned')) return NodeFilter.FILTER_REJECT;
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
    optics?.sync([...marked], config);
  }
  function schedule() {
    if (!disposed && !timer && (config.enabled || config.sessionDesign)) timer = setTimeout(guard(scan), 240);
  }
  function start() {
    style = document.createElement('style');
    style.id = 'dsh-liquid-glass-style';
    document.head.append(style);
    backdrop = document.createElement('div');
    backdrop.id = 'dsh-liquid-glass-backdrop';
    backdrop.dataset.dshGlassOwned = '';
    backdrop.setAttribute('aria-hidden','true');
    backdrop.innerHTML = '<div class="dsh-lg-blob"></div>'.repeat(4);
    const rippleCanvas = document.createElement('canvas');
    rippleCanvas.id = 'dsh-liquid-glass-ripple';
    rippleCanvas.setAttribute('aria-hidden','true');
    backdrop.append(rippleCanvas);
    document.body.prepend(backdrop);
    water = createWaterSurface(rippleCanvas, backdrop);
    try { optics = createGlassOptics(); }
    catch (error) { console.warn('[dsh-liquid-glass] Optical filter unavailable; blur remains active.', error); }
    ui = document.createElement('div');
    ui.id = 'dsh-liquid-glass-ui';
    ui.dataset.dshPlugin = 'dsh-liquid-glass-fluid-background';
    shadow = ui.attachShadow({ mode: 'open' });
    const toggle = key => `<label class="row"><span>${T[key === 'enabled' ? 'glass' : key]}</span><input data-field="${key}" type="checkbox"></label>`;
    const range = (key,min,max) => `<label class="range"><span>${T[key]}</span><output data-output="${key}"></output><input data-field="${key}" type="range" min="${min}" max="${max}" step="1" aria-label="${T[key]}"></label>`;
    shadow.innerHTML = `<style>${UI_CSS}</style>
<button class="launcher" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="glass-settings"><span class="dot" aria-hidden="true"></span>${T.title}</button>
<dialog id="glass-settings" aria-labelledby="glass-title" aria-describedby="glass-subtitle">
<header><div><h2 id="glass-title">${T.title}</h2><p id="glass-subtitle">${T.subtitle}</p></div><button class="close" type="button" aria-label="${T.close}">×</button></header>
<div class="tabs" role="tablist" aria-label="${T.title}">${['background','material','conversation','boot'].map((key,i)=>`<button type="button" role="tab" data-tab="${key}" id="tab-${key}" aria-controls="pane-${key}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${key==='conversation'?T.sessionTab:T[key]}</button>`).join('')}</div>
    <section class="pane" id="pane-background" role="tabpanel" aria-labelledby="tab-background">${toggle('fluid')}${toggle('motion')}${toggle('ripple')}${range('rippleStrength',10,100)}
<label class="row"><span>${T.preset}</span><select data-field="preset">${Object.keys(PRESETS).map((key, i) => `<option value="${key}">${T.presets[i]}</option>`).join('')}<option value="custom">${T.custom}</option></select></label>
<div class="swatches">${Object.entries(PRESETS).map(([key,colors],i)=>`<button type="button" class="swatch" data-preset="${key}" aria-label="${T.presets[i]}" title="${T.presets[i]}" aria-pressed="false" style="--palette:linear-gradient(135deg,${colors.join(',')})"></button>`).join('')}</div>
<div class="palette-title">${T.palette}</div><div class="palette">${[0,1,2,3].map(i=>`<label class="color-card"><span>${T.color} ${i+1}</span><input type="color" data-color="${i}" aria-label="${T.color} ${i+1}"><input type="text" data-color="${i}" aria-label="HEX ${i+1}" maxlength="7" spellcheck="false"></label>`).join('')}</div>
<label class="row" style="margin-top:14px"><span>${T.flow}</span><select data-field="flow">${FLOWS.map((key,i)=>`<option value="${key}">${T.flows[i]}</option>`).join('')}</select></label>
${range('speed',10,300)}${range('amount',0,100)}${range('depth',0,100)}${range('colorSaturation',0,180)}</section>
<section class="pane" id="pane-material" role="tabpanel" aria-labelledby="tab-material" hidden>${toggle('enabled')}${range('refraction',0,50)}${range('shine',0,100)}${toggle('interactive')}${range('blur',0,40)}${range('saturate',100,220)}${range('alpha',10,100)}<p class="hint">${T.opticalHint}</p></section>
<section class="pane" id="pane-conversation" role="tabpanel" aria-labelledby="tab-conversation" hidden>${toggle('sessionDesign')}<p class="hint">${zh?'独立调整标题、消息留白与输入区材质；不改变会话内容与操作。':'Restyles the session header, transcript spacing and composer while preserving host behavior.'}</p></section>
<section class="pane" id="pane-boot" role="tabpanel" aria-labelledby="tab-boot" hidden>${toggle('startup')}<button class="replay" type="button">${T.replay}</button></section>
<div class="footer"><p class="hint">${T.hint}</p><button class="reset" type="button">${T.reset}</button></div></dialog>`;
    dialog = shadow.querySelector('dialog');
    launcher = shadow.querySelector('.launcher');
    listen(launcher, 'click', () => { dialog.showModal(); launcher.setAttribute('aria-expanded', 'true'); });
    listen(shadow.querySelector('.close'), 'click', () => dialog.close());
    listen(dialog, 'close', () => { launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); });
    listen(shadow.querySelector('.reset'), 'click', () => { config = { ...DEFAULTS, customColors:[...DEFAULTS.customColors] }; save(); });
    listen(shadow.querySelector('.replay'), 'click', () => { dialog.close(); playStartup(true); });
    for (const input of shadow.querySelectorAll('[data-field]')) {
      listen(input, input.type === 'range' ? 'input' : 'change', () => {
        const key = input.dataset.field;
        config[key] = input.type === 'checkbox' ? input.checked : input.type === 'range' ? Number(input.value) : input.value;
        save();
      });
    }
    const selectTab = name => {
      for (const tab of shadow.querySelectorAll('[data-tab]')) {
        const selected = tab.dataset.tab === name;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        shadow.getElementById('pane-'+tab.dataset.tab).hidden = !selected;
      }
    };
    for (const tab of shadow.querySelectorAll('[data-tab]')) {
      listen(tab,'click',()=>selectTab(tab.dataset.tab));
      listen(tab,'keydown',event=>{
        const tabs = [...shadow.querySelectorAll('[data-tab]')];
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        event.preventDefault();
        const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (tabs.indexOf(tab)+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
        selectTab(tabs[index].dataset.tab); tabs[index].focus();
      });
    }
    for (const swatch of shadow.querySelectorAll('[data-preset]')) listen(swatch,'click',()=>{config.preset=swatch.dataset.preset;save();});
    for (const color of shadow.querySelectorAll('[data-color]')) {
      listen(color,'input',()=>{
        if (!/^#[0-9a-f]{6}$/i.test(color.value)) return;
        const colors = [...selectedColors()];
        colors[Number(color.dataset.color)] = color.value.toLowerCase();
        config.customColors = colors; config.preset = 'custom'; save();
      });
      listen(color,'change',()=>{if(!/^#[0-9a-f]{6}$/i.test(color.value)) color.value=selectedColors()[Number(color.dataset.color)];});
    }
    document.body.append(ui);
    paint();
    playStartup();
    observer = new MutationObserver(guard((records) => {
      let added = false;
      for (const record of records) {
        if (record.type === 'attributes') syncUi();
        // Ignore streamed text and our own style rewrites.
        if (record.type === 'childList' && record.target !== style && [...record.addedNodes].some((n) => n.nodeType === 1 && n !== ui && !n.closest('[data-dsh-glass-owned]'))) added = true;
      }
      if (added) { positionLauncher(); schedule(); }
    }));
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-ds-dark-theme'] });
    listen(window, 'resize', () => { positionLauncher(); schedule(); });
    listen(window, 'scroll', () => { positionLauncher(); schedule(); });
    listen(document,'pointermove',event=>optics?.move(event));
    const accessibilityMedia = matchMedia('(prefers-reduced-transparency: reduce), (forced-colors: active)');
    listen(accessibilityMedia,'change',()=>optics?.sync([...marked],config));
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
  function playStartup(replay = false) {
    if (!replay && window[STARTUP_SEEN]) return;
    window[STARTUP_SEEN] = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || window.matchMedia('(forced-colors: active)').matches;
    if (!replay && (!config.startup || reduced)) return;
    try {
      window[STARTUP]?.finish();
      window[STARTUP] = createWhaleStartup({ dark: document.body.hasAttribute('data-ds-dark-theme'), reduced });
    } catch (error) {
      // Decoration failure leaves the working application and skin intact.
      window[STARTUP]?.finish();
      document.getElementById('dsh-liquid-glass-startup')?.remove();
      console.warn('[dsh-liquid-glass] Startup animation skipped.', error);
    }
  }
  // A second boot row or a reloaded skin replaces the old instance, including observers.
  window[RUNTIME]?.dispose({ handoff: true });
  window[RUNTIME] = { dispose };
  listen(window, 'pagehide', (event) => { if (!event.persisted) dispose(); });
  if (document.readyState === 'loading') listen(document, 'DOMContentLoaded', start);
  else guard(start)();
}
