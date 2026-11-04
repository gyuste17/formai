/**
 * aiMaturityData.js
 * Marco de evaluación de madurez en IA Corporativa de FormAI.
 * Marco propio de FormAI, alineado con el EU AI Act (Reglamento UE 2024/1689).
 */

/**
 * Contexto de mercado con fuente oficial (datos de ADOPCIÓN de IA, no de madurez:
 * no son comparables con la puntuación 0-100 de esta autoevaluación).
 * Revisar cuando se publiquen nuevas ediciones (INE: octubre; Eurostat: diciembre).
 */
export const AI_MARKET_CONTEXT = {
  note: 'Datos de adopción (uso de IA), no comparables directamente con la puntuación de madurez.',
  stats: [
    {
      value: '33,6 %',
      label: 'de las empresas españolas de 10 o más empleados usaban IA',
      period: '1.er trimestre 2026',
      source: 'INE · Encuesta TIC y comercio electrónico en las empresas',
      url: 'https://www.ine.es/dyngs/Prensa/ETICCE20251T2026.htm',
    },
    {
      value: '20,0 %',
      label: 'de las empresas de la UE de 10 o más empleados usaban IA',
      period: 'Año 2025',
      source: 'Eurostat · isoc_eb_ai',
      url: 'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises',
    },
  ],
};

export const AI_MATURITY_DIMENSIONS = [
  {
    id: 'tooling',
    name: 'Ecosistema de Herramientas',
    shortName: 'Herramientas',
    description: 'Diversidad de modelos (Claude, GPT, Gemini, Qwen), entornos multimodales y acceso en el puesto de trabajo.',
    icon: 'Cpu',
    weight: 0.20,
  },
  {
    id: 'data',
    name: 'Conexión con Datos y ERP',
    shortName: 'Datos & RAG',
    description: 'Integración con SharePoint, bases documentales, RAG seguro, análisis cuantitativo y ejecución de código.',
    icon: 'Database',
    weight: 0.20,
  },
  {
    id: 'agentic',
    name: 'Capacidades Agénticas',
    shortName: 'Agentes & Flujos',
    description: 'Automatización de flujos multi-paso, Model Context Protocol (MCP), auditoría de BI y simulación de escenarios.',
    icon: 'Bot',
    weight: 0.20,
  },
  {
    id: 'governance',
    name: 'Gobernanza y Seguridad',
    shortName: 'Seguridad & Legal',
    description: 'Políticas corporativas, control del uso no autorizado (Shadow AI), cumplimiento EU AI Act y garantías Zero Data Retention.',
    icon: 'ShieldCheck',
    weight: 0.20,
  },
  {
    id: 'adoption',
    name: 'Cultura, Formación y ROI',
    shortName: 'Formación & ROI',
    description: 'Capacitación práctica de directivos, medición de horas ahorradas y aprovechamiento del crédito FUNDAE.',
    icon: 'TrendingUp',
    weight: 0.20,
  },
];

export const AI_MATURITY_QUESTIONS = [
  // --- DIMENSIÓN 1: HERRAMIENTAS Y MODELOS ---
  {
    id: 'q1',
    dimensionId: 'tooling',
    title: '¿Qué tipo de acceso a herramientas de IA tienen actualmente los empleados en sus puestos?',
    subtitle: 'Mide la disponibilidad de tecnología oficial frente al aislamiento o restricciones.',
    plainExplanation: '¿La empresa os da acceso oficial a herramientas reconocidas (como ChatGPT Enterprise o Copilot), tenéis solo un asistente interno muy básico y cerrado, o los empleados se tienen que buscar la vida por su cuenta en Google?',
    conceptTag: 'Acceso en el Puesto',
    visualChips: ['ChatGPT Enterprise', 'Microsoft Copilot', 'Claude', 'Gemini'],
    hint: 'Prohibir o limitar en exceso empuja a empleados y directivos a usar cuentas personales en sus móviles (Shadow AI), lo que dispara el riesgo legal.',
    gap: {
      title: 'Acceso sin herramientas oficiales',
      text: 'Sin una plataforma corporativa adecuada, los empleados recurren a cuentas personales (Shadow AI) y la empresa pierde el control sobre qué datos salen.',
    },
    options: [
      {
        id: 'q1_a',
        icon: 'UserX',
        label: 'Sin herramientas oficiales',
        description: 'No disponemos de ninguna plataforma oficial; cada empleado utiliza lo que conoce por su cuenta.',
        score: 0,
        badge: 'Riesgo Alto',
      },
      {
        id: 'q1_b',
        icon: 'FlaskConical',
        label: 'Entorno cerrado o sandbox básico',
        description: 'Disponemos de un chatbot o entorno piloto interno con funciones restringidas a texto básico o traducción.',
        score: 30,
        badge: 'Caso Frecuente',
      },
      {
        id: 'q1_c',
        icon: 'BadgeCheck',
        label: 'Licencias corporativas estándar',
        description: 'Contamos con licencias oficiales de mercado (ej. ChatGPT Enterprise, Microsoft Copilot 365) para partes de la plantilla.',
        score: 70,
        badge: 'Estándar UE',
      },
      {
        id: 'q1_d',
        icon: 'Layers',
        label: 'Plataforma multi-modelo avanzada',
        description: 'Acceso unificado que permite alternar según la tarea entre los mejores modelos del mercado (Claude, GPT, Gemini, DeepSeek o modelos locales).',
        score: 100,
        badge: 'Avanzado',
      },
      {
        id: 'q1_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No tengo constancia exacta o este aspecto depende directamente de TI / Central (se registrará como punto a auditar).',
        score: 20,
        isUnknown: true,
      },
    ],
  },
  {
    id: 'q2',
    dimensionId: 'tooling',
    title: '¿Pueden los usuarios procesar y analizar documentos complejos y multiformato?',
    subtitle: 'Capacidad multimodal para trabajar con fichas técnicas, contratos en PDF, tablas y fotos de planta.',
    plainExplanation: '¿Podéis arrastrar a la IA un PDF de 80 páginas, una foto de una pieza de fábrica o un archivo Excel y pedirle que lo entienda, o la herramienta solo os deja escribir preguntas cortas de texto plano?',
    conceptTag: 'Multimodalidad y Documentos',
    visualChips: ['PDFs extensos', 'Hojas Excel', 'Fotos de planta', 'Planos'],
    hint: 'En industria, buena parte del valor de la IA está en interpretar pliegos, albaranes y hojas de cálculo, no en redactar texto genérico.',
    gap: {
      title: 'IA limitada a texto plano',
      text: 'Sin análisis de PDFs, hojas de cálculo e imágenes, la IA no llega a los documentos donde está el trabajo real: contratos, fichas técnicas y albaranes.',
    },
    options: [
      {
        id: 'q2_a',
        icon: 'Type',
        label: 'Solo texto plano limitado',
        description: 'La herramienta solo admite mensajes de texto sencillos pegados en el cuadro de chat.',
        score: 0,
        badge: 'Básico',
      },
      {
        id: 'q2_b',
        icon: 'Paperclip',
        label: 'Archivos individuales con restricciones',
        description: 'Se pueden adjuntar archivos pequeños, pero con límites estrictos de tamaño y sin cruzar varios a la vez.',
        score: 35,
        badge: 'Limitado',
      },
      {
        id: 'q2_c',
        icon: 'ScanSearch',
        label: 'Análisis multimodal completo',
        description: 'Lectura masiva de PDFs de cientos de páginas, interpretación de diagramas, extracción de tablas y visión por computador.',
        score: 100,
        badge: 'Avanzado',
      },
      {
        id: 'q2_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No he probado a subir archivos de gran tamaño o desconozco las limitaciones del sistema.',
        score: 20,
        isUnknown: true,
      },
    ],
  },

  // --- DIMENSIÓN 2: CONEXIÓN CON DATOS Y ERP ---
  {
    id: 'q3',
    dimensionId: 'data',
    title: '¿Cómo interactúa la IA con la documentación y el conocimiento interno de la empresa?',
    subtitle: 'Evalúa la capacidad de acceder al repositorio corporativo de forma segura.',
    plainExplanation: '¿La IA puede consultar automáticamente las carpetas de la empresa (SharePoint, manuales de producto, normativas) o tenéis que copiar y pegar a mano cada párrafo cada vez que queréis consultar algo?',
    conceptTag: 'Conocimiento Corporativo (RAG)',
    visualChips: ['SharePoint', 'Normas técnicas', 'Manuales internos', 'ERP'],
    hint: 'Un RAG corporativo permite a cualquier director preguntar: "¿Qué dice la norma técnica para este perfil?" y obtener la cita exacta en 2 segundos.',
    gap: {
      title: 'IA desconectada del conocimiento interno',
      text: 'Copiar y pegar a mano consume tiempo y deja fuera la documentación interna; un sistema que indexe los repositorios respetando permisos lo evita.',
    },
    options: [
      {
        id: 'q3_a',
        icon: 'ClipboardPaste',
        label: 'Cero conexión (copiar y pegar manual)',
        description: 'Los empleados deben copiar fragmentos manualmente cada vez que necesitan consultar un documento.',
        score: 0,
        badge: 'Manual',
      },
      {
        id: 'q3_b',
        icon: 'Upload',
        label: 'Subida manual efímera',
        description: 'Se sube el archivo en cada conversación, pero se pierde el contexto al cerrar la sesión.',
        score: 30,
        badge: 'Parcial',
      },
      {
        id: 'q3_c',
        icon: 'FolderSearch',
        label: 'Bases de conocimiento indexadas (RAG)',
        description: 'La IA consulta directamente SharePoint, unidades compartidas o wikis internas respetando los permisos de cada usuario.',
        score: 75,
        badge: 'Recomendado',
      },
      {
        id: 'q3_d',
        icon: 'Link2',
        label: 'Integración bidireccional con ERP/CRM',
        description: 'Conexión segura a bases de datos de producción, pedidos, inventario o sistemas de gestión (SAP, Navision, etc.).',
        score: 100,
        badge: 'Avanzado',
      },
      {
        id: 'q3_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No tengo información sobre la arquitectura de datos o las integraciones configuradas con TI.',
        score: 20,
        isUnknown: true,
      },
    ],
  },
  {
    id: 'q4',
    dimensionId: 'data',
    title: '¿Puede la IA hacer cálculos exactos sobre vuestros datos ejecutando código real (Code Interpreter / Python)?',
    subtitle: 'Diferencia crucial entre "generar texto con números" (riesgo de alucinación) y "calcular con código matemático exacto".',
    plainExplanation: 'Los modelos de lenguaje comunes a veces se inventan cálculos matemáticos o porcentajes. El "Code Interpreter" ejecuta código informático real en segundo plano para que cualquier análisis de costes o auditoría numérica sea 100% exacto.',
    conceptTag: 'Precisión Numérica y Cálculos',
    visualChips: ['Python', 'Excel', 'Gráficos', 'Auditoría de costes'],
    hint: 'Para auditar costes, mermas o presupuestos, es indispensable que la IA ejecute código en un sandbox seguro para garantizar precisión matemática.',
    gap: {
      title: 'Sin cálculo exacto (Code Interpreter)',
      text: 'Sin ejecución de código, los números que genera la IA pueden ser erróneos: no es fiable para auditar costes ni simular escenarios.',
    },
    options: [
      {
        id: 'q4_a',
        icon: 'MessageSquareText',
        label: 'No, solo generación de texto',
        description: 'La herramienta redacta respuestas pero no ejecuta código matemático (elevado riesgo de inventar cálculos).',
        score: 0,
        badge: 'Riesgo Cálculo',
      },
      {
        id: 'q4_b',
        icon: 'Code2',
        label: 'Genera código pero sin ejecución interna',
        description: 'Ofrece código o fórmulas de Excel para que el usuario las copie y pegue fuera por su cuenta.',
        score: 40,
        badge: 'Intermedio',
      },
      {
        id: 'q4_c',
        icon: 'SquareTerminal',
        label: 'Entorno de ejecución aislado integrado',
        description: 'Cuenta con intérprete de Python en servidor que procesa hojas Excel, calcula correlaciones y genera gráficos sin errores.',
        score: 100,
        badge: 'Óptimo',
      },
      {
        id: 'q4_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No sé si nuestra herramienta ejecuta código o simplemente redacta texto.',
        score: 20,
        isUnknown: true,
      },
    ],
  },

  // --- DIMENSIÓN 3: CAPACIDADES AGÉNTICAS Y AUTOMATIZACIÓN ---
  {
    id: 'q5',
    dimensionId: 'agentic',
    title: '¿Qué grado de automatización multi-paso o agéntica tienen los flujos de trabajo?',
    subtitle: 'El salto de 2026: de chatbots pasivos a agentes que encadenan tareas de forma autónoma supervisada.',
    plainExplanation: '¿La IA solo responde preguntas una a una como un chat, o es capaz de realizar secuencias de tareas completas (ej. leer un albarán, comparar precios, detectar desviaciones y redactar el borrador para que tú lo apruebes)?',
    conceptTag: 'Automatización y Agentes',
    visualChips: ['Plantillas de prompts', 'GPTs / Proyectos', 'Agentes', 'MCP'],
    hint: 'El protocolo MCP (Model Context Protocol) permite a los agentes consultar bases de datos, generar informes y enviar borradores bajo aprobación humana.',
    gap: {
      title: 'Sin automatización de flujos',
      text: 'La IA responde pregunta a pregunta; los procesos de varios pasos (leer, comparar, redactar borradores) siguen haciéndose a mano.',
    },
    options: [
      {
        id: 'q5_a',
        icon: 'MessageCircle',
        label: 'Pregunta y respuesta puramente reactiva',
        description: 'Cada respuesta requiere escribir un nuevo prompt manual de forma secuencial.',
        score: 10,
        badge: 'Reactivo',
      },
      {
        id: 'q5_b',
        icon: 'ListChecks',
        label: 'Uso de plantillas de prompts predefinidas',
        description: 'Los equipos disponen de librerías de prompts para estandarizar algunas consultas.',
        score: 45,
        badge: 'Básico',
      },
      {
        id: 'q5_c',
        icon: 'Bot',
        label: 'Asistentes departamentales personalizados',
        description: 'Existen GPTs o bots internos configurados para tareas específicas (ej. Compras, Calidad, RRHH).',
        score: 75,
        badge: 'Especializado',
      },
      {
        id: 'q5_d',
        icon: 'Workflow',
        label: 'Flujos agénticos orquestados (MCP / multi-herramienta)',
        description: 'Agentes autónomos que cruzan datos entre herramientas, alertan de desviaciones y preparan borradores completos.',
        score: 100,
        badge: 'Líder',
      },
      {
        id: 'q5_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No estoy familiarizado con las opciones de automatización o agentes disponibles.',
        score: 20,
        isUnknown: true,
      },
    ],
  },
  {
    id: 'q6',
    dimensionId: 'agentic',
    title: '¿Cómo se apoya el Comité de Dirección en la IA para auditar cuadros de mando y tomar decisiones?',
    subtitle: 'Uso ejecutivo de la IA en Power BI, Excel y análisis predictivo de escenarios.',
    plainExplanation: '¿Los directivos y mandos utilizan la IA para simular escenarios de negocio (ej. "¿qué pasa si sube un 8% el coste de energía o la materia prima?") o solo la usan puntualmente para redactar o resumir?',
    conceptTag: 'Uso Directivo y Simulación',
    visualChips: ['Power BI', 'Excel', 'What-if', 'Márgenes'],
    hint: 'Los directivos no deben picar código; su valor está en usar la IA para simular escenarios What-If y auditar desviaciones de margen en segundos.',
    gap: {
      title: 'Dirección sin apoyo analítico de IA',
      text: 'El Comité de Dirección no aprovecha la IA para auditar cuadros de mando ni simular escenarios What-If.',
    },
    options: [
      {
        id: 'q6_a',
        icon: 'Ban',
        label: 'No se utiliza en el comité de dirección',
        description: 'La dirección no utiliza herramientas de IA para auditar métricas de negocio ni cuadros de mando.',
        score: 0,
        badge: 'Sin Uso',
      },
      {
        id: 'q6_b',
        icon: 'FileText',
        label: 'Uso puntual para resúmenes de actas o redacción',
        description: 'Se utiliza para sintetizar notas o preparar presentaciones, pero sin análisis cuantitativo.',
        score: 35,
        badge: 'Ofimático',
      },
      {
        id: 'q6_c',
        icon: 'LineChart',
        label: 'Auditoría analítica y simulación de escenarios (What-If)',
        description: 'Los directivos interrogan dashboards de Power BI/Excel con IA, detectan anomalías de costes y simulan contingencias.',
        score: 100,
        badge: 'Estratégico',
      },
      {
        id: 'q6_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No tengo conocimiento directo de cómo utiliza la IA el resto del equipo directivo.',
        score: 20,
        isUnknown: true,
      },
    ],
  },

  // --- DIMENSIÓN 4: GOBERNANZA, SEGURIDAD Y NORMATIVA ---
  {
    id: 'q7',
    dimensionId: 'governance',
    title: '¿Dispone la empresa de una política corporativa formal sobre el uso de la IA comunicada a la plantilla?',
    subtitle: 'El EU AI Act (Reglamento UE 2024/1689) exige gobernanza y alfabetización obligatoria del personal.',
    plainExplanation: '¿Existe un documento formal conocido por todos donde se explique qué tipo de datos se pueden subir a la IA y cuáles están estrictamente prohibidos, cumpliendo con la nueva normativa europea?',
    conceptTag: 'Política y Regulación (EU AI Act)',
    visualChips: ['Política escrita', 'Clasificación de datos', 'EU AI Act', 'Art. 4'],
    hint: 'Tener una política clara despenaliza el uso correcto y marca límites transparentes de qué información está permitida.',
    gap: {
      title: 'Sin política formal de uso de IA',
      text: 'Sin directrices claras la plantilla no sabe qué datos puede usar y se incumple la alfabetización en IA que exige el Art. 4 del EU AI Act.',
    },
    options: [
      {
        id: 'q7_a',
        icon: 'FileX',
        label: 'Inexistente o desconocida',
        description: 'No hay ninguna directriz escrita; los empleados no saben qué está permitido y qué no.',
        score: 0,
        badge: 'Vacío Legal',
      },
      {
        id: 'q7_b',
        icon: 'Megaphone',
        label: 'Circulares genéricas de advertencia',
        description: 'Mensajes de "prohibición general" o recordatorios informales sin protocolo práctico.',
        score: 30,
        badge: 'Informal',
      },
      {
        id: 'q7_c',
        icon: 'ScrollText',
        label: 'Política formal de uso aceptable y compliance',
        description: 'Protocolo formal aprobado con clasificación de datos, directrices por puesto, criterio sobre el uso de cuentas personales y adecuación a la normativa europea.',
        score: 100,
        badge: 'Homologado',
      },
      {
        id: 'q7_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No sé si existe una política escrita aprobada por Recursos Humanos o el área Legal.',
        score: 20,
        isUnknown: true,
      },
    ],
  },
  {
    id: 'q9',
    dimensionId: 'governance',
    title: '¿Garantiza contractualmente la infraestructura que los datos corporativos NUNCA entrenan a terceros?',
    subtitle: 'Cláusula de Zero Data Retention (ZDR) y soberanía de datos dentro de la Unión Europea.',
    plainExplanation: '¿Existe un contrato firmado con el proveedor tecnológico que certifique que vuestras preguntas, datos y documentos NO se guardan en sus servidores ni se usan para entrenar futuros modelos públicos?',
    conceptTag: 'Zero Data Retention & UE',
    visualChips: ['Zero Data Retention', 'Servidores UE', 'Propiedad de los datos', 'Contrato B2B'],
    hint: 'Los contratos Enterprise en la UE pueden garantizar por escrito que los datos no se almacenan ni se usan para entrenar modelos públicos.',
    gap: {
      title: 'Privacidad de datos no garantizada',
      text: 'Sin garantías contractuales de no retención ni de no entrenamiento, la información confidencial queda expuesta frente a terceros.',
    },
    options: [
      {
        id: 'q9_a',
        icon: 'ShieldAlert',
        label: 'No está garantizado o se desconoce',
        description: 'Se usan versiones comerciales públicas o no hay acuerdo de tratamiento de datos explícito.',
        score: 0,
        badge: 'No Garantizado',
      },
      {
        id: 'q9_b',
        icon: 'ShieldHalf',
        label: 'Garantizado solo en algunos servicios piloto',
        description: 'Ciertas áreas cuentan con garantías pero no está estandarizado en toda la compañía.',
        score: 50,
        badge: 'Parcial',
      },
      {
        id: 'q9_c',
        icon: 'LockKeyhole',
        label: 'Certificación Zero Data Retention y tenant privado en la UE',
        description: 'Acuerdos B2B con cifrado en reposo y garantía legal de no entrenamiento de modelos de terceros.',
        score: 100,
        badge: 'Máxima Seguridad',
      },
      {
        id: 'q9_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No conozco los detalles de los acuerdos de privacidad o contratación de licencias con los proveedores.',
        score: 20,
        isUnknown: true,
      },
    ],
  },

  // --- DIMENSIÓN 5: FORMACIÓN, CULTURA Y ROI ---
  {
    id: 'q10',
    dimensionId: 'adoption',
    title: '¿Qué porcentaje de mandos intermedios y directivos ha recibido capacitación práctica aplicada a su puesto?',
    subtitle: 'La tecnología sin capacitación directiva produce frustración y abandono de la herramienta.',
    plainExplanation: '¿Los directivos y jefes de departamento han aprendido a sacarle partido a la IA en talleres prácticos con sus propios archivos, o cada uno ha tenido que aprender de forma autodidacta viendo vídeos?',
    conceptTag: 'Capacitación Directiva & FUNDAE',
    visualChips: ['Autodidacta', 'Webinars', 'Talleres prácticos', 'Bonificado FUNDAE'],
    hint: 'La formación en España es bonificable con cargo al crédito FUNDAE de la empresa, y a menudo supone coste directo cero.',
    gap: {
      title: 'Capacitación insuficiente',
      text: 'Sin formación práctica aplicada, la herramienta se abandona o se usa mal; la formación es bonificable con el crédito FUNDAE.',
    },
    options: [
      {
        id: 'q10_a',
        icon: 'MonitorPlay',
        label: 'Menos del 15% (aprendizaje autodidacta)',
        description: 'Cada uno aprende mirando vídeos o probando por su cuenta sin método pedagógico.',
        score: 0,
        badge: 'Autodidacta',
      },
      {
        id: 'q10_b',
        icon: 'Presentation',
        label: 'Entre el 15% y el 60%, sobre todo en sesiones informativas',
        description: 'Se han realizado webinars o charlas generales, pero sin talleres prácticos sobre sus archivos reales.',
        score: 45,
        badge: 'Teórico',
      },
      {
        id: 'q10_c',
        icon: 'GraduationCap',
        label: 'Más del 60% con talleres prácticos',
        description: 'Talleres ejecutivos específicos para directivos y técnicos sobre casos de uso reales de su operativa diaria.',
        score: 100,
        badge: 'Capacitado',
      },
      {
        id: 'q10_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No tengo los datos globales del plan de formación de la compañía.',
        score: 20,
        isUnknown: true,
      },
    ],
  },
  {
    id: 'q11',
    dimensionId: 'adoption',
    title: '¿Dispone la empresa de métricas de retorno de inversión (ROI) u horas ahorradas con la IA?',
    subtitle: 'Medición tangible del impacto económico frente a la simple percepción cualitativa.',
    plainExplanation: '¿La empresa lleva algún control de cuántas horas de trabajo se ahorran al mes o qué impacto económico real tiene la IA, o solo se tiene la sensación subjetiva de que "ayuda bastante"?',
    conceptTag: 'Métricas de ROI y Horas Ahorradas',
    visualChips: ['Horas ahorradas', 'KPIs', 'Informe de gestión', 'Auditoría de ROI'],
    hint: 'Medir las horas ahorradas por departamento facilita justificar y aprobar nuevos presupuestos de IA.',
    gap: {
      title: 'Impacto no medido',
      text: 'Sin métricas de horas ahorradas es difícil justificar nuevas inversiones ante la dirección.',
    },
    options: [
      {
        id: 'q11_a',
        icon: 'EyeOff',
        label: 'No se mide de ninguna forma',
        description: 'No hay indicadores objetivos de ahorro de tiempo, reducción de costes ni productividad.',
        score: 0,
        badge: 'Sin Métricas',
      },
      {
        id: 'q11_b',
        icon: 'ThumbsUp',
        label: 'Sensación cualitativa positiva no cuantificada',
        description: 'Se sabe que ayuda y que ahorra tiempo, pero no está recogido en ningún informe de gestión.',
        score: 40,
        badge: 'Cualitativo',
      },
      {
        id: 'q11_c',
        icon: 'Gauge',
        label: 'Métricas objetivas de procesos y horas ahorradas',
        description: 'Seguimiento formal de horas ganadas en reporting, respuesta a ofertas, auditoría de datos y satisfacción del equipo.',
        score: 100,
        badge: 'Medible',
      },
      {
        id: 'q11_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'No conozco si se realiza seguimiento formal del ahorro de horas.',
        score: 20,
        isUnknown: true,
      },
    ],
  },
];

export const AI_MATURITY_LEVELS = [
  {
    level: 1,
    name: 'Nivel 1 — Emergente (Riesgo Alto de Shadow AI)',
    scoreRange: [0, 25],
    color: '#ef4444', // Red
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    summary: 'La organización carece de herramientas e infraestructura oficial adecuada. La mayoría de los empleados no utiliza IA o, peor aún, la utiliza de forma clandestina en cuentas personales desde sus móviles, generando un riesgo severo de fuga de propiedad industrial.',
    germanMatrixNote: 'Alerta para la central: La falta de herramientas no evita el uso de IA; simplemente hace que la empresa pierda el control y la seguridad legal.',
    generalNote: 'La falta de herramientas oficiales no evita el uso de IA: simplemente hace que la empresa pierda el control y la seguridad legal.',
    priorityAction: 'Establecer una política básica de uso y desplegar un entorno oficial seguro que sustituya el uso personal no controlado.',
  },
  {
    level: 2,
    name: 'Nivel 2 — Asistido Básico (Caso típico: Bloqueo Central)',
    scoreRange: [26, 50],
    color: '#f59e0b', // Amber
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    summary: 'Dispone de un entorno corporativo piloto o sandbox con acceso a chat básico y traducción, pero sus severas restricciones (sin análisis de datos real, sin conexión a archivos de negocio, sin agentes) impiden que los directivos y técnicos resuelvan problemas reales, acumulando una brecha de productividad frente a competidores que ya aprovechan la IA a fondo.',
    germanMatrixNote: 'Mensaje clave para Alemania: El sandbox actual está infrautilizado porque no resuelve cuellos de botella de negocio. Se requiere autorizar entornos de análisis cuantitativo con Zero Data Retention.',
    generalNote: 'El entorno actual está infrautilizado porque no resuelve cuellos de botella reales de negocio. Conviene habilitar análisis cuantitativo con garantías de Zero Data Retention.',
    priorityAction: 'Activar capacidades de análisis avanzado de datos, capacitar a los directivos en auditoría con IA y plantear a la central un piloto controlado en tenant europeo.',
  },
  {
    level: 3,
    name: 'Nivel 3 — Operacional (En Transición Competitiva)',
    scoreRange: [51, 74],
    color: '#3b82f6', // Blue
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    summary: 'La empresa cuenta con licencias oficiales, políticas activas y herramientas consolidadas. Los equipos ahorran tiempo en tareas ofimáticas, pero todavía existe margen en la adopción de flujos agénticos avanzados y conexión con bases documentales internas.',
    germanMatrixNote: 'La filial demuestra una gestión impecable de la seguridad y está lista para el siguiente escalón de automatización sin riesgo normativo.',
    generalNote: 'La gestión de la seguridad es sólida y la empresa está lista para el siguiente escalón de automatización sin riesgo normativo.',
    priorityAction: 'Desplegar RAG sobre repositorios documentales y formar a mandos intermedios en automatización de flujos de trabajo.',
  },
  {
    level: 4,
    name: 'Nivel 4 — Agéntico y Avanzado (Líder Sectorial)',
    scoreRange: [75, 90],
    color: '#10b981', // Emerald
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    summary: 'Uso estratégico y maduro de la IA: el Comité de Dirección audita cuadros de mando en minutos, los equipos automatizan tareas complejas con agentes supervisados y existe una gobernanza alineada con el EU AI Act.',
    germanMatrixNote: 'Caso de éxito internacional para la matriz: la filial actúa como faro de innovación para el resto del grupo.',
    generalNote: 'La organización es un referente interno de innovación y puede servir de modelo al resto del grupo o del sector.',
    priorityAction: 'Estandarizar librerías de agentes corporativos y orquestar flujos de integración directa con el ERP.',
  },
  {
    level: 5,
    name: 'Nivel 5 — Transformador / Ecosistema',
    scoreRange: [91, 100],
    color: '#8b5cf6', // Violet
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    summary: 'Referente absoluto en la industria europea. La IA está embebida en la toma de decisiones, optimización de márgenes y gobernanza corporativa, con un ROI plenamente medible y auditado.',
    germanMatrixNote: 'Excelencia operativa mundial que define el estándar del sector.',
    generalNote: 'Excelencia operativa que define el estándar del sector.',
    priorityAction: 'Gobernanza continua bajo la norma ISO/IEC 42001 e innovación en modelos propios.',
  },
];

/**
 * Función de cálculo de scoring por dimensiones y global
 */
export function calculateMaturityScore(answers) {
  const dimensionScores = {};
  const dimensionMax = {};
  let unknownCount = 0;
  
  AI_MATURITY_DIMENSIONS.forEach(dim => {
    dimensionScores[dim.id] = 0;
    dimensionMax[dim.id] = 0;
  });

  AI_MATURITY_QUESTIONS.forEach(q => {
    const selectedOptionId = answers[q.id];
    const option = q.options.find(o => o.id === selectedOptionId);
    if (option?.isUnknown) {
      unknownCount += 1;
    }
    const score = option ? option.score : 0;
    dimensionScores[q.dimensionId] += score;
    dimensionMax[q.dimensionId] += 100;
  });

  // Normalizar cada dimensión a base 100
  const normalizedDimensions = {};
  let weightedTotal = 0;

  AI_MATURITY_DIMENSIONS.forEach(dim => {
    const raw = dimensionScores[dim.id];
    const max = dimensionMax[dim.id] || 1;
    const normalized = Math.round((raw / max) * 100);
    normalizedDimensions[dim.id] = normalized;
    weightedTotal += normalized * dim.weight;
  });

  const overallScore = Math.round(weightedTotal);

  // Determinar nivel
  const levelData = AI_MATURITY_LEVELS.find(lvl => 
    overallScore >= lvl.scoreRange[0] && overallScore <= lvl.scoreRange[1]
  ) || AI_MATURITY_LEVELS[0];

  return {
    overallScore,
    levelData,
    dimensions: normalizedDimensions,
    unknownCount,
  };
}
