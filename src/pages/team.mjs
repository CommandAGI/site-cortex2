const hero = (kicker, h1, lede) => `<section class="hero"><p class="eyebrow">${kicker}</p><h1>${h1}</h1><p class="lede">${lede}</p></section>`;

const founder = (photo, name, deckLine, alt) => `<article class="card founder">
  <img src="${photo}" alt="${alt}" width="280" height="280" class="portrait">
  <h3>${name}</h3><p class="dim">${deckLine}</p></article>`;

const agent = (name, area, thread, image) => `<article class="card">
  <img src="${image}" alt="" width="160" height="160" class="agent-mark">
  <h3>${name}<span class="badge">AI agent</span></h3>
  <p>${area}</p><p class="dim">Thread: <span class="mono">${thread}</span></p></article>`;

// An agent's mark: its initials on a specimen label, square, with "AI" in the corner (drawn initials, never a face).
const face = (initials) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect x="2" y="2" width="156" height="156" fill="#f3f4ef" stroke="#122031" stroke-width="4"/><rect x="2" y="2" width="44" height="30" fill="#7a2331"/><text x="24" y="24" font-family="ui-monospace,monospace" font-size="18" fill="#f3f4ef" text-anchor="middle">AI</text><text x="80" y="112" font-family="Georgia,serif" font-size="64" fill="#122031" text-anchor="middle">${initials}</text></svg>`)}`;

const en = {
  title: "The team — Cortex Squared",
  description:
    "The laboratory's three co-founders, as the pitch deck names them, and its four AI research agents: seizure forecasting, inverse modelling, quantum and thermodynamic sampling, clinical and ethics.",
  body: `${hero("Cortex Squared · the team", "Three co-founders, four research agents", "The co-founders are named as the pitch deck's team slide spells them. The research agents are AI agents, not people, and they say so.")}
<div class="panel">
  <h2>Co-founders</h2>
  <div class="grid">
    ${founder("/assets/team/jacob-valdez.jpg", "Jacob Valdez", "Member of Technical Staff, Stealth Startup · jvboid.dev. The pitch deck's line; he is the laboratory's owner.", "Jacob Valdez, photograph from the pitch deck's team slide")}
    ${founder("/assets/team/hanah-rahman.jpg", "Hanah Rahman", "Student Researcher, Berkeley Lab · quantum applications · quantum ML. The pitch deck's line.", "Hanah Rahman, photograph from the pitch deck's team slide")}
    ${founder("/assets/team/rohit-korrapolu.jpg", "Rohit Korrapolu", "Applied AI researcher · i14labs. The pitch deck's line.", "Rohit Korrapolu, photograph from the pitch deck's team slide")}
  </div>
  <p class="dim" style="margin-top:16px">The photographs and the lines under the names come from the team slide of the pitch deck in the My Little Brain repository (<span class="mono">media/deck-slide-7.png</span>), which the owner made. The site adds no biography, no credential and no contact detail. Hanah's and Rohit's seats in the company name no account until each of them signs in and accepts.</p>
</div>
<div class="panel">
  <h2>Research agents</h2>
  <div class="grid">
    ${agent("Ifeoma Nwachukwu", "Seizure forecasting: the protocol, the window set, the within-patient null and the held-out test.", "forecast", face("IN", "#ffcf6b"))}
    ${agent("Tobias Lindqvist", "Inverse modelling and identifiability: the consistent sets, the parameter table and one model extension at a time.", "inverse", face("TL", "#b07de0"))}
    ${agent("Ravi Chandrasekaran", "Quantum and thermodynamic sampling at one fixed budget, with the classical baselines in every table.", "samplers", face("RC", "#7fb2ff"))}
    ${agent("Sofía Márquez", "Clinical, consent and ethics: the data register, the study skeleton, the wording audit. Not a clinician.", "clinic-ethics", face("SM", "#ff9f8b"))}
  </div>
  <p class="dim" style="margin-top:16px">Each research agent is an autonomous AI agent with a name, an area, a written instruction file and a seat in the company's <span class="mono">roles/assignments.csv</span>. Each says it is an AI agent when asked. The faces are drawn initials, not photographs.</p>
</div>
<div class="panel">
  <h2>How the laboratory works</h2>
  <p>One thread for each open question of the thesis, and one chair. Each thread has a written charter, a first task, and a $1 a month allowance for its model calls; the laboratory as a whole has $5 a month. The chair keeps the thesis, the register and the research log, and reports to CommandAGI's Portfolio.</p>
  <p>Spending, contracts, hiring decisions and public statements are the owner's sign-off. The agents prepare them to the last step and stop.</p>
  <div class="buttons"><a class="button" href="/research.html">The open questions</a><a class="button ghost" href="/deck/">The pitch deck</a></div>
</div>`,
};

const es = {
  title: "El equipo — Cortex Squared",
  description:
    "Los tres cofundadores del laboratorio, tal como los nombra la presentación, y sus cuatro agentes de investigación de IA: predicción de crisis, modelado inverso, muestreo cuántico y termodinámico, clínica y ética.",
  body: `${hero("Cortex Squared · el equipo", "Tres cofundadores, cuatro agentes de investigación", "Los cofundadores se nombran como los escribe la diapositiva del equipo. Los agentes de investigación son agentes de IA, no personas, y lo dicen.")}
<div class="panel">
  <h2>Cofundadores</h2>
  <div class="grid">
    ${founder("/assets/team/jacob-valdez.jpg", "Jacob Valdez", "Member of Technical Staff, Stealth Startup · jvboid.dev. La línea de la presentación; es el propietario del laboratorio.", "Jacob Valdez, fotografía de la diapositiva del equipo")}
    ${founder("/assets/team/hanah-rahman.jpg", "Hanah Rahman", "Student Researcher, Berkeley Lab · quantum applications · quantum ML. La línea de la presentación.", "Hanah Rahman, fotografía de la diapositiva del equipo")}
    ${founder("/assets/team/rohit-korrapolu.jpg", "Rohit Korrapolu", "Applied AI researcher · i14labs. La línea de la presentación.", "Rohit Korrapolu, fotografía de la diapositiva del equipo")}
  </div>
  <p class="dim" style="margin-top:16px">Las fotografías y las líneas bajo los nombres vienen de la diapositiva del equipo de la presentación en el repositorio de My Little Brain (<span class="mono">media/deck-slide-7.png</span>), hecha por el propietario. El sitio no añade biografía, credencial ni dato de contacto. Los asientos de Hanah y Rohit en la empresa no nombran cuenta hasta que cada uno entre y acepte.</p>
</div>
<div class="panel">
  <h2>Agentes de investigación</h2>
  <div class="grid">
    ${agent("Ifeoma Nwachukwu", "Predicción de crisis: el protocolo, el conjunto de ventanas, el nulo dentro del paciente y la prueba reservada.", "forecast", face("IN", "#ffcf6b"))}
    ${agent("Tobias Lindqvist", "Modelado inverso e identificabilidad: los conjuntos consistentes, la tabla de parámetros y una extensión del modelo a la vez.", "inverse", face("TL", "#b07de0"))}
    ${agent("Ravi Chandrasekaran", "Muestreo cuántico y termodinámico con un presupuesto fijo, con las líneas base clásicas en cada tabla.", "samplers", face("RC", "#7fb2ff"))}
    ${agent("Sofía Márquez", "Clínica, consentimiento y ética: el registro de datos, el esqueleto del estudio, la auditoría de redacción. No es clínica.", "clinic-ethics", face("SM", "#ff9f8b"))}
  </div>
  <p class="dim" style="margin-top:16px">Cada agente de investigación es un agente de IA autónomo con un nombre, un área, un archivo de instrucciones y un asiento en el <span class="mono">roles/assignments.csv</span> de la empresa. Cada uno dice que es un agente de IA cuando se le pregunta. Las caras son iniciales dibujadas, no fotografías.</p>
</div>
<div class="panel">
  <h2>Cómo trabaja el laboratorio</h2>
  <p>Un hilo por cada pregunta abierta de la tesis, y uno de coordinación. Cada hilo tiene un estatuto escrito, una primera tarea y una asignación de 1 USD al mes para sus llamadas al modelo; el laboratorio en conjunto tiene 5 USD al mes. La coordinación mantiene la tesis, el registro y el diario de investigación, e informa al Portfolio de CommandAGI.</p>
  <p>El gasto, los contratos, las decisiones de contratación y las declaraciones públicas necesitan la firma del propietario. Los agentes los preparan hasta el último paso y se detienen.</p>
  <div class="buttons"><a class="button" href="/es/research.html">Las preguntas abiertas</a><a class="button ghost" href="/deck/">La presentación</a></div>
</div>`,
};

const zh = {
  title: "团队 — Cortex Squared",
  description:
    "实验室的三位联合创始人（按演示文稿的写法），以及四位 AI 研究代理：癫痫预测、反演建模、量子与热力学采样、临床与伦理。",
  body: `${hero("Cortex Squared · 团队", "三位联合创始人，四位研究代理", "联合创始人的名字按演示文稿团队页的拼写。研究代理是 AI 代理，不是人，并且会明确说明。")}
<div class="panel">
  <h2>联合创始人</h2>
  <div class="grid">
    ${founder("/assets/team/jacob-valdez.jpg", "Jacob Valdez", "Member of Technical Staff, Stealth Startup · jvboid.dev。演示文稿原文；他是实验室的所有者。", "Jacob Valdez，来自演示文稿团队页的照片")}
    ${founder("/assets/team/hanah-rahman.jpg", "Hanah Rahman", "Student Researcher, Berkeley Lab · quantum applications · quantum ML。演示文稿原文。", "Hanah Rahman，来自演示文稿团队页的照片")}
    ${founder("/assets/team/rohit-korrapolu.jpg", "Rohit Korrapolu", "Applied AI researcher · i14labs。演示文稿原文。", "Rohit Korrapolu，来自演示文稿团队页的照片")}
  </div>
  <p class="dim" style="margin-top:16px">照片与名字下的说明来自 My Little Brain 仓库中演示文稿的团队页（<span class="mono">media/deck-slide-7.png</span>），由所有者制作。本站不添加任何传记、资历或联系方式。在公司中，Hanah 与 Rohit 的席位在各自登录并接受之前不指定账户。</p>
</div>
<div class="panel">
  <h2>研究代理</h2>
  <div class="grid">
    ${agent("Ifeoma Nwachukwu", "癫痫预测：方案、窗口集、患者内零分布与留出检验。", "forecast", face("IN", "#ffcf6b"))}
    ${agent("Tobias Lindqvist", "反演建模与可辨识性：一致集合、参数表，以及一次只加一项模型扩展。", "inverse", face("TL", "#b07de0"))}
    ${agent("Ravi Chandrasekaran", "在固定预算下的量子与热力学采样，每张表都保留经典基线。", "samplers", face("RC", "#7fb2ff"))}
    ${agent("Sofía Márquez", "临床、知情同意与伦理：数据登记、研究骨架、措辞审计。她不是临床医生。", "clinic-ethics", face("SM", "#ff9f8b"))}
  </div>
  <p class="dim" style="margin-top:16px">每位研究代理都是自主 AI 代理，拥有名字、领域、书面指令文件和公司 <span class="mono">roles/assignments.csv</span> 中的席位。被问到时，每位都会说明自己是 AI 代理。头像为绘制的首字母，不是照片。</p>
</div>
<div class="panel">
  <h2>实验室如何工作</h2>
  <p>研究命题的每个未解问题对应一个线程，另有一个主席线程。每个线程都有书面章程、第一项任务，以及每月 1 美元的模型调用额度；整个实验室每月 5 美元。主席维护研究命题、登记表和研究日志，并向 CommandAGI 的投资组合报告。</p>
  <p>支出、合同、招聘决定与公开声明需要所有者签字。代理把它们准备到最后一步，然后停下。</p>
  <div class="buttons"><a class="button" href="/zh/research.html">未解问题</a><a class="button ghost" href="/deck/">演示文稿</a></div>
</div>`,
};

export { en, es, zh };
