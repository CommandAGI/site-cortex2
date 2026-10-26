#!/usr/bin/env node
/**
 * media-src/ (fal's raw output, gitignored) → assets/media/ (what the site serves).
 *
 *   FFMPEG=<an ffmpeg with libaom, libx264, libwebp> node scripts/encode.mjs
 *
 * Every clip is graded to the site's palette, cut to a loop, encoded twice (AV1 first, H.264 for the browsers without
 * it), given a WebP poster (its first frame), and checked for flashes: the mean luminance of consecutive frames may
 * not swing by more than 10% of full scale more than 3 times in any second (WCAG 2.3.1; Cortex Squared's readers
 * include people with epilepsy). A clip that fails is not written.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "media-src"), OUT = join(ROOT, "assets/media");
const FFMPEG = process.env.FFMPEG || "ffmpeg";

// grade: the site's palette; loop: "pingpong" plays forward then back, "once" ends on its last frame.
const CLIPS = [
  { name: "plate-darkfield", grade: "hue=h=-28:s=0.78,eq=contrast=1.06:brightness=-0.02,noise=alls=7:allf=t", loop: "pingpong" },
  { name: "plate-ink", grade: "eq=saturation=0.92:contrast=1.03,noise=alls=4:allf=t", loop: "once" },
  { name: "plate-regimes", grade: "hue=s=0.85,noise=alls=6:allf=t", loop: "pingpong" },
];
const STILLS = [
  { name: "fig-pyramidal", crop: "iw:ih*0.88:0:0", widths: [560, 1120] },
  { name: "fig-circuit", crop: "iw*0.9:ih*0.9:iw*0.08:ih*0.04", widths: [560, 1120] },
];

const ff = (args) => execFileSync(FFMPEG, ["-loglevel", "error", "-y", ...args], { maxBuffer: 1 << 28 });

/** Frame-mean luminance swings over 10% of full scale, counted per one-second window: the most in any window. */
export function flashes(file) {
  const W = 32, H = 18, fps = 24;
  const raw = execFileSync(FFMPEG, ["-loglevel", "error", "-i", file, "-vf", `fps=${fps},scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
  const means = [];
  for (let o = 0; o + W * H <= raw.length; o += W * H) { let s = 0; for (let k = 0; k < W * H; k++) s += raw[o + k]; means.push(s / (W * H) / 255); }
  const swings = means.slice(1).map((m, i) => Math.abs(m - means[i]) > 0.1);
  let worst = 0;
  for (let i = 0; i < swings.length; i++) worst = Math.max(worst, swings.slice(i, i + fps).filter(Boolean).length);
  return worst;
}

function clip(c) {
  const src = join(SRC, `${c.name}.mp4`), base = join(OUT, c.name);
  const vf = `${c.grade},scale=1280:-2,fps=24`;
  const loop = c.loop === "pingpong" ? `[0:v]${vf},split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]` : `[0:v]${vf}[v]`;
  ff(["-i", src, "-filter_complex", loop, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart", `${base}.h264.mp4`]);
  const worst = flashes(`${base}.h264.mp4`);
  if (worst > 3) throw Error(`${c.name}: ${worst} luminance swings in one second (at most 3)`);
  ff(["-i", `${base}.h264.mp4`, "-an", "-c:v", "libaom-av1", "-crf", "40", "-b:v", "0", "-cpu-used", "6", "-row-mt", "1", "-pix_fmt", "yuv420p", "-movflags", "+faststart", `${base}.av1.mp4`]);
  ff(["-i", `${base}.h264.mp4`, "-frames:v", "1", "-c:v", "libwebp", "-quality", "72", `${base}.webp`]);
  return { name: c.name, flashes: worst, bytes: Object.fromEntries(["av1.mp4", "h264.mp4", "webp"].map((x) => [x, statSync(`${base}.${x}`).size])) };
}

function still(s) {
  return { name: s.name, bytes: Object.fromEntries(s.widths.map((w) => {
    const out = join(OUT, `${s.name}-${w}.webp`);
    ff(["-i", join(SRC, `${s.name}.png`), "-vf", `crop=${s.crop},scale=${w}:-2`, "-c:v", "libwebp", "-quality", "74", out]);
    return [w, statSync(out).size];
  })) };
}

function main() {
  mkdirSync(OUT, { recursive: true });
  const report = { clips: CLIPS.map(clip), stills: STILLS.map(still) };
  writeFileSync(join(ROOT, "redesign/encode-report.json"), JSON.stringify(report, null, 1) + "\n");
  console.log(JSON.stringify(report, null, 1));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
