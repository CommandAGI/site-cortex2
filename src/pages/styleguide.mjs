// The style guide: the site's design system as a page (redesign/DESIGN.md is its source; bootstrap/style.md on the
// laboratory's Drive mirrors it).
const sw = (name, hex, use) => `<div class="card"><span class="swatch" style="background:${hex}"></span><h3>${name}</h3><p class="mono">${hex}</p><p class="dim">${use}</p></div>`;

const page = (t) => `<section class="hero"><p class="eyebrow">${t.kicker}</p><h1>${t.h1}</h1><p class="lede">${t.lede}</p></section>
<section class="panel">
  <p class="eyebrow">${t.ideaK}</p>
  <h2>${t.ideaH}</h2>
  <p>${t.ideaP}</p>
</section>
<section class="panel">
  <p class="eyebrow">${t.colourK}</p>
  <h2>${t.colourH}</h2>
  <div class="grid">
    ${sw(t.c[0][0], "#f3f4ef", t.c[0][1])}
    ${sw(t.c[1][0], "#122031", t.c[1][1])}
    ${sw(t.c[2][0], "#7a2331", t.c[2][1])}
    ${sw(t.c[3][0], "#08aaa7", t.c[3][1])}
  </div>
  <p class="note">${t.colourNote}</p>
</section>
<section class="panel">
  <p class="eyebrow">${t.typeK}</p>
  <h2>${t.typeH}</h2>
  <p style="font-size:clamp(2.4rem,6vw,5rem);line-height:1;letter-spacing:-0.035em;font-weight:320;font-variation-settings:'opsz' 72;margin:8px 0 6px">Newsreader <em style="color:var(--ox)">Display</em></p>
  <p class="mono" style="font-size:1rem">Fragment Mono · Fig. 2 · 01110001 · 2996 s</p>
  <ul>${t.type.map((x) => `<li>${x}</li>`).join("")}</ul>
</section>
<section class="panel">
  <p class="eyebrow">${t.layoutK}</p>
  <h2>${t.layoutH}</h2>
  <ul>${t.layout.map((x) => `<li>${x}</li>`).join("")}</ul>
  <p><span class="prov recorded">${t.prov[0]}</span> <span class="prov inferred">${t.prov[1]}</span> <span class="prov simulated">${t.prov[2]}</span> <span class="tag gen">${t.prov[3]}</span></p>
</section>
<section class="panel">
  <p class="eyebrow">${t.voiceK}</p>
  <h2>${t.voiceH}</h2>
  <p>${t.voiceP}</p>
  <div class="buttons"><a class="button" href="/deck/">${t.deck}</a><a class="button ghost" href="${t.p}thesis.html">${t.thesis}</a></div>
</section>`;

const EN = {
  p: "/", kicker: "Cortex Squared · the style guide", h1: "A living research paper",
  lede: "Paper, ink and one oxblood. The data is the decoration; every figure has a number, a caption and its provenance.",
  ideaK: "The idea", ideaH: "Ruled like a journal, never boxed like an app",
  ideaP: "Each page is an article: a title block, numbered sections in a margin, figures with captions. No cards, no rounded corners, no shadows, no gradients. Motion is a plotter's: lines are drawn, a cursor moves at the speed of the data, nothing flashes.",
  colourK: "Colour", colourH: "Four colours, one rule each",
  c: [["Paper", "The ground of every page."], ["Ink (midnight)", "Text and rules; 14.9 : 1 on paper."], ["Oxblood", "Links, section marks, the seizure, focus; 9.0 : 1 on paper."], ["Bioelectric teal", "Data only: inferred and simulated marks. Never text on paper (2.6 : 1)."]],
  colourNote: "Provenance is never colour alone: recorded is solid ink, inferred is dashed, simulated is dotted, and each carries its word.",
  typeK: "Type", typeH: "Newsreader for words, Fragment Mono for labels",
  type: ["Newsreader's optical size runs from 6 to 72: display titles use 72 at weight 320; the question in a title is italic oxblood.", "Old-style figures in prose; lining tabular figures in figures and tables.", "Both faces are self-hosted and subset (SIL Open Font License); no font request leaves the site."],
  layoutK: "Layout and motion", layoutH: "A margin, a measure, a wide column",
  layout: ["Desktop: three columns of the twelve hold the margin (§, figure numbers, notes); six hold the text (62 characters); figures reach the edge.", "Phone: the margin folds above each block; figures keep their captions; the contents open from the running head.", "Reduced motion: every animation becomes its still; the plates show their posters and request no video."],
  prov: ["recorded", "inferred", "simulated", "generated"],
  voiceK: "Voice, and the line that never moves", voiceH: "Model hypotheses, not diagnoses",
  voiceP: "Short sentences, the active voice, one word per meaning. A negative result is said plainly. Every page carries the safety line, and no page claims a quantum advantage.",
  deck: "The pitch deck", thesis: "The thesis",
};
const ES = {
  p: "/es/", kicker: "Cortex Squared · guía de estilo", h1: "Un artículo de investigación vivo",
  lede: "Papel, tinta y un granate. Los datos son la decoración; cada figura tiene número, pie y procedencia.",
  ideaK: "La idea", ideaH: "Reglado como una revista, nunca encajado como una aplicación",
  ideaP: "Cada página es un artículo: un bloque de título, secciones numeradas en un margen, figuras con pie. Sin tarjetas, sin esquinas redondeadas, sin sombras, sin degradados. El movimiento es el de un trazador: las líneas se dibujan, un cursor avanza a la velocidad de los datos, nada parpadea.",
  colourK: "Color", colourH: "Cuatro colores, una regla cada uno",
  c: [["Papel", "El fondo de cada página."], ["Tinta (medianoche)", "Texto y filetes; 14,9 : 1 sobre papel."], ["Granate", "Enlaces, marcas de sección, la crisis, el foco; 9,0 : 1 sobre papel."], ["Verde azulado bioeléctrico", "Solo datos: marcas inferidas y simuladas. Nunca texto sobre papel (2,6 : 1)."]],
  colourNote: "La procedencia nunca es solo color: lo registrado es tinta continua, lo inferido discontinuo, lo simulado punteado, y cada uno lleva su palabra.",
  typeK: "Tipografía", typeH: "Newsreader para las palabras, Fragment Mono para las etiquetas",
  type: ["El tamaño óptico de Newsreader va de 6 a 72: los títulos usan 72 con peso 320; la pregunta de un título va en cursiva granate.", "Cifras elzevirianas en el texto; cifras de tabla en figuras y tablas.", "Ambas fuentes están alojadas aquí y reducidas (SIL Open Font License); ninguna petición de fuente sale del sitio."],
  layoutK: "Composición y movimiento", layoutH: "Un margen, una medida, una columna ancha",
  layout: ["Escritorio: tres de las doce columnas forman el margen (§, números de figura, notas); seis llevan el texto (62 caracteres); las figuras llegan al borde.", "Teléfono: el margen se pliega sobre cada bloque; las figuras conservan su pie; el índice se abre desde la cabecera.", "Movimiento reducido: cada animación se vuelve su imagen fija; las láminas muestran su póster y no piden vídeo."],
  prov: ["registrado", "inferido", "simulado", "generado"],
  voiceK: "La voz, y la línea que nunca cambia", voiceH: "Hipótesis de modelo, no diagnósticos",
  voiceP: "Frases cortas, voz activa, una palabra por significado. Un resultado negativo se dice claramente. Cada página lleva la línea de seguridad, y ninguna afirma una ventaja cuántica.",
  deck: "La presentación", thesis: "La tesis",
};
const ZH = {
  p: "/zh/", kicker: "Cortex Squared · 风格指南", h1: "一篇活的研究论文",
  lede: "纸、墨与一抹酒红。数据即装饰；每张图都有编号、图注与来源。",
  ideaK: "理念", ideaH: "像期刊一样排版，而不是像应用一样装进方框",
  ideaP: "每一页都是一篇文章：标题区、边栏中编号的章节、带图注的图。没有卡片、圆角、阴影或渐变。动效如绘图仪：线条被画出，光标以数据的速度移动，没有任何闪烁。",
  colourK: "颜色", colourH: "四种颜色，各守一条规则",
  c: [["纸色", "每一页的底色。"], ["墨色（午夜蓝）", "文字与分隔线；在纸色上对比度 14.9 : 1。"], ["酒红", "链接、章节标记、发作期、焦点；在纸色上 9.0 : 1。"], ["生物电青", "仅用于数据：推断与模拟的标记。绝不作为纸色上的文字（2.6 : 1）。"]],
  colourNote: "来源从不只靠颜色区分：记录为实线墨色，推断为虚线，模拟为点线，并各自标注文字。",
  typeK: "字体", typeH: "Newsreader 用于文字，Fragment Mono 用于标签",
  type: ["Newsreader 的光学尺寸从 6 到 72：大标题用 72、字重 320；标题中的问句为酒红斜体。", "正文用旧式数字；图表中用等宽对齐数字。", "两种字体均自托管并子集化（SIL 开放字体许可）；不向站外请求字体。中文使用系统宋体。"],
  layoutK: "版式与动效", layoutH: "一条边栏，一段行宽，一栏宽幅",
  layout: ["桌面：十二栏中的三栏为边栏（§、图号、注释）；六栏为正文（约 62 字符）；图可延伸至边缘。", "手机：边栏折叠到每个区块上方；图保留图注；目录从页眉打开。", "减少动效：每个动画变为静止画面；插图显示海报帧，不请求视频。"],
  prov: ["记录", "推断", "模拟", "生成"],
  voiceK: "语气，以及永不改变的那一行", voiceH: "模型假设，而非诊断",
  voiceP: "短句、主动语态、一词一义。阴性结果直说。每一页都带有安全声明，没有任何一页声称量子优势。",
  deck: "演示文稿", thesis: "研究命题",
};

export const en = { title: "The style guide — Cortex Squared", description: "Cortex Squared's design: a living research paper. Paper, ink and one oxblood; Newsreader and Fragment Mono; recorded, inferred and simulated always labelled.", body: page(EN) };
export const es = { title: "Guía de estilo — Cortex Squared", description: "El diseño de Cortex Squared: un artículo de investigación vivo. Papel, tinta y un granate; Newsreader y Fragment Mono; registrado, inferido y simulado siempre indicados.", body: page(ES) };
export const zh = { title: "风格指南 — Cortex Squared", description: "Cortex Squared 的设计：一篇活的研究论文。纸、墨与一抹酒红；Newsreader 与 Fragment Mono；记录、推断与模拟始终标注。", body: page(ZH) };
