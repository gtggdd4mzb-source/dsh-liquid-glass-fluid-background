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
  const whalePath = '__DSH_WHALE_PATH__';
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
