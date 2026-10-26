const hero = (kicker, h1, lede) => `<section class="hero"><p class="eyebrow">${kicker}</p><h1>${h1}</h1><p class="lede">${lede}</p></section>`;

const en = {
  title: "Research — Cortex Squared",
  description:
    "The laboratory's open questions and their state, the first record on CHB-MIT, and the sampler comparison with its classical baselines. No quantum advantage is claimed.",
  body: `${hero("Cortex Squared · the research log", "What is open, what is measured, what would refute it", "One thread for each open question of the thesis. A result is a record: dataset, licence, code version, seed, metric, and the next step.")}
<div class="panel">
  <p class="eyebrow">The register · 2026-10-26</p>
  <h2>The open questions</h2>
  <table><thead><tr><th>#</th><th>Question</th><th>Hypothesis</th><th>Thread</th><th>State</th></tr></thead><tbody>
    <tr><td class="num">1</td><td>Is the estimate informative when the same patient is recorded twice in one state?</td><td class="num">H1</td><td>inverse</td><td><span class="tag">open</span></td></tr>
    <tr><td class="num">2</td><td>Is the pre-ictal → ictal shift larger than the within-state null, per patient and channel?</td><td class="num">H2</td><td>inverse</td><td><span class="tag">measured</span></td></tr>
    <tr><td class="num">3</td><td>Which feature carries the shift: the band powers, the log amplitude, or the ratio?</td><td class="num">H2</td><td>inverse</td><td><span class="tag">open</span></td></tr>
    <tr><td class="num">4</td><td>Does one model extension keep the consistent set small on ictal windows?</td><td class="num">H5</td><td>inverse</td><td><span class="tag">open</span></td></tr>
    <tr><td class="num">5</td><td>At which horizon does a trajectory forecast first beat the spectral baseline, and at what false-alarm rate?</td><td class="num">H3</td><td>forecast</td><td><span class="tag">open</span></td></tr>
    <tr><td class="num">6</td><td>Which sampler is best at one fixed budget, and does the ranking survive the seeds?</td><td class="num">H4</td><td>samplers</td><td><span class="tag">open</span></td></tr>
    <tr><td class="num">7</td><td>Which datasets may we use, and under which terms?</td><td class="num">—</td><td>clinic-ethics</td><td><span class="tag">in progress</span></td></tr>
  </tbody></table>
</div>
<div class="panel">
  <p class="eyebrow">Entry 1 · 2026-10-26</p>
  <h2>The two-window record, and a null that says "not yet"</h2>
  <p><strong>Asked.</strong> Does the pre-ictal → ictal shift of the best hypothesis exceed the shift between two windows inside the same state? (H2)</p>
  <p><strong>Done.</strong> CHB-MIT <span class="mono">chb01_03</span>, channel T7-P7, 256 Hz, Open Data Commons Attribution License v1.0. The engine's own preprocessing and its 256-hypothesis landscape with the nonlinear loss, unchanged: the engine at commit <span class="mono">e2e6494</span>, noise seed 7, amplitude weight 0 (only the spectral shape is fitted to real EEG).</p>
  <table><thead><tr><th>Window</th><th>Seconds</th><th>Best hypothesis</th><th>Loss</th><th>Consistent set</th><th>Parameters (P, c₂, c₁, τ_E)</th></tr></thead><tbody>
    <tr><td>Pre-ictal</td><td class="num">2900–2960</td><td class="num">01110001</td><td class="num">0.361</td><td class="num">1</td><td class="num">2.0, 10, 18, 16</td></tr>
    <tr><td>Ictal</td><td class="num">2996–3036</td><td class="num">11100011</td><td class="num">0.880</td><td class="num">3 · 10001000, 10001100, 11100011</td><td class="num">3.0, 10, 16, 55</td></tr>
    <tr><td>Post-ictal</td><td class="num">3040–3100</td><td class="num">11100011</td><td class="num">0.697</td><td class="num">1</td><td class="num">3.0, 10, 16, 55</td></tr>
  </tbody></table>
  <p><strong>The null.</strong> Seven non-overlapping 8 s windows inside the pre-ictal segment all choose the same hypothesis: distance 0, maximum 0. Five windows inside the ictal segment choose four different hypotheses: median distance 3 bits, maximum 6.</p>
  <p><strong>The number.</strong> The pre-ictal → ictal distance is <strong>3 bits</strong>, which equals the median distance between two ictal windows. The shift is <em>not</em> distinguishable from the ictal state's own variability on this channel at this window length. H2 is not supported here.</p>
  <p><strong>What this does not say.</strong> It does not say the state did not change: the pre-ictal estimate is stable and the ictal estimate is wide, and the post-ictal window still sits on an ictal hypothesis. It says the shift is not yet separable by this statistic. The next step is to compare consistent <em>sets</em> (Jaccard) rather than single bests, to add the other channels, and to lengthen the window — in that order, each recorded.</p>
  <p class="dim">Reproduce: the engine's own <span class="mono">eeg.segment</span> and <span class="mono">inverse.landscape</span> on the shipped excerpt; the number above is the loss of the best of 256 states, and the consistent set is the exact threshold at three noise floors above it. A negative result is a result; this is the laboratory's first record.</p>
</div>
<div class="panel">
  <p class="eyebrow">The sampler comparison</p>
  <h2>Quality under one budget, with the classical baselines in the table</h2>
  <p>From the engine's benchmark: 11 hidden synthetic configurations, 8 rounds, 1024 shots, K = 8 new hypotheses validated a round — at most 64 forward simulations against 256 for enumeration. Random search without replacement is expected to find the truth with probability 64/256 = 25%.</p>
  <table><thead><tr><th>Protocol</th><th class="num">Exact recovery</th><th class="num">In consistent set</th><th class="num">Forward sims</th><th class="num">Mean AR</th><th class="num">Physical gates</th><th class="num">TVD vs ideal</th></tr></thead><tbody>
    <tr><td>random_unseen</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">64.0</td><td class="num">—</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>anneal · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">5.5</td><td class="num">0.89</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>thrml · trust_region</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">64.0</td><td class="num">0.662</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>aer_ideal · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">64.0</td><td class="num">0.585</td><td class="num">107</td><td class="num">0.109</td></tr>
    <tr><td>aer_noisy · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">64.0</td><td class="num">0.538</td><td class="num">106</td><td class="num">0.147</td></tr>
    <tr><td>anneal · surrogate</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">13.4</td><td class="num">0.865</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>aer_noisy · surrogate</td><td class="num">5/11 (45%)</td><td class="num">7/11 (64%)</td><td class="num">64.0</td><td class="num">0.404</td><td class="num">103</td><td class="num">0.154</td></tr>
  </tbody></table>
  <p class="note">With 11 configurations a difference of one or two recoveries is within noise. <strong>No quantum advantage is claimed:</strong> 256 states are trivially enumerable. The table measures sampler quality under a budget. The honest figure is the random baseline in the first row.</p>
</div>
<div class="panel">
  <p class="eyebrow">How a result is recorded</p>
  <h2>The rule every entry follows</h2>
  <ul>
    <li>The question, in the thesis's own words, and the hypothesis it tests.</li>
    <li>The dataset, its version and its licence; the window or the patient; and the split, if there is one.</li>
    <li>The code version and the seed, so that a reader can reproduce it.</li>
    <li>The number, with the sample size and the null it is compared to.</li>
    <li>The next step — and if the hypothesis is refuted, that sentence comes first.</li>
  </ul>
  <p>A correction is a new entry naming the one it corrects. Nothing is edited.</p>
  <div class="buttons"><a class="button" href="/thesis.html">The thesis behind the register</a><a class="button ghost" href="/lab/">Run the instrument</a></div>
</div>`,
};

const es = {
  title: "Investigación — Cortex Squared",
  description:
    "Las preguntas abiertas del laboratorio y su estado, el primer registro en CHB-MIT y la comparación de muestreadores con sus líneas base clásicas. No se afirma ventaja cuántica.",
  body: `${hero("Cortex Squared · el registro de investigación", "Qué está abierto, qué está medido, qué lo refutaría", "Un hilo por cada pregunta abierta de la tesis. Un resultado es un registro: conjunto de datos, licencia, versión del código, semilla, métrica y siguiente paso.")}
<div class="panel">
  <p class="eyebrow">El registro · 2026-10-26</p>
  <h2>Las preguntas abiertas</h2>
  <table><thead><tr><th>#</th><th>Pregunta</th><th>Hipótesis</th><th>Hilo</th><th>Estado</th></tr></thead><tbody>
    <tr><td class="num">1</td><td>¿Es informativa la estimación cuando al mismo paciente se le registra dos veces en un estado?</td><td class="num">H1</td><td>inverse</td><td><span class="tag">abierta</span></td></tr>
    <tr><td class="num">2</td><td>¿Es el cambio preictal → ictal mayor que el nulo dentro del estado, por paciente y canal?</td><td class="num">H2</td><td>inverse</td><td><span class="tag">medida</span></td></tr>
    <tr><td class="num">3</td><td>¿Qué característica lleva el cambio: las potencias de banda, la amplitud logarítmica o su cociente?</td><td class="num">H2</td><td>inverse</td><td><span class="tag">abierta</span></td></tr>
    <tr><td class="num">4</td><td>¿Mantiene una extensión del modelo pequeño el conjunto consistente en ventanas ictales?</td><td class="num">H5</td><td>inverse</td><td><span class="tag">abierta</span></td></tr>
    <tr><td class="num">5</td><td>¿En qué horizonte una predicción por trayectoria supera por primera vez la línea base espectral, y con qué tasa de falsas alarmas?</td><td class="num">H3</td><td>forecast</td><td><span class="tag">abierta</span></td></tr>
    <tr><td class="num">6</td><td>¿Qué muestreador es mejor con un presupuesto fijo, y sobrevive el orden a las semillas?</td><td class="num">H4</td><td>samplers</td><td><span class="tag">abierta</span></td></tr>
    <tr><td class="num">7</td><td>¿Qué conjuntos de datos podemos usar, y con qué términos?</td><td class="num">—</td><td>clinic-ethics</td><td><span class="tag">en curso</span></td></tr>
  </tbody></table>
</div>
<div class="panel">
  <p class="eyebrow">Entrada 1 · 2026-10-26</p>
  <h2>El registro de dos ventanas, y un nulo que dice «todavía no»</h2>
  <p><strong>Pregunta.</strong> ¿Supera el cambio preictal → ictal de la mejor hipótesis al cambio entre dos ventanas dentro del mismo estado? (H2)</p>
  <p><strong>Hecho.</strong> CHB-MIT <span class="mono">chb01_03</span>, canal T7-P7, 256 Hz, Open Data Commons Attribution License v1.0. El preprocesamiento del motor y su paisaje de 256 hipótesis con la pérdida no lineal, sin cambios: el motor en el commit <span class="mono">e2e6494</span>, semilla de ruido 7, peso de amplitud 0 (al EEG real solo se ajusta la forma espectral).</p>
  <table><thead><tr><th>Ventana</th><th>Segundos</th><th>Mejor hipótesis</th><th>Pérdida</th><th>Conjunto consistente</th><th>Parámetros (P, c₂, c₁, τ_E)</th></tr></thead><tbody>
    <tr><td>Preictal</td><td class="num">2900–2960</td><td class="num">01110001</td><td class="num">0,361</td><td class="num">1</td><td class="num">2,0; 10; 18; 16</td></tr>
    <tr><td>Ictal</td><td class="num">2996–3036</td><td class="num">11100011</td><td class="num">0,880</td><td class="num">3 · 10001000, 10001100, 11100011</td><td class="num">3,0; 10; 16; 55</td></tr>
    <tr><td>Postictal</td><td class="num">3040–3100</td><td class="num">11100011</td><td class="num">0,697</td><td class="num">1</td><td class="num">3,0; 10; 16; 55</td></tr>
  </tbody></table>
  <p><strong>El nulo.</strong> Siete ventanas de 8 s sin solapamiento dentro del segmento preictal eligen la misma hipótesis: distancia 0, máximo 0. Cinco ventanas dentro del segmento ictal eligen cuatro hipótesis distintas: distancia mediana 3 bits, máximo 6.</p>
  <p><strong>El número.</strong> La distancia preictal → ictal es de <strong>3 bits</strong>, igual a la distancia mediana entre dos ventanas ictales. El cambio <em>no</em> se distingue de la variabilidad propia del estado ictal en este canal con esta longitud de ventana. H2 no está respaldada aquí.</p>
  <p><strong>Lo que esto no dice.</strong> No dice que el estado no cambiara: la estimación preictal es estable y la ictal es ancha, y la ventana postictal sigue sobre una hipótesis ictal. Dice que el cambio aún no es separable con este estadístico. El siguiente paso es comparar <em>conjuntos</em> consistentes (Jaccard) en vez de mejores individuales, añadir los demás canales y alargar la ventana — en ese orden, cada uno registrado.</p>
  <p class="dim">Reproducir: <span class="mono">eeg.segment</span> e <span class="mono">inverse.landscape</span> del motor sobre el fragmento incluido; el número es la pérdida del mejor de 256 estados, y el conjunto consistente es el umbral exacto a tres pisos de ruido por encima. Un resultado negativo es un resultado; este es el primer registro del laboratorio.</p>
</div>
<div class="panel">
  <p class="eyebrow">La comparación de muestreadores</p>
  <h2>Calidad con un presupuesto, con las líneas base clásicas en la tabla</h2>
  <p>Del banco de pruebas del motor: 11 configuraciones sintéticas ocultas, 8 rondas, 1024 disparos, K = 8 hipótesis nuevas validadas por ronda — como máximo 64 simulaciones directas frente a 256 por enumeración. Se espera que la búsqueda aleatoria sin reemplazo encuentre la verdad con probabilidad 64/256 = 25%.</p>
  <table><thead><tr><th>Protocolo</th><th class="num">Recuperación exacta</th><th class="num">En el conjunto consistente</th><th class="num">Simulaciones</th><th class="num">AR medio</th><th class="num">Compuertas físicas</th><th class="num">TVD vs ideal</th></tr></thead><tbody>
    <tr><td>random_unseen</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">64,0</td><td class="num">—</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>anneal · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">5,5</td><td class="num">0,89</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>thrml · trust_region</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">64,0</td><td class="num">0,662</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>aer_ideal · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">64,0</td><td class="num">0,585</td><td class="num">107</td><td class="num">0,109</td></tr>
    <tr><td>aer_noisy · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">64,0</td><td class="num">0,538</td><td class="num">106</td><td class="num">0,147</td></tr>
    <tr><td>anneal · surrogate</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">13,4</td><td class="num">0,865</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>aer_noisy · surrogate</td><td class="num">5/11 (45%)</td><td class="num">7/11 (64%)</td><td class="num">64,0</td><td class="num">0,404</td><td class="num">103</td><td class="num">0,154</td></tr>
  </tbody></table>
  <p class="note">Con 11 configuraciones, una diferencia de una o dos recuperaciones está dentro del ruido. <strong>No se afirma ventaja cuántica:</strong> 256 estados se enumeran trivialmente. La tabla mide la calidad del muestreador con un presupuesto. La cifra honesta es la línea base aleatoria de la primera fila.</p>
</div>
<div class="panel">
  <p class="eyebrow">Cómo se registra un resultado</p>
  <h2>La regla que sigue cada entrada</h2>
  <ul>
    <li>La pregunta, con las palabras de la tesis, y la hipótesis que prueba.</li>
    <li>El conjunto de datos, su versión y su licencia; la ventana o el paciente; y la partición, si la hay.</li>
    <li>La versión del código y la semilla, para que cualquiera pueda reproducirlo.</li>
    <li>El número, con el tamaño de muestra y el nulo con el que se compara.</li>
    <li>El siguiente paso — y si la hipótesis se refuta, esa frase va primero.</li>
  </ul>
  <p>Una corrección es una entrada nueva que nombra la que corrige. Nada se edita.</p>
  <div class="buttons"><a class="button" href="/es/thesis.html">La tesis detrás del registro</a><a class="button ghost" href="/es/lab/">Ejecutar el instrumento</a></div>
</div>`,
};

const zh = {
  title: "研究 — Cortex Squared",
  description:
    "实验室的未解问题及其状态、CHB-MIT 上的第一份记录，以及带有经典基线的采样器比较。不主张量子优势。",
  body: `${hero("Cortex Squared · 研究日志", "哪些是开放的，哪些已被测量，什么会证伪它", "研究命题的每个未解问题对应一个线程。结果即记录：数据集、许可、代码版本、种子、指标与下一步。")}
<div class="panel">
  <p class="eyebrow">登记表 · 2026-10-26</p>
  <h2>未解问题</h2>
  <table><thead><tr><th>#</th><th>问题</th><th>假设</th><th>线程</th><th>状态</th></tr></thead><tbody>
    <tr><td class="num">1</td><td>当同一患者在同一状态下被记录两次时，估计是否有信息量？</td><td class="num">H1</td><td>inverse</td><td><span class="tag">开放</span></td></tr>
    <tr><td class="num">2</td><td>按患者与通道计，发作前→发作期的变化是否大于状态内零分布？</td><td class="num">H2</td><td>inverse</td><td><span class="tag">已测量</span></td></tr>
    <tr><td class="num">3</td><td>哪个特征承载这一变化：频带功率、对数幅度，还是二者之比？</td><td class="num">H2</td><td>inverse</td><td><span class="tag">开放</span></td></tr>
    <tr><td class="num">4</td><td>某一模型扩展是否能在发作期窗口上保持一致集合很小？</td><td class="num">H5</td><td>inverse</td><td><span class="tag">开放</span></td></tr>
    <tr><td class="num">5</td><td>在哪个时间范围内，轨迹预测首次优于频谱基线，误报率是多少？</td><td class="num">H3</td><td>forecast</td><td><span class="tag">开放</span></td></tr>
    <tr><td class="num">6</td><td>在固定预算下哪个采样器最好，排名能否经受不同种子的检验？</td><td class="num">H4</td><td>samplers</td><td><span class="tag">开放</span></td></tr>
    <tr><td class="num">7</td><td>我们可以使用哪些数据集，条款是什么？</td><td class="num">—</td><td>clinic-ethics</td><td><span class="tag">进行中</span></td></tr>
  </tbody></table>
</div>
<div class="panel">
  <p class="eyebrow">第 1 条 · 2026-10-26</p>
  <h2>两窗口记录，以及一个说「还不行」的零假设</h2>
  <p><strong>问题。</strong> 最佳假设的发作前→发作期变化，是否超过同一状态内两个窗口之间的变化？（H2）</p>
  <p><strong>做法。</strong> CHB-MIT <span class="mono">chb01_03</span>，通道 T7-P7，256 Hz，Open Data Commons Attribution License v1.0。使用引擎自身的预处理和不作改动的 256 假设非线性损失地形：引擎提交 <span class="mono">e2e6494</span>，噪声种子 7，幅度权重 0（对真实脑电图只拟合频谱形状）。</p>
  <table><thead><tr><th>窗口</th><th>秒</th><th>最佳假设</th><th>损失</th><th>一致集合</th><th>参数（P, c₂, c₁, τ_E）</th></tr></thead><tbody>
    <tr><td>发作前</td><td class="num">2900–2960</td><td class="num">01110001</td><td class="num">0.361</td><td class="num">1</td><td class="num">2.0, 10, 18, 16</td></tr>
    <tr><td>发作期</td><td class="num">2996–3036</td><td class="num">11100011</td><td class="num">0.880</td><td class="num">3 · 10001000, 10001100, 11100011</td><td class="num">3.0, 10, 16, 55</td></tr>
    <tr><td>发作后</td><td class="num">3040–3100</td><td class="num">11100011</td><td class="num">0.697</td><td class="num">1</td><td class="num">3.0, 10, 16, 55</td></tr>
  </tbody></table>
  <p><strong>零分布。</strong> 发作前段内七个互不重叠的 8 秒窗口都选中同一假设：距离 0，最大 0。发作期段内五个窗口选中四个不同假设：距离中位数 3 位，最大 6。</p>
  <p><strong>数字。</strong> 发作前→发作期距离为 <strong>3 位</strong>，等于两个发作期窗口之间距离的中位数。在该通道、该窗口长度上，这一变化<em>不能</em>与发作期状态自身的波动区分。H2 在此未获支持。</p>
  <p><strong>这不说明什么。</strong> 它不说明状态没有改变：发作前估计是稳定的，发作期估计是宽的，而发作后窗口仍落在发作期假设上。它说明用这一统计量还无法分离出变化。下一步依次是：比较一致<em>集合</em>（Jaccard）而非单一最优、加入其他通道、加长窗口——每一步都要有记录。</p>
  <p class="dim">复现：引擎自带的 <span class="mono">eeg.segment</span> 与 <span class="mono">inverse.landscape</span> 作用于随附片段；该数字是 256 个状态中最佳者的损失，一致集合是高于它三个噪声底的确切阈值。阴性结果也是结果；这是实验室的第一份记录。</p>
</div>
<div class="panel">
  <p class="eyebrow">采样器比较</p>
  <h2>同一预算下的质量，经典基线保留在表中</h2>
  <p>来自引擎基准：11 个隐藏合成配置、8 轮、1024 次采样，每轮验证 K = 8 个新假设——最多 64 次前向模拟，而穷举为 256 次。无放回随机搜索找到真值的期望概率为 64/256 = 25%。</p>
  <table><thead><tr><th>协议</th><th class="num">精确恢复</th><th class="num">落在一致集合</th><th class="num">前向模拟</th><th class="num">平均 AR</th><th class="num">物理门数</th><th class="num">与理想分布 TVD</th></tr></thead><tbody>
    <tr><td>random_unseen</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">64.0</td><td class="num">—</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>anneal · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">5.5</td><td class="num">0.89</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>thrml · trust_region</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">64.0</td><td class="num">0.662</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>aer_ideal · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">64.0</td><td class="num">0.585</td><td class="num">107</td><td class="num">0.109</td></tr>
    <tr><td>aer_noisy · trust_region</td><td class="num">2/11 (18%)</td><td class="num">4/11 (36%)</td><td class="num">64.0</td><td class="num">0.538</td><td class="num">106</td><td class="num">0.147</td></tr>
    <tr><td>anneal · surrogate</td><td class="num">3/11 (27%)</td><td class="num">5/11 (45%)</td><td class="num">13.4</td><td class="num">0.865</td><td class="num">—</td><td class="num">—</td></tr>
    <tr><td>aer_noisy · surrogate</td><td class="num">5/11 (45%)</td><td class="num">7/11 (64%)</td><td class="num">64.0</td><td class="num">0.404</td><td class="num">103</td><td class="num">0.154</td></tr>
  </tbody></table>
  <p class="note">在 11 个配置下，一两次恢复的差异属于噪声。<strong>不主张量子优势：</strong> 256 个状态可以轻松穷举。该表衡量的是预算内的采样器质量。诚实的数字是第一行的随机基线。</p>
</div>
<div class="panel">
  <p class="eyebrow">结果如何被记录</p>
  <h2>每条记录都遵循的规则</h2>
  <ul>
    <li>问题，用研究命题自己的话写，以及它检验的假设。</li>
    <li>数据集、版本与许可；窗口或患者；以及划分（若有）。</li>
    <li>代码版本与种子，以便读者复现。</li>
    <li>数字，附样本量以及与之比较的零假设。</li>
    <li>下一步——如果假设被证伪，这句话放在最前面。</li>
  </ul>
  <p>更正是新的一条记录，并指明它所更正的那条。任何内容都不被编辑。</p>
  <div class="buttons"><a class="button" href="/zh/thesis.html">登记表背后的研究命题</a><a class="button ghost" href="/zh/lab/">运行仪器</a></div>
</div>`,
};

export { en, es, zh };
