const hero = (kicker, h1, lede) => `<section class="hero"><p class="eyebrow">${kicker}</p><h1>${h1}</h1><p class="lede">${lede}</p></section>`;

const en = {
  title: "Safety, consent and ethics — Cortex Squared",
  description:
    "No diagnosis, no medical claim. Human EEG only with consent; a study with people needs an approved protocol and an ethics review. The harm list, the data rules and the wording we refuse.",
  body: `${hero("Cortex Squared · safety", "A result is a hypothesis, never a diagnosis", "The rules that come before every feature, every page and every post.")}
<div class="panel">
  <h2>What we promise, and what we refuse to promise</h2>
  <ul>
    <li><strong>No diagnosis.</strong> An output names hypotheses of a simplified model that are consistent with a recording. It never says a person has epilepsy, will have a seizure at a time, or should change a treatment.</li>
    <li><strong>No medical device.</strong> Nothing here is cleared or approved by the FDA, the EMA or any regulator, and nothing here is care.</li>
    <li><strong>No promise to detect a seizure.</strong> The thesis tests whether the estimate forecasts. Until a pre-registered test on held-out patients passes, we do not say it does.</li>
    <li><strong>No emergency use.</strong> The app is not for emergencies. If you or someone near you needs help now, call your local emergency number.</li>
  </ul>
  <p class="callout">A person with epilepsy needs a clinician. An app that says otherwise is wrong, and we say so on every page.</p>
</div>
<div class="panel">
  <h2>Human EEG, only with consent</h2>
  <ul>
    <li><strong>Your own recording stays yours.</strong> My Little Brain reads a headset you own, in your own browser. The recording stays on your device. It leaves only if you give it to a study, in writing.</li>
    <li><strong>Open corpora come first.</strong> The laboratory's development and held-out data are public corpora under published terms (CHB-MIT under the Open Data Commons Attribution License v1.0; TUSZ on an access request the Neural Engineering Data Consortium approves, which the laboratory does not hold yet). Their attribution travels with every number.</li>
    <li><strong>No re-identification, no joining.</strong> We do not scrape, re-identify, or join a recording to a person, an account or another dataset.</li>
    <li><strong>Deletion.</strong> A recording you keep in the app is deleted when you delete it; nothing is sent to us to delete.</li>
  </ul>
</div>
<div class="panel">
  <h2>The ethics review a study with people would need</h2>
  <p>The laboratory has <strong>no ethics approval today</strong> and runs <strong>no study with people</strong>. Before the first record, a study would need:</p>
  <ol>
    <li>A written protocol: purpose, participants, what is recorded, for how long, what is published, and the analysis plan with its kill criterion.</li>
    <li>A written informed consent in plain language, with the participant's route to withdraw and to have their data deleted.</li>
    <li>Approval from an institutional review board (an IRB, or an independent ethics committee). In the United States that is 45 CFR 46, the Common Rule; a commercial IRB is acceptable. Where the work is not human-subjects research, a written determination says so and we keep it.</li>
    <li>A named clinician as investigator for anything that touches a patient's care, a data-safety plan, and a decision about the FDA's device pathways before any claim is made.</li>
    <li>No children at this stage. CHB-MIT is paediatric data used under its open licence; that is not the same as recruiting a child.</li>
  </ol>
  <p class="dim">A named person, not an agent, signs a study. The clinical-and-ethics agent prepares the file to the last step and stops there.</p>
</div>
<div class="panel">
  <h2>The harm list</h2>
  <p>Every way this work could hurt someone, and what we do about it:</p>
  <table><thead><tr><th>Harm</th><th>What we do</th></tr></thead><tbody>
    <tr><td>A false alarm that frightens a person or their family.</td><td>We publish the false-alarm rate with every forecast result, at a fixed rate per hour. The app never raises an alarm.</td></tr>
    <tr><td>A missed seizure that a person trusted the app not to miss.</td><td>The app says it is not a monitor and not a diagnosis, on every screen. It is not used for safety.</td></tr>
    <tr><td>A leaked recording.</td><td>Recordings stay on the device; an open corpus is used instead; a study's collection needs an approved protocol and a data-safety plan.</td></tr>
    <tr><td>A re-identification of a participant.</td><td>No joining to a person, an account or another dataset; no scraping; no release of raw recordings from a study without the consent that names it.</td></tr>
    <tr><td>A treatment changed on a model parameter.</td><td>Never. The output is a model quantity. The site and the app say so, and the wording audit below keeps it that way.</td></tr>
    <tr><td>A result that is not reproducible, published as if it were.</td><td>Every number carries its dataset, licence, code version, seed and sample size. A result without its record is not reported.</td></tr>
  </tbody></table>
</div>
<div class="panel">
  <h2>The wording we refuse</h2>
  <p>The clinical-and-ethics thread audits every page and every screen against this table.</p>
  <table><thead><tr><th>Never</th><th>Instead</th></tr></thead><tbody>
    <tr><td>"Detects your seizure"</td><td>"Scores a recording against 256 hypotheses of a simplified model"</td></tr>
    <tr><td>"Predicts when you will have a seizure"</td><td>"Tests, on held-out patients, whether the estimate forecasts at a stated horizon"</td></tr>
    <tr><td>"Your brain type"</td><td>"The parameter sets consistent with this recording"</td></tr>
    <tr><td>"A cure" / "a treatment"</td><td>Never said at all</td></tr>
    <tr><td>"Clinically validated"</td><td>Never said: no clinical validation exists</td></tr>
  </tbody></table>
  <p class="dim">Some of these words appear on this site only inside a table like this one, and in the phrase "this is not a diagnosis", which every page carries.</p>
</div>`,
};

const es = {
  title: "Seguridad, consentimiento y ética — Cortex Squared",
  description:
    "Sin diagnóstico, sin afirmación médica. EEG humano solo con consentimiento; un estudio con personas necesita un protocolo aprobado y una revisión ética. La lista de daños, las reglas de datos y las palabras que rechazamos.",
  body: `${hero("Cortex Squared · seguridad", "Un resultado es una hipótesis, nunca un diagnóstico", "Las reglas que van antes de cada función, cada página y cada publicación.")}
<div class="panel">
  <h2>Lo que prometemos y lo que nos negamos a prometer</h2>
  <ul>
    <li><strong>Sin diagnóstico.</strong> Una salida nombra hipótesis de un modelo simplificado consistentes con un registro. Nunca dice que una persona tiene epilepsia, que tendrá una crisis a una hora, o que debe cambiar un tratamiento.</li>
    <li><strong>Sin producto sanitario.</strong> Nada de esto está aprobado por la FDA, la EMA ni ningún regulador, y nada de esto es atención médica.</li>
    <li><strong>Sin promesa de detectar una crisis.</strong> La tesis prueba si la estimación predice. Hasta que una prueba preinscripta en pacientes reservados lo pase, no decimos que lo haga.</li>
    <li><strong>Sin uso de emergencia.</strong> La aplicación no es para emergencias. Si tú o alguien cerca de ti necesita ayuda ahora, llama al número de emergencias local.</li>
  </ul>
  <p class="callout">Una persona con epilepsia necesita a su médico. Una aplicación que diga lo contrario está equivocada, y lo decimos en cada página.</p>
</div>
<div class="panel">
  <h2>EEG humano, solo con consentimiento</h2>
  <ul>
    <li><strong>Tu propio registro es tuyo.</strong> My Little Brain lee un casco que te pertenece, en tu navegador. El registro se queda en tu dispositivo. Solo sale si lo entregas a un estudio, por escrito.</li>
    <li><strong>Primero los corpus abiertos.</strong> Los datos de desarrollo y reservados del laboratorio son corpus públicos con términos publicados (CHB-MIT bajo Open Data Commons Attribution License v1.0; TUSZ con una solicitud de acceso que aprueba el Neural Engineering Data Consortium, que el laboratorio aún no tiene). Su atribución acompaña a cada número.</li>
    <li><strong>Sin reidentificación ni uniones.</strong> No raspamos, no reidentificamos ni unimos un registro a una persona, una cuenta u otro conjunto.</li>
    <li><strong>Supresión.</strong> Un registro que guardas en la aplicación se borra cuando lo borras; no se nos envía nada que borrar.</li>
  </ul>
</div>
<div class="panel">
  <h2>La revisión ética que necesitaría un estudio con personas</h2>
  <p>El laboratorio <strong>no tiene aprobación ética hoy</strong> y <strong>no realiza ningún estudio con personas</strong>. Antes del primer registro, un estudio necesitaría:</p>
  <ol>
    <li>Un protocolo escrito: propósito, participantes, qué se registra, durante cuánto tiempo, qué se publica y el plan de análisis con su criterio de abandono.</li>
    <li>Un consentimiento informado escrito en lenguaje claro, con la vía de la persona para retirarse y borrar sus datos.</li>
    <li>Aprobación de un comité de revisión institucional (IRB, o un comité de ética independiente). En Estados Unidos es 45 CFR 46, la Regla Común; un IRB comercial es aceptable. Si el trabajo no es investigación con sujetos humanos, una determinación escrita lo dice y la conservamos.</li>
    <li>Un clínico nombrado como investigador para todo lo que afecte la atención de un paciente, un plan de seguridad de datos y una decisión sobre las vías de dispositivo de la FDA antes de cualquier afirmación.</li>
    <li>Sin menores en esta etapa. CHB-MIT son datos pediátricos usados bajo su licencia abierta; eso no es reclutar a un menor.</li>
  </ol>
  <p class="dim">Una persona nombrada, no un agente, firma un estudio. El agente de clínica y ética prepara el expediente hasta el último paso y se detiene.</p>
</div>
<div class="panel">
  <h2>La lista de daños</h2>
  <table><thead><tr><th>Daño</th><th>Qué hacemos</th></tr></thead><tbody>
    <tr><td>Una falsa alarma que asusta a una persona o a su familia.</td><td>Publicamos la tasa de falsas alarmas con cada resultado de predicción, a una tasa fija por hora. La aplicación nunca lanza una alarma.</td></tr>
    <tr><td>Una crisis no detectada en la que alguien confió porque la aplicación no debía fallar.</td><td>La aplicación dice que no es un monitor ni un diagnóstico, en cada pantalla. No se usa para seguridad.</td></tr>
    <tr><td>Un registro filtrado.</td><td>Los registros se quedan en el dispositivo; se usa un corpus abierto; la recogida de un estudio necesita un protocolo aprobado y un plan de seguridad de datos.</td></tr>
    <tr><td>La reidentificación de un participante.</td><td>Sin uniones a una persona, una cuenta u otro conjunto; sin raspado; sin publicar registros crudos de un estudio sin el consentimiento que lo nombra.</td></tr>
    <tr><td>Un tratamiento cambiado por un parámetro del modelo.</td><td>Nunca. La salida es una cantidad del modelo. El sitio y la aplicación lo dicen, y la auditoría de redacción lo mantiene así.</td></tr>
    <tr><td>Un resultado no reproducible publicado como si lo fuera.</td><td>Cada número lleva su conjunto de datos, licencia, versión de código, semilla y tamaño de muestra. Un resultado sin su registro no se informa.</td></tr>
  </tbody></table>
</div>
<div class="panel">
  <h2>La redacción que rechazamos</h2>
  <table><thead><tr><th>Nunca</th><th>En su lugar</th></tr></thead><tbody>
    <tr><td>«Detecta tu crisis»</td><td>«Puntúa un registro frente a 256 hipótesis de un modelo simplificado»</td></tr>
    <tr><td>«Predice cuándo tendrás una crisis»</td><td>«Prueba, en pacientes reservados, si la estimación predice en un horizonte declarado»</td></tr>
    <tr><td>«Tu tipo de cerebro»</td><td>«Los conjuntos de parámetros consistentes con este registro»</td></tr>
    <tr><td>«Una cura» / «un tratamiento»</td><td>No se dicen nunca</td></tr>
    <tr><td>«Validado clínicamente»</td><td>No se dice nunca: no existe validación clínica</td></tr>
  </tbody></table>
</div>`,
};

const zh = {
  title: "安全、知情同意与伦理 — Cortex Squared",
  description:
    "不是诊断，不作医学主张。人类脑电图只在同意下使用；涉及人的研究需要经批准的方案和伦理审查。伤害清单、数据规则，以及我们拒绝使用的措辞。",
  body: `${hero("Cortex Squared · 安全", "结果是假设，永远不是诊断", "这些规则先于每一项功能、每一页和每一次发布。")}
<div class="panel">
  <h2>我们承诺什么，拒绝承诺什么</h2>
  <ul>
    <li><strong>不是诊断。</strong> 输出命名与记录一致的简化模型假设。它从不说某人有癫痫、将在某时发作，或应改变治疗。</li>
    <li><strong>不是医疗器械。</strong> 这里没有任何东西获得 FDA、EMA 或任何监管机构的批准，也没有任何东西构成医疗服务。</li>
    <li><strong>不承诺检测发作。</strong> 研究命题检验的是估计能否预测。在留出患者上的预注册检验通过之前，我们不说它能。</li>
    <li><strong>不用于紧急情况。</strong> 该应用不用于紧急情况。如果你或你身边的人现在需要帮助，请拨打当地急救电话。</li>
  </ul>
  <p class="callout">癫痫患者需要医生。声称相反的应用是错的，我们在每一页都这样说。</p>
</div>
<div class="panel">
  <h2>人类脑电图，只在同意下使用</h2>
  <ul>
    <li><strong>你自己的记录属于你。</strong> My Little Brain 在你自己的浏览器中读取你自己的头环。记录留在你的设备上。只有你以书面方式交给研究时，它才会离开。</li>
    <li><strong>开放语料优先。</strong> 实验室的开发与留出数据是条款公开的公开语料（CHB-MIT 依据 Open Data Commons Attribution License v1.0；TUSZ 需提交经 Neural Engineering Data Consortium 批准的访问申请，本实验室尚未获得）。其署名随每个数字一起出现。</li>
    <li><strong>不重新识别、不关联。</strong> 我们不抓取、不重新识别，也不把记录与个人、账户或其他数据集关联。</li>
    <li><strong>删除。</strong> 你在应用中保存的记录，在你删除时即被删除；没有需要向我们请求删除的内容。</li>
  </ul>
</div>
<div class="panel">
  <h2>涉及人的研究所需的伦理审查</h2>
  <p>实验室<strong>目前没有伦理批准</strong>，<strong>不进行任何涉及人的研究</strong>。在第一条记录之前，研究需要：</p>
  <ol>
    <li>书面方案：目的、参与者、记录内容、保存期限、发表内容，以及带放弃标准的分折计划。</li>
    <li>用平实语言写成的书面知情同意，载明参与者退出与删除数据的途径。</li>
    <li>机构审查委员会（IRB 或独立伦理委员会）的批准。在美国为 45 CFR 46《通用规则》；商业 IRB 亦可接受。若工作不属于人类受试者研究，书面认定会说明，我们予以保存。</li>
    <li>涉及患者诊疗的工作需要一位具名临床医生作为研究者、一份数据安全计划，并在任何主张之前就 FDA 的器械路径作出决定。</li>
    <li>现阶段不涉及儿童。CHB-MIT 是在其开放许可下使用的儿科数据；这与招募儿童不是一回事。</li>
  </ol>
  <p class="dim">由具名的人、而不是代理签署研究。临床与伦理代理把文件准备到最后一步，然后停下。</p>
</div>
<div class="panel">
  <h2>伤害清单</h2>
  <table><thead><tr><th>伤害</th><th>我们怎么做</th></tr></thead><tbody>
    <tr><td>一次让患者或其家人惊恐的误报。</td><td>每个预测结果都公布每小时固定误报率。应用从不发出警报。</td></tr>
    <tr><td>一次漏报，而有人相信应用不会漏。</td><td>应用在每个屏幕上都说明它不是监护仪、不是诊断。它不用于安全用途。</td></tr>
    <tr><td>记录泄露。</td><td>记录留在设备上；改用开放语料；研究的采集需要经批准的方案与数据安全计划。</td></tr>
    <tr><td>参与者被重新识别。</td><td>不与个人、账户或其他数据集关联；不抓取；未经载明同意的同意书，不发布研究的原始记录。</td></tr>
    <tr><td>因模型参数而改变治疗。</td><td>绝不。输出是模型量。站点与应用都这样说，措辞审计让这一点保持不变。</td></tr>
    <tr><td>把不可复现的结果当作可复现发表。</td><td>每个数字都带数据集、许可、代码版本、种子与样本量。没有记录的结果不报告。</td></tr>
  </tbody></table>
</div>
<div class="panel">
  <h2>我们拒绝的措辞</h2>
  <table><thead><tr><th>绝不</th><th>改用</th></tr></thead><tbody>
    <tr><td>「检测你的发作」</td><td>「把一段记录与简化模型的 256 个假设对比评分」</td></tr>
    <tr><td>「预测你何时发作」</td><td>「在留出患者上检验估计能否在声明的时间范围内预测」</td></tr>
    <tr><td>「你的大脑类型」</td><td>「与该记录一致的参数集合」</td></tr>
    <tr><td>「治愈」／「治疗」</td><td>从不说</td></tr>
    <tr><td>「经临床验证」</td><td>从不说：不存在临床验证</td></tr>
  </tbody></table>
</div>`,
};

export { en, es, zh };
