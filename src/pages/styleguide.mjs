const sw = (name, hex, use) => `<div class="card"><span style="display:block;height:54px;border-radius:10px;background:${hex};margin-bottom:10px;border:1px solid rgba(20,16,42,.12)"></span><strong>${name}</strong><p class="mono">${hex}</p><p class="dim">${use}</p></div>`;

const en = {
  title: "Style — Cortex Squared",
  description:
    "The laboratory's style comes from its pitch deck: one soft colour field, a real 3D brain inside it, white display type set tight, code in mono, and a rule for body text that the deck cannot meet.",
  body: `<section class="hero"><p class="eyebrow" style="color:#fff;opacity:.9">Cortex Squared · the style guide</p><h1>One soft field, one real brain, white type set tight</h1><p class="lede">Read from the pitch deck in the My Little Brain repository: media/deck.html and media/deck-slide-1.png … deck-slide-7.png.</p></section>
<div class="panel">
  <h2>The idea</h2>
  <p>Nothing is boxed. No frame and no border sits on the field: a picture dissolves into it through a soft radial mask, and the type sits on the colour. The deck's own word for it is a colour field that breathes.</p>
</div>
<div class="panel">
  <h2>Colour</h2>
  <div class="grid">${[
    ["field base", "#CFDCFB", "the page behind the blobs"],
    ["ember", "#FF3B2F", "top left blob; the link colour"],
    ["amber", "#FFCF6B", "top left and upper middle"],
    ["violet", "#B07DE0", "centre"],
    ["orange", "#FF6A1A", "centre right"],
    ["sun", "#FFD36E", "right"],
    ["rose", "#FF4F8B", "lower centre"],
    ["orchid", "#C78CFF", "top right"],
    ["sky", "#6FA8FF", "bottom right"],
    ["ice", "#7FB2FF", "bottom left"],
    ["ink", "#14102A", "body text on the panel"],
    ["panel", "#F6F7F2", "the one neutral surface"],
  ].map(([n, h, u]) => sw(n, h, u)).join("")}</div>
  <p style="margin-top:16px">The deck sets white type straight on the field. White on amber is about 1.7:1, which is too low to read. Our rule: display type on the field is white, 40 px and larger, over a soft dark scrim that keeps every heading at 3:1 or better; body text is ink on the pale panel at 7:1 or better; ember is the one accent, at 4.6:1 on the panel. There is no second palette.</p>
</div>
<div class="panel">
  <h2>Type</h2>
  <ul>
    <li><strong>Display and text:</strong> Inter Tight, 500 and 700, tracking −0.035em at 96 px and −0.02em at 24–40 px, line-height 0.95–1.1. The ratios hold at every width.</li>
    <li><strong>Numbers, parameters, code:</strong> JetBrains Mono, 400 and 500. A metric is always mono.</li>
    <li><strong>No font request:</strong> the stack falls back to Inter, the system sans and the system mono. The page loads no font file and calls no font CDN.</li>
    <li><strong>CJK:</strong> the deck has no CJK type, so the Chinese pages use the system CJK sans, upright, at the same sizes, without the negative tracking.</li>
  </ul>
</div>
<div class="panel">
  <h2>Layout and motion</h2>
  <ul>
    <li>One column, generous margins: 720 px for text, 1120 px for a grid, never a sidebar.</li>
    <li>The brain is the deck's real one, masked with <span class="mono">radial-gradient(closest-side, #000 52%, transparent 100%)</span> so that its edges dissolve.</li>
    <li>The field breathes over 16 s; a page changes no faster than that. <span class="mono">prefers-reduced-motion</span> stops all of it.</li>
    <li>390 px wide, no sideways scroll, in both themes. The field stays the same in dark; the panel and the ink swap.</li>
  </ul>
</div>
<div class="panel">
  <h2>Voice, and the line that never moves</h2>
  <p>Short sentences, active voice, one word per meaning. A number appears with its method. No exclamation mark, no "revolutionary", no claim without a record behind it.</p>
  <p>The deck's footer carries the line "model hypotheses, not diagnoses · no quantum-advantage claim". It is on every page of this site, in the visitor's language.</p>
  <div class="buttons"><a class="button" href="/deck/">The pitch deck</a><a class="button ghost" href="/thesis.html">The thesis</a></div>
</div>`,
};

const es = {
  title: "Estilo — Cortex Squared",
  description:
    "El estilo del laboratorio viene de su presentación: un campo de color suave, un cerebro 3D real dentro, tipografía blanca muy ajustada, código en mono, y una regla para el texto que la presentación no cumple.",
  body: `<section class="hero"><p class="eyebrow" style="color:#fff;opacity:.9">Cortex Squared · guía de estilo</p><h1>Un campo suave, un cerebro real, tipografía blanca ajustada</h1><p class="lede">Leído de la presentación en el repositorio de My Little Brain: media/deck.html y media/deck-slide-1.png … deck-slide-7.png.</p></section>
<div class="panel"><h2>La idea</h2><p>Nada va en caja. Ningún marco ni borde se apoya en el campo: una imagen se disuelve en él con una máscara radial suave, y la tipografía se apoya en el color. La presentación lo llama un campo de color que respira.</p></div>
<div class="panel">
  <h2>Color</h2>
  <div class="grid">${[
    ["base del campo", "#CFDCFB", "la página tras las manchas"],
    ["brasa", "#FF3B2F", "mancha superior izquierda; el color de enlace"],
    ["ámbar", "#FFCF6B", "superior izquierda y centro superior"],
    ["violeta", "#B07DE0", "centro"],
    ["naranja", "#FF6A1A", "centro derecha"],
    ["sol", "#FFD36E", "derecha"],
    ["rosa", "#FF4F8B", "centro inferior"],
    ["orquídea", "#C78CFF", "superior derecha"],
    ["cielo", "#6FA8FF", "inferior derecha"],
    ["hielo", "#7FB2FF", "inferior izquierda"],
    ["tinta", "#14102A", "texto sobre el panel"],
    ["panel", "#F6F7F2", "la única superficie neutra"],
  ].map(([n, h, u]) => sw(n, h, u)).join("")}</div>
  <p style="margin-top:16px">La presentación pone tipografía blanca directamente sobre el campo. Blanco sobre ámbar es aproximadamente 1,7:1, demasiado bajo para leer. Nuestra regla: la tipografía de titular sobre el campo es blanca, de 40 px o más, sobre un velo oscuro suave que mantiene cada titular en 3:1 o mejor; el texto es tinta sobre el panel claro a 7:1 o mejor; la brasa es el único acento, a 4,6:1 sobre el panel. No hay una segunda paleta.</p>
</div>
<div class="panel">
  <h2>Tipografía</h2>
  <ul>
    <li><strong>Titulares y texto:</strong> Inter Tight, 500 y 700, interletrado −0,035em a 96 px y −0,02em a 24–40 px, altura de línea 0,95–1,1.</li>
    <li><strong>Números, parámetros, código:</strong> JetBrains Mono, 400 y 500. Una métrica siempre va en mono.</li>
    <li><strong>Sin petición de fuentes:</strong> la pila recurre a Inter, la sans del sistema y la mono del sistema. La página no carga ningún archivo de fuente ni llama a un CDN.</li>
    <li><strong>CJK:</strong> la presentación no tiene tipografía CJK; las páginas en chino usan la sans CJK del sistema, recta, con los mismos tamaños y sin interletrado negativo.</li>
  </ul>
</div>
<div class="panel">
  <h2>Composición y movimiento</h2>
  <ul>
    <li>Una columna, márgenes generosos: 720 px para el texto, 1120 px para una rejilla, nunca una barra lateral.</li>
    <li>El cerebro es el real de la presentación, enmascarado con <span class="mono">radial-gradient(closest-side, #000 52%, transparent 100%)</span> para que sus bordes se disuelvan.</li>
    <li>El campo respira en 16 s; una página no cambia más rápido. <span class="mono">prefers-reduced-motion</span> lo detiene todo.</li>
    <li>390 px de ancho, sin desplazamiento lateral, en ambos temas. El campo no cambia en oscuro; el panel y la tinta se intercambian.</li>
  </ul>
</div>
<div class="panel">
  <h2>Voz, y la línea que nunca se mueve</h2>
  <p>Frases cortas, voz activa, una palabra por significado. Un número aparece con su método. Sin signos de exclamación, sin «revolucionario», sin afirmación sin un registro detrás.</p>
  <p>El pie de la presentación lleva la línea «hipótesis de modelo, no diagnósticos · sin afirmación de ventaja cuántica». Está en cada página de este sitio, en el idioma del visitante.</p>
  <div class="buttons"><a class="button" href="/deck/">La presentación</a><a class="button ghost" href="/es/thesis.html">La tesis</a></div>
</div>`,
};

const zh = {
  title: "风格 — Cortex Squared",
  description:
    "实验室的风格来自其演示文稿：一片柔和的色彩场、其中一颗真实的 3D 大脑、紧凑的白色标题字、等宽体数字，以及一条演示文稿未能满足的正文规则。",
  body: `<section class="hero"><p class="eyebrow" style="color:#fff;opacity:.9">Cortex Squared · 风格指南</p><h1>一片柔和的场，一颗真实的大脑，紧凑的白字</h1><p class="lede">取自 My Little Brain 仓库中的演示文稿：media/deck.html 与 media/deck-slide-1.png … deck-slide-7.png。</p></section>
<div class="panel"><h2>理念</h2><p>没有东西被框住。场上没有边框：图像通过柔和的径向遮罩融入其中，字直接落在颜色上。演示文稿称之为会呼吸的色彩场。</p></div>
<div class="panel">
  <h2>颜色</h2>
  <div class="grid">${[
    ["场底色", "#CFDCFB", "色块后面的页面"],
    ["余烬", "#FF3B2F", "左上色块；链接颜色"],
    ["琥珀", "#FFCF6B", "左上与上中"],
    ["紫罗兰", "#B07DE0", "中央"],
    ["橙", "#FF6A1A", "中右"],
    ["日光", "#FFD36E", "右侧"],
    ["玫瑰", "#FF4F8B", "下中"],
    ["兰紫", "#C78CFF", "右上"],
    ["天蓝", "#6FA8FF", "右下"],
    ["冰蓝", "#7FB2FF", "左下"],
    ["墨色", "#14102A", "面板上的正文"],
    ["面板", "#F6F7F2", "唯一的中性表面"],
  ].map(([n, h, u]) => sw(n, h, u)).join("")}</div>
  <p style="margin-top:16px">演示文稿把白字直接放在场上。白字在琥珀上约为 1.7:1，低到无法阅读。我们的规则：场上的标题字为白色、40 px 以上，覆盖一层柔和的深色遮罩，使每个标题至少达到 3:1；正文为面板上的墨色，达到 7:1 以上；余烬是唯一的强调色，在面板上为 4.6:1。没有第二套配色。</p>
</div>
<div class="panel">
  <h2>字体</h2>
  <ul>
    <li><strong>标题与正文：</strong>Inter Tight，500 与 700，96 px 时字距 −0.035em，24–40 px 时 −0.02em，行高 0.95–1.1。</li>
    <li><strong>数字、参数、代码：</strong>JetBrains Mono，400 与 500。指标一律用等宽体。</li>
    <li><strong>不请求字体：</strong>字体栈回退到 Inter、系统无衬线与系统等宽。页面不加载任何字体文件，也不调用字体 CDN。</li>
    <li><strong>中日韩文字：</strong>演示文稿没有 CJK 字体，中文页面使用系统 CJK 无衬线，直立，字号相同，不使用负字距。</li>
  </ul>
</div>
<div class="panel">
  <h2>版式与动效</h2>
  <ul>
    <li>单列，留白充足：正文 720 px，网格 1120 px，从不使用侧栏。</li>
    <li>大脑是演示文稿中那颗真实的大脑，用 <span class="mono">radial-gradient(closest-side, #000 52%, transparent 100%)</span> 遮罩，使边缘融入背景。</li>
    <li>色彩场以 16 秒呼吸；页面的变化不会更快。<span class="mono">prefers-reduced-motion</span> 会全部停止。</li>
    <li>390 px 宽无横向滚动，两种主题皆然。深色下色彩场不变；面板与墨色互换。</li>
  </ul>
</div>
<div class="panel">
  <h2>语气，以及那句永不移动的话</h2>
  <p>短句、主动语态、一词一义。数字必须带方法。没有感叹号，没有「革命性」，没有缺少记录的主张。</p>
  <p>演示文稿的页脚写着「模型假设，而非诊断 · 不主张量子优势」。它出现在本站每一页，并使用访客的语言。</p>
  <div class="buttons"><a class="button" href="/deck/">演示文稿</a><a class="button ghost" href="/zh/thesis.html">研究命题</a></div>
</div>`,
};

export { en, es, zh };
