/**
 * The instrument's mathematics, in the browser and in the tests: the 8-bit encoding, the QUBO and its exact Ising
 * map, three samplers (QAOA statevector, block Gibbs, simulated annealing), and the engine's own evaluation.
 *
 * The landscape — the nonlinear loss of all 256 hypotheses for a recording — is computed by the engine's Python code
 * (data/instrument.json, code version and seed in that file). Nothing here changes it: a sampler only chooses which
 * hypotheses to look at, and every sample is scored by re-reading the exact loss. That is the source's rule, and it is
 * the reason a bad approximation shows up as a bad measured number.
 */

/** Bits of an integer state, little-endian: bit i is qubit i (the source's `grid_index`). */
export function stateBits(k, n = 8) {
  return Array.from({ length: n }, (_, i) => (k >> i) & 1);
}
/** The bitstring as Qiskit prints it: big-endian, qubit 0 rightmost. Its index is the integer state. */
export function bitstring(k, n = 8) {
  return k.toString(2).padStart(n, "0");
}
export function indexOfBitstring(s) {
  return parseInt(s, 2);
}

/** E(b) = bᵀQb + linearᵀb + constant (Q symmetric; the diagonal is a linear term because b² = b). */
export function quboEnergy(qubo, k) {
  const b = stateBits(k);
  let e = qubo.constant;
  for (let i = 0; i < 8; i++) {
    if (!b[i]) continue;
    e += qubo.linear[i] + qubo.Q[i][i];
    for (let j = i + 1; j < 8; j++) if (b[j]) e += qubo.Q[i][j] + qubo.Q[j][i];
  }
  return e;
}

/** The exact Ising energy E(z) = offset + Σ h_i z_i + Σ_{i<j} J_ij z_i z_j, with z_i = 1 - 2b_i. */
export function isingEnergy(ising, k) {
  const b = stateBits(k);
  let e = ising.offset;
  for (let i = 0; i < 8; i++) e += ising.h[i] * (1 - 2 * b[i]);
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) e += ising.J[i][j] * (1 - 2 * b[i]) * (1 - 2 * b[j]);
  return e;
}

/** A seeded generator (mulberry32) and a standard normal from it: every run on this page is reproducible. */
export function rng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  next.normal = () => {
    let u = 0, v = 0;
    while (u === 0) u = next();
    while (v === 0) v = next();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  return next;
}

// ── QAOA: an 8-qubit statevector, cost layer exp(-iγC), mixer exp(-iβX), angles from a grid and a local search ──

const N = 256;
const invSqrt = 1 / Math.sqrt(N);

/** The normalised cost the circuit implements: the Ising energy centred and scaled to [-1, 1]. */
export function normalisedCost(ising) {
  const e = Array.from({ length: N }, (_, k) => isingEnergy(ising, k));
  const lo = Math.min(...e), hi = Math.max(...e);
  const mid = (hi + lo) / 2, half = (hi - lo) / 2 || 1;
  return e.map((x) => (x - mid) / half);
}

/**
 * The Ising model scaled the way the circuit's cost is: E'(z) = (E(z) − mid) / half, so that its energy of state k is
 * exactly normalisedCost(ising)[k]. A Gibbs sweep on these fields at β samples p ∝ exp(−β E'), which is the
 * distribution the TVD check measures against.
 */
export function normalisedIsing(ising) {
  const e = Array.from({ length: N }, (_, k) => isingEnergy(ising, k));
  const lo = Math.min(...e), hi = Math.max(...e);
  const mid = (hi + lo) / 2, half = (hi - lo) / 2 || 1;
  return {
    ising: {
      h: ising.h.map((x) => x / half),
      J: ising.J.map((row) => row.map((x) => x / half)),
      offset: (ising.offset - mid) / half,
    },
    cost: e.map((x) => (x - mid) / half),
  };
}

function applyQAOA(cost, gamma, beta) {
  const re = new Float64Array(N).fill(invSqrt), im = new Float64Array(N);
  for (let k = 0; k < N; k++) {
    const c = cost[k];
    const cr = Math.cos(gamma * c), ci = -Math.sin(gamma * c);
    const r = re[k], i = im[k];
    re[k] = r * cr - i * ci;
    im[k] = r * ci + i * cr;
  }
  // exp(-iβX) on each qubit: [[cos β, −i sin β], [−i sin β, cos β]] between the pairs that differ in that bit.
  const cb = Math.cos(beta), sb = Math.sin(beta);
  for (let q = 0; q < 8; q++) {
    const bit = 1 << q;
    for (let k = 0; k < N; k++) {
      if (k & bit) continue;
      const j = k | bit;
      const ar = re[k], ai = im[k], br = re[j], bi = im[j];
      re[k] = ar * cb + bi * sb; im[k] = ai * cb - br * sb;
      re[j] = br * cb + ai * sb; im[j] = bi * cb - ar * sb;
    }
  }
  return { re, im };
}

function expectation(cost, gamma, beta) {
  const { re, im } = applyQAOA(cost, gamma, beta);
  let e = 0;
  for (let k = 0; k < N; k++) e += (re[k] * re[k] + im[k] * im[k]) * cost[k];
  return e;
}

/**
 * QAOA at depth 1 with 12 restarts: a coarse grid over γ, β, then the best point refined by a shrinking search.
 * Returns the sampled states (1024 shots) and the angles. The statevector is exact, so noiseless.
 */
export function qaoa(cost, { shots = 1024, seed = 7, restarts = 12 } = {}) {
  const r = rng(seed);
  let best = { gamma: 0, beta: 0, e: Infinity };
  const grid = 24;
  for (let s = 0; s < restarts; s++) {
    const g0 = s < grid ? (Math.PI * (s + 0.5)) / grid : r() * 2 * Math.PI;
    for (let b = 0; b < grid; b++) {
      const beta = (Math.PI / 2) * ((b + 0.5) / grid);
      const e = expectation(cost, g0, beta);
      if (e < best.e) best = { gamma: g0, beta, e };
    }
  }
  let step = Math.PI / 16;
  for (let it = 0; it < 24; it++) {
    let moved = false;
    for (const [dg, db] of [[step, 0], [-step, 0], [0, step], [0, -step]]) {
      const e = expectation(cost, best.gamma + dg, best.beta + db);
      if (e < best.e - 1e-12) { best = { gamma: best.gamma + dg, beta: best.beta + db, e }; moved = true; }
    }
    if (!moved) step /= 2;
  }
  const { re, im } = applyQAOA(cost, best.gamma, best.beta);
  const probs = new Float64Array(N);
  for (let k = 0; k < N; k++) probs[k] = re[k] * re[k] + im[k] * im[k];
  const counts = sampleFrom(probs, shots, r);
  return { counts, shots, gamma: best.gamma, beta: best.beta, energy: best.e, probs };
}

/** Draw `shots` samples from a distribution over the 256 states (inverse CDF, seeded). */
export function sampleFrom(probs, shots, r = rng(1)) {
  const cdf = new Float64Array(N);
  let acc = 0;
  for (let k = 0; k < N; k++) { acc += probs[k]; cdf[k] = acc; }
  const counts = new Map();
  for (let s = 0; s < shots; s++) {
    const u = r() * acc;
    let lo = 0, hi = N - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cdf[mid] < u) lo = mid + 1; else hi = mid; }
    counts.set(lo, (counts.get(lo) ?? 0) + 1);
  }
  return counts;
}

// ── samplers on the Ising model: block Gibbs (the thermodynamic sampler) and simulated annealing ──

/** Exact Boltzmann distribution at inverse temperature β over the normalised cost (for the TVD check). */
export function boltzmann(cost, beta) {
  const w = cost.map((c) => Math.exp(-beta * c));
  const z = w.reduce((a, b) => a + b, 0);
  return w.map((x) => x / z);
}

/**
 * Single-site block Gibbs on the Ising model, as the source's thermodynamic sampler does on CPU: 16 chains, 200
 * warm-up sweeps, one sweep between samples. `bias` and `weight` are the Ising fields the sampler sees (−h, −J).
 */
export function gibbs(ising, cost, { beta = 2, chains = 16, warmup = 200, between = 4, samples = 1024, seed = 11 } = {}) {
  const r = rng(seed);
  const h = ising.h, J = ising.J;
  const counts = new Map();
  const states = Array.from({ length: chains }, () => (r() * N) | 0);
  const field = (k, q) => { // local field at qubit q for state k, in the z convention
    let s = h[q];
    for (let j = 0; j < 8; j++) if (j !== q) s += J[Math.min(q, j)][Math.max(q, j)] * (1 - 2 * ((k >> j) & 1));
    return s;
  };
  const sweep = (k) => {
    for (let q = 0; q < 8; q++) {
      const s = field(k, q);
      const pPlus = 1 / (1 + Math.exp(2 * beta * s));
      const bit = r() < pPlus ? 0 : 1; // z=+1 is bit 0
      k = (k & ~(1 << q)) | (bit << q);
    }
    return k;
  };
  for (let c = 0; c < chains; c++) for (let i = 0; i < warmup; i++) states[c] = sweep(states[c]);
  const total = Math.floor(samples / chains);
  for (let s = 0; s < total; s++)
    for (let c = 0; c < chains; c++) {
      for (let i = 0; i < between; i++) states[c] = sweep(states[c]);
      counts.set(states[c], (counts.get(states[c]) ?? 0) + 1);
    }
  return { counts, shots: total * chains };
}

/** Single-flip Metropolis annealing on the QUBO, 1024 chains, 60 sweeps, geometric temperature (the source's). */
export function anneal(qubo, { chains = 1024, sweeps = 60, t0 = 2, t1 = 0.02, seed = 13 } = {}) {
  const r = rng(seed);
  const counts = new Map();
  const E = (k) => quboEnergy(qubo, k);
  const scale = Math.max(...Array.from({ length: N }, (_, k) => Math.abs(E(k))), 1e-9);
  const temps = Array.from({ length: sweeps }, (_, s) => t0 * Math.pow(t1 / t0, s / Math.max(1, sweeps - 1)));
  const states = Array.from({ length: chains }, () => (r() * N) | 0);
  const energies = states.map(E);
  for (const T of temps)
    for (let c = 0; c < chains; c++) {
      const q = (r() * 8) | 0;
      const k = states[c] ^ (1 << q);
      const e = E(k), d = e - energies[c];
      if (d <= 0 || r() < Math.exp(-d / (scale * T))) { states[c] = k; energies[c] = e; }
    }
  for (const k of states) counts.set(k, (counts.get(k) ?? 0) + 1);
  return { counts, shots: chains };
}

/** Exact enumeration: every state once (the floor every sampler must beat). */
export function exact() {
  const counts = new Map();
  for (let k = 0; k < N; k++) counts.set(k, 1);
  return { counts, shots: N };
}

// ── evaluation: every sample re-scored with the exact nonlinear loss (the source's rule) ──

/**
 * The engine's metrics over a window's exact landscape: expected loss, the probability mass on the consistent set,
 * and the approximation ratio AR (1 = all the mass on the optimum, 0 = no better than uniform).
 */
export function evaluate(counts, losses, consistentSet) {
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  let expected = 0, pC = 0, best = { state: -1, loss: Infinity };
  const uniform = losses.reduce((a, b) => a + b, 0) / losses.length;
  const min = Math.min(...losses);
  const consistent = new Set(consistentSet.map(indexOfBitstring));
  for (const [k, n] of counts) {
    const p = n / total;
    expected += p * losses[k];
    if (consistent.has(k)) pC += p;
    if (losses[k] < best.loss) best = { state: k, loss: losses[k], p };
  }
  const ar = uniform === min ? 1 : (uniform - expected) / (uniform - min);
  return { expected, pC, ar, best, distinct: counts.size, total };
}

/** Total variation distance between two count maps' distributions. */
export function tvd(counts, probs) {
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  let d = 0;
  for (let k = 0; k < N; k++) d += Math.abs((counts.get(k) ?? 0) / total - probs[k]);
  return d / 2;
}
