/*
  Work pages
  - [data-lb] images open full size in the lightbox
  - .pages: one large frame that keeps turning through the inner pages
    (pauses on hover / when off screen), a tick line to jump, or all pages at once
*/
(() => {
  const pad = (n) => String(n).padStart(2, '0');

  /* ── lightbox for the photographs ─────────────── */

  const shots = [...document.querySelectorAll('[data-lb]')].sort((a, b) => a.dataset.lb - b.dataset.lb);
  const items = shots.map((b) => ({ src: b.querySelector('img').src, caption: b.querySelector('img').alt }));
  shots.forEach((b, i) => { b.onclick = () => window.Lightbox.open(items, i); });

  /* ── inner pages ──────────────────────────────── */

  const sec = document.querySelector('.pages');
  if (!sec) return;

  const N = +sec.dataset.count;
  const base = sec.dataset.src;
  const full = (i) => `${base}/full/p${pad(i + 1)}.jpg`;
  const thumb = (i) => `${base}/thumb/p${pad(i + 1)}.jpg`;

  const stage = sec.querySelector('.pg-stage');
  const layers = [...stage.querySelectorAll('.pg-img')];
  const ticks = sec.querySelector('.pg-ticks');
  const count = sec.querySelector('.pg-count');
  const playBtn = sec.querySelector('.pg-play');
  const allBtn = sec.querySelector('.pg-all');
  const grid = sec.querySelector('.pg-grid');

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 1500;
  let cur = -1;
  let front = 0;
  let playing = !reduce;
  let hovering = false;
  let visible = false;
  let timer = null;

  ticks.innerHTML = Array.from({ length: N }, (_, i) => `<button type="button" aria-label="Page ${i + 1}" data-i="${i}"></button>`).join('');
  const tickEls = [...ticks.children];

  const cache = new Map();
  function preload(i) {
    i = (i + N) % N;
    if (cache.has(i)) return cache.get(i);
    const img = new Image();
    const p = new Promise((res) => { img.onload = img.onerror = () => res(); });
    img.src = full(i);
    cache.set(i, p);
    return p;
  }

  async function show(i, dir = 1) {
    i = (i + N) % N;
    if (i === cur) return;
    const token = (show.token = (show.token || 0) + 1);
    await preload(i);
    if (token !== show.token) return;
    const next = layers[1 - front];
    const prev = layers[front];
    next.src = full(i);
    next.alt = `Inner page ${i + 1} of ${N}`;
    next.style.setProperty('--from', `${dir * 2}%`);
    next.classList.remove('on', 'enter');
    void next.offsetWidth;
    next.classList.add('enter', 'on');
    prev.classList.remove('on');
    front = 1 - front;
    cur = i;
    count.textContent = `${pad(i + 1)} / ${pad(N)}`;
    tickEls.forEach((t, k) => t.classList.toggle('cur', k === i));
    preload(i + 1); preload(i + 2); preload(i - 1);
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (playing && !hovering && visible && !document.hidden) timer = setTimeout(() => show(cur + 1, 1), INTERVAL);
  }

  function setPlaying(p) {
    playing = p;
    playBtn.textContent = p ? 'PAUSE' : 'PLAY';
    schedule();
  }

  sec.querySelector('.pg-prev').onclick = () => show(cur - 1, -1);
  sec.querySelector('.pg-next').onclick = () => show(cur + 1, 1);
  ticks.onclick = (e) => { const t = e.target.closest('[data-i]'); if (t) show(+t.dataset.i, +t.dataset.i >= cur ? 1 : -1); };
  playBtn.onclick = () => setPlaying(!playing);

  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, -1); }
    if (e.key === ' ') { e.preventDefault(); setPlaying(!playing); }
  });
  stage.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovering = true; schedule(); } });
  stage.addEventListener('pointerleave', () => { hovering = false; schedule(); });
  document.addEventListener('visibilitychange', schedule);

  // swipe on phones
  let sx = null;
  stage.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });

  new IntersectionObserver((es) => { visible = es[0].isIntersecting; schedule(); }, { threshold: 0.4 }).observe(stage);

  // all pages at once
  allBtn.onclick = () => {
    const open = grid.hidden;
    if (open && !grid.children.length) {
      grid.innerHTML = Array.from({ length: N }, (_, i) => `<button type="button" data-i="${i}"><img loading="lazy" src="${thumb(i)}" alt="Inner page ${i + 1}"><span>${pad(i + 1)}</span></button>`).join('');
    }
    grid.hidden = !open;
    allBtn.textContent = open ? 'CLOSE' : 'ALL PAGES';
    allBtn.classList.toggle('on', open);
  };
  grid.onclick = (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    show(+b.dataset.i);
    stage.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };

  if (reduce) setPlaying(false);
  show(0);
})();
