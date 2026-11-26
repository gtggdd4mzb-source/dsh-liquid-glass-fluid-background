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
