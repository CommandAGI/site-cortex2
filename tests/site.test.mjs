// The site as a visitor receives it: every page in all three locales, the A/文 picker, hreflang alternates, the safety
// line, no request that leaves the page except the video the visitor starts, and a build under the 8 MB a deploy serves.
// Run: node build.mjs && node --test tests/
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { build, LOCALES, PAGES } from "../build.mjs";

const DIST = new URL("../dist/", import.meta.url).pathname;
const SAFETY = {
  en: "Model hypotheses, not diagnoses · no quantum-advantage claim",
  es: "Hipótesis de modelo, no diagnósticos · sin afirmación de ventaja cuántica",
  "zh-Hans": "模型假设，而非诊断 · 不主张量子优势",
};
const PREFIX = { en: "", es: "es/", "zh-Hans": "zh/" };
const fileFor = (page, tag) => `${PREFIX[tag]}${page.path === "" ? "index.html" : page.path}`;
const urlFor = (page, tag) => { const p = page.path.endsWith("index.html") ? page.path.slice(0, -"index.html".length) : page.path; return `/${PREFIX[tag]}${p}`; };
const pages = async () => await build();

test("every page exists in English, Spanish and Simplified Chinese, and dist/ is current", async () => {
  const files = await pages();
  for (const [rel, body] of files) {
    const f = join(DIST, rel);
    assert.ok(existsSync(f), `dist/${rel} is missing: run node build.mjs`);
    assert.equal(readFileSync(f, "utf8"), body, `dist/${rel} is stale: run node build.mjs`);
  }
  for (const page of PAGES)
    for (const tag of Object.keys(PREFIX)) {
      const html = readFileSync(join(DIST, fileFor(page, tag)), "utf8");
      assert.match(html, new RegExp(`<html lang="${tag}">`), `${fileFor(page, tag)}: lang`);
      assert.ok(html.includes(SAFETY[tag]), `${fileFor(page, tag)}: the safety line`);
    }
});

test("a page points at its own page in the other two languages, and the picker lists all three", async () => {
  for (const page of PAGES)
    for (const tag of Object.keys(PREFIX)) {
      const rel = fileFor(page, tag);
      const html = readFileSync(join(DIST, rel), "utf8");
      for (const other of LOCALES) {
        const want = urlFor(page, other.tag);
        assert.ok(html.includes(`<link rel="alternate" hreflang="${other.tag}" href="${want}">`), `${rel}: hreflang ${other.tag} → ${want}`);
      }
      assert.match(html, /class="lang-button"[^>]*>A\/文</, `${rel}: the A/文 picker`);
      const menu = html.match(/<div class="lang-menu"[^>]*>([\s\S]*?)<\/div>/)[1];
      for (const other of LOCALES) assert.ok(menu.includes(`hreflang="${other.tag}"`), `${rel}: picker row ${other.tag}`);
    }
});

test("no page asks a third party for a font, script, stylesheet, image or tracker", async () => {
  const walk = (d, out = []) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const f = join(d, e.name);
      if (e.isDirectory()) walk(f, out);
      else if (/\.(html|js|css)$/.test(e.name)) out.push(f);
    }
    return out;
  };
  for (const f of walk(DIST)) {
    const text = readFileSync(f, "utf8");
    // A resource the browser fetches on its own: src=, <link href=, url( in CSS. A link a visitor may click is not one.
    for (const m of text.matchAll(/<(script|img|iframe|source|video|audio)\b[^>]*\bsrc="([^"]+)"/g)) {
      assert.ok(!/^https?:/i.test(m[2]), `${f}: <${m[1]} src="${m[2]}">`);
    }
    for (const m of text.matchAll(/<link\b[^>]*\bhref="([^"]+)"/g)) {
      assert.ok(!/^https?:/i.test(m[1]) || /rel="alternate"/.test(m[0]), `${f}: <link href="${m[1]}">`);
    }
    for (const m of text.matchAll(/url\((['"]?)(https?:[^)'"]+)/g)) assert.fail(`${f}: css url(${m[2]})`);
    assert.ok(!/@import/i.test(text), `${f}: @import`);
  }
});

test("the video is the only third-party request, and only after the visitor presses play", async () => {
  const home = readFileSync(join(DIST, "index.html"), "utf8");
  assert.match(home, /data-video="c7H80NzR3Tg"/);
  assert.match(home, /youtube-nocookie\.com\/embed\//);
  assert.ok(!/youtube[^"']*"[\s>]/.test(home.split("<script")[0]), "no YouTube request in the markup a visit loads");
});

test("the deck and its PDF are served, and the lab page loads its own module", async () => {
  for (const f of ["deck/index.html", "deck/cortex2-deck.pdf", "deck/stills/slide-1.webp", "deck/stills/slide-7.webp"]) assert.ok(existsSync(join(DIST, f)), f);
  for (const tag of Object.keys(PREFIX)) {
    const html = readFileSync(join(DIST, fileFor({ path: "lab/index.html" }, tag)), "utf8");
    assert.match(html, /<script type="module" src="\/lab\/lab.js">/);
  }
  assert.ok(existsSync(join(DIST, "data/instrument.json")));
});

test("the deploy stays under the 8 MB a site serves, and every page under 200 KB", async () => {
  let bytes = 0;
  const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else bytes += statSync(f).size; } };
  walk(DIST);
  assert.ok(bytes < 8 * 1024 * 1024, `${(bytes / 1024 / 1024).toFixed(2)} MB`);
  for (const page of PAGES)
    for (const tag of Object.keys(PREFIX)) {
      const rel = fileFor(page, tag);
      assert.ok(statSync(join(DIST, rel)).size < 200 * 1024, `${rel} is over 200 KB`);
      const html = readFileSync(join(DIST, rel), "utf8");
      assert.match(html, /<title>[^<]+<\/title>/, `${rel}: a title`);
      assert.match(html, /<meta name="description" content="[^"]+">/, `${rel}: a description`);
    }
});

test("a country domain lands on its locale, and the alias domains serve the primary", async () => {
  const home = readFileSync(join(DIST, "index.html"), "utf8");
  assert.match(home, /"cortex2\.es":"\/es\/"/, "cortex2.es → /es/");
  assert.match(home, /"cortex2\.cn":"\/zh\/"/, "cortex2.cn → /zh/");
  assert.match(home, /location\.replace\(to\)/, "the root replaces itself once");
});
