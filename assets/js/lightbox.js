/* Full-size image viewer. Lightbox.open([{ src, caption }], index) */
window.Lightbox = (() => {
  let root, img, count, cap, list = [], i = 0;

  function build() {
    root = document.createElement('div');
    root.className = 'lightbox';
    root.setAttribute('role', 'dialog');
    root.innerHTML = `
      <button class="lb-close" type="button">× CLOSE</button>
      <button class="lb-prev" type="button" aria-label="Previous">←</button>
      <img alt="">
      <button class="lb-next" type="button" aria-label="Next">→</button>
      <div class="lb-bar"><span class="lb-cap"></span><span class="lb-count"></span></div>`;
    document.body.appendChild(root);
    img = root.querySelector('img');
    count = root.querySelector('.lb-count');
    cap = root.querySelector('.lb-cap');
    root.querySelector('.lb-close').onclick = close;
    root.querySelector('.lb-prev').onclick = () => go(-1);
    root.querySelector('.lb-next').onclick = () => go(1);
    root.addEventListener('click', (e) => { if (e.target === root) close(); });
    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.stopImmediatePropagation(); close(); }
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    }, true);
  }

  function show() {
    const item = list[i];
    img.src = item.src;
    cap.textContent = item.caption || '';
    count.textContent = `${String(i + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
  }
  function go(d) { i = (i + d + list.length) % list.length; show(); }
  function open(items, index = 0) {
    if (!root) build();
    list = items; i = index;
    show();
    root.classList.add('open');
  }
  function close() { root.classList.remove('open'); }
  function isOpen() { return root && root.classList.contains('open'); }

  return { open, close, isOpen };
})();
