/*
  Music-box sound. Each node has its own pitch on a pentatonic scale,
  so opening many steps in a row stacks into a small melody.
  Pure Web Audio — no sound files.
*/
window.MusicBox = (() => {
  const KEY = 'la-sound';
  const SCALE = [0, 2, 4, 7, 9]; // major pentatonic
  const BASE = 77; // F5 — high, like a comb of metal tines
  let ctx = null;
  let master = null;
  let on = true;
  try { on = localStorage.getItem(KEY) !== 'off'; } catch (e) { /* storage blocked */ }

  function init() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.32;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp);
    comp.connect(ctx.destination);

    // a soft echo so repeated clicks blur into each other
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.26;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3000;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;
    const wet = ctx.createGain();
    wet.gain.value = 0.2;
    master.connect(delay);
    delay.connect(tone);
    tone.connect(feedback);
    feedback.connect(delay);
    tone.connect(wet);
    wet.connect(comp);
  }

  function hz(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

  function midiForStep(k) {
    const n = ((k % 12) + 12) % 12;
    return BASE + 12 * Math.floor(n / 5) + SCALE[n % 5];
  }

  // one tine: fundamental + octave + a short inharmonic "ping"
  function tine(freq, delay = 0, vel = 1) {
    if (!on) return;
    init();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime + 0.01 + delay;
    const partials = [
      [1, 0.5, 2.6],
      [2, 0.12, 1.1],
      [5.2, 0.05, 0.22],
    ];
    for (const [mul, g, decay] of partials) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = freq * mul;
      const e = ctx.createGain();
      e.gain.setValueAtTime(0.0001, t);
      e.gain.exponentialRampToValueAtTime(g * vel, t + 0.004);
      e.gain.exponentialRampToValueAtTime(0.0001, t + decay);
      o.connect(e);
      e.connect(master);
      o.start(t);
      o.stop(t + decay + 0.05);
    }
  }

  // a tram bell: a struck metal cup, bright inharmonic partials, long ring
  function bell(delay = 0, vel = 1) {
    if (!on) return;
    init();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime + 0.01 + delay;
    const f = 1180;
    const partials = [
      [1, 0.34, 1.6],
      [2.32, 0.16, 1.1],
      [4.25, 0.08, 0.6],
      [6.63, 0.04, 0.3],
    ];
    for (const [mul, g, decay] of partials) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f * mul;
      const e = ctx.createGain();
      e.gain.setValueAtTime(0.0001, t);
      e.gain.exponentialRampToValueAtTime(g * vel, t + 0.002);
      e.gain.exponentialRampToValueAtTime(0.0001, t + decay);
      o.connect(e);
      e.connect(master);
      o.start(t);
      o.stop(t + decay + 0.05);
    }
  }

  // wheels over a rail joint: ta-tan
  function clack(delay = 0, vel = 1) {
    if (!on) return;
    init();
    if (!ctx) return;
    const t = ctx.currentTime + 0.01 + delay;
    const len = Math.floor(ctx.sampleRate * 0.05);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 900;
    bp.Q.value = 1.2;
    const e = ctx.createGain();
    e.gain.value = 0.5 * vel;
    src.connect(bp);
    bp.connect(e);
    e.connect(master);
    src.start(t);
  }

  // the tune a work's process plays, one note per node: a little departure
  // melody of the station kind, on the same pentatonic comb (loops if long)
  const TUNE = [76, 79, 81, 84, 81, 79, 76, 74, 76, 79, 84, 86, 88, 86, 84, 81, 79, 81, 84, 81, 79, 76, 74, 72];

  function stepFor(node) { return (node.depth || 0) * 2 + (node.index || 0); }

  return {
    get on() { return on; },
    toggle() {
      on = !on;
      try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) { /* ignore */ }
      if (on) tine(hz(midiForStep(4)), 0, 0.7);
      return on;
    },
    node(node, delay = 0, vel = 1) { tine(hz(midiForStep(stepFor(node))), delay, vel); },
    // children appearing: ding, ding, ding…
    arpeggio(nodes) { nodes.forEach((n, i) => this.node(n, 0.09 + i * 0.085, 0.55)); },
    // two nodes joined by the visitor
    chord(a, b) { this.node(a, 0, 0.8); this.node(b, 0.06, 0.8); tine(hz(midiForStep(stepFor(a) + stepFor(b) + 5)), 0.14, 0.5); },
    low() { tine(hz(BASE - 12), 0, 0.35); },
    // a work playing out: ding-ding, the tune, rail joints between weeks, ding
    depart(delay = 0) { bell(delay, 0.9); bell(delay + 0.2, 0.75); },
    melody(i, strong) {
      const m = TUNE[i % TUNE.length];
      tine(hz(m), 0, strong ? 0.85 : 0.6);
      if (strong) tine(hz(m - 12), 0.01, 0.4);
    },
    rail() { clack(0, 0.9); clack(0.11, 0.6); },
    arrive() { bell(0.05, 0.7); },
  };
})();
