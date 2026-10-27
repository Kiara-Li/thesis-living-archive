/*
  Photo mosaic on a work page
  - a 3 × 3 grid of photos; every few seconds one square swaps to a photo
    that isn't showing yet, so the grid keeps changing, a bit at a time
  - pauses with PAUSE or when scrolled off screen; ALL PHOTOS shows every one
  - <section class="mosaic" data-src="../../assets/img/<folder>" data-photos="a b c …">
    the first nine in data-photos are the ones you see first
*/
(() => {
  const sec = document.querySelector('.mosaic');
  if (!sec) return;

  const base = sec.dataset.src;
  const photos = sec.dataset.photos.trim().split(/\s+/);
  const full = (p) => `${base}/full/${p}.jpg`;
  const thumb = (p) => `${base}/thumb/${p}.jpg`;
  const items = photos.map((p) => ({ src: full(p), caption: '' }));

  const grid = sec.querySelector('.ms-grid');
  const all = sec.querySelector('.ms-all-grid');
  const playBtn = sec.querySelector('.ms-play');
  const allBtn = sec.querySelector('.ms-all');

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 1800;
  const N = Math.min(9, photos.length);

  // what each square shows (index into photos), and the photos waiting their turn
  const shown = photos.slice(0, N).map((_, i) => i);
  const waiting = photos.map((_, i) => i).slice(N);

  grid.innerHTML = shown.map((k, i) => `
    <button type="button" data-cell="${i}"><img class="on" src="${thumb(photos[k])}" alt=""><img alt=""></button>`).join('');
  const cells = [...grid.children];
  cells.forEach((c, i) => { c.onclick = () => window.Lightbox.open(items, shown[i]); });

  all.innerHTML = photos.map((p, i) => `<button type="button" data-i="${i}"><img loading="lazy" src="${thumb(p)}" alt=""></button>`).join('');
  all.querySelectorAll('button').forEach((b) => { b.onclick = () => window.Lightbox.open(items, +b.dataset.i); });

  let last = -1;
  function swap() {
    if (!waiting.length) return;
    let i;
    do { i = Math.floor(Math.random() * N); } while (i === last && N > 1);
    last = i;
    const next = waiting.shift();
    waiting.push(shown[i]);
    shown[i] = next;
    const [a, b] = cells[i].querySelectorAll('img');
    const front = a.classList.contains('on') ? a : b;
    const back = front === a ? b : a;
    back.onload = () => { back.classList.add('on'); front.classList.remove('on'); };
    back.src = thumb(photos[next]);
  }

  let playing = !reduce;
  let visible = false;
  let timer = null;
  function run() {
    clearInterval(timer);
    timer = playing && visible && all.hidden ? setInterval(swap, INTERVAL) : null;
    playBtn.textContent = playing ? 'PAUSE' : 'PLAY';
  }
  playBtn.onclick = () => { playing = !playing; run(); };
  allBtn.onclick = () => {
    all.hidden = !all.hidden;
    grid.hidden = !all.hidden;
    allBtn.classList.toggle('on', !all.hidden);
    run();
  };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(sec);
  run();
})();
