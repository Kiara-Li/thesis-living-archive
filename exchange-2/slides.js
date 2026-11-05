// Thesis Exchange 2（11.06）：一屏一屏往下讲。和 Prototype 1 的演讲（prototype1/look-up/about/）同一套。
//   ← → / 空格 / 滚轮 翻页；上面的刻度（四个部分）可以点；地址后面的 #id 直接打开那一屏

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const steps = $$('.step');
  const PARTS = [{ name: 'Where I am' }, { name: 'Prototype 1' }, { name: 'Prototype 2' }, { name: 'Next' }];
  const partsEl = $('.parts');
  partsEl.innerHTML = PARTS.map((p, i) => `<button data-p="${i}">${p.name}</button>`).join('');
  let cur = -1;

  function go(i) {
    i = Math.max(0, Math.min(steps.length - 1, i));
    if (i === cur) return;
    cur = i;
    steps.forEach((s, k) => { s.classList.toggle('on', k === i); s.classList.toggle('before', k < i); });
    const st = steps[i];
    const part = Number(st.dataset.part);
    $$('button', partsEl).forEach((b, k) => b.classList.toggle('on', k === part));
    history.replaceState(null, '', `#${st.id}`);
    onShow(st);
  }
  const indexOf = (id) => steps.findIndex((s) => s.id === id);

  partsEl.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) go(steps.findIndex((s) => Number(s.dataset.part) === Number(b.dataset.p)));
  });

  // ---- 键盘、滚轮、手机左右滑
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(cur - 1); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(steps.length - 1);
  });
  const narrow = () => window.matchMedia('(max-width: 760px)').matches;
  let wheelAt = 0;
  let wheelSum = 0;
  window.addEventListener('wheel', (e) => {
    if (narrow()) return;
    e.preventDefault();
    const now = performance.now();
    if (now - wheelAt < 900) return;
    wheelSum += e.deltaY;
    if (Math.abs(wheelSum) > 60) { go(cur + Math.sign(wheelSum)); wheelAt = now; wheelSum = 0; }
  }, { passive: false });
  let touch = null;
  window.addEventListener('touchstart', (e) => { touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
  window.addEventListener('touchend', (e) => {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x;
    const dy = e.changedTouches[0].clientY - touch.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cur + (dx < 0 ? 1 : -1));
    touch = null;
  });

  // ---- 嵌在页面里的 Look Up：翻到这一屏才开始加载，翻走就停下（讲的时候不会卡）
  const frames = $$('iframe[src]');
  frames.forEach((f) => { f.dataset.src = f.src; f.removeAttribute('src'); });
  function onShow(st) {
    const near = [steps[cur - 1], st, steps[cur + 1]].filter(Boolean);     // 下一屏的先开始加载，翻过去就已经在了
    frames.forEach((f) => {
      if (near.some((x) => x.contains(f))) { if (!f.src) f.src = f.dataset.src; }
      else if (f.src) f.removeAttribute('src');
    });
    fitFrames();
  }

  // 嵌进来的网站按 1440×900 渲染，再整体缩放到窗口大小（和在电脑上看到的一样）
  function fitFrames() {
    frames.forEach((f) => {
      const b = f.parentElement.getBoundingClientRect();
      if (b.width) f.style.transform = `scale(${b.width / 1440})`;
    });
  }
  window.addEventListener('resize', fitFrames);

  // ---- 不让一个词单独落到下一行：每段字最后两个词之间换成不断行的空格
  $$('.t1, .t2, .tq, .body, figcaption, .open li').forEach((e) => {
    if (e.children.length) return;
    e.textContent = e.textContent.replace(/\s+(\S+)\s*$/, '\u00a0$1');
  });

  // ---- 开始
  const start = indexOf(location.hash.slice(1));
  go(start >= 0 ? start : 0);
  window.addEventListener('hashchange', () => { const i = indexOf(location.hash.slice(1)); if (i >= 0) go(i); });
})();
