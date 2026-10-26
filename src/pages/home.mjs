// The home page as a working paper: a title block, Figure 1 (a real recording), the claims, a generated plate,
// Figure 2 (scrub the recording; assets/figures.js), the result so far, the instrument, the refusals, the authors.
// One template, three languages: every word a reader sees is in T below.

const CHANNELS = ["FP1-F7", "F7-T7", "T7-P7", "P7-O1", "FP2-F8", "F8-T8", "T8-P8", "P8-O2"];
const FROM = 2860, TO = 3120;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const at = (s) => `${(((s - FROM) / (TO - FROM)) * 100).toFixed(2)}%`;

const video = (title, note, cta) => `
<div class="video" data-video="c7H80NzR3Tg">
  <button type="button" aria-label="${cta}">
    <span class="play" aria-hidden="true">▶ PLAY · 2 MIN</span>
    <span>${title}</span>
    <span>${note}</span>
  </button>
</div>
<script>
document.querySelectorAll('.video[data-video]').forEach((box) => {
  box.querySelector('button').addEventListener('click', () => {
    const id = box.dataset.video;
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    frame.title = box.querySelector('button span:nth-child(2)').textContent;
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    box.replaceChildren(frame);
  }, { once: true });
});
<\/script>`;

const plate = (name, no, say, small, alt) => `
<section class="plate" aria-label="${alt}">
  <img class="poster" src="/assets/media/${name}.webp" alt="" width="1280" height="720" loading="lazy" decoding="async">
  <video class="loop" muted playsinline loop preload="none" poster="/assets/media/${name}.webp" aria-hidden="true">
    <source src="/assets/media/${name}.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"'>
    <source src="/assets/media/${name}.h264.mp4" type="video/mp4">
  </video>
  <div class="over"><span class="figno">${no}</span><p class="say">${say}</p><small>${small}</small></div>
</section>`;

function body(t) {
  return `
<header class="title-block">
  <p class="meta">${t.meta}</p>
  <h1>${t.h1a}<em>${t.h1b}</em></h1>
  <p class="standfirst">${t.standfirst}</p>
  <p class="authors">${t.authorsLine}</p>
</header>

<figure class="fig1" aria-labelledby="fig1-cap">
  <div class="side"><span class="figno">${t.fig1no}</span> <span class="prov recorded">${t.recorded}</span><p>${t.fig1side}</p></div>
  <div class="plot">
    <div class="rows" aria-hidden="true">${CHANNELS.map((c) => `<span>${c}</span>`).join("")}</div>
    <img class="trace" src="/assets/fig1.svg" width="1040" height="398" alt="${t.fig1alt}" fetchpriority="high">
    <div class="axis" aria-hidden="true">${[2860, 2880, 2900, 2920, 2940, 2960, 2980, 3000, 3020, 3040, 3060, 3080, 3100, 3120].map((s) => `<span style="left:${at(s)}">${s}</span>`).join("")}</div>
  </div>
  <figcaption id="fig1-cap"><b>${t.fig1no}.</b> ${t.fig1cap}</figcaption>
</figure>

<section class="panel" aria-labelledby="s-claims">
  <p class="eyebrow">${t.claimsKicker}</p>
  <h2 id="s-claims">${t.claimsH}</h2>
  <ol class="claims">${t.claims.map(([c, why]) => `<li><div>${c}<span>${why}</span></div></li>`).join("")}</ol>
  <div class="buttons"><a class="button" href="${t.p}thesis.html">${t.readThesis}</a></div>
</section>

${plate("plate-darkfield", t.plate1no, t.plate1say, t.plate1small, t.plate1alt)}

<section class="fig2" id="fig2" aria-labelledby="fig2-title" data-i18n="${esc(JSON.stringify(t.fig2js))}">
  <div class="track">
    <div class="stage">
      <div class="head">
        <span class="figno">${t.fig2no}</span>
        <h2 id="fig2-title">${t.fig2h}</h2>
        <p>${t.fig2lede}</p>
        <div class="scrub">
          <label for="fig2-t">${t.timeLabel}</label>
          <output id="fig2-out" for="fig2-t">2930 s</output>
          <input id="fig2-t" type="range" min="${FROM}" max="${TO}" step="1" value="2930" aria-describedby="fig2-read">
          <div class="jumps" role="group" aria-label="${t.jumpLabel}">
            <button type="button" data-jump="2930" aria-pressed="true">${t.pre} 2900–2960</button>
            <button type="button" data-jump="3016" aria-pressed="false">${t.ictal} 2996–3036</button>
            <button type="button" data-jump="3070" aria-pressed="false">${t.post} 3040–3100</button>
          </div>
        </div>
      </div>
      <figure class="panel-fig p-eeg"><header><span>(a) ${t.aEeg}</span><span class="prov recorded">${t.recorded}</span></header>
        <canvas id="fig2-eeg" width="1200" height="300" role="img" aria-label="${t.aEegAlt}"></canvas></figure>
      <figure class="panel-fig p-spec" data-idle="false"><header><span>(b) ${t.bSpec}</span><span><span class="prov recorded">${t.recorded}</span> <span class="prov inferred">${t.inferred}</span></span></header>
        <svg id="fig2-spec" viewBox="0 0 520 250" role="img" aria-label="${t.bSpecAlt}"></svg><div class="idle">${t.notAnalysed}</div></figure>
      <figure class="panel-fig p-land" data-idle="false"><header><span>(c) ${t.cLand}</span><span class="prov inferred">${t.inferred}</span></header>
        <svg id="fig2-land" viewBox="0 0 340 380" role="img" aria-label="${t.cLandAlt}"></svg><div class="idle">${t.notAnalysed}</div></figure>
      <figure class="panel-fig p-sim" data-idle="false"><header><span>(d) ${t.dSim}</span><span class="prov simulated">${t.simulated}</span></header>
        <canvas id="fig2-sim" width="900" height="200" role="img" aria-label="${t.dSimAlt}"></canvas><div class="idle">${t.notAnalysed}</div></figure>
      <p class="readout" id="fig2-read" aria-live="polite">${t.readInit}</p>
    </div>
  </div>
  <figcaption><b>${t.fig2no}.</b> ${t.fig2cap}</figcaption>
</section>

<section class="panel" aria-labelledby="s-result">
  <p class="eyebrow">${t.resultKicker}</p>
  <h2 id="s-result">${t.resultH}</h2>
  <p>${t.resultP}</p>
  <div class="table-wrap wide"><table class="result-table">
    <caption class="eyebrow" style="caption-side:top;text-align:left">${t.tableCap}</caption>
    <thead><tr><th>${t.thWindow}</th><th class="num">${t.thSeconds}</th><th>${t.thBest}</th><th class="num">${t.thLoss}</th><th class="num">${t.thSet}</th></tr></thead>
    <tbody>
      <tr><td>${t.pre}</td><td class="num">2900–2960</td><td class="bits">01110001</td><td class="num">0.36</td><td class="num">1</td></tr>
      <tr><td>${t.ictal}</td><td class="num">2996–3036</td><td class="bits">11100011</td><td class="num">0.88</td><td class="num">3</td></tr>
      <tr><td>${t.post}</td><td class="num">3040–3100</td><td class="bits">11100011</td><td class="num">0.70</td><td class="num">1</td></tr>
    </tbody>
  </table></div>
  <p class="note">${t.nullNote}</p>
  <div class="buttons"><a class="button" href="${t.p}research.html">${t.readLog}</a></div>
</section>

${plate("plate-regimes", t.plate2no, t.plate2say, t.plate2small, t.plate2alt)}

<section class="panel" aria-labelledby="s-instrument">
  <p class="eyebrow">${t.instKicker}</p>
  <h2 id="s-instrument">${t.instH}</h2>
  <div class="slide-plate">
    <figure><img src="/deck/stills/slide-4.webp" width="1600" height="900" alt="${t.slideAlt}" loading="lazy" decoding="async"><figcaption><b>${t.plate3no}.</b> ${t.slideCap}</figcaption></figure>
    <div><p>${t.instP}</p><div class="buttons"><a class="button" href="${t.p}lab/">${t.runLab}</a><a class="button ghost" href="${t.p}product.html">${t.whatMlb}</a></div></div>
  </div>
  ${video(t.videoTitle, t.videoNote, t.videoCta)}
</section>

<section class="panel" aria-labelledby="s-not">
  <p class="eyebrow">${t.notKicker}</p>
  <h2 id="s-not">${t.notH}</h2>
  <div class="errata">${t.nots.map(([h, p]) => `<div><strong>${h}</strong><p>${p}</p></div>`).join("")}</div>
  <div class="buttons"><a class="button ghost" href="${t.p}safety.html">${t.readSafety}</a></div>
</section>

<section class="panel" aria-labelledby="s-authors">
  <p class="eyebrow">${t.authKicker}</p>
  <h2 id="s-authors">${t.authH}</h2>
  <div class="byline">
    <figure><img src="/assets/team/jacob-valdez.jpg" alt="" width="64" height="64" loading="lazy"><figcaption>Jacob Valdez<sup>1</sup></figcaption></figure>
    <figure><img src="/assets/team/hanah-rahman.jpg" alt="" width="64" height="64" loading="lazy"><figcaption>Hanah Rahman<sup>1</sup></figcaption></figure>
    <figure><img src="/assets/team/rohit-korrapolu.jpg" alt="" width="64" height="64" loading="lazy"><figcaption>Rohit Korrapolu<sup>1</sup></figcaption></figure>
    <p class="affil">${t.agentsLine}</p>
  </div>
  <p class="affil"><sup>1</sup> ${t.affil1}<br><sup>2</sup> ${t.affil2}</p>
  <div class="buttons"><a class="button" href="${t.p}team.html">${t.meetTeam}</a><a class="button ghost" href="/deck/">${t.seeDeck}</a></div>
</section>`;
}

const EN = {
  p: "/",
  meta: "<b>Working paper № 1</b><br>Neuroscience · epilepsy<br>cortex2.commandagi.app",
  h1a: "A seizure is a transition.", h1b: "Can we read it in time?",
  standfirst: "Cortex Squared is a research laboratory. We invert a simplified model of the brain to ask whether the EEG shows a seizure coming — and we publish the answer even when it is “not yet”.",
  authorsLine: "Valdez, Rahman, Korrapolu<br>and four AI research agents",
  fig1no: "Fig. 1", recorded: "recorded", inferred: "inferred", simulated: "simulated",
  fig1side: "260 seconds of one public recording. The red line is the annotated onset.",
  fig1alt: "Eight channels of scalp EEG from 2860 to 3120 seconds of CHB-MIT recording chb01_03. Before 2996 seconds the traces are small and irregular; during the annotated seizure, 2996 to 3036 seconds, they become large rhythmic waves; afterwards they quiet.",
  fig1cap: "Scalp EEG, eight bipolar channels, CHB-MIT <span class=\"mono\">chb01_03</span> (PhysioNet; Open Data Commons Attribution 1.0), 2860–3120 s. Filtered 0.5–24 Hz and drawn as min–max envelopes; nothing else is changed. The seizure, 2996–3036 s, is the dataset’s own annotation.",
  claimsKicker: "The thesis, in three claims", claimsH: "Each claim can fail on its own",
  claims: [
    ["A simple model reproduces both regimes.", "A four-parameter Wilson–Cowan column, before a seizure and during it."],
    ["Its parameters can be read back from a recording.", "With an uncertainty small enough to tell the two regimes apart."],
    ["The estimate moves before the seizure starts.", "And that movement forecasts better than a matched baseline."],
  ],
  readThesis: "Read the thesis",
  plate1no: "Plate I", plate1say: "Before a seizure, the network may drift <em>toward another rhythm.</em>",
  plate1small: "Generated video (fal · Kling 2.5 Turbo Pro), graded and slowed. Not a micrograph, not a recording.",
  plate1alt: "A generated, slow-moving image of a network of neurons in teal on a dark field.",
  fig2no: "Fig. 2", fig2h: "Scrub the recording",
  fig2lede: "Move through Figure 1. In the three windows the engine scored, see what it inferred and what the model does with it.",
  timeLabel: "Time in chb01_03", jumpLabel: "Go to a window",
  pre: "Pre-ictal", ictal: "Seizure", post: "Post-ictal",
  aEeg: "10 s of EEG around the cursor; T7-P7 in ink", aEegAlt: "Ten seconds of EEG around the chosen time. The channel the engine reads, T7-P7, is drawn darker.",
  bSpec: "Spectrum of T7-P7: recording ● against best hypothesis ○", bSpecAlt: "Relative power in ten frequency bands from 1 to 45 Hz: the recording’s values and the best hypothesis’s values.",
  cLand: "256 hypotheses; the path of the best", cLandAlt: "A 16 by 16 grid of the model’s 256 parameter sets, shaded by how well each explains the window, with a path through the best set of each window.",
  dSim: "The model at the inferred parameters, 2 s", dSimAlt: "Two seconds of the excitatory activity of the Wilson–Cowan model at the best hypothesis’s parameters.",
  notAnalysed: "Not analysed. The engine scored three windows; this second is outside them.",
  readInit: "Pre-ictal window, 2900–2960 s. Best hypothesis 01110001.",
  fig2js: { win: "{w} window, {a}–{b} s. Best hypothesis {bits}: {params}. Loss {loss}; consistent set: {n}.", none: "{t} s is outside the three windows the engine scored: not analysed.", names: ["drive", "inhibition", "recurrence", "τ"], windows: ["Pre-ictal", "Seizure", "Post-ictal"], seizure: "seizure (annotated)" },
  fig2cap: "(a) is the recording of Figure 1. (b) and (c) are the cortex² engine’s output for channel T7-P7 (commit e2e6494, noise seed 7). (d) integrates the engine’s Wilson–Cowan equations in this page, with its own noise: it shows the kind of rhythm the parameters make, not the patient’s brain.",
  resultKicker: "The result so far", resultH: "One channel is not yet enough",
  resultP: "The best hypothesis jumps three bits at the seizure. But two seizure windows also differ by three bits from each other. On this channel the shift is not yet larger than the state’s own spread.",
  tableCap: "Table 1. Three windows of chb01_03, channel T7-P7",
  thWindow: "Window", thSeconds: "Seconds", thBest: "Best hypothesis", thLoss: "Loss", thSet: "Consistent",
  nullNote: "A negative result on one channel is a result. The research log says so in its first entry.",
  readLog: "Read the research log",
  plate2no: "Plate II", plate2say: "Two regimes, one recording. <em>The question is when.</em>",
  plate2small: "Generated video (fal · Kling 2.5 Turbo Pro). A picture of the idea of a regime change, not of a brain.",
  plate2alt: "A generated image of ripples on dark water slowly gathering into one rhythm.",
  instKicker: "The instrument", instH: "My Little Brain: 256 hypotheses in your browser",
  plate3no: "Plate III", slideAlt: "A slide from the hackathon deck: EEG becomes eight qubits that hold all 256 hypotheses, scored against the recording.",
  slideCap: "From the My Little Brain hackathon deck.",
  instP: "A recording becomes eleven numbers. The instrument scores all 256 parameter sets of the model against them and lets three samplers search. It runs with no server; the exact answer is always one button away.",
  runLab: "Run the 256 hypotheses", whatMlb: "What My Little Brain is",
  videoTitle: "The two-minute demo", videoNote: "YouTube loads only when you press play", videoCta: "Play the demo video",
  notKicker: "What this is not", notH: "Three promises we do not make",
  nots: [
    ["Not a diagnosis", "Every output is a hypothesis about a simplified model. A person with epilepsy needs a clinician, not an app."],
    ["Not a medical device", "Nothing here is cleared by a regulator. A study with people needs consent and an approved protocol first."],
    ["Not a quantum advantage", "256 hypotheses are enumerable on a laptop. The classical baselines stay in every table."],
  ],
  readSafety: "Safety, consent and the ethics review",
  authKicker: "Authors", authH: "Three co-founders, four research agents",
  agentsLine: "and four research agents<sup>2</sup>",
  affil1: "Cortex Squared, co-founders.", affil2: "AI agents, not people: seizure forecasting, inverse modelling, sampling, clinical and ethics. They say so.",
  meetTeam: "The authors", seeDeck: "The pitch deck",
};

const ES = {
  p: "/es/",
  meta: "<b>Documento de trabajo n.º 1</b><br>Neurociencia · epilepsia<br>cortex2.commandagi.app",
  h1a: "Una crisis es una transición.", h1b: "¿Podemos leerla a tiempo?",
  standfirst: "Cortex Squared es un laboratorio de investigación. Invertimos un modelo simplificado del cerebro para preguntar si el EEG anuncia una crisis, y publicamos la respuesta aunque sea «todavía no».",
  authorsLine: "Valdez, Rahman, Korrapolu<br>y cuatro agentes de IA",
  fig1no: "Fig. 1", recorded: "registrado", inferred: "inferido", simulated: "simulado",
  fig1side: "260 segundos de un registro público. La línea roja es el inicio anotado.",
  fig1alt: "Ocho canales de EEG de superficie, de 2860 a 3120 segundos del registro chb01_03 de CHB-MIT. Antes de 2996 s las trazas son pequeñas e irregulares; durante la crisis anotada, de 2996 a 3036 s, se vuelven ondas grandes y rítmicas; después se calman.",
  fig1cap: "EEG de superficie, ocho canales bipolares, CHB-MIT <span class=\"mono\">chb01_03</span> (PhysioNet; Open Data Commons Attribution 1.0), 2860–3120 s. Filtrado a 0,5–24 Hz y dibujado como envolventes mín–máx; nada más se cambia. La crisis, 2996–3036 s, es la anotación del propio conjunto de datos.",
  claimsKicker: "La tesis, en tres afirmaciones", claimsH: "Cada afirmación puede fallar por sí sola",
  claims: [
    ["Un modelo simple reproduce los dos regímenes.", "Una columna de Wilson–Cowan de cuatro parámetros, antes de la crisis y durante ella."],
    ["Sus parámetros se pueden leer de un registro.", "Con una incertidumbre lo bastante pequeña para distinguir los dos regímenes."],
    ["La estimación se mueve antes de que empiece la crisis.", "Y ese movimiento predice mejor que una referencia equivalente."],
  ],
  readThesis: "Leer la tesis",
  plate1no: "Lámina I", plate1say: "Antes de una crisis, la red puede derivar <em>hacia otro ritmo.</em>",
  plate1small: "Vídeo generado (fal · Kling 2.5 Turbo Pro), etalonado y ralentizado. No es una micrografía ni un registro.",
  plate1alt: "Una imagen generada y lenta de una red de neuronas en verde azulado sobre fondo oscuro.",
  fig2no: "Fig. 2", fig2h: "Recorre el registro",
  fig2lede: "Muévete por la figura 1. En las tres ventanas que el motor evaluó, mira lo que infirió y lo que el modelo hace con ello.",
  timeLabel: "Tiempo en chb01_03", jumpLabel: "Ir a una ventana",
  pre: "Preictal", ictal: "Crisis", post: "Postictal",
  aEeg: "10 s de EEG en torno al cursor; T7-P7 en tinta", aEegAlt: "Diez segundos de EEG en torno al tiempo elegido. El canal que lee el motor, T7-P7, va más oscuro.",
  bSpec: "Espectro de T7-P7: registro ● frente a mejor hipótesis ○", bSpecAlt: "Potencia relativa en diez bandas de 1 a 45 Hz: los valores del registro y los de la mejor hipótesis.",
  cLand: "256 hipótesis; el recorrido de la mejor", cLandAlt: "Una cuadrícula de 16 por 16 con los 256 conjuntos de parámetros del modelo, sombreados según lo bien que explican la ventana, con un recorrido por el mejor de cada ventana.",
  dSim: "El modelo con los parámetros inferidos, 2 s", dSimAlt: "Dos segundos de la actividad excitadora del modelo de Wilson–Cowan con los parámetros de la mejor hipótesis.",
  notAnalysed: "Sin analizar. El motor evaluó tres ventanas; este segundo queda fuera.",
  readInit: "Ventana preictal, 2900–2960 s. Mejor hipótesis 01110001.",
  fig2js: { win: "Ventana {w}, {a}–{b} s. Mejor hipótesis {bits}: {params}. Pérdida {loss}; conjunto consistente: {n}.", none: "{t} s queda fuera de las tres ventanas que evaluó el motor: sin analizar.", names: ["impulso", "inhibición", "recurrencia", "τ"], windows: ["preictal", "de crisis", "postictal"], seizure: "crisis (anotada)" },
  fig2cap: "(a) es el registro de la figura 1. (b) y (c) son la salida del motor cortex² para el canal T7-P7 (commit e2e6494, semilla de ruido 7). (d) integra en esta página las ecuaciones de Wilson–Cowan del motor, con su propio ruido: muestra el tipo de ritmo que producen los parámetros, no el cerebro del paciente.",
  resultKicker: "El resultado hasta ahora", resultH: "Un canal todavía no basta",
  resultP: "La mejor hipótesis salta tres bits en la crisis. Pero dos ventanas de crisis también difieren tres bits entre sí. En este canal el cambio aún no supera la dispersión propia del estado.",
  tableCap: "Tabla 1. Tres ventanas de chb01_03, canal T7-P7",
  thWindow: "Ventana", thSeconds: "Segundos", thBest: "Mejor hipótesis", thLoss: "Pérdida", thSet: "Consistentes",
  nullNote: "Un resultado negativo en un canal es un resultado. El registro de investigación lo dice en su primera entrada.",
  readLog: "Leer el registro de investigación",
  plate2no: "Lámina II", plate2say: "Dos regímenes, un registro. <em>La pregunta es cuándo.</em>",
  plate2small: "Vídeo generado (fal · Kling 2.5 Turbo Pro). Una imagen de la idea de un cambio de régimen, no de un cerebro.",
  plate2alt: "Una imagen generada de ondas en agua oscura que se reúnen despacio en un solo ritmo.",
  instKicker: "El instrumento", instH: "My Little Brain: 256 hipótesis en tu navegador",
  plate3no: "Lámina III", slideAlt: "Una diapositiva de la presentación del hackathon: el EEG se convierte en ocho cúbits que contienen las 256 hipótesis, puntuadas frente al registro.",
  slideCap: "De la presentación del hackathon de My Little Brain.",
  instP: "Un registro se convierte en once números. El instrumento puntúa frente a ellos los 256 conjuntos de parámetros del modelo y deja buscar a tres muestreadores. Funciona sin servidor; la respuesta exacta siempre está a un botón.",
  runLab: "Ejecutar las 256 hipótesis", whatMlb: "Qué es My Little Brain",
  videoTitle: "La demostración de dos minutos", videoNote: "YouTube solo carga cuando pulsas reproducir", videoCta: "Reproducir la demostración",
  notKicker: "Lo que esto no es", notH: "Tres promesas que no hacemos",
  nots: [
    ["No es un diagnóstico", "Cada resultado es una hipótesis sobre un modelo simplificado. Una persona con epilepsia necesita un médico, no una aplicación."],
    ["No es un producto sanitario", "Nada de esto está autorizado por un regulador. Un estudio con personas necesita antes consentimiento y un protocolo aprobado."],
    ["No es una ventaja cuántica", "256 hipótesis se enumeran en un portátil. Las referencias clásicas siguen en cada tabla."],
  ],
  readSafety: "Seguridad, consentimiento y revisión ética",
  authKicker: "Autores", authH: "Tres cofundadores, cuatro agentes de investigación",
  agentsLine: "y cuatro agentes de investigación<sup>2</sup>",
  affil1: "Cortex Squared, cofundadores.", affil2: "Agentes de IA, no personas: predicción de crisis, modelado inverso, muestreo, clínica y ética. Lo dicen.",
  meetTeam: "Los autores", seeDeck: "La presentación",
};

const ZH = {
  p: "/zh/",
  meta: "<b>工作论文 第 1 号</b><br>神经科学 · 癫痫<br>cortex2.commandagi.app",
  h1a: "癫痫发作是一次转变。", h1b: "我们能及时读出它吗？",
  standfirst: "Cortex Squared 是一家研究实验室。我们反演一个简化的脑模型，追问脑电图能否预示发作——即使答案是“还不能”，我们也公开。",
  authorsLine: "Valdez、Rahman、Korrapolu<br>与四位 AI 研究代理",
  fig1no: "图 1", recorded: "记录", inferred: "推断", simulated: "模拟",
  fig1side: "一份公开记录中的 260 秒。红线是标注的发作起点。",
  fig1alt: "CHB-MIT 记录 chb01_03 第 2860 至 3120 秒的八通道头皮脑电。2996 秒之前波形小而不规则；在标注的发作期（2996 至 3036 秒）变为大幅节律波；之后归于平静。",
  fig1cap: "头皮脑电，八个双极通道，CHB-MIT <span class=\"mono\">chb01_03</span>（PhysioNet；Open Data Commons Attribution 1.0），2860–3120 秒。滤波 0.5–24 Hz，以最小–最大包络绘制；除此之外未作改动。发作期 2996–3036 秒为数据集自带的标注。",
  claimsKicker: "研究命题的三个主张", claimsH: "每个主张都可以单独被否证",
  claims: [
    ["一个简单模型能重现两种状态。", "一个四参数 Wilson–Cowan 柱，发作前与发作中。"],
    ["其参数可以从记录中反读出来。", "不确定性小到足以区分两种状态。"],
    ["估计值在发作开始前就会移动。", "而且这种移动的预测效果优于匹配的基线。"],
  ],
  readThesis: "阅读研究命题",
  plate1no: "插图 I", plate1say: "发作之前，网络或许正<em>滑向另一种节律。</em>",
  plate1small: "生成视频（fal · Kling 2.5 Turbo Pro），经调色与放慢。不是显微照片，也不是记录。",
  plate1alt: "一段缓慢移动的生成影像：暗背景上的青色神经元网络。",
  fig2no: "图 2", fig2h: "拖动浏览这段记录",
  fig2lede: "在图 1 中移动。在引擎评分过的三个时间窗里，看它推断出什么，以及模型据此会做什么。",
  timeLabel: "chb01_03 中的时间", jumpLabel: "跳到一个时间窗",
  pre: "发作前", ictal: "发作期", post: "发作后",
  aEeg: "光标附近 10 秒脑电；T7-P7 以深色绘制", aEegAlt: "所选时间附近的十秒脑电。引擎读取的通道 T7-P7 颜色更深。",
  bSpec: "T7-P7 频谱：记录 ● 对比最佳假设 ○", bSpecAlt: "1 至 45 Hz 十个频带的相对功率：记录值与最佳假设的值。",
  cLand: "256 个假设；最佳者的路径", cLandAlt: "16×16 网格表示模型的 256 组参数，按其解释该时间窗的程度着色，并有一条穿过各时间窗最佳参数的路径。",
  dSim: "在推断参数下的模型，2 秒", dSimAlt: "Wilson–Cowan 模型在最佳假设参数下两秒钟的兴奋性活动。",
  notAnalysed: "未分析。引擎只评分了三个时间窗；这一秒不在其中。",
  readInit: "发作前时间窗，2900–2960 秒。最佳假设 01110001。",
  fig2js: { win: "{w}时间窗，{a}–{b} 秒。最佳假设 {bits}：{params}。损失 {loss}；一致的假设 {n} 个。", none: "{t} 秒不在引擎评分的三个时间窗内：未分析。", names: ["驱动", "抑制", "回返", "τ"], windows: ["发作前", "发作期", "发作后"], seizure: "发作（标注）" },
  fig2cap: "(a) 即图 1 的记录。(b) 与 (c) 是 cortex² 引擎对通道 T7-P7 的输出（提交 e2e6494，噪声种子 7）。(d) 在本页中用引擎的 Wilson–Cowan 方程积分，噪声为本页自有：它展示这些参数产生的节律类型，而不是患者的大脑。",
  resultKicker: "目前的结果", resultH: "单个通道还不够",
  resultP: "发作时最佳假设跳变了三位。但两个发作期时间窗之间也相差三位。在这个通道上，这一变化尚未大于状态自身的离散。",
  tableCap: "表 1. chb01_03 的三个时间窗，通道 T7-P7",
  thWindow: "时间窗", thSeconds: "秒", thBest: "最佳假设", thLoss: "损失", thSet: "一致集",
  nullNote: "单通道上的阴性结果也是结果。研究日志的第一条就这样写。",
  readLog: "阅读研究日志",
  plate2no: "插图 II", plate2say: "两种状态，一份记录。<em>问题在于何时。</em>",
  plate2small: "生成视频（fal · Kling 2.5 Turbo Pro）。描绘的是“状态转变”这一概念，而非大脑。",
  plate2alt: "一段生成影像：暗色水面的涟漪缓缓汇成同一种节律。",
  instKicker: "仪器", instH: "My Little Brain：在你的浏览器中运行 256 个假设",
  plate3no: "插图 III", slideAlt: "黑客松演示文稿中的一页：脑电变成八个量子比特，容纳全部 256 个假设，并与记录比对评分。",
  slideCap: "出自 My Little Brain 黑客松演示文稿。",
  instP: "一段记录变成十一个数字。仪器把模型的全部 256 组参数与之比对评分，并让三种采样器搜索。无需服务器；精确答案永远只差一个按钮。",
  runLab: "运行 256 个假设", whatMlb: "My Little Brain 是什么",
  videoTitle: "两分钟演示", videoNote: "只有按下播放时才会加载 YouTube", videoCta: "播放演示视频",
  notKicker: "这不是什么", notH: "我们不作的三个承诺",
  nots: [
    ["不是诊断", "每个输出都是关于简化模型的假设。癫痫患者需要的是医生，而不是应用。"],
    ["不是医疗器械", "这里的任何内容都未经监管机构批准。涉及人的研究必须先取得知情同意和获批方案。"],
    ["不是量子优势", "256 个假设在笔记本电脑上即可穷举。经典基线保留在每一张表中。"],
  ],
  readSafety: "安全、知情同意与伦理审查",
  authKicker: "作者", authH: "三位联合创始人，四位研究代理",
  agentsLine: "以及四位研究代理<sup>2</sup>",
  affil1: "Cortex Squared 联合创始人。", affil2: "AI 代理，而非人类：发作预测、逆向建模、采样、临床与伦理。它们会如实说明。",
  meetTeam: "作者", seeDeck: "演示文稿",
};

export const en = {
  title: "Cortex Squared — a neuroscience laboratory working on epilepsy",
  description:
    "Cortex Squared is a research laboratory. Its thesis: a seizure is a transition between two regimes of a brain's dynamics, readable from EEG by inverting a simplified model. Its engine is cortex²; its instrument is My Little Brain. Model hypotheses, not diagnoses.",
  body: body(EN),
};

export const es = {
  title: "Cortex Squared — un laboratorio de neurociencia que trabaja en epilepsia",
  description:
    "Cortex Squared es un laboratorio de investigación. Su tesis: una crisis es una transición entre dos regímenes de la dinámica cerebral, legible en el EEG invirtiendo un modelo simplificado. Su motor es cortex²; su instrumento, My Little Brain. Hipótesis de modelo, no diagnósticos.",
  body: body(ES),
};

export const zh = {
  title: "Cortex Squared — 一家研究癫痫的神经科学实验室",
  description:
    "Cortex Squared 是一家研究实验室。其命题：癫痫发作是脑动力学两种状态之间的转变，可以通过反演简化模型从脑电图中读出。其引擎是 cortex²；其仪器是 My Little Brain。模型假设，而非诊断。",
  body: body(ZH),
};
