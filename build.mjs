#!/usr/bin/env node
/**
 * Builds cortex2.commandagi.app: every page in English, Spanish and Simplified Chinese, from src/pages/.
 *
 *   node build.mjs          write dist/
 *   node build.mjs --check  fail when dist/ differs from what the sources make
 *
 * A page is one module that exports a title, a description and an HTML body for each locale. The shell (head, nav,
 * footer, the A/文 picker, hreflang alternates) is added here, so a page cannot forget the safety line or a locale.
 * No dependency: node's own modules only.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, "dist");

/** The locales, in the picker's order. English is served at the root; `prefix` is its path. */
export const LOCALES = [
  { tag: "en", prefix: "", label: "English", picked: "A/文" },
  { tag: "es", prefix: "es", label: "Español", picked: "A/文" },
  { tag: "zh-Hans", prefix: "zh", label: "简体中文", picked: "A/文" },
];

/**
 * Every page: its file under each locale's prefix, the module that writes it, its number in the running head's
 * contents, and the plate (a generated figure) set after its title block.
 */
export const PAGES = [
  { path: "", module: "home", scripts: ["/assets/figures.js"] },
  { path: "thesis.html", module: "thesis", plate: "pyramidal" },
  { path: "research.html", module: "research", plate: "ink" },
  { path: "product.html", module: "product", plate: "circuit" },
  { path: "lab/index.html", module: "lab", bodyClass: "lab-page", scripts: ["/lab/lab.js"] },
  { path: "team.html", module: "team" },
  { path: "safety.html", module: "safety" },
  { path: "style.html", module: "styleguide" },
];

/** The plates: generated media, captioned as generated (redesign/NOTES.md has the prompts, the models and the cost). */
const PLATES = {
  pyramidal: {
    img: "/assets/media/fig-pyramidal", w: 1120, h: 1238,
    alt: { en: "An ink drawing of two pyramidal neurons, their dendrites branching like trees.", es: "Un dibujo a tinta de dos neuronas piramidales, con dendritas ramificadas como árboles.", "zh-Hans": "两个锥体神经元的墨线画，树突如树枝般分叉。" },
    caption: { en: "Plate. Pyramidal neurons, in the manner of a Golgi-stain drawing. Generated (fal · Flux Pro 1.1 Ultra); not an anatomical record.", es: "Lámina. Neuronas piramidales, al modo de un dibujo de tinción de Golgi. Generada (fal · Flux Pro 1.1 Ultra); no es un registro anatómico.", "zh-Hans": "插图：锥体神经元，仿高尔基染色手绘风格。由 fal · Flux Pro 1.1 Ultra 生成，并非解剖记录。" },
  },
  circuit: {
    img: "/assets/media/fig-circuit", w: 1120, h: 1120,
    alt: { en: "An ink drawing of an excitatory neuron washed in teal and an inhibitory neuron washed in red, their branches entangled.", es: "Un dibujo a tinta de una neurona excitadora en verde azulado y una inhibidora en rojo, con sus ramas entrelazadas.", "zh-Hans": "墨线画：一个青色的兴奋性神经元与一个红色的抑制性神经元，枝杈交缠。" },
    caption: { en: "Plate. The model's two populations: excitatory (teal) and inhibitory (red), each driving the other. Generated (fal · Flux Pro 1.1 Ultra); a picture of the idea, not of a cell.", es: "Lámina. Las dos poblaciones del modelo: excitadora (verde azulado) e inhibidora (rojo), cada una impulsa a la otra. Generada (fal · Flux Pro 1.1 Ultra); una imagen de la idea, no de una célula.", "zh-Hans": "插图：模型的两个群体——兴奋性（青色）与抑制性（红色），彼此驱动。由 fal · Flux Pro 1.1 Ultra 生成，描绘的是概念而非细胞。" },
  },
  ink: {
    video: "/assets/media/plate-ink", w: 1280, h: 720, once: true,
    alt: { en: "Teal and dark red ink spreading through water in branching filaments.", es: "Tinta verde azulada y roja oscura que se extiende en el agua en filamentos ramificados.", "zh-Hans": "青色与暗红色墨水在水中以分叉的细丝扩散。" },
    caption: { en: "Plate. Ink in water. Generated video (fal · Kling 2.5 Turbo Pro); not a recording of anything.", es: "Lámina. Tinta en agua. Vídeo generado (fal · Kling 2.5 Turbo Pro); no es la grabación de nada.", "zh-Hans": "插图：水中的墨。由 fal · Kling 2.5 Turbo Pro 生成的视频，并非任何事物的录像。" },
  },
};

// A country domain lands on its locale: the same site, at the root a visitor from that country typed.
const LOCALE_DOMAINS = `<script>/* domain → locale: cortex2.es → /es/, cortex2.cn → /zh/; cortex2.us and cortex2.dev are aliases of the primary */
(function(){var m={"cortex2.es":"/es/","cortex2.cn":"/zh/"};var to=m[location.hostname];if(to&&location.pathname==="/")location.replace(to);})();<\/script>`;

const SAFETY = {
  en: "Model hypotheses, not diagnoses · no quantum-advantage claim",
  es: "Hipótesis de modelo, no diagnósticos · sin afirmación de ventaja cuántica",
  "zh-Hans": "模型假设，而非诊断 · 不主张量子优势",
};
// The running head's contents: a number for each page, as a paper numbers its sections. The deck is a plain file.
const FOOT = {
  en: {
    home: "/", folio: "Working paper № 1 · Epilepsy as a transition", contentsLabel: "Contents", skip: "Skip to the text",
    nav: [["/thesis.html", "Thesis"], ["/research.html", "Research"], ["/lab/", "Instrument"], ["/product.html", "My Little Brain"], ["/team.html", "Authors"], ["/safety.html", "Safety"], ["/deck/", "Deck"], ["/style.html", "Style"]],
    note: "Cortex Squared is a research laboratory. Its results are hypotheses about a simplified model of brain dynamics. Nothing here is a diagnosis or a medical device.",
    rights: "Cortex Squared · a company of the CommandAGI family",
    email: "hello@cortex2.commandagi.com",
    pickerLabel: "Language", notesLabel: "Notes", mailLabel: "Correspondence",
    type: "Set in Newsreader and Fragment Mono (SIL Open Font License). Plates generated with fal, and captioned so. Figure 1 is CHB-MIT chb01_03 (PhysioNet, ODC-By 1.0).",
  },
  es: {
    home: "/es/", folio: "Documento de trabajo n.º 1 · La epilepsia como transición", contentsLabel: "Índice", skip: "Ir al texto",
    nav: [["/es/thesis.html", "Tesis"], ["/es/research.html", "Investigación"], ["/es/lab/", "Instrumento"], ["/es/product.html", "My Little Brain"], ["/es/team.html", "Autores"], ["/es/safety.html", "Seguridad"], ["/deck/", "Presentación"], ["/es/style.html", "Estilo"]],
    note: "Cortex Squared es un laboratorio de investigación. Sus resultados son hipótesis sobre un modelo simplificado de la dinámica cerebral. Nada de esto es un diagnóstico ni un producto sanitario.",
    rights: "Cortex Squared · una empresa de la familia CommandAGI",
    email: "hello@cortex2.commandagi.com",
    pickerLabel: "Idioma", notesLabel: "Notas", mailLabel: "Correspondencia",
    type: "Compuesto en Newsreader y Fragment Mono (SIL Open Font License). Láminas generadas con fal, y así indicadas. La figura 1 es CHB-MIT chb01_03 (PhysioNet, ODC-By 1.0).",
  },
  "zh-Hans": {
    home: "/zh/", folio: "工作论文 第 1 号 · 作为转变的癫痫", contentsLabel: "目录", skip: "跳到正文",
    nav: [["/zh/thesis.html", "研究命题"], ["/zh/research.html", "研究"], ["/zh/lab/", "仪器"], ["/zh/product.html", "My Little Brain"], ["/zh/team.html", "作者"], ["/zh/safety.html", "安全"], ["/deck/", "演示文稿"], ["/zh/style.html", "风格"]],
    note: "Cortex Squared 是一家研究实验室。其结果是关于简化脑动力学模型的假设。这里的内容都不是诊断，也不是医疗器械。",
    rights: "Cortex Squared · CommandAGI 家族成员",
    email: "hello@cortex2.commandagi.com",
    pickerLabel: "语言", notesLabel: "说明", mailLabel: "联系",
    type: "正文字体 Newsreader 与 Fragment Mono（SIL 开放字体许可）。插图由 fal 生成并已标注。图 1 为 CHB-MIT chb01_03（PhysioNet，ODC-By 1.0）。",
  },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const href = (page, locale) => {
  const p = page.path;
  const isDir = p === "" || p.endsWith("/index.html");
  const clean = isDir ? (p.endsWith("index.html") ? p.slice(0, -"index.html".length) : "") : p;
  return `/${locale.prefix ? `${locale.prefix}/` : ""}${clean}`;
};

const alternate = (page) =>
  LOCALES.map((l) => `<link rel="alternate" hreflang="${l.tag === "zh-Hans" ? "zh-Hans" : l.tag}" href="${href(page, l)}">`).join("\n");

const contents = (ui, current) =>
  `<ol>${ui.nav.map(([h, label], i) => `<li><a href="${h}"${h === current ? ' aria-current="page"' : ""}><span class="n">${i + 1}</span>${esc(label)}</a></li>`).join("")}</ol>`;

/** A plate after the title block: a generated drawing, or a generated loop that plays only when it is on screen. */
function plate(name, tag) {
  const p = PLATES[name];
  if (!p) throw new Error(`no plate ${name}`);
  const media = p.video
    ? `<video class="loop" muted playsinline${p.once ? "" : " loop"} preload="none" poster="${p.video}.webp" width="${p.w}" height="${p.h}" aria-label="${esc(p.alt[tag])}"><source src="${p.video}.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"'><source src="${p.video}.h264.mp4" type="video/mp4"></video>`
    : `<img src="${p.img}-1120.webp" srcset="${p.img}-560.webp 560w, ${p.img}-1120.webp 1120w" sizes="(min-width: 1100px) 34vw, 92vw" width="${p.w}" height="${p.h}" alt="${esc(p.alt[tag])}" loading="lazy" decoding="async">`;
  return `<figure class="plate-figure${p.video ? " is-video" : ""}">${media}<figcaption><span class="tag gen">generated</span> ${esc(p.caption[tag])}</figcaption></figure>`;
}

function shell(page, locale, meta, body) {
  const ui = FOOT[locale.tag];
  const current = href(page, locale);
  const others = LOCALES.filter((l) => l.tag !== locale.tag);
  // The plate sits beside the title block: the first <section class="hero"> of the page's body.
  if (page.plate) body = body.replace(/(<section class="hero">[\s\S]*?<\/section>)/, `<div class="opening">$1${plate(page.plate, locale.tag)}</div>`);
  return `<!doctype html>
<html lang="${locale.tag}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="theme-color" content="#f3f4ef">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${locale.tag.replace("-", "_")}">
<meta property="og:image" content="https://cortex2.commandagi.app/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/touch-icon.png">
<link rel="preload" href="/assets/fonts/newsreader.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css">
${alternate(page)}
${page.path === "" && locale.tag === "en" ? LOCALE_DOMAINS : ""}
</head>
<body class="${["page-" + page.module, page.bodyClass].filter(Boolean).join(" ")}">
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="running-head">
  <a class="wordmark" href="${ui.home}"><img src="/assets/wordmark.svg" alt="Cortex Squared" width="345" height="79"></a>
  <p class="folio">${esc(ui.folio)}</p>
  <nav class="contents" aria-label="${esc(ui.contentsLabel)}">${contents(ui, current)}</nav>
  <button class="contents-button" type="button" popovertarget="contents-sheet">${esc(ui.contentsLabel)}</button>
  <nav class="contents-sheet" id="contents-sheet" popover aria-label="${esc(ui.contentsLabel)}">${contents(ui, current)}</nav>
</header>
<main id="main">
${body}
</main>
<footer class="colophon">
  <p class="safety-line">${esc(SAFETY[locale.tag])}</p>
  <div class="colophon-grid">
    <section><h2 class="label">${esc(ui.notesLabel)}</h2><p>${esc(ui.note)}</p></section>
    <section><h2 class="label">${esc(ui.mailLabel)}</h2><p><a href="mailto:${ui.email}">${ui.email}</a></p><p class="mono">cortex2.commandagi.app</p></section>
    <section><h2 class="label">${esc(ui.contentsLabel)}</h2>${contents(ui, current)}</section>
    <section class="lang"><h2 class="label">${esc(ui.pickerLabel)}</h2>
      <button class="lang-button" type="button" aria-expanded="false" aria-controls="lang-menu" aria-label="${esc(ui.pickerLabel)}">A/文</button>
      ${others.map((l) => `<a class="lang-link" href="${href(page, l)}" hreflang="${l.tag}" lang="${l.tag}">${esc(l.label)}</a>`).join("")}
      <div class="lang-menu" id="lang-menu" role="menu" aria-label="${esc(ui.pickerLabel)}">
    ${LOCALES.map((l) => `<a role="menuitem" href="${href(page, l)}" hreflang="${l.tag}"${l.tag === locale.tag ? ' aria-current="true"' : ""}>${esc(l.label)}</a>`).join("\n    ")}
  </div>
    </section>
  </div>
  <p class="imprint"><span>${esc(ui.rights)}</span> <span>${esc(ui.type)}</span></p>
</footer>
<script src="/lang.js" defer></script>
<script src="/assets/plates.js" defer></script>
${(page.scripts ?? []).map((src) => `<script type="module" src="${src}"></script>`).join("\n")}
</body>
</html>
`;
}

const LANG_JS = `// The A/文 picker: one button, one menu, a plain link per language (no script is needed to change page).
const button = document.querySelector('.lang-button');
const menu = document.getElementById('lang-menu');
if (button && menu) {
  button.addEventListener('click', () => {
    const open = menu.dataset.open !== 'true';
    menu.dataset.open = String(open);
    button.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== button) { menu.dataset.open = 'false'; button.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { menu.dataset.open = 'false'; button.setAttribute('aria-expanded', 'false'); button.focus(); } });
}
`;

export async function build() {
  const files = new Map();
  for (const page of PAGES) {
    const mod = await import(`./src/pages/${page.module}.mjs`);
    const key = (tag) => (tag === "zh-Hans" ? "zh" : tag);
    for (const locale of LOCALES) {
      const meta = mod[key(locale.tag)];
      if (!meta) throw new Error(`${page.module}: no ${locale.tag} page`);
      for (const key of ["title", "description", "body"]) if (!meta[key]) throw new Error(`${page.module}/${locale.tag}: no ${key}`);
      const file = page.path === "" ? "index.html" : page.path;
      const out = `${locale.prefix ? `${locale.prefix}/` : ""}${file}`;
      files.set(out, shell(page, locale, meta, meta.body));
    }
  }
  files.set("style.css", readFileSync(join(ROOT, "src/style.css"), "utf8"));
  files.set("lang.js", LANG_JS);
  files.set("404.html", readFileSync(join(ROOT, "src/404.html"), "utf8"));
  return files;
}

/** The files a visitor gets that are not pages: what the build copies as they are. */
const STATIC = ["lab", "data", "deck", "assets", "upstream-media"];

function copyStatic(target) {
  for (const name of STATIC) {
    const from = join(ROOT, name);
    if (!existsSync(from)) continue;
    cpSync(from, join(target, name), { recursive: true });
  }
}

async function main() {
  const check = process.argv.includes("--check");
  const files = await build();
  if (check) {
    const stale = [...files].filter(([rel, body]) => {
      const f = join(DIST, rel);
      return !existsSync(f) || readFileSync(f, "utf8") !== body;
    }).map(([rel]) => rel);
    if (stale.length) { console.error(`stale in dist/: ${stale.join(", ")}`); process.exit(1); }
    console.log(`dist/: ${files.size} pages current`);
    return;
  }
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });
  for (const [rel, body] of files) {
    const f = join(DIST, rel);
    mkdirSync(dirname(f), { recursive: true });
    writeFileSync(f, body);
  }
  copyStatic(DIST);
  let bytes = 0, count = 0;
  const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else { bytes += statSync(f).size; count++; } } };
  walk(DIST);
  console.log(`dist/: ${files.size} pages, ${count} files, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
  if (bytes > 8 * 1024 * 1024) { console.error("over the 8 MB a deploy serves"); process.exit(1); }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
