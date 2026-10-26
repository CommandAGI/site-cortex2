/**
 * The instrument's page: the 256-hypothesis landscape of a chosen recording window, the sampler that searched it, and
 * the engine's own numbers. Everything is computed here; the landscape comes from the engine's Python code
 * (data/instrument.json, with its code version and seed). No diagnosis, no medical device.
 */
import { anneal, boltzmann, evaluate, exact, gibbs, normalisedIsing, qaoa, tvd } from "./engine.mjs";

const $ = (id) => document.getElementById(id);
const state = { window: "preictal", qubo: "trust_region", selected: 0, counts: null, method: null };
let data = null;

const cell = (k) => document.querySelector(`.cell[data-state="${k}"]`);

const fmt = (x, d = 3) => (Number.isFinite(x) ? x.toFixed(d) : "—");

/** A colour on the lab's own ramp: a low loss (t = 0) is dark (the hypothesis explains the recording), a high loss is pale. */
function ramp(t) {
  const stops = [[18, 32, 49], [8, 170, 167], [191, 227, 223], [243, 244, 239]];
  const x = Math.min(0.999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(x), f = x - i;
  const a = stops[i], b = stops[i + 1];
  return `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * f)).join(",")})`;
}

function drawMap() {
  const w = data.windows[state.window];
  const losses = w.losses;
  const lo = Math.min(...losses), hi = Math.max(...losses);
  const consistent = new Set(w.consistent_set);
  const map = $("map");
  map.replaceChildren();
  for (let k = 0; k < 256; k++) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "cell";
    b.dataset.state = String(k);
    const t = (losses[k] - lo) / (hi - lo || 1);
    b.style.background = ramp(t);
    b.title = `${k.toString(2).padStart(8, "0")} · ${fmt(losses[k])}`;
    b.setAttribute("aria-pressed", String(k === state.selected));
    if (consistent.has(k.toString(2).padStart(8, "0"))) b.style.boxShadow = "inset 0 0 0 2px #5fd4cf";
    b.addEventListener("click", () => { state.selected = k; markSelected(); showDetails(); });
    map.append(b);
  }
  markSelected();
}

function markSelected() {
  for (const el of document.querySelectorAll(".cell")) el.setAttribute("aria-pressed", String(Number(el.dataset.state) === state.selected));
}

function showDetails() {
  const w = data.windows[state.window];
  const k = state.selected;
  const bits = k.toString(2).padStart(8, "0");
  const levels = data.levels_of_state[k];
  const names = data.engine.param_names;
  const levelValues = data.engine.levels.map((row, j) => row[levels[j]]);
  const rank = [...w.losses.keys()].sort((a, b) => w.losses[a] - w.losses[b]).indexOf(k) + 1;
  const inC = w.consistent_set.includes(bits);
  $("details").innerHTML = `
    <p><strong class="mono">${bits}</strong> · loss <span class="mono">${fmt(w.losses[k])}</span> · rank <span class="mono">${rank}/256</span>${inC ? ' · <span class="chip best">consistent</span>' : ""}</p>
    <div class="chips">${names.map((n, j) => `<span class="chip">${n} = <strong>${levelValues[j]}</strong></span>`).join("")}</div>`;
  drawBars(k);
}

/** The features are logs; the bars show the shares a reader can compare: each band's part of the 1–45 Hz power. */
function shares(features) {
  const power = features.slice(0, 10).map((y) => Math.pow(10, y));
  const total = power.reduce((a, b) => a + b, 0) || 1;
  return [...power.map((p) => p / total), Math.pow(10, features[10])];
}

function drawBars(k) {
  const w = data.windows[state.window];
  const names = data.engine.feature_names;
  const obs = shares(w.features), model = shares(data.grid_features[k]);
  const max = Math.max(...obs.slice(0, 10), ...model.slice(0, 10), 1e-9);
  const scale = (v) => Math.max(2, (v / max) * 100);
  $("bars").innerHTML = names
    .map((n, j) => {
      const band = j < 10;
      const label = n.replace("rel_logpow_", "").replace("log_amplitude", "amplitude");
      const value = band ? `${(obs[j] * 100).toFixed(1)}% / ${(model[j] * 100).toFixed(1)}%` : `${fmt(w.features[j], 2)} / ${fmt(data.grid_features[k][j], 2)}`;
      // The amplitude has no share: its bars show the ratio between the two, with the observed one full.
      const modelWidth = band ? scale(model[j]) : Math.max(2, (Math.min(obs[10], model[10]) / Math.max(obs[10], model[10], 1e-9)) * 100);
      return `<div class="bar"><span class="mono" title="${n}">${label}</span>
        <span class="track"><span class="fill-obs" style="width:${band ? scale(obs[j]) : 100}%" title="observed"></span>
        <span class="fill-model" style="width:${modelWidth}%;opacity:.55" title="model"></span></span>
        <span class="v">${value}</span></div>`;
    })
    .join("");
}

function metrics(ev, extra) {
  const w = data.windows[state.window];
  $("metrics").innerHTML = `
    <table><tbody>
      <tr><th>best sampled hypothesis</th><td class="num">${ev.best.state >= 0 ? ev.best.state.toString(2).padStart(8, "0") : "—"}</td></tr>
      <tr><th>its true nonlinear loss</th><td class="num">${fmt(ev.best.loss)}</td></tr>
      <tr><th>the landscape's minimum</th><td class="num">${fmt(Math.min(...w.losses))}</td></tr>
      <tr><th>P(consistent) of the samples</th><td class="num">${fmt(ev.pC, 3)}</td></tr>
      <tr><th>approximation ratio AR</th><td class="num">${fmt(ev.ar, 3)}</td></tr>
      <tr><th>distinct hypotheses seen</th><td class="num">${ev.distinct} / 256</td></tr>
      <tr><th>samples</th><td class="num">${ev.total}</td></tr>
      ${extra}</tbody></table>`;
}

function log(line) {
  const el = $("log");
  el.textContent = `${line}\n${el.textContent}`.slice(0, 4000);
}

function run(method) {
  const t0 = performance.now();
  const w = data.windows[state.window];
  const q = w.qubos[state.qubo];
  const norm = normalisedIsing(q.ising);
  const cost = norm.cost;
  let out, extra = "";
  if (method === "qaoa") {
    out = qaoa(cost, { shots: 1024, seed: 7 });
    extra = `<tr><th>angles (γ, β)</th><td class="num">${fmt(out.gamma, 2)}, ${fmt(out.beta, 2)}</td></tr><tr><th>⟨cost⟩ of the statevector</th><td class="num">${fmt(out.energy, 3)}</td></tr>`;
  } else if (method === "gibbs") {
    out = gibbs(norm.ising, cost, { beta: 2, samples: 2048, seed: 11 });
    extra = `<tr><th>TVD vs the exact Boltzmann distribution (β = 2)</th><td class="num">${fmt(tvd(out.counts, boltzmann(cost, 2)), 3)}</td></tr>`;
  } else if (method === "anneal") {
    out = anneal(q, { chains: 1024, seed: 13 });
  } else {
    out = exact();
  }
  const ev = evaluate(out.counts, w.losses, w.consistent_set);
  metrics(ev, extra);
  log(`${method} · ${state.qubo} · ${state.window} · ${out.shots} samples · ${Math.round(performance.now() - t0)} ms`);
}

async function main() {
  const res = await fetch("/data/instrument.json");
  data = await res.json();
  $("window").addEventListener("change", (e) => { state.window = e.target.value; state.selected = 0; drawMap(); showDetails(); $("metrics").replaceChildren(); });
  $("qubo").addEventListener("change", (e) => { state.qubo = e.target.value; state.selected = 0; drawMap(); showDetails(); $("metrics").replaceChildren(); });
  for (const m of ["qaoa", "gibbs", "anneal", "exact"]) $(`run-${m}`).addEventListener("click", () => run(m));
  drawMap();
  showDetails();
  run("qaoa");
  const w = data.windows[state.window];
  log(`landscape: ${data.engine.name} ${data.engine.commit.slice(0, 7)} · noise seed ${data.engine.noise_seed} · ${data.dataset.id} ${data.dataset.channel} · ${w.label}`);
}
main().catch((e) => { $("log").textContent = String(e); });
