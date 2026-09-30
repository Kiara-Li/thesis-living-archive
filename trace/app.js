(() => {
'use strict';

// ---- Fill in before sharing ----
const CONTACT = 'lik276@newschool.edu';

const MAX_CITIES = 5;
const NOTE_MAX = 140;
const CJK_FONTS = '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Noto Sans SC"';
const MONO = `"TWK Everett Mono", ${CJK_FONTS}, Menlo, monospace`;
const SANS = `"TWK Everett", ${CJK_FONTS}, "Helvetica Neue", Arial, sans-serif`;
// Only the participant's line is black; every other line is the same light grey.
const C = { bg: '#ffffff', ink: '#111111', muted: '#8a8a8a', line: '#d4d4d4' };

const FIRST = ['when-i-arrived', 'along-the-way', 'recently', 'dont-remember'];
const AGES = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'prefer-not'];

// ---------- Copy ----------
const I18N = {
  en: {
    step: 'Step {n} / 4',
    intro1: 'This takes about 5 minutes. You will draw your time in the cities you have lived in, and write down the animals and plants you remember there.',
    intro2: 'There are no right answers. Nothing you enter leaves your browser. At the end, you will save one image and send it to me.',
    start: 'Start', back: 'Back', next: 'Next', nextCity: 'Next city', finish: 'Finish',
    citiesTitle: 'Which cities have you lived in?',
    citiesSub: 'List them in the order you lived there.',
    cityName: 'City name',
    cityYears: 'How many years did you live there?',
    stillHere: 'I still live here',
    addCity: '+ Add another city',
    limit: 'Up to 5 cities.',
    cityHeader: '{city} · {n} years',
    draw1: 'Draw your time in this city as one continuous line, from when you arrived to now (or when you left).',
    draw2: 'Your line can rise, fall, turn, loop, pause, break, or change direction. There is no right way to draw it.',
    arrived: 'arrived', now: 'now', left: 'left',
    unitY: 'y', unitM: 'm',
    undo: 'Undo', clear: 'Clear',
    lineNote: 'What does your line show? (optional)',
    speciesTitle: 'Which animals or plants do you remember from {city}?',
    speciesSub: 'Anything you noticed, big or small.',
    add: 'Add',
    firstQ: 'When did you first notice it?',
    'when-i-arrived': 'When I arrived', 'along-the-way': 'Along the way', 'recently': 'Recently', 'dont-remember': "I don't remember",
    noSpecies: "I can't think of any.",
    liveNow: 'Where do you live now? (optional)',
    age: 'Your age range (optional)',
    'prefer-not': 'Prefer not to say',
    resultTitle: 'Your trace',
    savePng: 'Save as PNG', savePdf: 'Save as PDF',
    thanksA: 'Thank you. Please send the image to ', thanksB: '.',
    pngExplain: "Each line is one person's time in one city, drawn from arrival to now or leaving.",
    lCity: 'City', lYears: 'Years lived', lStill: 'Still living here', yes: 'yes', no: 'no',
    lLine: 'What the line shows', lSpecies: 'Animals and plants remembered', lFirst: 'First noticed',
    none: "Couldn't think of any.", lLiveNow: 'Lives in now', lAge: 'Age range',
    colon: ': ', langName: 'EN',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    remove: 'Remove', up: 'Move up', down: 'Move down', canvasLabel: 'Drawing area',
  },
  zh: {
    step: '第 {n} / 4 步',
    intro1: '大约需要 5 分钟。你会画出自己在生活过的城市里的时间，并写下你在那里记得的动物和植物。',
    intro2: '没有标准答案。你填写的内容不会离开你的浏览器。最后，你会保存一张图片并发给我。',
    start: '开始', back: '返回', next: '下一步', nextCity: '下一个城市', finish: '完成',
    citiesTitle: '你在哪些城市生活过？',
    citiesSub: '请按生活的先后顺序填写。',
    cityName: '城市名称',
    cityYears: '你在那里住了多少年？',
    stillHere: '我现在还住在这里',
    addCity: '+ 再加一个城市',
    limit: '最多 5 个城市。',
    cityHeader: '{city} · {n} 年',
    draw1: '用一条连续的线，画出你在这座城市里的时间：从你刚到的时候，一直到现在（或你离开的时候）。',
    draw2: '这条线可以上升、下降、转弯、绕圈、停顿、断开或改变方向。没有正确的画法。',
    arrived: '刚到', now: '现在', left: '离开',
    unitY: '年', unitM: '个月',
    undo: '撤销', clear: '清除',
    lineNote: '你的线表示的是什么？（可选）',
    speciesTitle: '你记得 {city} 的哪些动物或植物？',
    speciesSub: '任何你注意到的都可以，大的小的都算。',
    add: '添加',
    firstQ: '你第一次注意到它是什么时候？',
    'when-i-arrived': '刚到的时候', 'along-the-way': '住的过程中', 'recently': '最近', 'dont-remember': '不记得了',
    noSpecies: '我想不起来任何一种。',
    liveNow: '你现在住在哪里？（可选）',
    age: '你的年龄段（可选）',
    'prefer-not': '不想透露',
    resultTitle: '你的 TRACE',
    savePng: '保存为 PNG', savePdf: '保存为 PDF',
    thanksA: '谢谢你。请把这张图片发给 ', thanksB: '。',
    pngExplain: '每条线是一个人在一座城市里的时间，从刚到画到现在或离开。',
    lCity: '城市', lYears: '居住年数', lStill: '现在还住在这里', yes: '是', no: '否',
    lLine: '这条线表示', lSpecies: '记得的动物和植物', lFirst: '第一次注意到',
    none: '想不起来任何一种。', lLiveNow: '现在住在', lAge: '年龄段',
    colon: '：', langName: '中文',
    months: null,
    remove: '删除', up: '上移', down: '下移', canvasLabel: '绘画区域',
  },
};

function t(key, vars, lang = state.lang) {
  let s = I18N[lang][key];
  if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
  return s;
}
const ageLabel = (v, lang) => (v === 'prefer-not' ? I18N[lang]['prefer-not'] : v.replace('-', '–'));

// ---------- State ----------
let uid = 0;
const newCity = () => ({ key: ++uid, name: '', yearsRaw: '', stillHere: false, strokes: [], lineNote: '', species: [], noSpecies: false, pending: '' });

const state = {
  lang: /^zh/i.test((navigator.languages && navigator.languages[0]) || navigator.language || '') ? 'zh' : 'en',
  id: makeId(),
  screen: 0,
  cities: [newCity()],
  currentCity: '',
  ageRange: null,
  createdAt: null,
};

function makeId() {
  const abc = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const r = new Uint8Array(4);
  crypto.getRandomValues(r);
  return 'T-' + Array.from(r, b => abc[b % abc.length]).join('');
}

function parseYears(raw) {
  const s = String(raw).trim().replace(',', '.');
  if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
  return parseFloat(s);
}
const validYears = raw => parseYears(raw) >= 0.1;
const fmtNum = n => String(parseFloat(n.toFixed(2)));

function buildData() {
  return {
    id: state.id,
    createdAt: state.createdAt || yearMonth(),
    lang: state.lang,
    currentCity: state.currentCity.trim() || null,
    ageRange: state.ageRange,
    cities: state.cities.map(c => ({
      name: c.name.trim(),
      years: parseYears(c.yearsRaw),
      stillHere: c.stillHere,
      lineNote: c.lineNote.trim() || null,
      strokes: c.strokes,
      species: c.species.map(s => ({ name: s.name, firstNoticed: s.firstNoticed })),
      noSpecies: c.noSpecies,
    })),
  };
}
function yearMonth() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

// ---------- DOM helpers ----------
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  for (const k in attrs || {}) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className = v;
    else if (k === 'value' || k === 'checked' || k === 'disabled') el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid != null) el.append(kid);
  return el;
}
const iconBtn = (label, aria, disabled, onclick) =>
  h('button', { type: 'button', class: 'icon', 'aria-label': aria, title: aria, disabled, onclick }, label);
const button = (label, onclick, extra = {}) => h('button', { type: 'button', class: 'btn', onclick, ...extra }, label);
const field = (label, input) => h('label', { class: 'field' }, h('span', { class: 'label' }, label), input);

function chipGroup(options, getValue, setValue) {
  const wrap = h('div', { class: 'chips' });
  for (const [value, label] of options) {
    wrap.append(h('button', {
      type: 'button', class: 'chip', 'data-v': value, 'aria-pressed': String(getValue() === value),
      onclick: () => {
        setValue(getValue() === value ? null : value);
        for (const b of wrap.children) b.setAttribute('aria-pressed', String(b.dataset.v === getValue()));
      },
    }, label));
  }
  return wrap;
}

// ---------- Screens ----------
const app = document.getElementById('app');
const stepEl = document.getElementById('step');
let navCtl = null;
let beforeLeave = null;
let cleanup = null;

function screens() {
  const list = [{ type: 'intro' }, { type: 'cities' }];
  state.cities.forEach((_, i) => list.push({ type: 'draw', i }));
  state.cities.forEach((_, i) => list.push({ type: 'species', i }));
  list.push({ type: 'final' }, { type: 'result' });
  return list;
}
const STEP_OF = { cities: 1, draw: 2, species: 3, final: 4 };

function go(delta) {
  if (beforeLeave) beforeLeave();
  state.screen += delta;
  render();
  window.scrollTo(0, 0);
}

function render() {
  if (cleanup) { cleanup(); cleanup = null; }
  navCtl = null;
  beforeLeave = null;
  const list = screens();
  state.screen = Math.max(0, Math.min(state.screen, list.length - 1));
  const sc = list[state.screen];
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));
  stepEl.textContent = STEP_OF[sc.type] ? t('step', { n: STEP_OF[sc.type] }) : '';
  app.dataset.screen = sc.type;
  app.replaceChildren();
  VIEWS[sc.type](sc);
  updateNav();
}

function navRow({ back = true, nextLabel = t('next'), valid = () => true, onNext } = {}) {
  const row = h('div', { class: 'nav' });
  if (back) row.append(button(t('back'), () => go(-1)));
  const next = button(nextLabel, () => { if (valid()) { if (onNext) onNext(); go(1); } }, { class: 'btn next' });
  row.append(next);
  navCtl = { btn: next, valid };
  return row;
}
function updateNav() { if (navCtl) navCtl.btn.disabled = !navCtl.valid(); }

const count = i => h('p', { class: 'count' }, `${i + 1} / ${state.cities.length}`);

const VIEWS = {
  intro() {
    app.append(
      h('h1', null, 'TRACE'),
      h('p', null, t('intro1')),
      h('p', null, t('intro2')),
      navRow({ back: false, nextLabel: t('start') }),
    );
  },

  cities() {
    const n = state.cities.length;
    const list = h('ol', { class: 'cities' });
    state.cities.forEach((c, i) => {
      const years = h('input', {
        type: 'text', inputmode: 'decimal', autocomplete: 'off', value: c.yearsRaw,
        'aria-invalid': String(c.yearsRaw.trim() !== '' && !validYears(c.yearsRaw)),
        oninput: e => {
          c.yearsRaw = e.target.value;
          e.target.setAttribute('aria-invalid', String(c.yearsRaw.trim() !== '' && !validYears(c.yearsRaw)));
          updateNav();
        },
      });
      list.append(h('li', null,
        h('div', { class: 'row-head' },
          h('span', { class: 'num' }, String(i + 1)),
          h('div', { class: 'row-tools' },
            iconBtn('↑', t('up'), i === 0, () => move(i, -1)),
            iconBtn('↓', t('down'), i === n - 1, () => move(i, 1)),
            iconBtn('×', t('remove'), n === 1, () => { state.cities.splice(i, 1); render(); }),
          ),
        ),
        field(t('cityName'), h('input', {
          type: 'text', class: 'name', autocomplete: 'off', maxlength: '100', value: c.name,
          oninput: e => { c.name = e.target.value; updateNav(); },
        })),
        field(t('cityYears'), years),
        h('label', { class: 'check' },
          h('input', { type: 'checkbox', checked: c.stillHere, onchange: e => { c.stillHere = e.target.checked; } }),
          h('span', null, t('stillHere'))),
      ));
    });
    app.append(
      h('h2', null, t('citiesTitle')),
      h('p', { class: 'sub' }, t('citiesSub')),
      list,
      button(t('addCity'), () => {
        state.cities.push(newCity());
        render();
        const inputs = app.querySelectorAll('input.name');
        inputs[inputs.length - 1].focus();
      }, { class: 'btn add-city', disabled: n >= MAX_CITIES }),
      h('p', { class: 'limit' }, t('limit')),
      navRow({ valid: () => state.cities.every(c => c.name.trim() && validYears(c.yearsRaw)) }),
    );
    function move(i, d) {
      const [c] = state.cities.splice(i, 1);
      state.cities.splice(i + d, 0, c);
      render();
    }
  },

  draw({ i }) {
    const c = state.cities[i];
    const last = i === state.cities.length - 1;
    const cv = h('canvas', { role: 'img', 'aria-label': t('canvasLabel') });
    const undo = button(t('undo'), () => { c.strokes.pop(); changed(); });
    const clear = button(t('clear'), () => { c.strokes = []; changed(); });
    const counter = h('div', { class: 'counter' }, `${c.lineNote.length} / ${NOTE_MAX}`);
    app.append(
      count(i),
      h('h2', null, t('cityHeader', { city: c.name.trim(), n: fmtNum(parseYears(c.yearsRaw)) })),
      h('p', null, t('draw1')),
      h('p', { class: 'sub' }, t('draw2')),
      h('div', { class: 'pad' }, cv),
      h('div', { class: 'tools' }, undo, clear),
      field(t('lineNote'), h('input', {
        type: 'text', maxlength: String(NOTE_MAX), autocomplete: 'off', value: c.lineNote,
        oninput: e => { c.lineNote = e.target.value; counter.textContent = `${c.lineNote.length} / ${NOTE_MAX}`; },
      })),
      counter,
      navRow({ nextLabel: last ? t('next') : t('nextCity'), valid: () => c.strokes.length > 0 }),
    );
    const pad = setupPad(cv, c, () => { undo.disabled = clear.disabled = !c.strokes.length; updateNav(); });
    function changed() { pad.paint(); undo.disabled = clear.disabled = !c.strokes.length; updateNav(); }
    undo.disabled = clear.disabled = !c.strokes.length;
    cleanup = pad.destroy;
  },

  species({ i }) {
    const c = state.cities[i];
    const last = i === state.cities.length - 1;
    const addItem = () => {
      const v = c.pending.trim();
      if (!v) return false;
      c.species.push({ name: v, firstNoticed: null });
      c.pending = '';
      c.noSpecies = false;
      return true;
    };
    const input = h('input', {
      type: 'text', class: 'add-input', autocomplete: 'off', maxlength: '100', value: c.pending, disabled: c.noSpecies,
      oninput: e => { c.pending = e.target.value; addBtn.disabled = !c.pending.trim(); },
      onkeydown: e => {
        if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); submit(); }
      },
    });
    const addBtn = button(t('add'), submit, { disabled: !c.pending.trim() });
    function submit() {
      if (!addItem()) return;
      render();
      app.querySelector('.add-input').focus();
    }
    const tags = h('ul', { class: 'tags' });
    c.species.forEach((s, j) => {
      tags.append(h('li', null,
        h('div', { class: 'row-head' },
          h('span', { class: 'tag-name' }, s.name),
          iconBtn('×', t('remove'), false, () => { c.species.splice(j, 1); render(); }),
        ),
        h('span', { class: 'label' }, t('firstQ')),
        chipGroup(FIRST.map(k => [k, t(k)]), () => s.firstNoticed, v => { s.firstNoticed = v; }),
      ));
    });
    const locked = c.species.length > 0;
    app.append(
      count(i),
      h('h2', null, t('speciesTitle', { city: c.name.trim() })),
      h('p', { class: 'sub' }, t('speciesSub')),
      h('div', { class: 'add-row' }, input, addBtn),
      c.species.length ? tags : null,
      h('label', { class: 'check' + (locked ? ' disabled' : '') },
        h('input', {
          type: 'checkbox', checked: c.noSpecies && !locked, disabled: locked,
          onchange: e => { c.noSpecies = e.target.checked; input.disabled = c.noSpecies; },
        }),
        h('span', null, t('noSpecies'))),
      navRow({ nextLabel: last ? t('next') : t('nextCity') }),
    );
    beforeLeave = addItem;
  },

  final() {
    app.append(
      field(t('liveNow'), h('input', {
        type: 'text', autocomplete: 'off', maxlength: '100', value: state.currentCity,
        oninput: e => { state.currentCity = e.target.value; },
      })),
      h('div', { class: 'field' },
        h('span', { class: 'label' }, t('age')),
        h('div', { class: 'age' }, chipGroup(AGES.map(v => [v, ageLabel(v, state.lang)]), () => state.ageRange, v => { state.ageRange = v; })),
      ),
      navRow({ nextLabel: t('finish'), onNext: () => { state.createdAt = yearMonth(); } }),
    );
  },

  result() {
    const img = h('img', { class: 'result', alt: 'TRACE ' + state.id });
    let pngBlob = null;
    let url = null;
    const pngBtn = button(t('savePng'), () => download(pngBlob, `trace-${state.id}.png`), { disabled: true });
    const pdfBtn = button(t('savePdf'), () => loadFonts(buildData()).then(() => download(makePdf(renderExport(buildData())), `trace-${state.id}.pdf`)));
    app.append(
      h('h2', null, t('resultTitle')),
      img,
      h('div', { class: 'save' }, pngBtn, pdfBtn),
      h('p', null, t('thanksA'), CONTACT, t('thanksB')),
      h('div', { class: 'nav' }, button(t('back'), () => go(-1))),
    );
    let alive = true;
    makePng(buildData()).then(blob => {
      if (!alive) return;
      pngBlob = blob;
      url = URL.createObjectURL(blob);
      img.src = url;
      pngBtn.disabled = false;
    });
    cleanup = () => { alive = false; if (url) URL.revokeObjectURL(url); };
  },
};

document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
  if (state.lang === b.dataset.lang) return;
  state.lang = b.dataset.lang;
  render();
}));

// ---------- Drawing pad ----------
const round4 = v => Math.round(Math.min(1, Math.max(0, v)) * 10000) / 10000;

function setupPad(cv, city, onChange) {
  const FS = 11;
  let w = 0, g = null, cur = null, raf = 0;

  function size() {
    w = cv.parentElement.clientWidth;
    if (!w) return;
    g = panelGeom(w, FS);
    const dpr = window.devicePixelRatio || 1;
    cv.style.height = g.h + 'px';
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(g.h * dpr);
    paint();
  }
  function paint() {
    if (!g) return;
    const ctx = cv.getContext('2d');
    ctx.setTransform(cv.width / w, 0, 0, cv.height / g.h, 0, 0);
    ctx.clearRect(0, 0, w, g.h);
    drawPanel(ctx, 0, 0, w, FS, city, state.lang, Math.max(2, w * 0.0035), 1);
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; paint(); }); };

  function toPt(ev, t) {
    const r = cv.getBoundingClientRect();
    const k = r.height / g.h;
    return [
      round4((ev.clientX - r.left) / r.width),
      round4((ev.clientY - r.top - g.top * k) / (g.boxH * k)),
      Math.max(0, Math.round(t)),
    ];
  }
  function down(e) {
    if (cur || (e.pointerType === 'mouse' && e.button !== 0)) return;
    e.preventDefault();
    try { cv.setPointerCapture(e.pointerId); } catch (_) {}
    cur = { id: e.pointerId, t0: e.timeStamp, pts: [toPt(e, 0)] };
    city.strokes.push(cur.pts);
    schedule();
    onChange();
  }
  function move(e) {
    if (!cur || e.pointerId !== cur.id) return;
    e.preventDefault();
    const list = (e.getCoalescedEvents && e.getCoalescedEvents()) || [];
    for (const ev of list.length ? list : [e]) {
      const ts = ev.timeStamp >= cur.t0 ? ev.timeStamp : e.timeStamp;
      const p = toPt(ev, ts - cur.t0);
      const prev = cur.pts[cur.pts.length - 1];
      if (p[0] === prev[0] && p[1] === prev[1]) continue;
      if (p[2] < prev[2]) p[2] = prev[2];
      cur.pts.push(p);
    }
    schedule();
  }
  function up(e) { if (cur && e.pointerId === cur.id) { cur = null; schedule(); } }
  const stopTouch = e => e.preventDefault();

  cv.addEventListener('pointerdown', down);
  cv.addEventListener('pointermove', move);
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', up);
  cv.addEventListener('lostpointercapture', up);
  cv.addEventListener('touchstart', stopTouch, { passive: false });
  cv.addEventListener('touchmove', stopTouch, { passive: false });

  const ro = new ResizeObserver(size);
  ro.observe(cv.parentElement);
  size();
  if (document.fonts) document.fonts.ready.then(paint);
  return { paint, destroy: () => { ro.disconnect(); cancelAnimationFrame(raf); } };
}

// ---------- Panel (shared by screen and export) ----------
const GRID_COLS = 24;
const GRID_ROWS = 8;

function panelGeom(w, fs) {
  const top = Math.round(fs * 2.2);
  const boxH = Math.round(w / 3);
  const bottom = Math.round(fs * 2.6);
  return { top, boxH, bottom, h: top + boxH + bottom };
}

function makeTicks(years, lang) {
  const L = I18N[lang];
  const ticks = [];
  let total, step, unit, labelEvery;
  if (years < 1) { total = years * 12; step = 1; unit = L.unitM; labelEvery = 3; }
  else { total = years; unit = L.unitY; labelEvery = 1; step = years <= 10 ? 1 : years <= 30 ? 5 : 10; }
  for (let v = 0; v < total - 1e-9; v += step) {
    const label = v === 0 ? '0' : (Math.round(v) % (step * labelEvery) === 0 ? v + unit : null);
    ticks.push({ pos: v / total, label });
  }
  ticks.push({ pos: 1, label: fmtNum(total) + unit, end: true });
  return ticks;
}

// `hair` is the one line width used for every grey line in this context.
function drawPanel(ctx, x, y, w, fs, city, lang, lw, hair) {
  const g = panelGeom(w, fs);
  const years = typeof city.years === 'number' ? city.years : parseYears(city.yearsRaw);
  const by = y + g.top;
  const L = I18N[lang];
  const snap = v => Math.round(v / hair) * hair + (hair % 2 ? hair / 2 : 0);

  ctx.font = `400 ${fs}px ${MONO}`;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = C.muted;
  ctx.textAlign = 'left';
  ctx.fillText(L.arrived, x, y + g.top / 2);
  ctx.textAlign = 'right';
  ctx.fillText(city.stillHere ? L.now : L.left, x + w, y + g.top / 2);

  // grid + frame + ticks, all the same grey line
  ctx.strokeStyle = C.line;
  ctx.lineWidth = hair;
  ctx.beginPath();
  for (let k = 0; k <= GRID_COLS; k++) {
    const gx = snap(x + Math.min(Math.max(k / GRID_COLS * w, hair / 2), w - hair / 2));
    ctx.moveTo(gx, by);
    ctx.lineTo(gx, by + g.boxH);
  }
  for (let k = 0; k <= GRID_ROWS; k++) {
    const gy = snap(by + Math.min(Math.max(k / GRID_ROWS * g.boxH, hair / 2), g.boxH - hair / 2));
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
  }
  const ticks = makeTicks(years, lang);
  const tickY = by + g.boxH;
  for (const tk of ticks) {
    const tx = snap(x + Math.min(Math.max(tk.pos * w, hair / 2), w - hair / 2));
    ctx.moveTo(tx, tickY);
    ctx.lineTo(tx, tickY + fs * 0.6);
  }
  ctx.stroke();

  // tick labels, skipping any that would collide
  const labelY = tickY + fs * 0.6 + fs * 0.9;
  ctx.fillStyle = C.muted;
  const placed = [];
  const gap = fs * 0.8;
  const order = [ticks[0], ticks[ticks.length - 1], ...ticks.slice(1, -1)];
  for (const tk of order) {
    if (!tk.label) continue;
    const tw = ctx.measureText(tk.label).width;
    const tx = x + tk.pos * w;
    const align = tk.pos === 0 ? 'left' : tk.end ? 'right' : 'center';
    const l = align === 'left' ? tx : align === 'right' ? tx - tw : tx - tw / 2;
    if (placed.some(([p, q]) => l < q + gap && l + tw > p - gap)) continue;
    placed.push([l, l + tw]);
    ctx.textAlign = align;
    ctx.fillText(tk.label, tx, labelY);
  }

  // the participant's line — the only black line
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, by, w, g.boxH);
  ctx.clip();
  ctx.strokeStyle = C.ink;
  ctx.fillStyle = C.ink;
  ctx.lineWidth = lw;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const px = p => x + p[0] * w;
  const py = p => by + p[1] * g.boxH;
  for (const s of city.strokes) {
    if (!s.length) continue;
    if (s.length === 1) {
      ctx.beginPath();
      ctx.arc(px(s[0]), py(s[0]), lw, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(px(s[0]), py(s[0]));
    for (let k = 1; k < s.length; k++) ctx.lineTo(px(s[k]), py(s[k]));
    ctx.stroke();
  }
  ctx.restore();
  return g.h;
}

// ---------- Export image ----------
const CJK = /[⺀-鿿가-힯豈-﫿＀-￯　-〿]/;

function wrap(ctx, str, maxW) {
  const out = [];
  for (const para of String(str).split(/\r?\n/)) {
    let line = '';
    for (const ch of Array.from(para)) {
      if (line === '' && ch === ' ') continue;
      const test = line + ch;
      if (ctx.measureText(test).width <= maxW) { line = test; continue; }
      if (ch === ' ') { out.push(line); line = ''; continue; }
      const sp = line.lastIndexOf(' ');
      if (sp > 0 && !CJK.test(ch) && !CJK.test(line[line.length - 1])) {
        out.push(line.slice(0, sp));
        line = line.slice(sp + 1) + ch;
      } else {
        out.push(line);
        line = ch;
      }
    }
    out.push(line);
  }
  return out;
}

// Make sure the bundled faces are ready before drawing text to a canvas.
function loadFonts() {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  return Promise.all([
    document.fonts.load('400 20px "TWK Everett"', 'TRACE'),
    document.fonts.load('400 20px "TWK Everett Mono"', 'TRACE'),
  ]).catch(() => {});
}

function renderExport(data) {
  const measure = document.createElement('canvas').getContext('2d');
  const H = Math.ceil(layoutExport(measure, data, false));
  const cv = document.createElement('canvas');
  cv.width = 1600;
  cv.height = H;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, cv.width, cv.height);
  layoutExport(ctx, data, true);
  return cv;
}

function layoutExport(ctx, d, draw) {
  const lang = d.lang;
  const L = I18N[lang];
  const W = 1600, P = 96, CW = W - 2 * P;
  const LW = 340, GAP = 40, VX = P + LW + GAP, VW = CW - LW - GAP;
  const LS = 19, VS = 27, LH = 1.45, PADV = 16, HAIR = 2;
  let y = P;

  function para(str, x, top, maxW, size, color, family = SANS) {
    ctx.font = `400 ${size}px ${family}`;
    const lines = wrap(ctx, str, maxW);
    const lh = size * LH;
    if (draw) {
      ctx.fillStyle = color;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      lines.forEach((ln, i) => ctx.fillText(ln, x, top + i * lh + lh / 2));
    }
    return lines.length * lh;
  }
  function hline(x, yy, w) {
    if (draw) { ctx.fillStyle = C.line; ctx.fillRect(x, Math.round(yy), w, HAIR); }
  }
  function rule() { hline(P, y, CW); y += HAIR; }
  // One table row: label on the left, the answer on the right, a grey line under.
  function row(label, value, opts = {}) {
    const top = y + PADV;
    const vs = opts.size || VS;
    const off = (vs - LS) * LH / 2;
    const hl = para(label, P, top + off, LW, LS, C.muted, MONO) + off;
    const hv = typeof value === 'function' ? value(top) : para(value, VX, top, VW, vs, C.ink);
    y = top + Math.max(hl, hv) + PADV;
    rule();
  }
  function speciesTable(c) {
    return top => {
      if (!c.species.length) return para(c.noSpecies ? L.none : '—', VX, top, VW, VS, C.ink);
      const NW = Math.round(VW * 0.56), FX = VX + NW + 28, FW = VW - NW - 28;
      const off = (VS - LS) * LH / 2;
      let hh = 0;
      c.species.forEach((s, j) => {
        if (j) { hline(VX, top + hh + 7, VW); hh += 16; }
        const hn = para(s.name, VX, top + hh, NW, VS, C.ink);
        const hf = para(L.lFirst + L.colon + (s.firstNoticed ? L[s.firstNoticed] : '—'), FX, top + hh + off, FW, LS, C.muted, MONO) + off;
        hh += Math.max(hn, hf);
      });
      return hh;
    };
  }

  // 1. Header
  const [yy, mm] = d.createdAt.split('-').map(Number);
  const when = L.months ? `${L.months[mm - 1]} ${yy}` : `${yy}年${mm}月`;
  if (draw) {
    ctx.fillStyle = C.ink;
    ctx.font = `400 60px ${SANS}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('TRACE', P - 2, y + 52);
    ctx.fillStyle = C.muted;
    ctx.font = `400 ${LS}px ${MONO}`;
    ctx.textAlign = 'right';
    ctx.fillText(`${d.id}     ${when}     ${L.langName}`, P + CW, y + 52);
  }
  y += 52 + 34;

  // 2. What this is
  y += para(L.pngExplain, P, y, CW, 24, C.muted) + 36;
  rule();

  // 3. Cities
  const n = d.cities.length;
  d.cities.forEach((c, i) => {
    y += 44;
    y += para(`${i + 1} / ${n}`, P, y, CW, LS, C.muted, MONO) + 12;
    rule();
    row(L.lCity, c.name, { size: 34 });
    row(L.lYears, fmtNum(c.years));
    row(L.lStill, c.stillHere ? L.yes : L.no);
    y += 26;
    y += (draw ? drawPanel(ctx, P, y, CW, LS, c, lang, 4, HAIR) : panelGeom(CW, LS).h) + 8;
    rule();
    row(L.lLine, c.lineNote || '—');
    row(L.lSpecies, speciesTable(c));
  });

  // 4–5. Last questions
  y += 44;
  rule();
  row(L.lLiveNow, d.currentCity || '—');
  row(L.lAge, d.ageRange ? ageLabel(d.ageRange, lang) : '—');
  return y + P;
}

// ---------- PNG with embedded data ----------
const CRC_TABLE = (() => {
  const tb = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    tb[n] = c >>> 0;
  }
  return tb;
})();
function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
const ascii = s => Uint8Array.from(s, ch => ch.charCodeAt(0));

function textChunk(key, text) {
  // tEXt is Latin-1, so the JSON is escaped to pure ASCII (\uXXXX for everything else).
  const body = ascii(key + '\0' + text);
  const out = new Uint8Array(12 + body.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, body.length);
  out.set(ascii('tEXt'), 4);
  out.set(body, 8);
  dv.setUint32(8 + body.length, crc32(out.subarray(4, 8 + body.length)));
  return out;
}

async function addTextToPng(blob, key, text) {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let at = buf.length - 12;
  const isIend = p => buf[p + 4] === 73 && buf[p + 5] === 69 && buf[p + 6] === 78 && buf[p + 7] === 68;
  if (!isIend(at)) {
    for (at = 8; at < buf.length && !isIend(at);) at += 12 + new DataView(buf.buffer).getUint32(at);
  }
  const chunk = textChunk(key, text);
  const out = new Uint8Array(buf.length + chunk.length);
  out.set(buf.subarray(0, at), 0);
  out.set(chunk, at);
  out.set(buf.subarray(at), at + chunk.length);
  return new Blob([out], { type: 'image/png' });
}

const asciiJson = obj => JSON.stringify(obj).replace(/[^\x20-\x7e]/g, ch => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0'));

async function makePng(data) {
  await loadFonts(data);
  const cv = renderExport(data);
  const blob = await new Promise(res => cv.toBlob(res, 'image/png'));
  return addTextToPng(blob, 'trace-data', asciiJson(data));
}

// ---------- PDF (one page, same image) ----------
function makePdf(cv) {
  const jpg = Uint8Array.from(atob(cv.toDataURL('image/jpeg', 0.92).split(',')[1]), ch => ch.charCodeAt(0));
  const pw = 595.28;
  const ph = +(cv.height * pw / cv.width).toFixed(2);
  const parts = [];
  const offsets = [];
  let len = 0;
  const push = p => { const b = typeof p === 'string' ? ascii(p) : p; parts.push(b); len += b.length; };
  const obj = (n, body) => { offsets[n] = len; push(`${n} 0 obj\n`); body(); push('\nendobj\n'); };
  const content = `q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`;
  push('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');
  obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
  obj(2, () => push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'));
  obj(3, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`));
  obj(4, () => {
    push(`<< /Type /XObject /Subtype /Image /Width ${cv.width} /Height ${cv.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`);
    push(jpg);
    push('\nendstream');
  });
  obj(5, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
  const xref = len;
  push('xref\n0 6\n0000000000 65535 f \n');
  for (let n = 1; n <= 5; n++) push(String(offsets[n]).padStart(10, '0') + ' 00000 n \n');
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(parts, { type: 'application/pdf' });
}

function download(blob, name) {
  if (!blob) return;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 30000);
}

// Exposed for local testing only.
window.__trace = { state, buildData, makeTicks, makePng, render };

render();
})();
