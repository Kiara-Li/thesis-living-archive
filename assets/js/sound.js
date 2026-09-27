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
  };
})();
