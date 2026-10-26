const H = (tag, title, body) => `<div class="panel"><p class="eyebrow">${tag}</p><h2>${title}</h2>${body}</div>`;

const en = {
  title: "The epilepsy thesis — Cortex Squared",
  description:
    "The laboratory's falsifiable thesis: five hypotheses with their methods, measurements and kill criteria; the datasets and their licences; consent and the ethics review a study would need. Version 0.1, 2026-10-26.",
  body: `<section class="hero"><p class="eyebrow">Cortex Squared · version 0.1 · 2026-10-26</p>
<h1>The epilepsy thesis</h1><p class="lede">A seizure is a transition between two regimes of a brain's dynamics. Read it from EEG by inverting a simplified model, early enough to forecast — and it is in principle preventable.</p></section>
${H(
  "The claim",
  "Three parts, and each can fail alone",
  `<ol>
<li>A simplified neural-mass model reproduces the regime before a seizure and the regime during it.</li>
<li>The parameters that reproduce a recording can be estimated from that recording, with an uncertainty small enough to tell the two regimes apart.</li>
<li>The estimate moves toward a seizure regime before the seizure starts, and the movement predicts it better than a matched baseline.</li>
</ol>
<p>The engine that performs the estimate is <strong>cortex²</strong>, the engine of the My Little Brain repository. It searches backwards from a recording's spectrum to the model parameters that could have produced it, on 8 qubits — 4 parameters × 2 bits = 256 hypotheses — with a quantum-inspired sampler (QAOA), a thermodynamic sampler (Extropic's THRML software stack) and classical baselines. Every sample is re-scored with the nonlinear model, so a bad approximation shows up as a bad measured number.</p>`,
)}
${H(
  "The model",
  "One column, four parameters, eleven features",
  `<p>One excitatory population E and one inhibitory population I, driven by noise ξ (Wilson–Cowan, 1972):</p>
<p class="mono">τ_E Ė = −E + (1−E) S_E(c₁E − c₂I + P + ξ)<br>τ_I İ = −I + (1−I) S_I(c₃E − c₄I + Q)</p>
<p>Four parameters are searched, four levels each: the drive P, the inhibitory gain c₂, the recurrent excitation c₁ and the excitatory time constant τ_E. The rest are fixed. A recording becomes eleven features: ten log-spaced relative band powers from 1 Hz to 45 Hz and the log amplitude. The loss is a weighted squared distance between the model's features and the recording's. The measured EEG is E(t), so the model is a claim about the spectrum, not the waveform.</p>
<p class="dim">This is the model's honest limit: no spatial structure, no spike-and-wave, no channel coupling, no state-dependent noise. Hypothesis H5 exists because of that limit.</p>`,
)}
${H(
  "H1",
  "The estimate is informative (identifiability)",
  `<p><strong>Prediction.</strong> For recordings of one person in one clinical state, the consistent set — the hypotheses within three noise floors of the best — is small and stable across recordings of the same state.</p>
<p><strong>Measure.</strong> The size |C| of the consistent set as a fraction of 256, and the Jaccard overlap of C between two recordings of one state. Baselines: recordings from two different states, and the grid itself.</p>
<p><strong>Refuted when.</strong> |C| exceeds a quarter of the grid on most recordings, or the overlap within a state is no larger than the overlap between states. Then H2 and H3 cannot be tested on this model class.</p>`,
)}
${H(
  "H2",
  "The regimes are separated (state shift)",
  `<p><strong>Prediction.</strong> The best hypotheses of the pre-ictal and ictal windows differ by a shift larger than the window-to-window shift inside either state, with a stated direction. The source's first look at CHB-MIT chb01_03 saw one: ictal windows explained by a higher drive (P 2 → 3) and a slower excitatory time constant (τ_E 16 → 55 ms).</p>
<p><strong>Measure.</strong> The distance between the best hypotheses of the two states against a null distribution of the same distance between pairs of windows inside each state, per channel and per patient.</p>
<p><strong>Refuted when.</strong> The observed shift sits inside the null distribution. <span class="tag">first result</span> On channel T7-P7 of chb01_03 the pre-ictal → ictal distance is 3 bits, and the median distance between two ictal windows is also 3 bits. The shift is not yet distinguishable from the ictal state's own variability. H2 is not supported on this channel; the record is in the research log.</p>`,
)}
${H(
  "H3",
  "The transition is forecastable",
  `<p><strong>Prediction.</strong> The trajectory of the estimate over a sliding window, with the distance to a seizure regime learned on training patients, forecasts a seizure at a stated horizon better than the same classifier on the raw spectral features, and better than chance.</p>
<p><strong>Measure.</strong> A pre-registered protocol fixes the horizon (5 and 30 minutes first), the metric (sensitivity at a fixed false-alarm rate per hour; area under the precision-recall curve) and the split. CHB-MIT is split by patient: two thirds train, one third held out. TUSZ eval is read once, at the end.</p>
<p><strong>Refuted when.</strong> On held-out patients the trajectory is no better than the spectral baseline, or the advantage disappears when the baseline gets the same history. A within-patient result is reported as within-patient.</p>`,
)}
${H(
  "H4",
  "The estimate is affordable — no quantum advantage claimed",
  `<p><strong>Prediction.</strong> A sampler reaches the same best hypothesis as exhaustive enumeration while validating far fewer hypotheses (the source: at most 8 new forward simulations a round against 256), and the sampler's choice changes cost and accuracy in a measured way.</p>
<p><strong>Measure.</strong> Exact recovery, the approximation ratio AR, P(consistent), forward simulations and physical gates, over the source's 11 hidden configurations and 8 rounds, plus real EEG windows.</p>
<p><strong>Refuted when.</strong> No sampler beats uniform sampling by a margin that survives the seeds, or one sampler's accuracy/cost point is dominated on every landscape. Either way we report it. <strong>8 qubits are enumerable.</strong> The hardware runs at IBM, IonQ and qBraid test the pipeline, not a speed-up.</p>`,
)}
${H(
  "H5",
  "The model class is extended only when the data demands it",
  `<p><strong>Prediction.</strong> An extension — a second coupled column, spike-wave dynamics, state-dependent noise, channel coupling — improves held-out loss and keeps the consistent set small on ictal data, where the four-parameter column is too small.</p>
<p><strong>Measure.</strong> Held-out loss, |C|, and the parameters the extension adds, with a penalty for every bit: each bit doubles the hypothesis space and the sampler's cost.</p>
<p><strong>Refuted when.</strong> The extension improves training loss but not held-out loss, or it widens C more than it lowers the loss.</p>`,
)}
${H(
  "Progress and failure",
  "What counts, before the data is touched",
  `<p><strong>Progress</strong>, in order, each a record with its number:</p>
<ol>
<li>A reproducible estimate on an open corpus, at a stated seed and code version, with |C| smaller than a quarter of the grid. (H1)</li>
<li>A state shift that beats the within-state null, on at least two patients. (H2)</li>
<li>A forecast that beats the spectral baseline on held-out patients at a pre-registered false-alarm rate. (H3)</li>
<li>A second corpus (TUSZ eval) that does not contradict it. (H3)</li>
<li>A pre-ictal trajectory that moves before the annotated onset by more than one window, in more than one patient. (H3)</li>
</ol>
<p><strong>Failure</strong>, said plainly: the consistent set fills the grid (H1); the pre-ictal and ictal shifts are indistinguishable from window noise (H2); the forecast is no better than the spectral baseline on held-out patients (H3). A failed hypothesis ends that model class, that feature set or that horizon, and the log says which.</p>`,
)}
${H(
  "The datasets",
  "Open corpora only, each with its terms",
  `<table><thead><tr><th>Dataset</th><th>Terms</th><th>Use</th></tr></thead><tbody>
<tr><td><strong>CHB-MIT Scalp EEG Database</strong> (PhysioNet v1.0.0)</td><td>Open Data Commons Attribution License v1.0: use and redistribution with attribution</td><td>the development corpus; split by patient; the shipped <span class="mono">chb01_03</span> excerpt (2880–3100 s)</td></tr>
<tr><td><strong>TUH EEG Seizure Corpus (TUSZ)</strong> v2.0, Temple University</td><td>free, but access needs a signed access-request form (legal name, institutional affiliation, postal address, institutional email, signature) approved by hand at the Neural Engineering Data Consortium; no redistribution, no re-identification, research and technology development only, delete when finished, cite its documented publication (form v6.0, 2025-06-03); no IRB agreement, no fee</td><td>the held-out corpus once access is approved; the eval split is read once</td></tr>
<tr><td><strong>a person's own OpenBCI recording</strong>, through My Little Brain</td><td>the person's written consent; pooling recordings needs an approved protocol</td><td>the instrument's input; pooled only under an approved study</td></tr>
</tbody></table>
<p>Rules that follow: CHB-MIT attribution travels with every table, figure and shipped excerpt. TUSZ is not redistributed; we publish the citation, the version, the split and our processing code. No dataset is scraped, re-identified or joined to a person.</p>
<p><strong>TUSZ is not available to us yet.</strong> Its access request is signed by a person at an institution, and the laboratory holds no registered NEDC account. Until a member submits one and NEDC approves it, the held-out corpus is CHB-MIT's held-out patients only, and any TUSZ number is a later entry.</p>`,
)}
${H(
  "People",
  "Consent, ethics review, and what a study would need",
  `<p>The laboratory has <strong>no ethics approval today</strong>, and therefore runs <strong>no study with people</strong>.</p>
<ul>
<li>My Little Brain may read a person's own EEG from a headset they own, in their own browser, with their consent. The recording stays on their device. That is a product feature, not research data.</li>
<li>Any study that collects, pools or publishes a person's EEG needs, before the first record: a written protocol, a written informed consent, and approval from an institutional review board (IRB) or an independent ethics committee — in the United States, 45 CFR 46, the Common Rule; a commercial IRB is acceptable. Where the work is not human-subjects research, the written determination says so, and we keep it.</li>
<li>A study that touches a patient's care needs a clinician as a named investigator, a data-safety plan and a route to withdraw, and a decision about the FDA's device pathways before any claim.</li>
<li>Children are not studied by this laboratory at this stage. CHB-MIT is paediatric data used under its open licence; that is not the same as recruiting a child.</li>
</ul>
<p class="callout">No output of this laboratory is a diagnosis. A person with epilepsy needs a clinician. If you or someone near you needs help now, contact your local emergency number.</p>`,
)}
${H(
  "The source's claims, kept",
  "My Little Brain, in its own words",
  `<ul>
<li>✅ A reproducible, seeded inverse problem in which every sampler is scored on the same nonlinear objective under a fixed forward-simulation budget.</li>
<li>✅ An agent whose improvements are judged by measured metrics. It cannot grade its own work.</li>
<li>❌ <strong>Quantum advantage.</strong> 256 states are trivially enumerable classically. The benchmark measures sampler quality under a budget.</li>
<li>❌ <strong>Tractography.</strong> The fibres on the brain are an illustrative overlay, not reconstructed from scalp EEG.</li>
<li>❌ <strong>Physical Extropic hardware.</strong> THRML is their open-source software stack, running on CPU.</li>
<li>❌ <strong>Clinical meaning.</strong> The parameters are model quantities, and the brain's eyes and moods are playful animation, not measured cognition.</li>
</ul>`,
)}`,
};

const es = {
  title: "La tesis sobre la epilepsia — Cortex Squared",
  description:
    "La tesis falsable del laboratorio: cinco hipótesis con sus métodos, mediciones y criterios de refutación; los conjuntos de datos y sus licencias; el consentimiento y la revisión ética que necesitaría un estudio. Versión 0.1, 2026-10-26.",
  body: `<section class="hero"><p class="eyebrow">Cortex Squared · versión 0.1 · 2026-10-26</p>
<h1>La tesis sobre la epilepsia</h1><p class="lede">Una crisis epiléptica es una transición entre dos regímenes de la dinámica cerebral. Leerla en el EEG invirtiendo un modelo simplificado, con tiempo suficiente para predecirla, y en principio es prevenible.</p></section>
${H("La afirmación", "Tres partes, y cada una puede fallar sola", `<ol>
<li>Un modelo simplificado de masa neuronal reproduce el régimen anterior a una crisis y el régimen durante la crisis.</li>
<li>Los parámetros que reproducen un registro pueden estimarse a partir de ese registro, con una incertidumbre pequeña para distinguir ambos regímenes.</li>
<li>La estimación se mueve hacia un régimen de crisis antes de que la crisis empiece, y ese movimiento predice mejor que una línea base equivalente.</li></ol>
<p>El motor que hace la estimación es <strong>cortex²</strong>, el motor del repositorio My Little Brain. Busca hacia atrás, desde el espectro de un registro hasta los parámetros del modelo que pudieron producirlo, en 8 qubits —4 parámetros × 2 bits = 256 hipótesis— con un muestreador inspirado en lo cuántico (QAOA), un muestreador termodinámico (la pila de software THRML de Extropic) y líneas base clásicas. Cada muestra se vuelve a puntuar con el modelo no lineal, así que una mala aproximación aparece como un mal número medido.</p>`)}
${H("El modelo", "Una columna, cuatro parámetros, once características", `<p>Una población excitatoria E y una inhibidora I, impulsadas por ruido ξ (Wilson–Cowan, 1972):</p>
<p class="mono">τ_E Ė = −E + (1−E) S_E(c₁E − c₂I + P + ξ)<br>τ_I İ = −I + (1−I) S_I(c₃E − c₄I + Q)</p>
<p>Se buscan cuatro parámetros, con cuatro niveles cada uno: la entrada P, la ganancia inhibidora c₂, la excitación recurrente c₁ y la constante de tiempo excitatoria τ_E. El resto son fijos. Un registro se convierte en once características: diez potencias de banda relativas en escala logarítmica de 1 a 45 Hz y la amplitud logarítmica. La pérdida es una distancia cuadrática ponderada entre las características del modelo y las del registro. El EEG medido es E(t), así que el modelo es una afirmación sobre el espectro, no sobre la forma de onda.</p>
<p class="dim">Es el límite honesto del modelo: sin estructura espacial, sin punta-onda, sin acoplamiento entre canales, sin ruido dependiente del estado. La hipótesis H5 existe por ese límite.</p>`)}
${H("H1", "La estimación es informativa (identificabilidad)", `<p><strong>Predicción.</strong> Para registros de una persona en un estado clínico, el conjunto consistente —las hipótesis dentro de tres pisos de ruido del mejor— es pequeño y estable entre registros del mismo estado.</p>
<p><strong>Medición.</strong> El tamaño |C| del conjunto consistente como fracción de 256, y el solapamiento de Jaccard de C entre dos registros de un estado. Líneas base: registros de dos estados distintos y la rejilla completa.</p>
<p><strong>Refutada cuando.</strong> |C| supera un cuarto de la rejilla en la mayoría de los registros, o el solapamiento dentro de un estado no es mayor que entre estados. Entonces H2 y H3 no se pueden probar con esta clase de modelo.</p>`)}
${H("H2", "Los regímenes están separados (cambio de estado)", `<p><strong>Predicción.</strong> Las mejores hipótesis de las ventanas preictal e ictal difieren en un cambio mayor que el cambio entre ventanas dentro de un mismo estado, con una dirección declarada. La primera mirada del código fuente a CHB-MIT chb01_03 vio una: ventanas ictales explicadas por una entrada mayor (P 2 → 3) y una constante de tiempo excitatoria más lenta (τ_E 16 → 55 ms).</p>
<p><strong>Medición.</strong> La distancia entre las mejores hipótesis de los dos estados frente a una distribución nula de la misma distancia entre pares de ventanas dentro de cada estado, por canal y por paciente.</p>
<p><strong>Refutada cuando.</strong> El cambio observado cae dentro de la distribución nula. <span class="tag">primer resultado</span> En el canal T7-P7 de chb01_03 la distancia preictal → ictal es de 3 bits, y la distancia mediana entre dos ventanas ictales también es de 3 bits. El cambio aún no se distingue de la variabilidad propia del estado ictal. H2 no está respaldada en este canal; el registro está en el registro de investigación.</p>`)}
${H("H3", "La transición es predecible", `<p><strong>Predicción.</strong> La trayectoria de la estimación en una ventana deslizante, con la distancia a un régimen de crisis aprendido en pacientes de entrenamiento, predice una crisis en un horizonte declarado mejor que el mismo clasificador sobre las características espectrales crudas, y mejor que el azar.</p>
<p><strong>Medición.</strong> Un protocolo preinscripto fija el horizonte (5 y 30 minutos primero), la métrica (sensibilidad a una tasa fija de falsas alarmas por hora; área bajo la curva de precisión-exhaustividad) y la partición. CHB-MIT se divide por paciente: dos tercios entrenan, un tercio queda reservado. La partición de evaluación de TUSZ se lee una sola vez, al final.</p>
<p><strong>Refutada cuando.</strong> En pacientes reservados la trayectoria no supera la línea base espectral, o la ventaja desaparece cuando la línea base recibe la misma historia. Un resultado dentro de un paciente se informa como tal.</p>`)}
${H("H4", "La estimación es asequible — sin afirmar ventaja cuántica", `<p><strong>Predicción.</strong> Un muestreador alcanza la misma mejor hipótesis que la enumeración exhaustiva validando muchas menos hipótesis (la fuente: como máximo 8 simulaciones directas nuevas por ronda frente a 256), y la elección del muestreador cambia el coste y la precisión de forma medible.</p>
<p><strong>Medición.</strong> Recuperación exacta, la razón de aproximación AR, P(consistente), simulaciones directas y compuertas físicas, sobre las 11 configuraciones ocultas y 8 rondas de la fuente, más ventanas de EEG reales.</p>
<p><strong>Refutada cuando.</strong> Ningún muestreador supera al muestreo uniforme por un margen que sobreviva a las semillas, o el punto de precisión/coste de un muestreador está dominado en todos los paisajes. En cualquier caso lo informamos. <strong>8 qubits son enumerables.</strong> Las ejecuciones en IBM, IonQ y qBraid prueban la tubería, no una aceleración.</p>`)}
${H("H5", "La clase de modelo se extiende solo cuando los datos lo exigen", `<p><strong>Predicción.</strong> Una extensión —una segunda columna acoplada, dinámica punta-onda, ruido dependiente del estado, acoplamiento entre canales— mejora la pérdida reservada y mantiene pequeño el conjunto consistente en datos ictales, donde la columna de cuatro parámetros es demasiado pequeña.</p>
<p><strong>Medición.</strong> Pérdida reservada, |C| y los parámetros que añade la extensión, con una penalización por cada bit: cada bit duplica el espacio de hipótesis y el coste del muestreador.</p>
<p><strong>Refutada cuando.</strong> La extensión mejora la pérdida de entrenamiento pero no la reservada, o amplía C más de lo que reduce la pérdida.</p>`)}
${H("Progreso y fracaso", "Lo que cuenta, antes de tocar los datos", `<p><strong>Progreso</strong>, en orden, cada uno un registro con su número:</p>
<ol>
<li>Una estimación reproducible en un corpus abierto, con semilla y versión de código declaradas, con |C| menor que un cuarto de la rejilla. (H1)</li>
<li>Un cambio de estado que supera el nulo dentro del estado, en al menos dos pacientes. (H2)</li>
<li>Una predicción que supera la línea base espectral en pacientes reservados, con una tasa de falsas alarmas preinscripta. (H3)</li>
<li>Un segundo corpus (evaluación de TUSZ) que no lo contradiga. (H3)</li>
<li>Una trayectoria preictal que se mueve antes del inicio anotado por más de una ventana, en más de un paciente. (H3)</li>
</ol>
<p><strong>Fracaso</strong>, dicho con claridad: el conjunto consistente llena la rejilla (H1); los cambios preictal e ictal son indistinguibles del ruido entre ventanas (H2); la predicción no supera la línea base espectral en pacientes reservados (H3). Una hipótesis fallida termina esa clase de modelo, ese conjunto de características o ese horizonte, y el registro dice cuál.</p>`)}
${H("Los conjuntos de datos", "Solo corpus abiertos, cada uno con sus términos", `<table><thead><tr><th>Conjunto</th><th>Términos</th><th>Uso</th></tr></thead><tbody>
<tr><td><strong>CHB-MIT Scalp EEG Database</strong> (PhysioNet v1.0.0)</td><td>Open Data Commons Attribution License v1.0: uso y redistribución con atribución</td><td>el corpus de desarrollo; dividido por paciente; el fragmento <span class="mono">chb01_03</span> incluido (2880–3100 s)</td></tr>
<tr><td><strong>TUH EEG Seizure Corpus (TUSZ)</strong> v2.0, Temple University</td><td>gratuito, pero el acceso requiere un formulario de solicitud firmado (nombre legal, afiliación institucional, dirección postal, correo institucional, firma) aprobado a mano por el Neural Engineering Data Consortium; sin redistribución, sin reidentificación, solo investigación y desarrollo tecnológico, borrar al terminar, citar su publicación documentada (formulario v6.0, 2025-06-03); sin acuerdo de IRB y sin pago</td><td>el corpus reservado una vez aprobado el acceso; la partición de evaluación se lee una vez</td></tr>
<tr><td><strong>un registro OpenBCI propio</strong>, vía My Little Brain</td><td>el consentimiento escrito de la persona; agrupar registros requiere un protocolo aprobado</td><td>la entrada del instrumento; agrupada solo bajo un estudio aprobado</td></tr>
</tbody></table>
<p>Reglas que se siguen: la atribución de CHB-MIT acompaña a cada tabla, figura y fragmento incluido. TUSZ no se redistribuye; publicamos la cita, la versión, la partición y nuestro código de procesamiento. Ningún conjunto se raspa, se reidentifica ni se une a una persona.</p>
<p><strong>Todavía no tenemos TUSZ.</strong> Su solicitud de acceso la firma una persona en una institución, y el laboratorio no tiene cuenta registrada en el NEDC. Hasta que un miembro la envíe y el NEDC la apruebe, el corpus reservado son solo los pacientes reservados de CHB-MIT, y cualquier cifra de TUSZ es una entrada posterior.</p>`)}
${H("Las personas", "Consentimiento, revisión ética y lo que necesitaría un estudio", `<p>El laboratorio <strong>no tiene aprobación ética hoy</strong> y, por lo tanto, <strong>no realiza ningún estudio con personas</strong>.</p>
<ul>
<li>My Little Brain puede leer el EEG propio de una persona desde un casco que le pertenece, en su navegador, con su consentimiento. El registro se queda en su dispositivo. Es una función del producto, no un dato de investigación.</li>
<li>Cualquier estudio que recoja, agrupe o publique el EEG de una persona necesita, antes del primer registro: un protocolo escrito, un consentimiento informado escrito y la aprobación de un comité de revisión institucional (IRB) o de un comité de ética independiente —en Estados Unidos, 45 CFR 46, la Regla Común; un IRB comercial es aceptable. Cuando el trabajo no es investigación con sujetos humanos, la determinación escrita lo dice y la conservamos.</li>
<li>Un estudio que afecte la atención de un paciente necesita un clínico como investigador nombrado, un plan de seguridad de datos y una vía de retirada, y una decisión sobre las vías de dispositivo de la FDA antes de cualquier afirmación.</li>
<li>Este laboratorio no estudia a menores en esta etapa. CHB-MIT son datos pediátricos usados bajo su licencia abierta; eso no es lo mismo que reclutar a un menor.</li>
</ul>
<p class="callout">Ninguna salida de este laboratorio es un diagnóstico. Una persona con epilepsia necesita a su médico. Si tú o alguien cerca de ti necesita ayuda ahora, llama al número de emergencias local.</p>`)}
${H("Las afirmaciones de la fuente, conservadas", "My Little Brain, en sus propias palabras", `<ul>
<li>✅ Un problema inverso reproducible y con semilla en el que cada muestreador se puntúa con el mismo objetivo no lineal bajo un presupuesto fijo de simulaciones directas.</li>
<li>✅ Un agente cuyas mejoras se juzgan con métricas medidas. No puede calificar su propio trabajo.</li>
<li>❌ <strong>Ventaja cuántica.</strong> 256 estados se enumeran trivialmente en clásico. El banco de pruebas mide la calidad del muestreador bajo un presupuesto.</li>
<li>❌ <strong>Tractografía.</strong> Las fibras del cerebro son una capa ilustrativa, no reconstruidas a partir del EEG de cuero cabelludo.</li>
<li>❌ <strong>Hardware físico de Extropic.</strong> THRML es su pila de software de código abierto, en CPU.</li>
<li>❌ <strong>Significado clínico.</strong> Los parámetros son cantidades del modelo, y los ojos y estados de ánimo del cerebro son animación lúdica, no cognición medida.</li>
</ul>`)}`,
};

const zh = {
  title: "癫痫研究命题 — Cortex Squared",
  description:
    "实验室的可证伪命题：五项假设及其方法、测量与证伪标准；数据集及其许可；知情同意，以及研究所需的伦理审查。版本 0.1，2026-10-26。",
  body: `<section class="hero"><p class="eyebrow">Cortex Squared · 版本 0.1 · 2026-10-26</p>
<h1>癫痫研究命题</h1><p class="lede">癫痫发作是脑动力学两个状态之间的转变。通过反演一个简化模型，从脑电图中及时读出这一转变——原则上它可以被预防。</p></section>
${H("命题", "三个部分，每一个都可能单独失败", `<ol>
<li>一个简化的神经群体模型能够重现发作前的状态和发作期间的状态。</li>
<li>重现一段记录的参数可以从该记录中估计出来，其不确定性小到足以区分两种状态。</li>
<li>估计值在发作开始之前向发作状态移动，并且这种移动的预测能力强于一个匹配的基线。</li></ol>
<p>完成估计的引擎是 <strong>cortex²</strong>，即 My Little Brain 仓库的引擎。它从记录的频谱出发反向搜索可能产生该记录的模型参数，在 8 个量子比特上进行——4 个参数 × 2 位 = 256 个假设——使用量子启发采样器（QAOA）、热力学采样器（Extropic 的 THRML 软件栈）和经典基线。每个样本都用非线性模型重新评分，因此糟糕的近似会表现为糟糕的实测数字。</p>`)}
${H("模型", "一个群体，四个参数，十一个特征", `<p>一个兴奋性群体 E 和一个抑制性群体 I，由噪声 ξ 驱动（Wilson–Cowan，1972）：</p>
<p class="mono">τ_E Ė = −E + (1−E) S_E(c₁E − c₂I + P + ξ)<br>τ_I İ = −I + (1−I) S_I(c₃E − c₄I + Q)</p>
<p>搜索四个参数，每个四个水平：输入 P、抑制增益 c₂、循环兴奋 c₁ 和兴奋性时间常数 τ_E。其余固定。一段记录变成十一个特征：从 1 Hz 到 45 Hz 的十个对数间距相对频带功率，加上对数幅度。损失是模型特征与记录特征之间的加权平方距离。测得的脑电图是 E(t)，所以模型是关于频谱的主张，而不是关于波形的主张。</p>
<p class="dim">这是模型诚实的局限：没有空间结构、没有尖慢波、没有通道耦合、没有状态相关噪声。假设 H5 正是为这一局限而存在。</p>`)}
${H("H1", "估计是有信息量的（可辨识性）", `<p><strong>预测。</strong> 对一个人在一种临床状态下的记录，一致集合——与最佳解的损失相差不超过三个噪声底的假设——很小，并且在同状态的多次记录之间保持稳定。</p>
<p><strong>测量。</strong> 一致集合的大小 |C| 占 256 的比例，以及同一状态两段记录之间 C 的 Jaccard 重叠。基线：两种不同状态的记录，以及整个网格。</p>
<p><strong>被证伪的条件。</strong> 在大多记录上 |C| 超过网格的四分之一，或同一状态内的重叠不比状态之间的重叠更大。那样 H2 和 H3 无法在这一模型类上检验。</p>`)}
${H("H2", "两种状态是可分的（状态变化）", `<p><strong>预测。</strong> 发作前窗口和发作期窗口的最佳假设之间的差异大于任一状态内部窗口之间的差异，并且方向明确。源码对 CHB-MIT chb01_03 的第一次观察就看到了一个方向：发作期窗口由更高的输入（P 2 → 3）和更慢的兴奋性时间常数（τ_E 16 → 55 ms）解释。</p>
<p><strong>测量。</strong> 两种状态最佳假设之间的距离，对照同一状态内两两窗口之间同一距离的零分布，按通道和患者分别计算。</p>
<p><strong>被证伪的条件。</strong> 观察到的变化落在零分布之内。 <span class="tag">首个结果</span> 在 chb01_03 的 T7-P7 通道上，发作前到发作期的距离是 3 位，而两个发作期窗口之间距离的中位数也是 3 位。这一变化尚不能与发作期状态自身的波动区分。H2 在该通道上未获支持；记录在研究日志中。</p>`)}
${H("H3", "转变是可预测的", `<p><strong>预测。</strong> 在滑动窗口上估计值的轨迹，加上与在训练患者上学到的发作状态的距离，在声明的时间范围内预测发作的能力，强于在同一原始频谱特征上的分类器，也强于随机。</p>
<p><strong>测量。</strong> 预注册的方案固定时间范围（先为 5 分钟和 30 分钟）、指标（在固定每小时误报率下的灵敏度；精确率-召回曲线下面积）和划分。CHB-MIT 按患者划分：三分之二训练，三分之一留出。TUSZ 评估集只读一次，在最后。</p>
<p><strong>被证伪的条件。</strong> 在留出患者上轨迹不优于频谱基线，或当基线获得相同历史时优势消失。仅在患者内部成立的结果按患者内部报告。</p>`)}
${H("H4", "估计是可负担的——不主张量子优势", `<p><strong>预测。</strong> 一个采样器在验证远少假设的情况下达到与穷举相同的最佳假设（源码：每轮最多 8 次新的前向模拟，而穷举为 256 次），并且采样器的选择以可测量的方式改变成本与精度。</p>
<p><strong>测量。</strong> 精确恢复率、近似比 AR、P(一致)、前向模拟次数与物理门数，覆盖源码的 11 个隐藏配置和 8 轮，加上真实脑电图窗口。</p>
<p><strong>被证伪的条件。</strong> 没有采样器以能在不同种子下保持的幅度超过均匀采样，或某个采样器的精度/成本点在所有地形上都被支配。无论哪种情况我们都如实报告。<strong>8 个量子比特是可以穷举的。</strong> 在 IBM、IonQ 和 qBraid 上的硬件运行检验的是流水线，而不是加速。</p>`)}
${H("H5", "只有在数据要求时才扩展模型类", `<p><strong>预测。</strong> 一项扩展——第二个耦合群体、尖慢波动力学、状态相关噪声、通道耦合——能改善留出损失，并在发作期数据上保持一致集合很小，因为四参数群体在那里太小。</p>
<p><strong>测量。</strong> 留出损失、|C|，以及扩展增加的参数数量，每增加一位都要计入惩罚：每一位使假设空间翻倍，也使采样器成本翻倍。</p>
<p><strong>被证伪的条件。</strong> 扩展改善了训练损失但没有改善留出损失，或它扩大 C 的程度大于降低损失的程度。</p>`)}
${H("进展与失败", "在接触数据之前就算清楚", `<p><strong>进展</strong>，按顺序，每条都是一个带数字的记录：</p>
<ol>
<li>在开放语料上得到可复现的估计，声明种子与代码版本，|C| 小于网格的四分之一。（H1）</li>
<li>在至少两位患者上，状态变化超过状态内零分布。（H2）</li>
<li>在预注册的误报率下，预测在留出患者上优于频谱基线。（H3）</li>
<li>第二个语料（TUSZ 评估集）不与之一致矛盾。（H3）</li>
<li>发作前轨迹在标注起点之前超过一个窗口开始移动，且在不止一位患者中出现。（H3）</li>
</ol>
<p><strong>失败</strong>，直说：一致集合填满网格（H1）；发作前与发作期的变化与窗口噪声无法区分（H2）；预测在留出患者上不优于频谱基线（H3）。一个失败的假设会终结那个模型类、那组特征或那个时间范围，日志会说明是哪一个。</p>`)}
${H("数据集", "只用开放语料，各自遵守其条款", `<table><thead><tr><th>数据集</th><th>条款</th><th>用途</th></tr></thead><tbody>
<tr><td><strong>CHB-MIT 头皮脑电数据库</strong>（PhysioNet v1.0.0）</td><td>Open Data Commons Attribution License v1.0：署名后可使用与再分发</td><td>开发语料；按患者划分；随附的 <span class="mono">chb01_03</span> 片段（2880–3100 秒）</td></tr>
<tr><td><strong>TUH 癫痫脑电语料库（TUSZ）</strong> v2.0，天普大学</td><td>免费，但访问需提交经签署的访问申请表（法定姓名、机构隶属、邮政地址、机构邮箱、签名），由 Neural Engineering Data Consortium 人工批准；不得转发、不得重新识别、仅限研究与技术开发、使用完毕删除、引用其文档所列出版物（表格 v6.0，2025-06-03）；无需 IRB 协议，也不收费</td><td>获批后的留出语料；评估划分只读一次</td></tr>
<tr><td><strong>个人自己的 OpenBCI 记录</strong>，经由 My Little Brain</td><td>个人的书面同意；汇总记录需要经批准的方案</td><td>仪器的输入；仅在批准的研究中汇总</td></tr>
</tbody></table>
<p>由此得出的规则：CHB-MIT 的署名随每张表、每幅图和每个随附片段一起出现。TUSZ 不再分发；我们公布引用、版本、划分和处理代码。任何数据集都不被抓取、不被重新识别、不与个人关联。</p>
<p><strong>我们目前还没有 TUSZ。</strong> 其访问申请须由机构内的个人签署，而本实验室没有 NEDC 注册账户。在成员提交申请并获 NEDC 批准之前，留出语料只有 CHB-MIT 的留出患者，任何 TUSZ 数字都是之后的记录。</p>`)}
${H("人", "知情同意、伦理审查，以及研究所需的一切", `<p>实验室<strong>目前没有伦理批准</strong>，因此<strong>不进行任何涉及人的研究</strong>。</p>
<ul>
<li>My Little Brain 可以在个人自己的浏览器中，以其同意，读取其自有头环的脑电图。记录留在其设备上。这是产品功能，不是研究数据。</li>
<li>任何收集、汇总或发表个人脑电图的研究，在第一条记录之前都需要：书面方案、书面的知情同意，以及机构审查委员会（IRB）或独立伦理委员会的批准——在美国为 45 CFR 46《通用规则》；商业 IRB 亦可接受。若工作不属于人类受试者研究，书面认定会说明，我们予以保存。</li>
<li>涉及患者诊疗的研究需要一位临床医生作为具名研究者、一份数据安全计划和一条退出途径，并在作出任何主张之前就 FDA 的器械路径作出决定。</li>
<li>本实验室现阶段不研究儿童。CHB-MIT 是在其开放许可下使用的儿科数据；这与招募儿童不是一回事。</li>
</ul>
<p class="callout">本实验室的任何输出都不是诊断。癫痫患者需要医生。如果你或你身边的人现在需要帮助，请拨打当地急救电话。</p>`)}
${H("源码中的声明，原样保留", "My Little Brain，用它自己的话", `<ul>
<li>✅ 一个可复现、带种子的逆问题：每个采样器在固定前向模拟预算下，用同一个非线性目标评分。</li>
<li>✅ 一个由实测指标判断改进的代理。它不能给自己的工作上分。</li>
<li>❌ <strong>量子优势。</strong> 256 个状态在经典计算中可轻松穷举。基准测试衡量的是预算内的采样器质量。</li>
<li>❌ <strong>纤维追踪。</strong> 大脑上的纤维是示意性叠加，并非由头皮脑电图重建。</li>
<li>❌ <strong>Extropic 物理硬件。</strong> THRML 是其开源软件栈，运行在 CPU 上。</li>
<li>❌ <strong>临床意义。</strong> 参数是模型量，大脑的眼睛与情绪是趣味动画，不是被测量的认知。</li>
</ul>`)}`,
};

export { en, es, zh };
