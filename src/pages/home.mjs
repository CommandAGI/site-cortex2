const hero = (h1, lede, kicker) => `
<section class="hero">
  <img class="brain masked" src="/assets/brain.webp" alt="" width="520" height="520">
  <p class="eyebrow" style="color:#fff;opacity:.9">${kicker}</p>
  <h1>${h1}</h1>
  <p class="lede">${lede}</p>
</section>`;

const video = (title, note, cta) => `
<div class="video" data-video="c7H80NzR3Tg">
  <button type="button" aria-label="${cta}">
    <span class="play" aria-hidden="true">▶</span>
    <span>${title}</span>
    <span style="font-size:15px;font-weight:500;opacity:.9">${note}</span>
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

export const en = {
  title: "Cortex Squared — a neuroscience laboratory working on epilepsy",
  description:
    "Cortex Squared is a research laboratory. Its thesis: a seizure is a transition between two regimes of a brain's dynamics, readable from EEG by inverting a simplified model. Its engine is cortex²; its instrument is My Little Brain. Model hypotheses, not diagnoses.",
  body: `${hero(
    "A seizure is a transition. Can we read it from EEG in time?",
    "Cortex Squared is a neuroscience laboratory working on one question: can a seizure be predicted, and in time prevented, from the electroencephalogram by inverting a simplified model of brain dynamics?",
    "Cortex Squared · research laboratory",
  )}
<div class="panel">
  <p class="eyebrow">The thesis</p>
  <h2>Three claims, each able to fail alone</h2>
  <p>A simplified neural-mass model reproduces the regime before a seizure and the regime during it. The parameters that reproduce a recording can be estimated from that recording, with an uncertainty small enough to tell the two regimes apart. The estimate moves toward a seizure regime before the seizure starts, and that movement forecasts better than a matched baseline.</p>
  <p>The engine that performs the estimate is <strong>cortex²</strong>: it searches backwards from a recording's spectrum to the 256 parameter sets of a four-parameter Wilson–Cowan column, on a quantum-inspired sampler, a thermodynamic sampler and classical baselines. Every sample is re-scored with the nonlinear model, so a bad approximation shows as a bad measured number.</p>
  <p class="note">These are hypotheses about a simplified model. They are not a diagnosis, and they say nothing about any one person until a study tests them on that person's data under a protocol.</p>
  <div class="buttons"><a class="button" href="/thesis.html">Read the thesis</a><a class="button ghost" href="/lab/">Try the instrument</a></div>
</div>
<div class="panel">
  <p class="eyebrow">The first record</p>
  <h2>Two windows of one public recording</h2>
  <div class="grid">
    <div class="card"><p class="kicker">Pre-ictal · 2900–2960 s</p><p class="stat">01110001</p><p class="dim">one consistent hypothesis, loss 0.36</p></div>
    <div class="card"><p class="kicker">Ictal · 2996–3036 s</p><p class="stat">11100011</p><p class="dim">three consistent hypotheses, loss 0.88</p></div>
    <div class="card"><p class="kicker">The null</p><p class="stat">3 bits</p><p class="dim">the pre-ictal → ictal distance equals the median distance between two ictal windows: the shift is not yet distinguishable from the state's own variability</p></div>
  </div>
  <p class="dim">CHB-MIT <span class="mono">chb01_03</span>, channel T7-P7, 256 Hz, Open Data Commons Attribution License v1.0. Computed with the engine's own code at commit <span class="mono">e2e6494</span>, noise seed 7. A negative result on one channel is a result: <a href="/research.html">the research log</a> says so in its first entry.</p>
</div>
<div class="panel">
  <p class="eyebrow">The instrument</p>
  <h2>My Little Brain</h2>
  <p>The laboratory's instrument, free and open: a person's own EEG becomes the 256 hypotheses of the model, with the loss of each, the sampler that searched them and the set that is consistent with the recording. It runs in the browser with no server.</p>
  ${video("Watch the two-minute demo", "YouTube loads only when you press play", "Play the demo video")}
  <div class="buttons"><a class="button" href="/lab/">Run the instrument</a><a class="button ghost" href="/product.html">What My Little Brain is</a></div>
</div>
<div class="panel">
  <p class="eyebrow">What it is not</p>
  <h2>Three promises we do not make</h2>
  <div class="grid">
    <div class="card"><h3>Not a diagnosis</h3><p>Every output is a hypothesis about a simplified model. A person with epilepsy needs a clinician, not an app.</p></div>
    <div class="card"><h3>Not a medical device</h3><p>Nothing here is cleared or approved by a regulator, and nothing here is care. A study with people needs consent and an approved protocol first.</p></div>
    <div class="card"><h3>Not a quantum advantage</h3><p>256 hypotheses are enumerable on a laptop. We compare samplers under one budget and keep the classical baselines in every table.</p></div>
  </div>
  <p><a href="/safety.html">Safety, consent and the ethics review a study would need</a></p>
</div>
<div class="panel">
  <p class="eyebrow">The laboratory</p>
  <h2>Three co-founders, four research agents</h2>
  <p>Cortex Squared starts with its three co-founders — Jacob Valdez, Hanah Rahman and Rohit Korrapolu — and four AI research agents, one named area each: seizure forecasting, inverse modelling, quantum and thermodynamic sampling, and clinical and ethics. The agents are AI agents, not people, and they say so.</p>
  <div class="buttons"><a class="button" href="/team.html">The team</a><a class="button ghost" href="/research.html">The open questions</a></div>
</div>`,
};

export const es = {
  title: "Cortex Squared — un laboratorio de neurociencia que investiga la epilepsia",
  description:
    "Cortex Squared es un laboratorio de investigación. Su tesis: una crisis epiléptica es una transición entre dos regímenes de la dinámica cerebral, legible en el EEG invirtiendo un modelo simplificado. Su motor es cortex²; su instrumento es My Little Brain. Hipótesis de modelo, no diagnósticos.",
  body: `${hero(
    "Una crisis es una transición. ¿Podemos leerla en el EEG a tiempo?",
    "Cortex Squared es un laboratorio de neurociencia que trabaja en una pregunta: ¿se puede predecir una crisis epiléptica, y prevenirla a tiempo, a partir del electroencefalograma invirtiendo un modelo simplificado de la dinámica cerebral?",
    "Cortex Squared · laboratorio de investigación",
  )}
<div class="panel">
  <p class="eyebrow">La tesis</p>
  <h2>Tres afirmaciones, y cada una puede fallar sola</h2>
  <p>Un modelo simplificado de masa neuronal reproduce el régimen anterior a una crisis y el régimen durante la crisis. Los parámetros que reproducen un registro se pueden estimar a partir de ese registro, con una incertidumbre lo bastante pequeña para distinguir ambos regímenes. La estimación se mueve hacia un régimen de crisis antes de que la crisis empiece, y ese movimiento predice mejor que una línea base equivalente.</p>
  <p>El motor que hace la estimación es <strong>cortex²</strong>: busca hacia atrás, desde el espectro de un registro hasta los 256 conjuntos de parámetros de una columna de Wilson–Cowan de cuatro parámetros, con un muestreador inspirado en lo cuántico, un muestreador termodinámico y líneas base clásicas. Cada muestra se vuelve a puntuar con el modelo no lineal, así que una mala aproximación aparece como un mal número medido.</p>
  <p class="note">Son hipótesis sobre un modelo simplificado. No son un diagnóstico y no dicen nada sobre una persona hasta que un estudio las pruebe con sus datos y un protocolo aprobado.</p>
  <div class="buttons"><a class="button" href="/es/thesis.html">Leer la tesis</a><a class="button ghost" href="/es/lab/">Probar el instrumento</a></div>
</div>
<div class="panel">
  <p class="eyebrow">El primer registro</p>
  <h2>Dos ventanas de un registro público</h2>
  <div class="grid">
    <div class="card"><p class="kicker">Preictal · 2900–2960 s</p><p class="stat">01110001</p><p class="dim">una hipótesis consistente, pérdida 0,36</p></div>
    <div class="card"><p class="kicker">Ictal · 2996–3036 s</p><p class="stat">11100011</p><p class="dim">tres hipótesis consistentes, pérdida 0,88</p></div>
    <div class="card"><p class="kicker">El nulo</p><p class="stat">3 bits</p><p class="dim">la distancia preictal → ictal iguala la distancia mediana entre dos ventanas ictales: el cambio aún no se distingue de la variabilidad propia del estado</p></div>
  </div>
  <p class="dim">CHB-MIT <span class="mono">chb01_03</span>, canal T7-P7, 256 Hz, licencia Open Data Commons Attribution 1.0. Calculado con el código del motor en el commit <span class="mono">e2e6494</span>, semilla de ruido 7. Un resultado negativo en un canal es un resultado: <a href="/es/research.html">el registro de investigación</a> lo dice en su primera entrada.</p>
</div>
<div class="panel">
  <p class="eyebrow">El instrumento</p>
  <h2>My Little Brain</h2>
  <p>El instrumento del laboratorio, gratuito y abierto: el EEG de una persona se convierte en las 256 hipótesis del modelo, con la pérdida de cada una, el muestreador que las buscó y el conjunto consistente con el registro. Funciona en el navegador, sin servidor.</p>
  ${video("Ver la demostración de dos minutos", "YouTube solo carga cuando pulsas reproducir", "Reproducir la demostración")}
  <div class="buttons"><a class="button" href="/es/lab/">Ejecutar el instrumento</a><a class="button ghost" href="/es/product.html">Qué es My Little Brain</a></div>
</div>
<div class="panel">
  <p class="eyebrow">Lo que no es</p>
  <h2>Tres promesas que no hacemos</h2>
  <div class="grid">
    <div class="card"><h3>No es un diagnóstico</h3><p>Cada salida es una hipótesis sobre un modelo simplificado. Una persona con epilepsia necesita a su médico, no una aplicación.</p></div>
    <div class="card"><h3>No es un producto sanitario</h3><p>Nada de esto está aprobado por un regulador y nada de esto es atención médica. Un estudio con personas necesita consentimiento y un protocolo aprobado primero.</p></div>
    <div class="card"><h3>No es una ventaja cuántica</h3><p>256 hipótesis se enumeran en un portátil. Comparamos muestreadores con un mismo presupuesto y mantenemos las líneas base clásicas en cada tabla.</p></div>
  </div>
  <p><a href="/es/safety.html">Seguridad, consentimiento y la revisión ética que necesitaría un estudio</a></p>
</div>
<div class="panel">
  <p class="eyebrow">El laboratorio</p>
  <h2>Tres cofundadores, cuatro agentes de investigación</h2>
  <p>Cortex Squared empieza con sus tres cofundadores —Jacob Valdez, Hanah Rahman y Rohit Korrapolu— y cuatro agentes de investigación de IA, cada uno con un área: predicción de crisis, modelado inverso, muestreo cuántico y termodinámico, y clínica y ética. Los agentes son agentes de IA, no personas, y lo dicen.</p>
  <div class="buttons"><a class="button" href="/es/team.html">El equipo</a><a class="button ghost" href="/es/research.html">Las preguntas abiertas</a></div>
</div>`,
};

export const zh = {
  title: "Cortex Squared — 研究癫痫的神经科学实验室",
  description:
    "Cortex Squared 是一家研究实验室。其研究命题：癫痫发作是脑动力学的两个状态之间的转变，可以通过反演一个简化模型从脑电图中读出。引擎是 cortex²，仪器是 My Little Brain。模型假设，而非诊断。",
  body: `${hero(
    "癫痫发作是一种状态转变。我们能否及时从脑电图中读出它？",
    "Cortex Squared 是一家神经科学实验室，研究一个问题：能否通过反演一个简化的脑动力学模型，从脑电图中预测癫痫发作，并及时加以预防？",
    "Cortex Squared · 研究实验室",
  )}
<div class="panel">
  <p class="eyebrow">研究命题</p>
  <h2>三个主张，每一个都可能单独失败</h2>
  <p>一个简化的神经群体模型能够重现发作前的状态和发作期间的状态。重现一段记录的参数可以从该记录中估计出来，其不确定性小到足以区分两种状态。估计值在发作开始之前向发作状态移动，并且这种移动的预测能力强于一个匹配的基线。</p>
  <p>完成估计的引擎是 <strong>cortex²</strong>：它从记录的频谱出发反向搜索四参数 Wilson–Cowan 群的 256 组参数，使用量子启发采样器、热力学采样器和经典基线。每个样本都用非线性模型重新评分，因此糟糕的近似会表现为糟糕的实测数字。</p>
  <p class="note">这些是关于简化模型的假设。它们不是诊断；在经批准的方案用某个人的数据检验之前，它们对任何个人都不说明任何问题。</p>
  <div class="buttons"><a class="button" href="/zh/thesis.html">阅读研究命题</a><a class="button ghost" href="/zh/lab/">试用仪器</a></div>
</div>
<div class="panel">
  <p class="eyebrow">第一份记录</p>
  <h2>一段公开记录的两个窗口</h2>
  <div class="grid">
    <div class="card"><p class="kicker">发作前 · 2900–2960 秒</p><p class="stat">01110001</p><p class="dim">一个一致假设，损失 0.36</p></div>
    <div class="card"><p class="kicker">发作期 · 2996–3036 秒</p><p class="stat">11100011</p><p class="dim">三个一致假设，损失 0.88</p></div>
    <div class="card"><p class="kicker">零假设</p><p class="stat">3 位</p><p class="dim">发作前到发作期的距离等于两个发作期窗口之间距离的中位数：这一变化尚不能与该状态自身的波动区分开</p></div>
  </div>
  <p class="dim">CHB-MIT <span class="mono">chb01_03</span>，通道 T7-P7，256 Hz，Open Data Commons Attribution License 1.0。使用引擎自身代码在提交 <span class="mono">e2e6494</span>、噪声种子 7 下计算。一个通道上的阴性结果也是一个结果：<a href="/zh/research.html">研究日志</a>的第一条就这样写。</p>
</div>
<div class="panel">
  <p class="eyebrow">仪器</p>
  <h2>My Little Brain</h2>
  <p>实验室的仪器，免费且开放：一个人的脑电图变成模型的 256 个假设，附每个假设的损失、搜索它们的采样器，以及与记录一致的假设集合。它在浏览器中运行，无需服务器。</p>
  ${video("观看两分钟演示", "只有按下播放时才会加载 YouTube", "播放演示视频")}
  <div class="buttons"><a class="button" href="/zh/lab/">运行仪器</a><a class="button ghost" href="/zh/product.html">My Little Brain 是什么</a></div>
</div>
<div class="panel">
  <p class="eyebrow">它不是什么</p>
  <h2>我们不做的三个承诺</h2>
  <div class="grid">
    <div class="card"><h3>不是诊断</h3><p>每一个输出都是关于简化模型的假设。癫痫患者需要的是医生，不是应用。</p></div>
    <div class="card"><h3>不是医疗器械</h3><p>这里没有任何东西获得监管机构批准，也没有任何东西构成医疗服务。涉及人的研究需要先取得知情同意和经批准的方案。</p></div>
    <div class="card"><h3>不是量子优势</h3><p>256 个假设在一台笔记本电脑上就能穷举。我们在同一预算下比较采样器，并在每张表中保留经典基线。</p></div>
  </div>
  <p><a href="/zh/safety.html">安全、知情同意，以及研究所需的伦理审查</a></p>
</div>
<div class="panel">
  <p class="eyebrow">实验室</p>
  <h2>三位联合创始人，四位研究代理</h2>
  <p>Cortex Squared 从三位联合创始人——Jacob Valdez、Hanah Rahman 和 Rohit Korrapolu——以及四位 AI 研究代理开始，每人一个领域：癫痫预测、反演建模、量子与热力学采样、临床与伦理。这些代理是 AI 代理，不是人，并且会明确说明。</p>
  <div class="buttons"><a class="button" href="/zh/team.html">团队</a><a class="button ghost" href="/zh/research.html">未解问题</a></div>
</div>`,
};
