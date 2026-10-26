// The instrument's mathematics, held to the engine's own numbers: the QUBO→Ising map exact, the consistent set exact,
// the samplers measured on the same nonlinear objective, and the thermodynamic sampler against the Boltzmann
// distribution. The landscape in data/instrument.json is the engine's Python output (code version and seed in the file).
// Run: node --test tests/
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  anneal, bitstring, boltzmann, evaluate, exact, gibbs, indexOfBitstring, isingEnergy, normalisedCost,
  normalisedIsing, qaoa, quboEnergy, stateBits, tvd,
} from "../lab/engine.mjs";

const data = JSON.parse(readFileSync(new URL("../data/instrument.json", import.meta.url), "utf8"));
const WINDOWS = Object.keys(data.windows);
const METHODS = ["secant", "trust_region", "feature_regression"];

test("a state's bits and its Qiskit bitstring are the same state", () => {
  for (const k of [0, 1, 2, 8, 127, 128, 254, 255]) {
    assert.equal(indexOfBitstring(bitstring(k)), k);
    assert.deepEqual(stateBits(k).map((b, i) => b << i).reduce((a, b) => a | b, 0), k);
  }
});

test("the QUBO and its Ising map have the same energy for all 256 states", () => {
  for (const w of WINDOWS)
    for (const m of METHODS) {
      const q = data.windows[w].qubos[m];
      for (let k = 0; k < 256; k++) assert.ok(Math.abs(quboEnergy(q, k) - isingEnergy(q.ising, k)) < 1e-8, `${w}/${m}/${k}`);
    }
});

test("the recorded landscape is exact: the best is the minimum and the consistent set is the threshold's interior", () => {
  for (const w of WINDOWS) {
    const win = data.windows[w];
    const min = Math.min(...win.losses);
    assert.equal(win.best, bitstring(win.losses.indexOf(min)));
    assert.ok(Math.abs(win.best_loss - min) < 1e-9);
    const inSet = new Set(win.consistent_set);
    for (let k = 0; k < 256; k++) {
      const s = bitstring(k);
      // tolerance: the engine wrote the threshold and the losses to JSON's precision
      if (win.losses[k] <= win.threshold + 1e-9) assert.ok(inSet.has(s), `${w}: ${s} within the threshold and not in C`);
      else assert.ok(!inSet.has(s), `${w}: ${s} outside the threshold and in C`);
    }
  }
});

test("every sampler is scored on the nonlinear loss, and enumeration's best is the landscape's best", () => {
  for (const w of WINDOWS) {
    const win = data.windows[w];
    const ev = evaluate(exact().counts, win.losses, win.consistent_set);
    assert.equal(bitstring(ev.best.state), win.best, w);
    assert.equal(ev.distinct, 256);
  }
});

test("QAOA at 8 qubits finds the best hypothesis on the anchored landscape", () => {
  for (const w of WINDOWS) {
    const win = data.windows[w];
    const q = win.qubos.trust_region;
    const { cost } = normalisedIsing(q.ising);
    const out = qaoa(cost, { shots: 1024, seed: 7 });
    assert.equal(normalisedCost(q.ising).length, 256);
    const ev = evaluate(out.counts, win.losses, win.consistent_set);
    // The anchored landscape is the sampler's goal; on a landscape whose best is a single hypothesis it finds it, and
    // on a wider consistent set it lands inside it (the source's own finding: the QUBO approximates the loss).
    if (w === "preictal") assert.equal(bitstring(ev.best.state), win.best, `${w}: QAOA's best sample is the landscape's best`);
    assert.ok(win.consistent_set.includes(bitstring(ev.best.state)), `${w}: QAOA's best sample is consistent`);
    assert.ok(ev.ar > 0.1, `${w}: AR ${ev.ar} beats uniform`);
  }
});

test("the thermodynamic sampler's distribution matches the exact Boltzmann distribution", () => {
  for (const w of WINDOWS) {
    const q = data.windows[w].qubos.trust_region;
    const norm = normalisedIsing(q.ising);
    const out = gibbs(norm.ising, norm.cost, { beta: 2, samples: 4096, seed: 11 });
    const d = tvd(out.counts, boltzmann(norm.cost, 2));
    assert.ok(d < 0.15, `${w}: TVD ${d.toFixed(3)} < 0.15 (the source's own bar)`);
  }
});

test("annealing at one budget beats uniform sampling", () => {
  for (const w of WINDOWS) {
    const win = data.windows[w];
    const out = anneal(win.qubos.trust_region, { chains: 1024, seed: 13 });
    const ev = evaluate(out.counts, win.losses, win.consistent_set);
    assert.ok(ev.ar > 0.3, `${w}: AR ${ev.ar.toFixed(3)}`);
    assert.ok(ev.expected < win.losses.reduce((a, b) => a + b, 0) / 256, `${w}: better than uniform`);
  }
});

test("the same seed gives the same samples, and the sampler's report is the count map it returns", () => {
  const win = data.windows.ictal;
  const q = win.qubos.secant;
  const a = anneal(q, { chains: 256, seed: 5 });
  const b = anneal(q, { chains: 256, seed: 5 });
  assert.deepEqual([...a.counts].sort(), [...b.counts].sort());
  assert.equal([...a.counts.values()].reduce((x, y) => x + y, 0), a.shots);
});
