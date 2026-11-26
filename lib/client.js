
window.__ModuleLoader__.load({
  id: 'dsh-liquid-glass-fluid-background',
  factory: () => {
/** Decorative document-local startup; no host boot promises or network access. */
function createWhaleStartup({ dark = false, reduced = false } = {}) {
  const host = document.createElement('div');
  host.id = 'dsh-liquid-glass-startup';
  host.toggleAttribute('data-dark', dark);
  host.toggleAttribute('data-reduced', reduced);
  const zh = (navigator.language || '').toLowerCase().startsWith('zh');
  host.setAttribute('role', 'group');
  host.setAttribute('aria-label', zh ? '鲸鱼浮出水面启动动画' : 'Whale surfacing startup animation');
  const shadow = host.attachShadow({ mode: 'open' });
  const whalePath = 'M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z';
  const face = `<svg viewBox="0 0 50 50" aria-hidden="true"><defs>
<path id="whale" d="${whalePath}"/>
<linearGradient id="edge" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#80b8e5"/><stop offset=".5" stop-color="#2873c8"/><stop offset="1" stop-color="#164d9a"/></linearGradient>
<linearGradient id="pearl" x1=".18" y1="0" x2=".82" y2="1"><stop stop-color="#ffffff"/><stop offset=".28" stop-color="#e2faff"/><stop offset=".55" stop-color="#88d9f3"/><stop offset=".78" stop-color="#4197da"/><stop offset="1" stop-color="#c2e8ff"/></linearGradient>
<linearGradient id="rim" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="white"/><stop offset=".4" stop-color="#f0ffff" stop-opacity=".9"/><stop offset=".7" stop-color="#7ebde8" stop-opacity=".2"/><stop offset="1" stop-color="white" stop-opacity=".8"/></linearGradient>
<linearGradient id="sheen"><stop stop-color="white" stop-opacity="0"/><stop offset=".48" stop-color="white" stop-opacity=".08"/><stop offset=".6" stop-color="white" stop-opacity=".9"/><stop offset=".72" stop-color="white" stop-opacity=".1"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient>
<clipPath id="whale-clip"><use href="#whale"/></clipPath></defs>
<g class="depth">${Array.from({ length: 9 }, (_, i) => `<use href="#whale" transform="translate(${(8 - i) * .1} ${(8 - i) * .22})" fill="url(#edge)"/>`).join('')}</g>
<use href="#whale" fill="url(#pearl)" stroke="url(#rim)" stroke-width=".36" stroke-linejoin="round"/>
<g clip-path="url(#whale-clip)"><path d="M-6 7C12 20 28-1 57 13V-5H-6Z" fill="white" opacity=".28"/><rect class="sheen" x="-60" y="-10" width="75" height="70" fill="url(#sheen)" transform="rotate(-18 25 25)"/></g></svg>`;
  shadow.innerHTML = `<style>
:host{all:initial;position:fixed;inset:0;z-index:2147483500;display:grid;place-items:center;overflow:hidden;isolation:isolate;--ink:#25364f;--mist:#eff7fc;--water:#a0d5e9;--horizon:#d4e9f7;background:radial-gradient(ellipse at 50% 48%,#fff 0%,#f1f8fc 42%,#e8f0fb 100%);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;color:var(--ink);animation:lg-arrive 2800ms linear both}
:host([data-dark]){--ink:#e2edff;--mist:#101a30;--water:#193d66;--horizon:#5379a8;background:radial-gradient(ellipse at 50% 46%,#233951 0%,#101a2d 48%,#090f20 100%)}
*{box-sizing:border-box}.scene{position:relative;width:min(520px,94vw);height:440px;perspective:850px;transform:translateY(-12px);pointer-events:none}
.halo{position:absolute;left:50%;top:82px;width:360px;height:270px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(ellipse,#b9f3ff90,transparent 65%);filter:blur(28px);animation:lg-glow 2400ms ease-out both}
.surface{position:absolute;left:50%;top:222px;width:440px;max-width:94vw;height:112px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(ellipse at center,#f3ffff80 0%,var(--water) 28%,transparent 67%);filter:blur(9px);opacity:.65;animation:lg-water 2600ms ease both}
.ring{position:absolute;left:50%;top:220px;width:380px;max-width:88vw;height:100px;border-radius:50%;border:1px solid #ecfbffc0;box-shadow:0 2px 7px #71b9df25,inset 0 1px 4px #fff8;transform:translateX(-50%) scale(.22);opacity:0;animation:lg-ripple 1900ms cubic-bezier(.16,.6,.25,1) 280ms both}
.ring.r2{animation-delay:520ms;border-color:#c2e4f590}.ring.r3{animation-delay:800ms;border-color:#c2e4f550}
.reflection{position:absolute;left:50%;top:235px;width:210px;height:112px;transform:translateX(-50%) scaleY(-1);opacity:0;filter:blur(3px);mask-image:linear-gradient(to top,#0009,transparent 78%);animation:lg-reflection 2400ms ease both}.reflection svg{width:100%;height:100%;fill:#7cbfe9}
.whale{position:absolute;left:50%;top:54px;width:224px;height:224px;margin-left:-112px;transform-style:preserve-3d;transform-origin:50% 72%;filter:drop-shadow(0 22px 16px #2a6cac28);animation:lg-surface 2400ms cubic-bezier(.18,.76,.23,1) both}.whale svg{display:block;width:100%;height:100%;overflow:visible}.sheen{animation:lg-sheen 1650ms ease-in-out 450ms both}
.waterline{position:absolute;left:50%;top:269px;width:230px;height:2px;transform:translateX(-50%);border-radius:50%;background:linear-gradient(90deg,transparent,#f5ffff,#e0faff,transparent);filter:blur(.6px);animation:lg-line 2400ms ease both}
.droplet{position:absolute;left:50%;top:250px;width:5px;height:8px;border-radius:60% 60% 50% 50%;background:linear-gradient(120deg,#fff,#8bcfec);box-shadow:0 0 8px #a4e9ff70;opacity:0;animation:lg-drop 950ms cubic-bezier(.22,.61,.36,1) 500ms both}.d2{--x:-112px;--y:-43px;animation-delay:560ms;width:4px;height:6px}.d1{--x:104px;--y:-57px}.d3{--x:149px;--y:-24px;animation-delay:640ms;width:3px;height:4px}.d4{--x:-158px;--y:-15px;animation-delay:650ms;width:3px;height:4px}
.wordmark{position:absolute;top:350px;left:0;right:0;text-align:center;animation:lg-name 2200ms cubic-bezier(.2,.7,.2,1) both}.name{font-size:25px;font-weight:600;letter-spacing:-.7px;line-height:1.3}.caption{margin-top:10px;font-size:10px;letter-spacing:5px;padding-left:5px;font-weight:500;opacity:.46}
.skip{position:absolute;top:max(52px,env(safe-area-inset-top));right:28px;border:1px solid #91abc02e;border-radius:99px;padding:7px 13px;color:var(--ink);background:#ffffff20;backdrop-filter:blur(14px);font-family:inherit;font-size:11px;line-height:1.5;cursor:pointer;opacity:.65}.skip:focus-visible{outline:3px solid #5c8be3;outline-offset:3px}
@keyframes lg-arrive{0%,80%{opacity:1}100%{opacity:0}}
@keyframes lg-surface{0%{opacity:0;transform:translateY(82px) rotateX(48deg) rotateY(-22deg) scale(.78);filter:blur(12px) drop-shadow(0 2px 6px #2a6cac10)}18%{opacity:.65;filter:blur(4px) drop-shadow(0 6px 8px #2a6cac18)}48%{opacity:1;transform:translateY(-12px) rotateX(8deg) rotateY(-10deg) scale(1.035);filter:blur(0) drop-shadow(0 26px 18px #2a6cac30)}75%,100%{opacity:1;transform:translateY(-6px) rotateX(0deg) rotateY(-6deg) scale(1);filter:blur(0) drop-shadow(0 22px 16px #2a6cac28)}}
@keyframes lg-ripple{0%{opacity:0;transform:translateX(-50%) scale(.2)}18%{opacity:.9}100%{opacity:0;transform:translateX(-50%) scale(1.4)}}
@keyframes lg-water{0%{opacity:0;transform:translateX(-50%) scale(.55)}28%{opacity:.7}100%{opacity:.22;transform:translateX(-50%) scale(1.08)}}
@keyframes lg-glow{0%{opacity:0;transform:translateX(-50%) scale(.5)}45%{opacity:.8}100%{opacity:.4;transform:translateX(-50%) scale(1.15)}}
@keyframes lg-reflection{0%,12%{opacity:0}45%{opacity:.33}100%{opacity:.1}}
@keyframes lg-line{0%,12%{opacity:0;transform:translateX(-50%) scaleX(.4)}28%{opacity:.9}70%,100%{opacity:0;transform:translateX(-50%) scaleX(1.4)}}
@keyframes lg-drop{0%{opacity:0;transform:translate(0,0) scale(.5)}20%{opacity:.85}65%{opacity:.5;transform:translate(var(--x),var(--y)) scale(.75)}100%{opacity:0;transform:translate(calc(var(--x)*1.1),24px) scale(.25)}}
@keyframes lg-sheen{0%{translate:-15px 0}100%{translate:120px 0}}
@keyframes lg-name{0%,25%{opacity:0;transform:translateY(12px);filter:blur(5px)}65%,100%{opacity:1;transform:translateY(0);filter:blur(0)}}
:host([data-reduced]){animation:lg-arrive 600ms linear both}:host([data-reduced]) *{animation:none!important}.whale{will-change:transform,opacity}:host([data-reduced]) .whale{transform:translateY(-6px)}:host([data-reduced]) .ring,:host([data-reduced]) .droplet,:host([data-reduced]) .reflection,:host([data-reduced]) .waterline{display:none}
@media(max-height:530px){.scene{transform:scale(.75)}}
@media(forced-colors:active){:host{background:Canvas;color:CanvasText}.whale svg{fill:CanvasText}}
</style>
<div class="scene" aria-hidden="true"><div class="halo"></div><div class="surface"></div>
<div class="reflection"><svg viewBox="0 0 50 50"><path d="${whalePath}"/></svg></div>
<div class="ring"></div><div class="ring r2"></div><div class="ring r3"></div>
<div class="whale">${face}</div><div class="waterline"></div>
<i class="droplet d1"></i><i class="droplet d2"></i><i class="droplet d3"></i><i class="droplet d4"></i>
<div class="wordmark"><div class="name">DeepSeek</div><div class="caption">HARNESS</div></div></div>
<button type="button" class="skip">${zh ? '跳过动画' : 'Skip'}</button>`;
  let finished = false;
  const events = new AbortController();
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    events.abort();
    host.remove();
  };
  // Never tie host readiness to decoration; hard timeout also works without CSS animations.
  const timeout = setTimeout(finish, reduced ? 650 : 2950);
  host.addEventListener('click', finish, { signal: events.signal });
  window.addEventListener('keydown', (event) => {
    if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) finish();
  }, { signal: events.signal });
  host.addEventListener('animationend', (event) => {
    if (event.target === host && event.animationName === 'lg-arrive') finish();
  }, { signal: events.signal });
  try { document.body.append(host); }
  catch (error) { finish(); throw error; }
  return { finish, host, updateTheme: (value) => host.toggleAttribute('data-dark', value) };
}

/** SVG displacement applies to the backdrop only: foreground text is never filtered. */
function createGlassOptics() {
  const ns = 'http://www.w3.org/2000/svg';
  const bank = document.createElementNS(ns, 'svg');
  bank.id = 'dsh-liquid-glass-optics';
  bank.dataset.dshGlassOwned = '';
  bank.setAttribute('aria-hidden', 'true');
  bank.style.cssText = 'position:fixed;width:0;height:0;pointer-events:none;overflow:hidden';
  const defs = document.createElementNS(ns, 'defs');
  bank.append(defs);
  document.body.append(bank);
  const entries = new Map();
  let serial = 0;
  let config;
  let pointerFrame = 0;
  let pointer;
  function svg(tag, attrs) {
    const node = document.createElementNS(ns, tag);
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, String(value));
    return node;
  }
  function mapUrl(width, height, radius) {
    // A signed-distance rounded rectangle: flat center, curved edge normals.
    // A small map is stretched over the measured surface; no per-frame canvas work.
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const pixels = ctx.createImageData(size, size);
    const r = Math.max(4, Math.min(radius, width / 2, height / 2));
    const band = Math.max(6, Math.min(24, r * .85, height * .22));
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const px = (x + .5) / size * width - width / 2;
      const py = (y + .5) / size * height - height / 2;
      const qx = Math.abs(px) - (width / 2 - r);
      const qy = Math.abs(py) - (height / 2 - r);
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
      const length = Math.hypot(ox, oy);
      const distance = -(length + Math.min(Math.max(qx, qy), 0) - r);
      const curved = Math.sin(Math.max(0, Math.min(1, 1 - distance / band)) * Math.PI / 2);
      const nx = length ? ox / length * Math.sign(px) : qx > qy ? Math.sign(px) : 0;
      const ny = length ? oy / length * Math.sign(py) : qy >= qx ? Math.sign(py) : 0;
      const at = (y * size + x) * 4;
      pixels.data[at] = 128 + nx * curved * 112;
      pixels.data[at + 1] = 128 + ny * curved * 112;
      pixels.data[at + 2] = 128;
      pixels.data[at + 3] = 255;
    }
    ctx.putImageData(pixels, 0, 0);
    return canvas.toDataURL();
  }
  function restore(node, entry) {
    entry.filter.remove();
    entry.sheen.remove();
    node.removeAttribute('data-dsh-lg-lens');
    for (const [key, value, priority] of entry.previous) {
      if (value) node.style.setProperty(key, value, priority);
      else node.style.removeProperty(key);
    }
    resize?.unobserve(node);
    entries.delete(node);
  }
  function update(node, entry) {
    const box = node.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const signature = `${Math.round(box.width)}:${Math.round(box.height)}:${getComputedStyle(node).borderTopLeftRadius}`;
    if (signature !== entry.size) {
      entry.size = signature;
      const map = mapUrl(box.width, box.height, parseFloat(getComputedStyle(node).borderTopLeftRadius) || 16);
      if (map) {
        entry.image.setAttribute('href', map);
        entry.image.setAttribute('width', box.width);
        entry.image.setAttribute('height', box.height);
      }
    }
    entry.displace.setAttribute('scale', config.refraction);
    node.style.setProperty('--dsh-lg-lens-filter', `blur(${config.blur}px) url("#${entry.id}") saturate(${config.saturate}%)`);
    node.style.setProperty('--dsh-lg-shine', String(config.shine / 100));
    if (!config.interactive) {
      node.style.removeProperty('--dsh-lg-light-x');
      node.style.removeProperty('--dsh-lg-light-y');
    }
  }
  const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(records => {
    for (const {target} of records) if (entries.has(target)) update(target, entries.get(target));
  }) : null;
  function sync(nodes, next) {
    config = next;
    const eligible = next.enabled && next.refraction > 0
      && !matchMedia('(prefers-reduced-transparency: reduce), (forced-colors: active)').matches;
    // ponytail: limit costly backdrop displacement to eight visible material surfaces.
    const wanted = eligible ? nodes.map(node => ({node, box: node.getBoundingClientRect()}))
      .filter(({node, box}) => node.isConnected && box.width * box.height <= 500000
        && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth)
      .sort((a, b) => b.box.width * b.box.height - a.box.width * a.box.height)
      .slice(0, 8).map(({node}) => node) : [];
    for (const [node, entry] of entries) if (!wanted.includes(node)) restore(node, entry);
    for (const node of wanted) {
      if (!entries.has(node)) {
        const id = `dsh-lg-lens-${++serial}`;
        const filter = svg('filter', {id, x:0, y:0, width:1, height:1, 'color-interpolation-filters':'sRGB'});
        const image = svg('feImage', {result:'edge-map', preserveAspectRatio:'none', x:0, y:0});
        const displace = svg('feDisplacementMap', {in:'SourceGraphic', in2:'edge-map', xChannelSelector:'R', yChannelSelector:'G', scale:next.refraction});
        filter.append(image, displace);
        defs.append(filter);
        const previous = ['position', '--dsh-lg-lens-filter', '--dsh-lg-shine', '--dsh-lg-light-x', '--dsh-lg-light-y']
          .map(key => [key, node.style.getPropertyValue(key), node.style.getPropertyPriority(key)]);
        if (getComputedStyle(node).position === 'static') node.style.setProperty('position', 'relative');
        const sheen = document.createElement('span');
        sheen.dataset.dshGlassOwned = '';
        sheen.className = 'dsh-lg-sheen';
        sheen.setAttribute('aria-hidden', 'true');
        node.append(sheen);
        node.setAttribute('data-dsh-lg-lens', '');
        entries.set(node, {id, filter, image, displace, previous, sheen});
        resize?.observe(node);
      }
      update(node, entries.get(node));
    }
  }
  function move(event) {
    if (!config?.interactive || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    pointer = {x:event.clientX, y:event.clientY};
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      for (const node of entries.keys()) {
        const box = node.getBoundingClientRect();
        node.style.setProperty('--dsh-lg-light-x', `${Math.max(0, Math.min(100, (pointer.x - box.left) / box.width * 100))}%`);
        node.style.setProperty('--dsh-lg-light-y', `${Math.max(0, Math.min(100, (pointer.y - box.top) / box.height * 100))}%`);
      }
    });
  }
  return {
    sync, move,
    dispose() {
      cancelAnimationFrame(pointerFrame);
      resize?.disconnect();
      for (const [node, entry] of entries) restore(node, entry);
      bank.remove();
    },
  };
}

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
