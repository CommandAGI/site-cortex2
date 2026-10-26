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

/** Every page: its file under each locale's prefix, and the module that writes it. */
export const PAGES = [
  { path: "", module: "home" },
  { path: "thesis.html", module: "thesis" },
  { path: "research.html", module: "research" },
  { path: "product.html", module: "product" },
  { path: "lab/index.html", module: "lab", bodyClass: "lab-page" },
  { path: "team.html", module: "team" },
  { path: "safety.html", module: "safety" },
  { path: "style.html", module: "styleguide" },
];

// A country domain lands on its locale: the same site, at the root a visitor from that country typed.
const LOCALE_DOMAINS = `<script>/* domain → locale: cortex2.es → /es/, cortex2.cn → /zh/; cortex2.us and cortex2.dev are aliases of the primary */
(function(){var m={"cortex2.es":"/es/","cortex2.cn":"/zh/"};var to=m[location.hostname];if(to&&location.pathname==="/")location.replace(to);})();<\/script>`;

const SAFETY = {
  en: "Model hypotheses, not diagnoses · no quantum-advantage claim",
  es: "Hipótesis de modelo, no diagnósticos · sin afirmación de ventaja cuántica",
  "zh-Hans": "模型假设，而非诊断 · 不主张量子优势",
};
const FOOT = {
  en: {
    nav: [["/", "Home"], ["/thesis.html", "Thesis"], ["/research.html", "Research"], ["/product.html", "My Little Brain"], ["/lab/", "Instrument"], ["/team.html", "Team"], ["/safety.html", "Safety"], ["/style.html", "Style"], ["/deck/", "Deck"]],
    note: "Cortex Squared is a research laboratory. Its results are hypotheses about a simplified model of brain dynamics. Nothing here is a diagnosis or a medical device.",
    rights: "Cortex Squared · a company of the CommandAGI family",
    email: "hello@cortex2.commandagi.com",
    pickerLabel: "Language",
  },
  es: {
    nav: [["/es/", "Inicio"], ["/es/thesis.html", "Tesis"], ["/es/research.html", "Investigación"], ["/es/product.html", "My Little Brain"], ["/es/lab/", "Instrumento"], ["/es/team.html", "Equipo"], ["/es/safety.html", "Seguridad"], ["/es/style.html", "Estilo"], ["/deck/", "Presentación"]],
    note: "Cortex Squared es un laboratorio de investigación. Sus resultados son hipótesis sobre un modelo simplificado de la dinámica cerebral. Nada de esto es un diagnóstico ni un producto sanitario.",
    rights: "Cortex Squared · una empresa de la familia CommandAGI",
    email: "hello@cortex2.commandagi.com",
    pickerLabel: "Idioma",
  },
  "zh-Hans": {
    nav: [["/zh/", "首页"], ["/zh/thesis.html", "研究命题"], ["/zh/research.html", "研究"], ["/zh/product.html", "My Little Brain"], ["/zh/lab/", "仪器"], ["/zh/team.html", "团队"], ["/zh/safety.html", "安全"], ["/zh/style.html", "风格"], ["/deck/", "演示文稿"]],
    note: "Cortex Squared 是一家研究实验室。其结果是关于简化脑动力学模型的假设。这里的内容都不是诊断，也不是医疗器械。",
    rights: "Cortex Squared · CommandAGI 家族成员",
    email: "hello@cortex2.commandagi.com",
    pickerLabel: "语言",
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

function shell(page, locale, meta, body) {
  const ui = FOOT[locale.tag];
  const current = href(page, locale);
  const others = LOCALES.filter((l) => l.tag !== locale.tag);
  return `<!doctype html>
<html lang="${locale.tag}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${locale.tag.replace("-", "_")}">
<link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="/style.css">
${alternate(page)}
${page.path === "" && locale.tag === "en" ? LOCALE_DOMAINS : ""}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ""}>
<div class="field" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="scrim" aria-hidden="true"></div>
<header class="site-head">
  <a class="wordmark" href="/${locale.prefix ? `${locale.prefix}/` : ""}">Cortex Squared</a>
  <nav aria-label="${esc(ui.pickerLabel)}">${ui.nav.slice(0, 8).map(([h, label]) => `<a href="${h}"${h === current ? ' aria-current="page"' : ""}>${esc(label)}</a>`).join("")}</nav>
</header>
<main id="main">
${body}
</main>
<footer class="site-foot">
  <p class="safety-line">${esc(SAFETY[locale.tag])}</p>
  <p>${esc(ui.note)}</p>
  <div class="rows">
    <span>${esc(ui.rights)}</span>
    <a href="mailto:${ui.email}">${ui.email}</a>
    <a href="/deck/">${esc(ui.nav[8][1])}</a>
    <span class="mono">cortex2.commandagi.app</span>
    <span class="lang">
      <button class="lang-button" type="button" aria-expanded="false" aria-controls="lang-menu" aria-label="${esc(ui.pickerLabel)}">A/文</button>
      ${others.map((l) => `<a class="lang-link" href="${href(page, l)}" hreflang="${l.tag}" lang="${l.tag}">${esc(l.label)}</a>`).join("")}
    </span>
  </div>
  <div class="lang-menu" id="lang-menu" role="menu" aria-label="${esc(ui.pickerLabel)}">
    ${LOCALES.map((l) => `<a role="menuitem" href="${href(page, l)}" hreflang="${l.tag}"${l.tag === locale.tag ? ' aria-current="true"' : ""}>${esc(l.label)}</a>`).join("\n    ")}
  </div>
</footer>
<script src="/lang.js" defer></script>
${page.module === "lab" ? '<script type="module" src="/lab/lab.js"></script>' : ""}
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
