#!/usr/bin/env node
/**
 * The site's generated media, made once on a maintainer's machine (never in a visitor's browser): fal's models make the
 * raw stills and clips into media-src/ (gitignored), and scripts/encode.mjs turns them into what the site serves.
 *
 *   COMMANDAGI_ENV_ROOT=<checkout> node scripts/media.mjs [name …]   make the named items (all missing ones by default)
 *
 * The key is the service account field SVC__FAL__MAIN__API_KEY of the .env cascade under COMMANDAGI_ENV_ROOT. It is
 * read here and sent only to fal; it is never written, logged or shipped. Each call's model, prompt, seed and price
 * is appended to redesign/media-log.jsonl, which redesign/NOTES.md sums.
 */
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "media-src");
const LOG = join(ROOT, "redesign/media-log.jsonl");

// The art direction every prompt shares: a darkfield microscope and a printed plate, never a person, never a screen.
const LOOK = "slow, calm, steady motion, no flicker, no flashes, no cuts, no text, no people, fine film grain";

export const ITEMS = [
  {
    name: "plate-darkfield", kind: "video", model: "fal-ai/kling-video/v2.5-turbo/pro/text-to-video", price: 0.07 * 5,
    input: {
      prompt: `Darkfield fluorescence microscopy, a slow dolly through a dense network of cortical neurons, thin teal-cyan dendrites and axons on deep midnight-blue black, a few oxblood-red cell bodies, shallow depth of field, specimen out of focus at the edges, ${LOOK}`,
      duration: "5", aspect_ratio: "16:9", negative_prompt: "blur, distort, low quality, flashing, strobe, text, watermark, brain icon, glowing brain",
    },
  },
  {
    name: "plate-ink", kind: "video", model: "fal-ai/kling-video/v2.5-turbo/pro/text-to-video", price: 0.07 * 5,
    input: {
      prompt: `Macro, top-down: teal and dark oxblood ink dispersing very slowly in still water over off-white paper, filaments branching like dendrites, soft daylight, high detail, ${LOOK}`,
      duration: "5", aspect_ratio: "16:9", negative_prompt: "blur, low quality, flashing, strobe, text, watermark, hands, glass edge",
    },
  },
  {
    name: "plate-regimes", kind: "video", model: "fal-ai/kling-video/v2.5-turbo/pro/text-to-video", price: 0.07 * 5,
    input: {
      prompt: `Macro of a dark liquid surface lit at a low angle, slow irregular ripples gradually organise into one large rhythmic standing wave pattern, midnight blue with a thin teal rim light, ${LOOK}`,
      duration: "5", aspect_ratio: "16:9", negative_prompt: "blur, low quality, flashing, strobe, bright light, text, watermark",
    },
  },
  {
    name: "fig-pyramidal", kind: "image", model: "fal-ai/flux-pro/v1.1-ultra", price: 0.06,
    input: {
      prompt: "A 19th-century histology plate: black ink pen-and-stipple drawing of three cortical pyramidal neurons with their dendritic trees and a descending axon, drawn after a Golgi stain, on warm off-white paper, generous margin, small hand-lettered figure letters a, b, c, no other text, scientific illustration, high detail",
      aspect_ratio: "4:5", output_format: "png", safety_tolerance: "2", raw: false,
    },
  },
  {
    name: "fig-column", kind: "image", model: "fal-ai/flux-pro/v1.1-ultra", price: 0.06,
    input: {
      prompt: "A drawing in the manner of Ramón y Cajal: a tall narrow vertical strip of cerebral cortex seen in section, pial surface at the top and white matter at the bottom, Golgi-stained neurons in black ink scattered through the depth, large pyramidal neurons with long apical dendrites rising toward the top, small round cells near the top, three of the pyramidal cells washed in pale teal watercolour, warm cream paper, no lettering, no words, no numbers, no signature, high detail",
      aspect_ratio: "9:16", output_format: "png", safety_tolerance: "2", raw: false,
    },
  },
  {
    name: "fig-circuit", kind: "image", model: "fal-ai/flux-pro/v1.1-ultra", price: 0.06,
    input: {
      prompt: "A drawing in the manner of Ramón y Cajal: one large pyramidal neuron and one small basket interneuron drawn in black ink, the pyramidal axon branching to touch the interneuron and the interneuron's axon wrapping back around the pyramidal cell body, the pyramidal cell washed in pale teal and the interneuron in faded oxblood watercolour, warm cream paper, generous empty margin, no lettering, no words, no numbers, no signature, no symbols, high detail",
      aspect_ratio: "1:1", output_format: "png", safety_tolerance: "2", raw: false,
    },
  },
];

function falKey() {
  const root = process.env.COMMANDAGI_ENV_ROOT;
  if (!root) throw Error("set COMMANDAGI_ENV_ROOT to the checkout whose .env cascade holds SVC__FAL__MAIN__API_KEY");
  for (const f of [".env.api", ".env.local", ".env"]) {
    const p = join(root, f);
    if (!existsSync(p)) continue;
    const line = readFileSync(p, "utf8").split("\n").find((l) => l.startsWith("SVC__FAL__MAIN__API_KEY="));
    if (line) return line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  }
  throw Error("no SVC__FAL__MAIN__API_KEY in the .env cascade");
}

async function run(item, key) {
  const auth = { Authorization: `Key ${key}`, "Content-Type": "application/json" };
  const sent = await fetch(`https://queue.fal.run/${item.model}`, { method: "POST", headers: auth, body: JSON.stringify(item.input) });
  if (!sent.ok) throw Error(`${item.name}: ${sent.status} ${await sent.text()}`);
  const { status_url, response_url, request_id } = await sent.json();
  // A submitted request is billed whether or not this process sees its answer: log it now.
  appendFileSync(LOG, JSON.stringify({ at: new Date().toISOString(), submitted: item.name, model: item.model, request_id, price_usd: item.price }) + "\n");
  for (;;) {
    await new Promise((r) => setTimeout(r, 5000));
    const s = await fetch(status_url, { headers: auth }).then((r) => r.json()).catch(() => ({ status: "IN_PROGRESS" }));
    if (s.status === "COMPLETED") break;
    if (s.status !== "IN_QUEUE" && s.status !== "IN_PROGRESS") throw Error(`${item.name}: ${JSON.stringify(s)}`);
  }
  const answer = await (await fetch(response_url, { headers: auth })).json();
  const url = answer.video?.url ?? answer.images?.[0]?.url;
  if (!url) throw Error(`${item.name}: no media in ${JSON.stringify(answer).slice(0, 300)}`);
  const ext = item.kind === "video" ? "mp4" : (url.split(".").pop().split("?")[0] || "png");
  const file = join(OUT, `${item.name}.${ext}`);
  writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
  appendFileSync(LOG, JSON.stringify({ at: new Date().toISOString(), name: item.name, model: item.model, request_id, seed: answer.seed ?? null, price_usd: item.price, input: item.input }) + "\n");
  console.log(`${item.name} → media-src/${item.name}.${ext} ($${item.price.toFixed(2)})`);
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(dirname(LOG), { recursive: true });
  const want = process.argv.slice(2);
  const items = ITEMS.filter((i) => (want.length ? want.includes(i.name) : !existsSync(join(OUT, `${i.name}.mp4`)) && !existsSync(join(OUT, `${i.name}.png`)) && !existsSync(join(OUT, `${i.name}.jpg`))));
  const key = falKey();
  const results = await Promise.allSettled(items.map((i) => run(i, key)));
  for (const r of results) if (r.status === "rejected") console.error(String(r.reason?.message ?? r.reason));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
