#!/usr/bin/env node
/**
 * Figure 1's data: 260 seconds of a real public recording around its annotated seizure (CHB-MIT chb01_03,
 * 2860–3120 s; the seizure is annotated 2996–3036 s), eight bipolar channels, written as the site serves them.
 *
 *   node scripts/eeg.mjs [--raw <file>]   fetch the seconds by HTTP range from PhysioNet (or read a saved copy of
 *                                         exactly those records), write data/eeg.bin, data/eeg.json, assets/fig1.svg
 *
 * Processing, and nothing else: a 0.5 Hz first-order high-pass (removes the electrode offset), a 63-tap windowed-sinc
 * low-pass at 24 Hz, decimation 256 → 64 Hz, and 3 µV steps in one signed byte (±381 µV, clipped beyond). The recording
 * is under the Open Data Commons Attribution License v1.0; its citation travels in data/eeg.json.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const URL_EDF = "https://physionet.org/files/chbmit/1.0.0/chb01/chb01_03.edf";
const FROM = 2860, TO = 3120, FS = 256, OUT_FS = 64, STEP_UV = 3;
const CHANNELS = ["FP1-F7", "F7-T7", "T7-P7", "P7-O1", "FP2-F8", "F8-T8", "T8-P8", "P8-O2"];
// chb01_03's header (EDF): 23 signals of 256 samples per 1 s record, digital −2048…2047 ↔ −800…800 µV.
const NS = 23, HEADER = 256 + 256 * NS, RECORD = NS * FS * 2;
const LABELS = ["FP1-F7", "F7-T7", "T7-P7", "P7-O1", "FP1-F3", "F3-C3", "C3-P3", "P3-O1", "FP2-F4", "F4-C4", "C4-P4", "P4-O2", "FP2-F8", "F8-T8", "T8-P8", "P8-O2", "FZ-CZ", "CZ-PZ", "P7-T7", "T7-FT9", "FT9-FT10", "FT10-T8", "T8-P8"];
const UV = 1600 / 4095;

async function raw() {
  const i = process.argv.indexOf("--raw");
  if (i > 0) return readFileSync(process.argv[i + 1]);
  const r = await fetch(URL_EDF, { headers: { Range: `bytes=${HEADER + FROM * RECORD}-${HEADER + TO * RECORD - 1}` } });
  if (r.status !== 206) throw Error(`PhysioNet answered ${r.status} to a range request`);
  return Buffer.from(await r.arrayBuffer());
}

function lowpassTaps(n = 63, fc = 24 / FS) {
  const m = (n - 1) / 2, taps = [];
  for (let k = 0; k < n; k++) {
    const x = k - m, sinc = x === 0 ? 2 * fc : Math.sin(2 * Math.PI * fc * x) / (Math.PI * x);
    taps.push(sinc * (0.54 - 0.46 * Math.cos((2 * Math.PI * k) / (n - 1))));
  }
  const s = taps.reduce((a, b) => a + b, 0);
  return taps.map((t) => t / s);
}

export function process_(buf) {
  const seconds = TO - FROM;
  if (buf.length !== seconds * RECORD) throw Error(`expected ${seconds * RECORD} bytes, got ${buf.length}`);
  const taps = lowpassTaps(), m = (taps.length - 1) / 2, n = seconds * FS, outN = n / (FS / OUT_FS);
  const out = new Int8Array(CHANNELS.length * outN);
  CHANNELS.forEach((label, c) => {
    const s = LABELS.indexOf(label), x = new Float64Array(n);
    for (let r = 0; r < seconds; r++)
      for (let k = 0; k < FS; k++) x[r * FS + k] = buf.readInt16LE(r * RECORD + (s * FS + k) * 2) * UV;
    // high-pass: y[k] = a (y[k-1] + x[k] - x[k-1]), a for 0.5 Hz
    const a = 1 / (1 + 2 * Math.PI * 0.5 / FS);
    let y = 0, prev = x[0];
    for (let k = 0; k < n; k++) { y = a * (y + x[k] - prev); prev = x[k]; x[k] = y; }
    for (let j = 0; j < outN; j++) {
      const at = j * (FS / OUT_FS);
      let v = 0;
      for (let t = 0; t < taps.length; t++) v += taps[t] * x[Math.min(n - 1, Math.max(0, at + t - m))];
      out[c * outN + j] = Math.max(-127, Math.min(127, Math.round(v / STEP_UV)));
    }
  });
  return { out, outN };
}

/** Figure 1's poster: the whole 260 s as min–max envelopes, one column per 0.25 s, drawn in the page's colours. */
function poster(out, outN) {
  const W = 1040, rowH = 46, H = CHANNELS.length * rowH + 30, cols = W / 2, per = outN / cols;
  const sx = (s) => ((s - FROM) / (TO - FROM)) * W;
  const rows = CHANNELS.map((label, c) => {
    const mid = 14 + c * rowH + rowH / 2, top = [], bot = [];
    for (let i = 0; i < cols; i++) {
      let lo = 127, hi = -127;
      for (let j = Math.floor(i * per); j < Math.floor((i + 1) * per); j++) { const v = out[c * outN + j]; if (v < lo) lo = v; if (v > hi) hi = v; }
      const k = 0.17; // px per 3 µV step
      top.push(`${i * 2},${Math.round(mid - hi * k)}`);
      bot.push(`${i * 2},${Math.round(mid - lo * k)}`);
    }
    return `<polygon points="${top.join(" ")} ${bot.reverse().join(" ")}"/>`;
  });
  const onset = sx(2996), end = sx(3036);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="none" role="img" aria-label="Eight channels of scalp EEG, 2860 to 3120 seconds of CHB-MIT chb01_03; the annotated seizure, 2996 to 3036 seconds, shows as larger rhythmic waves.">
<rect x="${onset.toFixed(1)}" y="0" width="${(end - onset).toFixed(1)}" height="${H - 24}" fill="#7a2331" fill-opacity=".07"/>
<line x1="${onset.toFixed(1)}" x2="${onset.toFixed(1)}" y1="0" y2="${H - 24}" stroke="#7a2331" stroke-width="1"/>
<g fill="#122031" stroke="#122031" stroke-width=".5" stroke-linejoin="round">${rows.join("")}</g>
</svg>
`;
}

async function main() {
  const { out, outN } = process_(await raw());
  writeFileSync(join(ROOT, "data/eeg.bin"), out);
  writeFileSync(join(ROOT, "data/eeg.json"), JSON.stringify({
    record: "chb01_03", from: FROM, to: TO, fs: OUT_FS, uvPerStep: STEP_UV, channels: CHANNELS, layout: "int8, channel-major: channel c, sample j at c * samples + j", samples: outN,
    seizure: { from: 2996, to: 3036, by: "the dataset's own annotation (chb01-summary.txt)" },
    processing: "0.5 Hz first-order high-pass, 63-tap windowed-sinc low-pass at 24 Hz, 256 → 64 Hz, 3 µV per step, clipped at ±381 µV",
    source: URL_EDF, license: "Open Data Commons Attribution License v1.0",
    citation: "Shoeb AH. Application of Machine Learning to Epileptic Seizure Onset Detection and Treatment. PhD thesis, MIT, 2009; Goldberger AL et al. PhysioBank, PhysioToolkit, and PhysioNet. Circulation 101(23):e215–e220, 2000.",
  }, null, 1) + "\n");
  writeFileSync(join(ROOT, "assets/fig1.svg"), poster(out, outN));
  console.log(`data/eeg.bin: ${CHANNELS.length} × ${outN} samples (${out.length} bytes); assets/fig1.svg`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
