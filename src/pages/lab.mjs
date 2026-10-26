const hero = (kicker, h1, lede) => `<section class="hero"><p class="eyebrow" style="color:#fff;opacity:.9">${kicker}</p><h1>${h1}</h1><p class="lede">${lede}</p></section>`;

const en = {
  title: "The instrument — Cortex Squared",
  description:
    "Run cortex²'s inverse search in your browser: the 256-hypothesis landscape of a public EEG window, the consistent set, and a QAOA, Gibbs and annealing comparison at one budget. Not a diagnosis.",
  body: `${hero("The instrument", "256 hypotheses, your browser", "A recording becomes eleven spectral features; the engine scores all 256 parameter sets of a simplified brain model against them, and three samplers search the quadratic approximation. Every sample is re-scored with the nonlinear loss.")}
<div class="lab">
  <div class="panel">
    <h2>The landscape of a public recording</h2>
    <p>CHB-MIT <span class="mono">chb01_03</span>, channel T7-P7, 256 Hz, under the Open Data Commons Attribution License v1.0. The losses are computed by the engine's own Python code (commit <span class="mono">e2e6494</span>, noise seed 7), not by this page. This page searches them.</p>
    <div class="row">
      <label>Window <select id="window">
        <option value="preictal">pre-ictal · 2900–2960 s</option>
        <option value="ictal">ictal · 2996–3036 s</option>
        <option value="postictal">post-ictal · 3040–3100 s</option>
      </select></label>
      <label>QUBO approximation <select id="qubo">
        <option value="trust_region">trust region (anchored at the best)</option>
        <option value="secant">secant (anchored at 00000000)</option>
        <option value="feature_regression">feature regression (64 samples, seed 0)</option>
      </select></label>
    </div>
    <div class="row" style="margin-top:14px">
      <button class="act" id="run-qaoa" type="button">Search with QAOA</button>
      <button class="act" id="run-gibbs" type="button">Search with Gibbs</button>
      <button class="act" id="run-anneal" type="button">Search with annealing</button>
      <button class="act" id="run-exact" type="button">Enumerate all 256</button>
    </div>
    <div class="map" id="map" role="group" aria-label="The 256 hypotheses, coloured by loss"></div>
    <div class="legend"><span><span class="sw" style="background:rgb(20,16,42)"></span>best fit</span><span><span class="sw" style="background:rgb(255,106,26)"></span>worse</span><span><span class="sw" style="background:rgb(246,247,242);border:1px solid #ccc"></span>worst fit</span><span>· outlined: in the consistent set · click a cell</span></div>
    <div id="details" style="margin-top:18px"></div>
    <h3>Observed spectrum (dark) against the model's (pale)</h3>
    <div class="bars" id="bars"></div>
    <h3>The sampler's own numbers</h3>
    <div id="metrics"></div>
    <div id="log" style="margin-top:14px" aria-live="polite"></div>
  </div>
  <div class="panel">
    <h2>What the numbers mean, and what they do not</h2>
    <ul>
      <li><strong>The loss</strong> is the weighted squared distance between a hypothesis's eleven features and the recording's. It is the nonlinear objective, and every sample is re-scored with it.</li>
      <li><strong>The consistent set</strong> is the hypotheses within three noise floors of the best: those the model cannot tell apart on this recording.</li>
      <li><strong>AR</strong> is the approximation ratio: 1 when all the sampler's probability sits on the optimum, 0 when the samples are no better than uniform.</li>
      <li><strong>P(consistent)</strong> is the probability mass the samples put on the consistent set. On a single-hypothesis set it is small even for a good sampler; that is an honest number, not a failure of the page.</li>
      <li><strong>No quantum advantage is claimed.</strong> 256 states are enumerable in a millisecond — the "Enumerate all 256" button does exactly that. The comparison measures sampler quality under one budget.</li>
    </ul>
    <p class="callout">These are hypotheses about a simplified model of brain dynamics. This is not a diagnosis, and it is not a medical device.</p>
    <p class="dim">The page is the source's mathematics, re-implemented in JavaScript so that it runs with no server: the encoding, the QUBO and its exact Ising map, a statevector QAOA at 8 qubits, a single-site Gibbs sweep on the thermodynamic sampler's distribution, single-flip Metropolis annealing, and the engine's evaluation. The landscape itself is the engine's own output.</p>
  </div>
</div>`,
};

const es = {
  title: "El instrumento — Cortex Squared",
  description:
    "Ejecuta la búsqueda inversa de cortex² en tu navegador: el paisaje de 256 hipótesis de una ventana de EEG pública, el conjunto consistente y una comparación de QAOA, Gibbs y recocido con un mismo presupuesto. No es un diagnóstico.",
  body: `${hero("El instrumento", "256 hipótesis, tu navegador", "Un registro se convierte en once características espectrales; el motor puntúa los 256 conjuntos de parámetros de un modelo cerebral simplificado y tres muestreadores buscan la aproximación cuadrática. Cada muestra se vuelve a puntuar con la pérdida no lineal.")}
<div class="lab">
  <div class="panel">
    <h2>El paisaje de un registro público</h2>
    <p>CHB-MIT <span class="mono">chb01_03</span>, canal T7-P7, 256 Hz, con licencia Open Data Commons Attribution 1.0. Las pérdidas las calcula el código Python del motor (commit <span class="mono">e2e6494</span>, semilla de ruido 7), no esta página. Esta página las busca.</p>
    <div class="row">
      <label>Ventana <select id="window">
        <option value="preictal">preictal · 2900–2960 s</option>
        <option value="ictal">ictal · 2996–3036 s</option>
        <option value="postictal">postictal · 3040–3100 s</option>
      </select></label>
      <label>Aproximación QUBO <select id="qubo">
        <option value="trust_region">región de confianza (anclada en el mejor)</option>
        <option value="secant">secante (anclada en 00000000)</option>
        <option value="feature_regression">regresión de características (64 muestras, semilla 0)</option>
      </select></label>
    </div>
    <div class="row" style="margin-top:14px">
      <button class="act" id="run-qaoa" type="button">Buscar con QAOA</button>
      <button class="act" id="run-gibbs" type="button">Buscar con Gibbs</button>
      <button class="act" id="run-anneal" type="button">Buscar con recocido</button>
      <button class="act" id="run-exact" type="button">Enumerar las 256</button>
    </div>
    <div class="map" id="map" role="group" aria-label="Las 256 hipótesis, coloreadas por pérdida"></div>
    <div class="legend"><span><span class="sw" style="background:rgb(20,16,42)"></span>mejor ajuste</span><span><span class="sw" style="background:rgb(255,106,26)"></span>peor</span><span><span class="sw" style="background:rgb(246,247,242);border:1px solid #ccc"></span>el peor ajuste</span><span>· con borde: en el conjunto consistente · haz clic en una celda</span></div>
    <div id="details" style="margin-top:18px"></div>
    <h3>Espectro observado (oscuro) frente al del modelo (claro)</h3>
    <div class="bars" id="bars"></div>
    <h3>Los números del muestreador</h3>
    <div id="metrics"></div>
    <div id="log" style="margin-top:14px" aria-live="polite"></div>
  </div>
  <div class="panel">
    <h2>Qué significan los números, y qué no</h2>
    <ul>
      <li><strong>La pérdida</strong> es la distancia cuadrática ponderada entre las once características de una hipótesis y las del registro. Es el objetivo no lineal, y cada muestra se vuelve a puntuar con él.</li>
      <li><strong>El conjunto consistente</strong> son las hipótesis dentro de tres pisos de ruido del mejor: aquellas que el modelo no puede distinguir en este registro.</li>
      <li><strong>AR</strong> es la razón de aproximación: 1 cuando toda la probabilidad del muestreador está en el óptimo, 0 cuando las muestras no son mejores que el uniforme.</li>
      <li><strong>P(consistente)</strong> es la masa de probabilidad que las muestras ponen en el conjunto consistente. Con un conjunto de una sola hipótesis es pequeña incluso para un buen muestreador; es un número honesto, no un fallo de la página.</li>
      <li><strong>No se afirma ventaja cuántica.</strong> 256 estados se enumeran en un milisegundo: el botón «Enumerar las 256» hace exactamente eso. La comparación mide la calidad del muestreador con un presupuesto.</li>
    </ul>
    <p class="callout">Son hipótesis sobre un modelo simplificado de la dinámica cerebral. Esto no es un diagnóstico ni un producto sanitario.</p>
    <p class="dim">La página es la matemática de la fuente, reimplementada en JavaScript para funcionar sin servidor: la codificación, el QUBO y su mapa de Ising exacto, un QAOA de vector de estado con 8 qubits, un barrido de Gibbs de sitio único sobre la distribución del muestreador termodinámico, recocido de Metropolis de un giro y la evaluación del motor. El paisaje es la salida del propio motor.</p>
  </div>
</div>`,
};

const zh = {
  title: "仪器 — Cortex Squared",
  description:
    "在你的浏览器中运行 cortex² 的反向搜索：一段公开脑电图窗口的 256 假设地形、一致集合，以及同一预算下 QAOA、Gibbs 与退火的比较。不是诊断。",
  body: `${hero("仪器", "256 个假设，在你的浏览器中", "一段记录变成十一个频谱特征；引擎用它们给一个简化脑模型的 256 组参数评分，三种采样器搜索其二次近似。每个样本都用非线性损失重新评分。")}
<div class="lab">
  <div class="panel">
    <h2>一段公开记录的地形</h2>
    <p>CHB-MIT <span class="mono">chb01_03</span>，通道 T7-P7，256 Hz，依据 Open Data Commons Attribution License 1.0。损失由引擎自身的 Python 代码计算（提交 <span class="mono">e2e6494</span>，噪声种子 7），不是由本页计算。本页负责搜索它们。</p>
    <div class="row">
      <label>窗口 <select id="window">
        <option value="preictal">发作前 · 2900–2960 秒</option>
        <option value="ictal">发作期 · 2996–3036 秒</option>
        <option value="postictal">发作后 · 3040–3100 秒</option>
      </select></label>
      <label>QUBO 近似 <select id="qubo">
        <option value="trust_region">信赖域（锚定在最佳解）</option>
        <option value="secant">割线（锚定在 00000000）</option>
        <option value="feature_regression">特征回归（64 个样本，种子 0）</option>
      </select></label>
    </div>
    <div class="row" style="margin-top:14px">
      <button class="act" id="run-qaoa" type="button">用 QAOA 搜索</button>
      <button class="act" id="run-gibbs" type="button">用 Gibbs 搜索</button>
      <button class="act" id="run-anneal" type="button">用退火搜索</button>
      <button class="act" id="run-exact" type="button">穷举 256 个</button>
    </div>
    <div class="map" id="map" role="group" aria-label="256 个假设，按损失着色"></div>
    <div class="legend"><span><span class="sw" style="background:rgb(20,16,42)"></span>最佳拟合</span><span><span class="sw" style="background:rgb(255,106,26)"></span>更差</span><span><span class="sw" style="background:rgb(246,247,242);border:1px solid #ccc"></span>最差拟合</span><span>· 有边框：属于一致集合 · 点击单元格</span></div>
    <div id="details" style="margin-top:18px"></div>
    <h3>观测频谱（深色）与模型频谱（浅色）</h3>
    <div class="bars" id="bars"></div>
    <h3>采样器自己的数字</h3>
    <div id="metrics"></div>
    <div id="log" style="margin-top:14px" aria-live="polite"></div>
  </div>
  <div class="panel">
    <h2>这些数字意味着什么，不意味着什么</h2>
    <ul>
      <li><strong>损失</strong>是某个假设的十一个特征与该记录的加权平方距离。它是非线性目标，每个样本都用它重新评分。</li>
      <li><strong>一致集合</strong>是损失在最佳解三个噪声底之内的假设：模型在这段记录上无法区分它们。</li>
      <li><strong>AR</strong> 是近似比：采样器的全部概率落在最优解上时为 1，样本不比均匀采样更好时为 0。</li>
      <li><strong>P(一致)</strong> 是样本落在一致集合上的概率质量。当集合只有一个假设时，即使采样器很好这个数也很小；这是诚实的数字，不是本页的失败。</li>
      <li><strong>不主张量子优势。</strong> 256 个状态一毫秒内就能穷举——「穷举 256 个」按钮正是做这件事。比较衡量的是同一预算下的采样器质量。</li>
    </ul>
    <p class="callout">这些是关于简化脑动力学模型的假设。这不是诊断，也不是医疗器械。</p>
    <p class="dim">本页是源码数学的 JavaScript 重实现，因此无需服务器：编码、QUBO 及其精确 Ising 映射、8 量子比特态矢 QAOA、热力学采样器分布上的单点 Gibbs 扫描、单比特 Metropolis 退火，以及引擎的评估。地形本身是引擎的输出。</p>
  </div>
</div>`,
};

export { en, es, zh };
