/*
  Process map
  - weeks sit on a dashed spine; each opens like a spider web into its steps
  - the map keeps what has been opened, so it grows as you explore
  - only the current step and its path stay bright; everything else dims
    (dimmed nodes still open on click, they just don't preview on hover)
  - leaf steps slide out a panel; works open their own page
  - drag one node onto another to make your own (unsaved) connection
*/
(() => {
  const A = window.ARCHIVE;
  const SND = window.MusicBox;
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s) => document.querySelector(s);

  const svg = $('#map');
  const world = $('#world');
  const gSpine = $('#g-spine');
  const gEdges = $('#g-edges');
  const gLinks = $('#g-links');
  const gNodes = $('#g-nodes');
  const leader = $('#leader');
  const dragLine = $('#drag-line');
  const dragDot = $('#drag-dot');
  const noteEl = $('#note');
  const orbitEl = $('#orbit');
  const panel = $('#panel');
  const juxta = $('#juxta');
  const soundBtn = $('#sound');

  const IMG = 'assets/img/';
  const thumb = (p) => { const [dir, f] = p.split('/'); return `${IMG}${dir}/thumb/${f}.jpg`; };
  const full = (p) => { const [dir, f] = p.split('/'); return `${IMG}${dir}/full/${f}.jpg`; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ── index the tree ─────────────────────────────── */

  const byId = new Map();
  const root = A.root;
  (function walk(n, parent, depth, index) {
    n.parent = parent;
    n.depth = depth;
    n.index = index;
    n.children = n.children || [];
    n.week = n.kind === 'week' || n.kind === 'future' ? n : parent ? parent.week : null;
    byId.set(n.id, n);
    n.children.forEach((c, j) => walk(c, n, depth + 1, j));
  })(root, null, 0, 0);
  const weeks = root.children;
  weeks.forEach((w, i) => { w.num = String(i + 1).padStart(2, '0'); });

  const ancestors = (n) => { const out = []; for (let p = n.parent; p; p = p.parent) out.push(p); return out; };
  const dateOf = (n) => (n.week ? n.week.date : '');
  const tagOf = (n) => (n.week && n.week.tag ? `W${n.week.num} · ${n.week.tag}` : n.week ? `W${n.week.num}` : '');

  function collectImages(n, max) {
    const all = [];
    (function w(x) {
      (x.images || []).forEach((p) => all.push(p));
      (x.entries || []).forEach((e) => (e.img || []).forEach((p) => all.push(p)));
      x.children.forEach(w);
    })(n);
    if (all.length <= max) return all;
    return Array.from({ length: max }, (_, i) => all[Math.floor((i * all.length) / max)]);
  }

  /* ── measuring ──────────────────────────────────── */

  const mctx = document.createElement('canvas').getContext('2d');
  const tw = (text, font) => { mctx.font = font; return mctx.measureText(text).width; };
  const F = {
    box: '400 13px "IBM Plex Mono"',
    root: '600 14px "IBM Plex Mono"',
    title: '600 15px Inter',
    sub: '400 10.5px "IBM Plex Mono"',
    pill: '400 10px "IBM Plex Mono"',
    more: '500 10.5px "IBM Plex Mono"',
  };

  function measure(n) {
    measureShape(n);
    n.g.moreW = 14 + tw(`+${n.children.length}`, F.more) + 18;
  }

  function measureShape(n) {
    if (n.kind === 'week' || n.kind === 'future') {
      const pillText = n.kind === 'future' ? `${n.date} · upcoming` : n.date;
      const pillW = tw(pillText, F.pill) + 16;
      const subW = n.tag ? tw(n.tag, F.sub) + 8 : 0;
      const w = 38 + Math.max(tw(n.label, F.title), pillW + subW);
      n.g = { type: 'circle', w, out: w + 10, pillText, pillW };
    } else {
      const isRoot = n.kind === 'root';
      const pad = isRoot ? 14 : 12;
      const label = n.label + (n.kind === 'work' ? '  ↗' : '');
      const w = pad + 16 + 9 + tw(label, isRoot ? F.root : F.box) + pad;
      n.g = { type: 'box', w, h: isRoot ? 38 : 30, pad, label, out: w };
    }
  }

  function ext(n) {
    const more = n.children.length && !S.expanded.has(n.id) && n.kind !== 'root' ? n.g.moreW : 0;
    return n.g.type === 'circle'
      ? { x0: -26, x1: n.g.w + more, y0: -27, y1: 27 }
      : { x0: 0, x1: n.g.w + more, y0: -n.g.h / 2, y1: n.g.h / 2 };
  }

  const center = (n) => (n.g.type === 'circle' ? { x: n.p.x, y: n.p.y } : { x: n.p.x + n.g.w / 2, y: n.p.y });

  /* ── state ──────────────────────────────────────── */

  const S = {
    expanded: new Set(['root']),
    focus: 'root',
    cam: { x: 0, y: 0, k: 1 },
    camT: null,
    links: [],
    panelNode: null,
    noteNo: 0,
    noteFor: null,
  };
  let visible = [];

  /* ── building SVG for a node ────────────────────── */

  const ICON = {
    root: 'M0.6 0.6h14.8v3.8H0.6z M1.8 4.4v7.8h12.4V4.4 M6 7.2h4',
    folder: 'M0.6 1.2h5.2l1.6 1.8h7.9v9.2H0.6z',
    doc: 'M0.6 0.6h8.6l5.2 5.2v6.6H0.6z M9.2 0.6v5.2h5.2',
    work: 'M0.6 0.6h14.8v11.8H0.6z M4.4 9.4l6.6-6.2 M6.4 3.2h4.6v4.6',
  };

  function build(n) {
    measure(n);
    const g = el('g', { class: `node ${n.kind}`, 'data-id': n.id }, gNodes);
    n.el = g;
    const e = ext(n);
    n.hit = el('rect', { class: 'hit', x: e.x0 - 4, y: e.y0 - 4, width: e.x1 - e.x0 + 8, height: e.y1 - e.y0 + 8 }, g);

    if (n.g.type === 'circle') {
      el('circle', { class: 'ring', r: 24 }, g);
      if (n.kind === 'week') el('circle', { class: 'disc', r: 18.5 }, g);
      el('text', { class: 'num', x: 0, y: 0.5 }, g).textContent = n.num;
      el('text', { class: 'title', x: 38, y: -8 }, g).textContent = n.label;
      el('rect', { class: 'pill-r', x: 38.5, y: 4.5, width: n.g.pillW, height: 17, rx: 8.5 }, g);
      el('text', { class: 'pill-t', x: 46.5, y: 13.5 }, g).textContent = n.g.pillText;
      if (n.tag) el('text', { class: 'sub', x: 38 + n.g.pillW + 8, y: 13.5 }, g).textContent = n.tag;
    } else {
      const { w, h, pad } = n.g;
      el('rect', { class: 'box', x: 0, y: -h / 2, width: w, height: h }, g);
      if (n.kind === 'work') el('rect', { class: 'box box-in', x: 3, y: -h / 2 + 3, width: w - 6, height: h - 6 }, g);
      const icon = n.kind === 'root' ? ICON.root : n.kind === 'work' ? ICON.work : n.children.length || (n.images && n.images.length) || (n.entries && n.entries.length) ? ICON.folder : ICON.doc;
      el('path', { class: 'icon', d: icon, transform: `translate(${pad},-6.5)` }, g);
      el('text', { x: pad + 25, y: 0.5 }, g).textContent = n.g.label;
    }

    if (n.children.length && n.kind !== 'root') {
      const mg = el('g', { class: 'more-g' }, g);
      const mx = n.g.w + 14;
      el('line', { class: 'more-l', x1: n.g.w + 2, y1: 0, x2: mx, y2: 0 }, mg);
      el('rect', { class: 'more', x: mx, y: -9, width: n.g.moreW - 14, height: 18, rx: 9 }, mg);
      el('text', { class: 'more-t', x: mx + (n.g.moreW - 14) / 2, y: 0.5, 'text-anchor': 'middle' }, mg).textContent = `+${n.children.length}`;
      n.moreEl = mg;
    }

    g.style.opacity = '0';
    requestAnimationFrame(() => { g.style.opacity = ''; });
    g.addEventListener('pointerenter', (e) => { if (!drag && e.pointerType !== 'touch') hoverStart(n); });
    g.addEventListener('pointerleave', () => hoverEnd(n));
  }

  function refreshHit(n) {
    const e = ext(n);
    n.hit.setAttribute('width', e.x1 - e.x0 + 8);
    if (n.moreEl) n.moreEl.style.display = S.expanded.has(n.id) ? 'none' : '';
  }

  /* ── layout ─────────────────────────────────────── */

  // every branch diagonal runs at this one angle (1 = 45°)
  const SLOPE = 1;

  // a branch: leave at 45° until level with the child, then run straight in
  function clade(x1, y1, x2, y2) {
    const dx = Math.abs(y2 - y1) * SLOPE;
    if (dx < 0.5 || x2 - x1 < dx) return `M${x1},${y1}L${x2},${y2}`;
    return `M${x1},${y1}L${x1 + dx},${y2}H${x2}`;
  }

  // vertical room a branch needs (islands are placed on their own)
  function span(n) {
    const own = n.g.type === 'circle' ? 54 : n.g.h;
    if (!S.expanded.has(n.id)) return own;
    const kids = n.children.filter((c) => !c.island);
    const gap = n.depth <= 1 ? 16 : 10;
    const sum = kids.reduce((s, c) => s + span(c), 0) + gap * Math.max(0, kids.length - 1);
    return Math.max(own, sum);
  }

  // Each child gets its own vertical slot, so branches never overlap.
  // Siblings line up in one column, like the labels of a cladogram.
  function place(n, x, y, local, islands) {
    local.set(n.id, { x, y });
    if (!S.expanded.has(n.id)) return;
    const kids = n.children.filter((c) => !c.island);
    const gap = n.depth <= 1 ? 16 : 10;
    const total = kids.reduce((s, c) => s + span(c), 0) + gap * Math.max(0, kids.length - 1);
    const ox = x + n.g.out;
    let top = y - total / 2;
    const slots = kids.map((c) => { const h = span(c); const cy = top + h / 2; top += h + gap; return cy; });
    // the column sits far enough right for every 45° branch to reach its row
    const run = Math.max(0, ...slots.map((cy) => Math.abs(cy - y)));
    const col = ox + 36 + run * SLOPE;
    kids.forEach((c, i) => place(c, col, slots[i], local, islands));
    n.children.filter((c) => c.island).forEach((c) => islands.push({ c, from: n }));
  }

  // a week and everything opened under it, in local coordinates
  function layoutWeek(wk) {
    const local = new Map();
    const islands = [];
    place(wk, 0, 0, local, islands);
    // islands grow apart from the rest, joined by a long dotted line
    while (islands.length) {
      const { c, from } = islands.shift();
      let maxX = -Infinity;
      for (const [id, p] of local) maxX = Math.max(maxX, p.x + ext(byId.get(id)).x1);
      place(c, maxX + 140, local.get(from.id).y - 24, local, islands);
    }
    return local;
  }

  function layout() {
    visible = [];
    (function w(n) {
      if (!n.el) build(n);
      visible.push(n);
      if (S.expanded.has(n.id)) n.children.forEach(w);
    })(root);
    visible.forEach(refreshHit);

    root.t = { x: -44, y: 0 };
    let cursor = 58;
    weeks.forEach((wk, i) => {
      const local = layoutWeek(wk);
      let y0 = Infinity; let y1 = -Infinity;
      for (const [id, p] of local) { const e = ext(byId.get(id)); y0 = Math.min(y0, p.y + e.y0); y1 = Math.max(y1, p.y + e.y1); }
      const wx = 30 + i * 46;
      const wy = cursor - y0;
      for (const [id, p] of local) byId.get(id).t = { x: p.x + wx, y: p.y + wy };
      cursor = wy + y1 + 32;
    });

    for (const n of visible) {
      if (!n.p) {
        const from = n.parent && n.parent.p ? { x: n.parent.p.x + n.parent.g.out, y: n.parent.p.y } : n.t;
        n.p = { ...from };
      }
    }
  }

  /* ── edges ──────────────────────────────────────── */

  const edgeEls = new Map();
  const spineEls = [];

  function edgeFor(n) {
    let e = edgeEls.get(n.id);
    if (!e) {
      const g = el('g', { class: `edge${n.island ? ' island' : ''}` }, gEdges);
      e = { g, path: el('path', {}, g), a: el('circle', { r: 2.4 }, g), b: el('circle', { r: 2.4 }, g) };
      edgeEls.set(n.id, e);
    }
    return e;
  }

  function spineAt(i) {
    if (!spineEls[i]) {
      const g = el('g', { class: 'spine' }, gSpine);
      spineEls[i] = { g, path: el('path', {}, g), head: el('path', { class: 'head' }, g) };
    }
    return spineEls[i];
  }

  function drawEdges(active) {
    for (const n of visible) {
      if (!n.parent || n.parent === root) continue;
      const e = edgeFor(n);
      const x1 = n.parent.p.x + n.parent.g.out; const y1 = n.parent.p.y;
      const x2 = n.p.x; const y2 = n.p.y;
      e.path.setAttribute('d', clade(x1, y1, x2, y2));
      e.a.setAttribute('cx', x1); e.a.setAttribute('cy', y1);
      e.b.setAttribute('cx', x2); e.b.setAttribute('cy', y2);
      e.g.classList.toggle('dim', !(active.has(n.id) && active.has(n.parent.id)));
    }

    // root → first week: elbow, like a file tree
    const s0 = spineAt(0);
    const w1 = weeks[0];
    s0.path.setAttribute('d', `M${root.p.x + 16},${root.p.y + 19}V${w1.p.y}H${w1.p.x - 26}`);
    s0.head.setAttribute('d', arrow(w1.p.x - 26, w1.p.y, 1, 0));
    s0.g.classList.toggle('dim', !(active.has('root') && active.has(w1.id)));

    // week → week: the same right-angle elbow as root → week 1
    for (let i = 0; i < weeks.length - 1; i++) {
      const a = weeks[i]; const b = weeks[i + 1];
      const s = spineAt(i + 1);
      s.path.setAttribute('d', `M${a.p.x},${a.p.y + 26}V${b.p.y}H${b.p.x - 26}`);
      s.head.setAttribute('d', arrow(b.p.x - 26, b.p.y, 1, 0));
      s.g.classList.toggle('future', b.kind === 'future');
      s.g.classList.toggle('dim', !(active.has(a.id) && active.has(b.id)));
    }
  }

  function arrow(x, y, ux, uy) {
    const s = 6; const px = -uy; const py = ux;
    return `M${x},${y}L${x - ux * s + px * s * 0.55},${y - uy * s + py * s * 0.55}L${x - ux * s - px * s * 0.55},${y - uy * s - py * s * 0.55}Z`;
  }

  /* ── user links ─────────────────────────────────── */

  function drawLinks() {
    for (const L of S.links) {
      if (!L.g) {
        L.g = el('g', { class: 'ulink' }, gLinks);
        L.path = el('path', {}, L.g);
        L.da = el('circle', { r: 3 }, L.g);
        L.db = el('circle', { r: 3 }, L.g);
        L.lab = el('g', { class: 'ul-label' }, L.g);
        el('rect', { x: -22, y: -9, width: 44, height: 18, rx: 9 }, L.lab);
        el('text', { x: 0, y: 0 }, L.lab).textContent = `↔ ${String(L.n).padStart(2, '0')}`;
        L.lab.addEventListener('click', (e) => { e.stopPropagation(); openJuxta(L); });
      }
      const a = center(L.a); const b = center(L.b);
      const mx = (a.x + b.x) / 2; const my = (a.y + b.y) / 2;
      const dx = b.x - a.x; const dy = b.y - a.y; const d = Math.hypot(dx, dy) || 1;
      const bend = Math.min(90, d * 0.22);
      const cx = mx - (dy / d) * bend; const cy = my + (dx / d) * bend;
      L.path.setAttribute('d', `M${a.x},${a.y}Q${cx},${cy} ${b.x},${b.y}`);
      L.da.setAttribute('cx', a.x); L.da.setAttribute('cy', a.y);
      L.db.setAttribute('cx', b.x); L.db.setAttribute('cy', b.y);
      L.lab.setAttribute('transform', `translate(${(mx + cx) / 2},${(my + cy) / 2})`);
    }
  }

  /* ── focus / dimming ────────────────────────────── */

  function activeSet() {
    const f = byId.get(S.focus);
    const act = new Set([f.id, ...ancestors(f).map((a) => a.id)]);
    if (S.expanded.has(f.id)) f.children.forEach((c) => act.add(c.id));
    return act;
  }

  let active = new Set();
  function updateClasses() {
    active = activeSet();
    for (const n of visible) {
      n.el.classList.toggle('dim', !active.has(n.id));
      n.el.classList.toggle('focus', n.id === S.focus);
    }
  }

  /* ── camera ─────────────────────────────────────── */

  const toScreen = (x, y) => ({ x: S.cam.x + x * S.cam.k, y: S.cam.y + y * S.cam.k });
  const toWorld = (x, y) => ({ x: (x - S.cam.x) / S.cam.k, y: (y - S.cam.y) / S.cam.k });

  function viewport() {
    const W = innerWidth; const H = innerHeight; const mobile = W < 640; const narrow = W < 1000;
    const v = { l: mobile ? 16 : 56, t: mobile ? 84 : 96, r: W - (mobile ? 16 : 56), b: H - (mobile ? 130 : 64) };
    if (S.panelNode && panel.classList.contains('open')) {
      const pw = panel.getBoundingClientRect().width;
      if (pw >= W - 40) return v; // panel covers everything on phones
      if (panel.classList.contains('right')) v.r = W - pw - 32; else v.l = pw + 32;
    } else if (noteEl.classList.contains('show')) {
      if (narrow) v.b = H - noteEl.getBoundingClientRect().height - 80;
      else v.r = W - 250 - 70;
    }
    return v;
  }

  function fitTo(nodes, instant, minK = 0.32) {
    let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
    for (const n of nodes) {
      const e = ext(n);
      x0 = Math.min(x0, n.t.x + e.x0); x1 = Math.max(x1, n.t.x + e.x1);
      y0 = Math.min(y0, n.t.y + e.y0); y1 = Math.max(y1, n.t.y + e.y1);
    }
    const v = viewport();
    const k = clamp(Math.min((v.r - v.l) / (x1 - x0 || 1), (v.b - v.t) / (y1 - y0 || 1)), minK, 1.05);
    const cam = {
      k,
      x: (v.l + v.r) / 2 - ((x0 + x1) / 2) * k,
      // centred; if taller than the view, align to the top instead
      y: (v.t + v.b) / 2 - ((y0 + y1) / 2) * k + Math.max(0, ((y1 - y0) * k - (v.b - v.t)) / 2),
    };
    if (instant) { S.cam = cam; S.camT = null; } else S.camT = cam;
  }

  function frameFocus(instant) {
    const f = byId.get(S.focus);
    let set;
    if (f === root) set = [root, ...weeks];
    else {
      set = [f];
      if (f.parent && f.parent !== root && !f.island) set.push(f.parent);
      if (S.expanded.has(f.id)) set.push(...f.children);
    }
    fitTo(set, instant, f === root ? 0.32 : innerWidth < 640 ? 0.42 : 0.62);
  }

  /* ── animation loop ─────────────────────────────── */

  let raf = null;
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  function frame() {
    raf = null;
    let moving = false;
    for (const n of visible) {
      const dx = n.t.x - n.p.x; const dy = n.t.y - n.p.y;
      if (Math.abs(dx) + Math.abs(dy) > 0.3) { n.p.x += dx * 0.17; n.p.y += dy * 0.17; moving = true; } else { n.p.x = n.t.x; n.p.y = n.t.y; }
      n.el.setAttribute('transform', `translate(${n.p.x.toFixed(2)},${n.p.y.toFixed(2)})`);
    }
    if (S.camT) {
      const c = S.cam; const t = S.camT;
      const d = Math.abs(t.x - c.x) + Math.abs(t.y - c.y) + Math.abs(t.k - c.k) * 400;
      if (d > 0.3) { c.x += (t.x - c.x) * 0.12; c.y += (t.y - c.y) * 0.12; c.k += (t.k - c.k) * 0.12; moving = true; } else { S.cam = { ...t }; S.camT = null; }
    }
    world.setAttribute('transform', `translate(${S.cam.x.toFixed(2)},${S.cam.y.toFixed(2)}) scale(${S.cam.k.toFixed(4)})`);
    drawEdges(active);
    drawLinks();
    drawLeader();
    placeOrbit();
    if (moving) kick();
  }

  /* ── click → grow / open ────────────────────────── */

  function setHash(n) {
    const url = n === root ? location.pathname + location.search : `#${n.id}`;
    try { history.replaceState(null, '', url); } catch (e) { /* file:// */ }
  }

  function focus(n, opts = {}) {
    S.focus = n.id;
    layout();
    updateClasses();
    if (n.children.length || n === root) showNote(n); else hideNote();
    frameFocus(opts.instant);
    setHash(n);
    kick();
  }

  function activate(n) {
    hoverEnd(n, true);
    if (n.kind === 'future') { SND.low(); return; }
    SND.node(n);
    if (n.kind === 'work') {
      n.el.classList.add('focus');
      setTimeout(() => { location.href = n.href; }, 280);
      return;
    }
    if (n === root) { closePanel(false); focus(root); return; }
    if (n.children.length) {
      const fresh = !S.expanded.has(n.id);
      S.expanded.add(n.id);
      closePanel(false);
      focus(n);
      if (fresh) SND.arpeggio(n.children);
    } else {
      focus(n);
      openPanel(n);
    }
  }

  function stepUp() {
    if (S.panelNode) { closePanel(true); return; }
    const f = byId.get(S.focus);
    if (f.parent) { SND.low(); focus(f.parent); }
  }

  /* ── side note (footnote) ───────────────────────── */

  function showNote(n) {
    const text = n === root ? A.root.text : n.text;
    if (!text && !n.date) { hideNote(); return; }
    S.noteNo += 1;
    S.noteFor = n;
    const meta = n === root
      ? `<span class="pill">updated ${esc(A.meta.updated)}</span><span class="pill">${weeks.filter((w) => w.kind === 'week').length} weeks</span>`
      : `<span class="pill">${esc(dateOf(n))}</span><span class="pill">${esc(tagOf(n))}</span>`;
    noteEl.innerHTML = `
      <div class="n-meta">${meta}</div>
      ${text ? `<p><sup>${S.noteNo}</sup>${esc(text)}</p>` : ''}
      ${n === root ? '<p style="color:var(--mute)">Start with a week.</p>' : ''}`;
    noteEl.classList.add('show');
  }

  function hideNote() { noteEl.classList.remove('show'); S.noteFor = null; }

  function drawLeader() {
    const n = S.noteFor;
    if (!n || !noteEl.classList.contains('show') || innerWidth < 1000) { leader.setAttribute('d', ''); return; }
    const r = noteEl.getBoundingClientRect();
    const endX = n.g.type === 'circle' ? n.p.x + n.g.w + 6 : n.p.x + n.g.w;
    const p = toScreen(endX, n.p.y);
    const sx = r.left - 8; const sy = r.top + 10;
    leader.setAttribute('d', `M${sx},${sy}H${Math.max(p.x + 20, sx - 40)}L${p.x + 4},${p.y}`);
  }

  /* ── panel ──────────────────────────────────────── */

  function openPanel(n) {
    hideNote();
    const sp = toScreen(center(n).x, center(n).y);
    const side = sp.x > innerWidth * 0.55 ? 'left' : 'right';
    const crumbs = ancestors(n).reverse().filter((a) => a !== root);
    const imgs = n.images || [];

    let html = `
      <div class="p-top">
        <div class="p-crumb">${crumbs.map((c) => `<button type="button" data-go="${c.id}">${esc(c.week === c ? 'W' + c.num : c.label)}</button>`).join(' / ') || 'Living Archive'}</div>
        <button class="p-close" type="button">× CLOSE</button>
      </div>
      <h2>${esc(n.title || n.label)}</h2>
      <div class="p-meta">${dateOf(n) ? `<span class="pill">${esc(dateOf(n))}</span>` : ''}${tagOf(n) ? `<span class="pill">${esc(tagOf(n))}</span>` : ''}</div>
      ${n.text ? String(n.text).split(/\n\s*\n/).map((t) => `<p class="p-text">${esc(t)}</p>`).join('') : ''}
      ${n.todo ? `<div class="todo"><b>TO ADD</b>${esc(n.todo)}</div>` : ''}`;

    if (n.blocks && n.blocks.length) {
      html += n.blocks.map((bl) => `<section class="block"><h3>${esc(bl.title)}</h3>${String(bl.text || '').split(/\n\s*\n/).map((t) => `<p class="p-text">${esc(t)}</p>`).join('')}</section>`).join('');
    }
    if (imgs.length) {
      html += `<section><h3>Material <span>${imgs.length}</span></h3><div class="grid">${imgs
        .map((p, i) => `<button type="button" data-img="${i}"><img loading="lazy" src="${thumb(p)}" alt=""></button>`)
        .join('')}</div></section>`;
    }
    if (n.sections && n.sections.length) {
      let k = 0;
      html += n.sections.map((sec) => `<section class="steps"><h3>${esc(sec.title)} <span>${sec.items.length}</span></h3><ol>${sec.items
        .map((t) => `<li><span class="s-no">${String(++k).padStart(2, '0')}</span><span>${esc(t)}</span></li>`)
        .join('')}</ol></section>`).join('');
    }
    const entryItems = [];
    if (n.entries && n.entries.length) {
      const paras = (t) => String(t).split(/\n\s*\n/).map((x) => `<p>${esc(x)}</p>`).join('');
      html += `<section class="entries"><h3>Collection <span>${n.entries.length}</span></h3>${n.entries.map((e, k) => {
        const btns = (e.img || []).map((p) => {
          entryItems.push({ src: full(p), caption: e.source || String(k + 1).padStart(2, '0') });
          return `<button type="button" data-entry="${entryItems.length - 1}"><img loading="lazy" src="${thumb(p)}" alt=""></button>`;
        }).join('');
        const src = e.source ? (e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.source)} ↗</a>` : esc(e.source)) : '';
        const more = e.more ? `<details><summary>${esc(e.more.label || 'More')}</summary>${paras(e.more.text || '')}${e.more.notes && e.more.notes.length ? `<ol class="fn">${e.more.notes.map((f) => `<li>${esc(f.text)}${f.url ? ` <a href="${esc(f.url)}" target="_blank" rel="noopener">↗</a>` : ''}</li>`).join('')}</ol>` : ''}</details>` : '';
        return `<article class="entry">
          <div class="e-imgs e-n${(e.img || []).length}">${btns}</div>
          <div class="e-meta"><span class="e-no">${String(k + 1).padStart(2, '0')}</span>${src ? `<span class="e-src">${src}</span>` : ''}</div>
          ${e.about ? `<p class="e-about">${esc(e.about)}</p>` : ''}
          ${e.text ? `<p class="e-text">${esc(e.text)}</p>` : ''}
          ${more}
        </article>`;
      }).join('')}</section>`;
    }
    if (n.links && n.links.length) {
      html += `<section><h3>Links</h3><ul>${n.links
        .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">↗ ${esc(l.label)}</a></li>`)
        .join('')}</ul></section>`;
    }
    if (n.children.length) {
      html += `<section class="kids"><h3>Contains <span>${n.children.length}</span></h3><ul>${n.children
        .map((c, i) => `<li><button type="button" data-kid="${c.id}"><span style="color:var(--mute)">${String(i + 1).padStart(2, '0')}</span>${esc(c.label)}${c.kind === 'work' ? ' ↗' : ''}</button></li>`)
        .join('')}</ul></section>`;
    }

    panel.innerHTML = html;
    panel.scrollTop = 0;
    panel.className = `panel ${side}`;
    void panel.offsetWidth;
    panel.classList.add('open');
    S.panelNode = n;

    panel.querySelector('.p-close').onclick = () => closePanel(true);
    panel.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => activate(byId.get(b.dataset.go)); });
    panel.querySelectorAll('[data-kid]').forEach((b) => { b.onclick = () => activate(byId.get(b.dataset.kid)); });
    const items = imgs.map((p, i) => ({ src: full(p), caption: `${n.label} — ${String(i + 1).padStart(2, '0')}` }));
    panel.querySelectorAll('[data-img]').forEach((b) => { b.onclick = () => window.Lightbox.open(items, +b.dataset.img); });
    panel.querySelectorAll('[data-entry]').forEach((b) => { b.onclick = () => window.Lightbox.open(entryItems, +b.dataset.entry); });

    frameFocus();
    kick();
  }

  function closePanel(refocus) {
    if (!S.panelNode) return;
    const n = S.panelNode;
    S.panelNode = null;
    panel.classList.remove('open');
    if (!refocus) return;
    if (n.children.length) { showNote(n); frameFocus(); kick(); } else if (n.parent) focus(n.parent);
  }

  /* ── hover orbit ────────────────────────────────── */

  let hoverTimer = null;
  let orbitNode = null;

  function hoverStart(n) {
    if (n.el.classList.contains('dim') || n.kind === 'future') return;
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => showOrbit(n), 110);
  }

  function hoverEnd(n, force) {
    clearTimeout(hoverTimer);
    if (force || orbitNode === n) hideOrbit();
  }

  function showOrbit(n) {
    const imgs = collectImages(n, 10);
    const count = imgs.length || clamp(n.children.length || 4, 3, 6);
    const size = imgs.length ? 64 : 38;
    const R = (imgs.length ? 104 : 74) + count * 4;
    const items = Array.from({ length: count }, (_, i) => {
      const inner = imgs[i] ? `<img src="${thumb(imgs[i])}" alt="">` : '<div class="o-empty"></div>';
      return `<div class="o-item" style="--a:${(360 * i) / count - 90}deg;--r:${R}px;--i:${i};--s:${size}px"><div class="o-inner">${inner}</div></div>`;
    }).join('');
    const total = collectImages(n, 9999).length;
    const caption = total ? `${total} image${total > 1 ? 's' : ''}` : 'no material yet';
    orbitEl.innerHTML = `<div class="ring">${items}</div><div class="o-caption" style="top:${R + size / 2 + 14}px">${caption}</div>`;
    orbitNode = n;
    placeOrbit();
    requestAnimationFrame(() => requestAnimationFrame(() => orbitEl.classList.add('on')));
  }

  function hideOrbit() {
    orbitNode = null;
    orbitEl.classList.remove('on');
    const html = orbitEl.innerHTML;
    setTimeout(() => { if (!orbitNode && orbitEl.innerHTML === html) orbitEl.innerHTML = ''; }, 400);
  }

  function placeOrbit() {
    if (!orbitNode) return;
    const c = center(orbitNode);
    const p = toScreen(c.x, c.y);
    orbitEl.style.transform = `translate(${p.x}px,${p.y}px)`;
  }

  /* ── pointer: click, pan, connect ───────────────── */

  let drag = null;

  function hitTest(clientX, clientY, except) {
    const w = toWorld(clientX, clientY);
    for (let i = visible.length - 1; i >= 0; i--) {
      const n = visible[i];
      if (n === except || n.kind === 'future') continue;
      const e = ext(n);
      if (w.x >= n.p.x + e.x0 - 6 && w.x <= n.p.x + e.x1 + 6 && w.y >= n.p.y + e.y0 - 6 && w.y <= n.p.y + e.y1 + 6) return n;
    }
    return null;
  }

  svg.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('.ul-label')) return;
    const nodeEl = e.target.closest('.node');
    const node = nodeEl ? byId.get(nodeEl.dataset.id) : null;
    drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, node, moved: false, cam0: { ...S.cam }, target: null };
    svg.setPointerCapture(e.pointerId);
  });

  svg.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0; const dy = e.clientY - drag.y0;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) { drag.moved = true; hideOrbit(); }

    if (drag.node && drag.node.kind !== 'future') {
      const c = center(drag.node); const p = toScreen(c.x, c.y);
      dragLine.setAttribute('d', `M${p.x},${p.y}L${e.clientX},${e.clientY}`);
      dragDot.style.display = '';
      dragDot.setAttribute('cx', e.clientX); dragDot.setAttribute('cy', e.clientY);
      const t = hitTest(e.clientX, e.clientY, drag.node);
      if (t !== drag.target) {
        if (drag.target) drag.target.el.classList.remove('target');
        if (t) { t.el.classList.add('target'); SND.node(t, 0, 0.25); }
        drag.target = t;
      }
    } else {
      S.camT = null;
      S.cam.x = drag.cam0.x + dx; S.cam.y = drag.cam0.y + dy;
      svg.classList.add('panning');
      kick();
    }
  });

  function endDrag(e, cancelled) {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    svg.classList.remove('panning');
    dragLine.setAttribute('d', '');
    dragDot.style.display = 'none';
    if (d.target) d.target.el.classList.remove('target');
    if (cancelled) return;
    if (d.node) {
      if (!d.moved) activate(d.node);
      else if (d.target) addLink(d.node, d.target);
    } else if (!d.moved) stepUp();
  }
  svg.addEventListener('pointerup', (e) => endDrag(e, false));
  svg.addEventListener('pointercancel', (e) => endDrag(e, true));

  svg.addEventListener('wheel', (e) => {
    e.preventDefault();
    hideOrbit();
    S.camT = null;
    const unit = e.deltaMode === 1 ? 16 : 1;
    if (e.ctrlKey || e.metaKey) zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * unit * 0.01));
    else { S.cam.x -= e.deltaX * unit; S.cam.y -= e.deltaY * unit; }
    kick();
  }, { passive: false });

  function zoomAt(sx, sy, f) {
    const k = clamp(S.cam.k * f, 0.25, 2.2);
    const w = toWorld(sx, sy);
    S.cam.k = k; S.cam.x = sx - w.x * k; S.cam.y = sy - w.y * k;
  }

  $('#zoom-in').onclick = () => { S.camT = null; zoomAt(innerWidth / 2, innerHeight / 2, 1.2); kick(); };
  $('#zoom-out').onclick = () => { S.camT = null; zoomAt(innerWidth / 2, innerHeight / 2, 1 / 1.2); kick(); };
  $('#zoom-fit').onclick = () => { fitTo(visible); kick(); };

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || (window.Lightbox && window.Lightbox.isOpen())) return;
    if (juxta.classList.contains('open')) closeJuxta(); else stepUp();
  });

  addEventListener('resize', () => { frameFocus(); kick(); });

  /* ── visitor-made connections (not saved) ───────── */

  function addLink(a, b) {
    const dup = S.links.find((L) => (L.a === a && L.b === b) || (L.a === b && L.b === a));
    if (dup) { openJuxta(dup); return; }
    const L = { a, b, n: S.links.length + 1 };
    S.links.push(L);
    SND.chord(a, b);
    kick();
    setTimeout(() => openJuxta(L), 380);
  }

  function juxtaNode(n) {
    const meta = [dateOf(n), n.week ? `W${n.week.num}` : ''].filter(Boolean).join(' · ') || 'Living Archive';
    return `<div class="j-node"><div class="m">${esc(meta)}</div><div class="t">${esc(n.label)}</div></div>`;
  }

  function openJuxta(L) {
    const ia = collectImages(L.a, 12); const ib = collectImages(L.b, 12);
    const mix = [];
    for (let i = 0; i < Math.max(ia.length, ib.length); i++) {
      if (ia[i]) mix.push({ p: ia[i], s: 'A' });
      if (ib[i]) mix.push({ p: ib[i], s: 'B' });
    }
    juxta.innerHTML = `
      <button class="j-close" type="button">× CLOSE</button>
      <div class="j-kicker">CONNECTION ${String(L.n).padStart(2, '0')} — made by you · not saved</div>
      <div class="j-pair">${juxtaNode(L.a)}<div class="j-line"><span>A ↔ B</span></div>${juxtaNode(L.b)}</div>
      ${mix.length
        ? `<div class="j-mosaic">${mix.map((m, i) => `<figure><button type="button" data-i="${i}"><img loading="lazy" src="${thumb(m.p)}" alt=""></button><figcaption>${m.s}</figcaption></figure>`).join('')}</div>`
        : '<p class="j-empty">Neither side holds material yet — for now, this link is only a question.</p>'}
      <textarea placeholder="What do these two share? Just for you — not saved."></textarea>`;
    juxta.classList.add('open');
    juxta.scrollTop = 0;
    juxta.querySelector('.j-close').onclick = closeJuxta;
    const items = mix.map((m) => ({ src: full(m.p), caption: `${m.s} — ${(m.s === 'A' ? L.a : L.b).label}` }));
    juxta.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => window.Lightbox.open(items, +b.dataset.i); });
  }

  function closeJuxta() { juxta.classList.remove('open'); SND.low(); }

  /* ── sound toggle ───────────────────────────────── */

  const paintSound = () => { soundBtn.textContent = `SOUND ${SND.on ? 'ON' : 'OFF'}`; };
  soundBtn.onclick = () => { SND.toggle(); paintSound(); };
  paintSound();

  /* ── start ──────────────────────────────────────── */

  function openFromHash() {
    const n = byId.get(decodeURIComponent(location.hash.slice(1)));
    if (!n || n === root) return false;
    ancestors(n).forEach((a) => S.expanded.add(a.id));
    if (n.children.length) { S.expanded.add(n.id); focus(n, { instant: true }); } else if (n.kind === 'work' || n.kind === 'future') focus(n.parent, { instant: true });
    else { focus(n, { instant: true }); openPanel(n); }
    return true;
  }

  addEventListener('hashchange', () => {
    const n = byId.get(decodeURIComponent(location.hash.slice(1))) || root;
    if (n.id === S.focus && !S.panelNode) return;
    closePanel(false);
    ancestors(n).forEach((a) => S.expanded.add(a.id));
    if (n.kind === 'work' || n.kind === 'future') focus(n.parent);
    else activate(n);
  });

  const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([ready, new Promise((r) => setTimeout(r, 1500))]).then(() => {
    if (!openFromHash()) focus(root, { instant: true });
    for (const n of visible) n.p = { ...n.t };
    kick();
  });
})();
