// Figure 2, "Scrub the recording": the home page's signature (redesign/DESIGN.md § the signature moment).
// (a) the recording itself (data/eeg.bin, a real public EEG), (b) and (c) the cortex² engine's own output for the three
// windows it scored (data/instrument.json), (d) the engine's Wilson–Cowan equations integrated here at the inferred
// parameters. Between the windows the panels say "not analysed": nothing is interpolated or invented.
// Scroll-linked on wide screens with motion allowed; the range input and the window buttons work everywhere.

const root = document.getElementById("fig2");
const range = document.getElementById("fig2-t");
const out = document.getElementById("fig2-out");
const read = document.getElementById("fig2-read");
const L = JSON.parse(root.dataset.i18n);
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const wide = matchMedia("(min-width: 1000px)");

const INK = "#122031", INK2 = "#4b5566", OX = "#7a2331", TEAL = "#08aaa7", RULE = "#c9ccc4", PAPER = "#f3f4ef";
const WINDOWS = [["preictal", 2900, 2960], ["ictal", 2996, 3036], ["postictal", 3040, 3100]];
const SVG = "http://www.w3.org/2000/svg";

const [meta, eeg, inst] = await Promise.all([
  fetch("/data/eeg.json").then((r) => r.json()),
  fetch("/data/eeg.bin").then((r) => r.arrayBuffer()).then((b) => new Int8Array(b)),
  fetch("/data/instrument.json").then((r) => r.json()),
]);

let t = Number(range.value), shown = null, simAnim = 0;

const windowAt = (s) => WINDOWS.findIndex(([, a, b]) => s >= a && s <= b);
const fmt = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k]);
const el = (name, attrs = {}, text) => { const e = document.createElementNS(SVG, name); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); if (text != null) e.textContent = text; return e; };

function fitCanvas(c) {
  const r = c.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
  const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
  if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  const ctx = c.getContext("2d");
  return { ctx, w, h, dpr };
}

// (a) ten seconds of all eight channels; T7-P7 (the engine's channel) in ink, the others in grey
function drawEeg() {
  const c = document.getElementById("fig2-eeg");
  const { ctx, w, h, dpr } = fitCanvas(c);
  const fs = meta.fs, n = meta.samples, span = 10, a = t - span / 2;
  ctx.clearRect(0, 0, w, h);
  const x = (s) => ((s - a) / span) * w;
  // the annotated seizure and the scored windows
  ctx.fillStyle = "rgba(122,35,49,.08)"; ctx.fillRect(x(meta.seizure.from), 0, x(meta.seizure.to) - x(meta.seizure.from), h);
  ctx.font = `${10 * dpr}px "Fragment Mono", monospace`; ctx.textBaseline = "top";
  for (const [, s0, s1] of WINDOWS) { ctx.fillStyle = TEAL; ctx.fillRect(x(s0), 0, x(s1) - x(s0), 2 * dpr); }
  if (a < meta.seizure.from && a + span > meta.seizure.from) { ctx.fillStyle = OX; ctx.fillText(L.seizure, x(meta.seizure.from) + 4 * dpr, 6 * dpr); }
  const rows = meta.channels.length, rh = h / rows;
  for (let ch = 0; ch < rows; ch++) {
    const mid = rh * (ch + 0.5), k = (rh * 0.9) / 127 * 1.6;
    ctx.strokeStyle = ch === 2 ? INK : "rgba(75,85,102,.55)"; ctx.lineWidth = (ch === 2 ? 1.4 : 0.9) * dpr;
    ctx.beginPath();
    const j0 = Math.max(0, Math.floor((a - meta.from) * fs)), j1 = Math.min(n - 1, Math.ceil((a + span - meta.from) * fs));
    for (let j = j0; j <= j1; j++) {
      const px = x(meta.from + j / fs), py = mid - eeg[ch * n + j] * k;
      j === j0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = ch === 2 ? INK : INK2; ctx.fillText(meta.channels[ch], 4 * dpr, mid - rh * 0.42);
  }
  // the cursor
  ctx.strokeStyle = OX; ctx.lineWidth = 1.5 * dpr; ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
  for (let s = Math.ceil(a); s <= a + span; s++) { ctx.fillStyle = INK2; ctx.fillRect(x(s), h - 4 * dpr, 1, 4 * dpr); }
}

// (b) the recording's ten band powers (●) against the best hypothesis's (○), joined by the residual
function drawSpec(win) {
  const svg = document.getElementById("fig2-spec");
  svg.replaceChildren();
  const w = inst.windows[win], best = parseInt(w.best, 2), model = inst.grid_features[best];
  // one user unit per CSS pixel, so the labels stay legible on a phone
  const W = Math.round(svg.getBoundingClientRect().width) || 520;
  svg.setAttribute("viewBox", `0 0 ${W} 250`);
  const edges = inst.engine.band_edges_hz, n = 10, x0 = 92, x1 = W - 14, top = 8, rh = 22;
  const vals = [...w.features.slice(0, n), ...model.slice(0, n)], lo = Math.min(...vals) - 0.15, hi = Math.max(...vals) + 0.15;
  const X = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
  svg.append(el("line", { x1: x0, x2: x1, y1: top + n * rh, y2: top + n * rh, stroke: INK, "stroke-width": 1 }));
  for (let i = 0; i < n; i++) {
    const y = top + i * rh + rh / 2;
    svg.append(el("text", { x: 0, y: y + 4, fill: INK2, "font-size": 10, "font-family": "Fragment Mono, monospace" }, `${edges[i].toFixed(1)}–${edges[i + 1].toFixed(1)} Hz`));
    svg.append(el("line", { x1: x0, x2: x1, y1: y, y2: y, stroke: RULE, "stroke-width": 0.6 }));
    svg.append(el("line", { x1: X(w.features[i]), x2: X(model[i]), y1: y, y2: y, stroke: OX, "stroke-width": 1.2 }));
    svg.append(el("circle", { cx: X(model[i]), cy: y, r: 5, fill: PAPER, stroke: TEAL, "stroke-width": 2, "stroke-dasharray": "2 1.5" }));
    svg.append(el("circle", { cx: X(w.features[i]), cy: y, r: 3.6, fill: INK }));
  }
  svg.append(el("text", { x: x0, y: top + n * rh + 16, fill: INK2, "font-size": 10, "font-family": "Fragment Mono, monospace" }, "relative log power →"));
}

// (c) the 256 hypotheses as a 16 × 16 field (dark = explains the window), the consistent set ringed, the path of bests
function drawLand(win) {
  const svg = document.getElementById("fig2-land");
  svg.replaceChildren();
  const w = inst.windows[win], losses = w.losses, lo = Math.min(...losses), hi = Math.max(...losses);
  const cs = new Set(w.consistent_set), S = 20, ox = 10, oy = 10;
  const stops = [[18, 32, 49], [8, 170, 167], [191, 227, 223], [243, 244, 239]];
  const ramp = (u) => { const x = Math.min(0.999, Math.max(0, u)) * 3, i = Math.floor(x), f = x - i; return `rgb(${stops[i].map((v, j) => Math.round(v + (stops[i + 1][j] - v) * f)).join(",")})`; };
  const pos = (k) => [ox + (k % 16) * S + S / 2, oy + Math.floor(k / 16) * S + S / 2];
  const g = el("g");
  for (let k = 0; k < 256; k++) {
    const [cx, cy] = pos(k);
    g.append(el("rect", { x: cx - S / 2, y: cy - S / 2, width: S - 1, height: S - 1, fill: ramp(Math.sqrt((losses[k] - lo) / (hi - lo || 1))) }));
    if (cs.has(k.toString(2).padStart(8, "0"))) g.append(el("rect", { x: cx - S / 2 + 2, y: cy - S / 2 + 2, width: S - 5, height: S - 5, fill: "none", stroke: "#5fd4cf", "stroke-width": 1.5 }));
  }
  svg.append(g);
  const bests = WINDOWS.map(([name]) => parseInt(inst.windows[name].best, 2));
  const pts = bests.map(pos);
  svg.append(el("polyline", { points: pts.map((p) => p.join(",")).join(" "), fill: "none", stroke: OX, "stroke-width": 2, "stroke-dasharray": "4 3" }));
  bests.forEach((k, i) => {
    const [cx, cy] = pos(k), on = WINDOWS[i][0] === win;
    svg.append(el("circle", { cx, cy, r: on ? 7 : 4, fill: on ? OX : PAPER, stroke: OX, "stroke-width": 2 }));
  });
  // the inferred parameters, in the engine's units
  const levels = inst.levels_of_state[parseInt(w.best, 2)];
  const vals = inst.engine.levels.map((row, j) => row[levels[j]]);
  const units = ["", "", "", " ms"];
  L.names.forEach((name, j) => {
    const x = ox + j * 82, y = oy + 16 * S + 22;
    svg.append(el("text", { x, y, fill: INK2, "font-size": 10, "font-family": "Fragment Mono, monospace" }, name));
    svg.append(el("text", { x, y: y + 20, fill: INK, "font-size": 16, "font-family": "Fragment Mono, monospace" }, `${vals[j]}${units[j]}`));
    for (let l = 0; l < 4; l++) svg.append(el("rect", { x: x + l * 12, y: y + 28, width: 10, height: 4, fill: l <= levels[j] ? TEAL : RULE }));
  });
}

// (d) the engine's Wilson–Cowan column (upstream/research/backend/cortex2/neural.py), Euler–Maruyama at 2 kHz, own noise
function simulate([P, c2, c1, tauMs]) {
  const fs = 2000, steps = 3 * fs, skip = fs, dt = 1 / fs, te = tauMs / 1000, ti = te * 1.6;
  const sig = (x, a, th) => 1 / (1 + Math.exp(-a * (x - th))) - 1 / (1 + Math.exp(a * th));
  let seed = 7 >>> 0;
  const rand = () => { seed = (seed + 0x6d2b79f5) >>> 0; let r = Math.imul(seed ^ (seed >>> 15), 1 | seed); r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r; return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  const normal = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  let e = 0.1, i = 0.05;
  const outv = new Float32Array(steps - skip);
  for (let k = 0; k < steps; k++) {
    const de = (-e + (1 - e) * sig(c1 * e - c2 * i + P + normal() * 0.35, 1.3, 4)) / te;
    const di = (-i + (1 - i) * sig(15 * e - 3 * i, 2, 3.7)) / ti;
    e += dt * de; i += dt * di;
    if (k >= skip) outv[k - skip] = e;
  }
  return outv;
}

function drawSim(win, progress = 1) {
  const c = document.getElementById("fig2-sim");
  const { ctx, w, h, dpr } = fitCanvas(c);
  ctx.clearRect(0, 0, w, h);
  const x = SIMS[win];
  const pad = 10 * dpr, n = Math.floor(x.length * progress);
  ctx.strokeStyle = RULE; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(0, h - 1); ctx.lineTo(w, h - 1); ctx.stroke();
  ctx.strokeStyle = TEAL; ctx.lineWidth = 1.6 * dpr; ctx.beginPath();
  for (let k = 0; k < n; k += 2) {
    const px = (k / x.length) * w, py = h - pad - ((x[k] - lo) / (hi - lo || 1)) * (h - 2 * pad);
    k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.font = `${10 * dpr}px "Fragment Mono", monospace`; ctx.fillStyle = INK2; ctx.textBaseline = "top";
  ctx.fillText("E(t) · 0–2 s", 4 * dpr, 4 * dpr);
}

// one y-scale for the three windows, so the panels compare honestly
const SIMS = Object.fromEntries(WINDOWS.map(([name]) => {
  const levels = inst.levels_of_state[parseInt(inst.windows[name].best, 2)];
  return [name, simulate(inst.engine.levels.map((row, j) => row[levels[j]]))];
}));
let lo = Infinity, hi = -Infinity;
for (const x of Object.values(SIMS)) for (const v of x) { if (v < lo) lo = v; if (v > hi) hi = v; }

function animateSim(win) {
  cancelAnimationFrame(simAnim);
  if (reduce.matches) return drawSim(win, 1);
  const start = performance.now();
  const step = (now) => { const p = Math.min(1, (now - start) / 900); drawSim(win, p); if (p < 1) simAnim = requestAnimationFrame(step); };
  simAnim = requestAnimationFrame(step);
}

function render() {
  out.textContent = `${Math.round(t)} s`;
  range.value = String(Math.round(t));
  drawEeg();
  const i = windowAt(t);
  for (const b of root.querySelectorAll("[data-jump]")) b.setAttribute("aria-pressed", String(windowAt(Number(b.dataset.jump)) === i));
  const key = i < 0 ? null : WINDOWS[i][0];
  for (const f of root.querySelectorAll(".p-spec, .p-land, .p-sim")) f.dataset.idle = String(key === null);
  // the readout names the second, so it changes on every second outside the windows
  if (key === null) read.textContent = fmt(L.none, { t: Math.round(t) });
  if (key === shown) return;
  shown = key;
  if (key === null) return;
  const w = inst.windows[key], levels = inst.levels_of_state[parseInt(w.best, 2)];
  const vals = inst.engine.levels.map((row, j) => row[levels[j]]);
  read.textContent = fmt(L.win, {
    w: L.windows[i], a: WINDOWS[i][1], b: WINDOWS[i][2], bits: w.best, loss: w.best_loss.toFixed(2), n: w.consistent_set.length,
    params: L.names.map((name, j) => `${name} ${vals[j]}${j === 3 ? " ms" : ""}`).join(", "),
  });
  drawSpec(key); drawLand(key); animateSim(key);
}

// scroll linking: the track's progress is the time
const track = root.querySelector(".track");
const linked = () => wide.matches && !reduce.matches;
function fromScroll() {
  if (!linked()) return;
  const r = track.getBoundingClientRect(), total = r.height - innerHeight;
  if (total <= 0) return;
  const p = Math.min(1, Math.max(0, -r.top / total));
  t = meta.from + p * (meta.to - meta.from);
  render();
}
function toScroll(s) {
  if (!linked()) return;
  const r = track.getBoundingClientRect(), total = r.height - innerHeight;
  const y = scrollY + r.top + ((s - meta.from) / (meta.to - meta.from)) * total;
  scrollTo({ top: y, behavior: "instant" });
}
function setLinked() { root.classList.toggle("linked", linked()); }
setLinked();
wide.addEventListener("change", setLinked);
reduce.addEventListener("change", setLinked);
let queued = false;
addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; fromScroll(); }); } }, { passive: true });
addEventListener("resize", () => { drawEeg(); if (shown) { drawSpec(shown); drawLand(shown); cancelAnimationFrame(simAnim); drawSim(shown, 1); } });
range.addEventListener("input", () => { t = Number(range.value); toScroll(t); render(); });
for (const b of root.querySelectorAll("[data-jump]")) b.addEventListener("click", () => { t = Number(b.dataset.jump); toScroll(t); render(); });

if (linked() && track.getBoundingClientRect().top < 0) fromScroll(); else render();
