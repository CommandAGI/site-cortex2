const hero = (kicker, h1, lede) => `<section class="hero"><p class="eyebrow" style="color:#fff;opacity:.9">${kicker}</p><h1>${h1}</h1><p class="lede">${lede}</p></section>`;
const video = (title, note, cta) => `
<div class="video" data-video="c7H80NzR3Tg">
  <button type="button" aria-label="${cta}"><span class="play" aria-hidden="true">▶</span><span>${title}</span><span style="font-size:15px;font-weight:500;opacity:.9">${note}</span></button>
</div>
<script>
document.querySelectorAll('.video[data-video]').forEach((box) => {
  box.querySelector('button').addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + box.dataset.video + '?autoplay=1&rel=0';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    box.replaceChildren(frame);
  }, { once: true });
});
<\/script>`;

const en = {
  title: "My Little Brain — the laboratory's instrument",
  description:
    "My Little Brain turns a person's EEG into the 256 hypotheses of a simplified brain model, with the loss of each and the sampler that searched them. Free and open. Not a diagnosis, not a medical device.",
  body: `${hero("My Little Brain · the instrument", "Your brain, 256 times", "A chat agent that reads your notes and your live EEG, a 3D brain, and the inverse search that finds the simplified-model parameters behind a recording. It is free, and it is not a diagnosis.")}
<div class="panel">
  <h2>What it does</h2>
  <div class="grid">
    <div class="card"><h3>Reads your EEG</h3><p>An OpenBCI headset in Chrome, through BrainFlow: live band powers, blink and eyes-closed detection, and recordings. The recording stays on your device unless you give it away.</p></div>
    <div class="card"><h3>Shows the hypotheses</h3><p>Your recording becomes eleven spectral features, and the engine scores all 256 parameter sets of a four-parameter Wilson–Cowan column against them. The app draws the landscape, the circuits and the waveforms.</p></div>
    <div class="card"><h3>Searches with three samplers</h3><p>QAOA on IBM, IonQ and qBraid; Extropic's THRML thermodynamic sampler on CPU; classical simulated annealing and exhaustive enumeration. Every sample is re-scored with the nonlinear model.</p></div>
    <div class="card"><h3>Judges by measurement</h3><p>A circuit engineer proposes, compiles, runs and revises, and the system — not the model — labels the result improved, unchanged or regressed, from measured metrics.</p></div>
  </div>
  ${video("Watch the two-minute demo", "YouTube loads only when you press play", "Play the demo video")}
</div>
<div class="panel">
  <h2>What runs where</h2>
  <p>The site you are on is static: the thesis, the research log, the deck, and <a href="/lab/">the instrument</a>, which runs the engine's mathematics in your browser with no server.</p>
  <p>The full app — the chat agent, the live OpenBCI bridge, the job queue and the hardware samplers — needs a Python service. It runs where it already runs: the project's own Google Cloud Run deployment. Moving it to CommandAGI's hosting, or replacing it with a service this laboratory runs, is a documented next step, not a claim.</p>
  <p>Paid quantum hardware is the one step that always stops: a run at IBM, IonQ or qBraid that costs money needs the owner's decision first. A free simulator run is always allowed.</p>
</div>
<div class="panel">
  <h2>The source, kept as it is</h2>
  <p>My Little Brain is the owner's own project: <a href="https://github.com/JacobFV/my-little-brain">github.com/JacobFV/my-little-brain</a> (cerebralvalley.ai gallery project 66). The laboratory's site repository carries a copy of its source, with its claims section unchanged:</p>
  <ul>
    <li>✅ A reproducible, seeded inverse problem in which every sampler is scored on the same nonlinear objective under a fixed forward-simulation budget.</li>
    <li>✅ An agent whose improvements are judged by measured metrics. It cannot grade its own work.</li>
    <li>❌ <strong>Quantum advantage.</strong> 256 states are trivially enumerable classically. The benchmark measures sampler quality under a budget.</li>
    <li>❌ <strong>Tractography.</strong> The fibres on the brain are an illustrative overlay, not reconstructed from scalp EEG.</li>
    <li>❌ <strong>Physical Extropic hardware.</strong> THRML is their open-source software stack, running on CPU.</li>
    <li>❌ <strong>Clinical meaning.</strong> The parameters are model quantities, and the brain's eyes and moods are playful animation, not measured cognition.</li>
  </ul>
  <div class="buttons"><a class="button" href="/lab/">Run the instrument</a><a class="button ghost" href="https://github.com/JacobFV/my-little-brain">The source</a></div>
</div>`,
};

const es = {
  title: "My Little Brain — el instrumento del laboratorio",
  description:
    "My Little Brain convierte el EEG de una persona en las 256 hipótesis de un modelo cerebral simplificado, con la pérdida de cada una y el muestreador que las buscó. Gratuito y abierto. No es un diagnóstico ni un producto sanitario.",
  body: `${hero("My Little Brain · el instrumento", "Tu cerebro, 256 veces", "Un agente de conversación que lee tus notas y tu EEG en vivo, un cerebro en 3D y la búsqueda inversa que encuentra los parámetros del modelo simplificado detrás de un registro. Es gratuito y no es un diagnóstico.")}
<div class="panel">
  <h2>Qué hace</h2>
  <div class="grid">
    <div class="card"><h3>Lee tu EEG</h3><p>Un casco OpenBCI en Chrome, mediante BrainFlow: potencias de banda en vivo, detección de parpadeos y de ojos cerrados, y grabaciones. El registro se queda en tu dispositivo salvo que lo entregues.</p></div>
    <div class="card"><h3>Muestra las hipótesis</h3><p>Tu registro se convierte en once características espectrales y el motor puntúa los 256 conjuntos de parámetros de una columna de Wilson–Cowan de cuatro parámetros. La aplicación dibuja el paisaje, los circuitos y las formas de onda.</p></div>
    <div class="card"><h3>Busca con tres muestreadores</h3><p>QAOA en IBM, IonQ y qBraid; el muestreador termodinámico THRML de Extropic en CPU; recocido simulado clásico y enumeración exhaustiva. Cada muestra se vuelve a puntuar con el modelo no lineal.</p></div>
    <div class="card"><h3>Juzga por medición</h3><p>Un ingeniero de circuitos propone, compila, ejecuta y revisa; el sistema —no el modelo— etiqueta el resultado como mejorado, sin cambios o empeorado, a partir de métricas medidas.</p></div>
  </div>
  ${video("Ver la demostración de dos minutos", "YouTube solo carga cuando pulsas reproducir", "Reproducir la demostración")}
</div>
<div class="panel">
  <h2>Qué funciona dónde</h2>
  <p>Este sitio es estático: la tesis, el registro de investigación, la presentación y <a href="/es/lab/">el instrumento</a>, que ejecuta las matemáticas del motor en tu navegador sin servidor.</p>
  <p>La aplicación completa —el agente de conversación, el puente OpenBCI en vivo, la cola de trabajos y los muestreadores de hardware— necesita un servicio en Python. Funciona donde ya funciona: el despliegue propio del proyecto en Google Cloud Run. Moverlo al alojamiento de CommandAGI, o sustituirlo por un servicio que este laboratorio opere, es un paso siguiente documentado, no una afirmación.</p>
  <p>El hardware cuántico de pago es el paso que siempre se detiene: una ejecución en IBM, IonQ o qBraid que cueste dinero necesita primero la decisión del propietario. Una ejecución gratuita en simulador siempre está permitida.</p>
</div>
<div class="panel">
  <h2>El código fuente, tal como está</h2>
  <p>My Little Brain es el proyecto propio del propietario: <a href="https://github.com/JacobFV/my-little-brain">github.com/JacobFV/my-little-brain</a> (proyecto 66 de la galería de cerebralvalley.ai). El repositorio del sitio del laboratorio incluye una copia de su código, con su sección de afirmaciones sin cambios:</p>
  <ul>
    <li>✅ Un problema inverso reproducible y con semilla en el que cada muestreador se puntúa con el mismo objetivo no lineal bajo un presupuesto fijo de simulaciones directas.</li>
    <li>✅ Un agente cuyas mejoras se juzgan con métricas medidas. No puede calificar su propio trabajo.</li>
    <li>❌ <strong>Ventaja cuántica.</strong> 256 estados se enumeran trivialmente en clásico. El banco de pruebas mide la calidad del muestreador bajo un presupuesto.</li>
    <li>❌ <strong>Tractografía.</strong> Las fibras del cerebro son una capa ilustrativa, no reconstruidas a partir del EEG de cuero cabelludo.</li>
    <li>❌ <strong>Hardware físico de Extropic.</strong> THRML es su pila de software de código abierto, en CPU.</li>
    <li>❌ <strong>Significado clínico.</strong> Los parámetros son cantidades del modelo, y los ojos y estados de ánimo del cerebro son animación lúdica, no cognición medida.</li>
  </ul>
  <div class="buttons"><a class="button" href="/es/lab/">Ejecutar el instrumento</a><a class="button ghost" href="https://github.com/JacobFV/my-little-brain">El código fuente</a></div>
</div>`,
};

const zh = {
  title: "My Little Brain — 实验室的仪器",
  description:
    "My Little Brain 把一个人的脑电图变成简化脑模型的 256 个假设，附每个假设的损失以及搜索它们的采样器。免费且开放。不是诊断，也不是医疗器械。",
  body: `${hero("My Little Brain · 仪器", "你的大脑，256 次", "一个读取你的笔记与实时脑电图的对话代理、一个 3D 大脑，以及从记录反演出简化模型参数的反向搜索。它免费，而且不是诊断。")}
<div class="panel">
  <h2>它做什么</h2>
  <div class="grid">
    <div class="card"><h3>读取你的脑电图</h3><p>在 Chrome 中通过 BrainFlow 连接 OpenBCI 头环：实时频带功率、眨眼与闭眼检测，以及记录。除非你主动交出，记录留在你的设备上。</p></div>
    <div class="card"><h3>展示假设</h3><p>你的记录变成十一个频谱特征，引擎用它们给四参数 Wilson–Cowan 群体的 256 组参数评分。应用绘制地形图、电路与波形。</p></div>
    <div class="card"><h3>用三种采样器搜索</h3><p>IBM、IonQ 与 qBraid 上的 QAOA；Extropic THRML 热力学采样器（CPU）；经典模拟退火与穷举。每个样本都用非线性模型重新评分。</p></div>
    <div class="card"><h3>以测量判断</h3><p>电路工程师提出、编译、运行并修订，而系统——不是模型——根据实测指标把结果标为改进、不变或退步。</p></div>
  </div>
  ${video("观看两分钟演示", "只有按下播放时才会加载 YouTube", "播放演示视频")}
</div>
<div class="panel">
  <h2>什么在哪里运行</h2>
  <p>你所在的站点是静态的：研究命题、研究日志、演示文稿，以及<a href="/zh/lab/">仪器</a>——它在你的浏览器中运行引擎的数学，无需服务器。</p>
  <p>完整应用——对话代理、实时 OpenBCI 桥、任务队列与硬件采样器——需要 Python 服务。它在其已有的位置运行：项目自己的 Google Cloud Run 部署。把它迁移到 CommandAGI 的托管，或替换为本实验室运营的服务，是记录在案的下一步，而不是已经做到的事。</p>
  <p>付费量子硬件是永远会停下的一步：在 IBM、IonQ 或 qBraid 上花钱的运行需要先由所有者决定。免费的模拟器运行始终允许。</p>
</div>
<div class="panel">
  <h2>源码，原样保留</h2>
  <p>My Little Brain 是所有者自己的项目：<a href="https://github.com/JacobFV/my-little-brain">github.com/JacobFV/my-little-brain</a>（cerebralvalley.ai 画廊第 66 号项目）。实验室的站点仓库包含其源码副本，其声明部分未作改动：</p>
  <ul>
    <li>✅ 一个可复现、带种子的逆问题：每个采样器在固定前向模拟预算下，用同一个非线性目标评分。</li>
    <li>✅ 一个由实测指标判断改进的代理。它不能给自己的工作上分。</li>
    <li>❌ <strong>量子优势。</strong> 256 个状态在经典计算中可轻松穷举。基准测试衡量的是预算内的采样器质量。</li>
    <li>❌ <strong>纤维追踪。</strong> 大脑上的纤维是示意性叠加，并非由头皮脑电图重建。</li>
    <li>❌ <strong>Extropic 物理硬件。</strong> THRML 是其开源软件栈，运行在 CPU 上。</li>
    <li>❌ <strong>临床意义。</strong> 参数是模型量，大脑的眼睛与情绪是趣味动画，不是被测量的认知。</li>
  </ul>
  <div class="buttons"><a class="button" href="/zh/lab/">运行仪器</a><a class="button ghost" href="https://github.com/JacobFV/my-little-brain">源码</a></div>
</div>`,
};

export { en, es, zh };
