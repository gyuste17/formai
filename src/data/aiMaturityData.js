/**
 * aiMaturityData.js
 * Marco de evaluación de madurez en IA Corporativa de FormAI.
 * Basado en los estándares de Gartner, Microsoft Enterprise AI, BCG y el EU AI Act.
 * Diseñado para desacoplar el benchmark de mercado y permitir actualizaciones periódicas.
 */

export const AI_BENCHMARK_METADATA = {
  version: '2026.2',
  lastUpdated: 'Octubre 2026',
  sampleSize: '420 empresas del sector industrial, manufacturero y servicios B2B en España y Europa',
  averageIndustrialScore: 48, // Puntuación media en industria tradicional europea
  leadingIndustryScore: 82,   // Puntuación de las empresas líderes en adopción
};

export const AI_MATURITY_DIMENSIONS = [
  {
    id: 'tooling',
    name: 'Ecosistema de Herramientas',
    shortName: 'Herramientas',
    description: 'Diversidad de modelos (Claude, GPT, Gemini, Qwen), entornos multimodales y acceso en el puesto de trabajo.',
    icon: 'Cpu',
    benchmarkAverage: 52,
    weight: 0.20,
  },
  {
    id: 'data',
    name: 'Conexión con Datos y ERP',
    shortName: 'Datos & RAG',
    description: 'Integración con SharePoint, bases documentales, RAG seguro, análisis cuantitativo y ejecución de código.',
    icon: 'Database',
    benchmarkAverage: 42,
    weight: 0.20,
  },
  {
    id: 'agentic',
    name: 'Capacidades Agénticas',
    shortName: 'Agentes & Flujos',
    description: 'Automatización de flujos multi-paso, Model Context Protocol (MCP), auditoría de BI y simulación de escenarios.',
    icon: 'Bot',
    benchmarkAverage: 38,
    weight: 0.20,
  },
  {
    id: 'governance',
    name: 'Gobernanza y Seguridad',
    shortName: 'Seguridad & Legal',
    description: 'Políticas corporativas, prevención de Shadow AI, cumplimiento EU AI Act y garantías Zero Data Retention.',
    icon: 'ShieldCheck',
    benchmarkAverage: 54,
    weight: 0.20,
  },
  {
    id: 'adoption',
    name: 'Cultura, Formación y ROI',
    shortName: 'Formación & ROI',
    description: 'Capacitación práctica de directivos, medición de horas ahorradas y aprovechamiento del crédito FUNDAE.',
    icon: 'TrendingUp',
    benchmarkAverage: 54,
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
    visualChips: ['ChatGPT Ent.', 'Copilot 365', 'Claude 3.5', 'Sandbox Interno'],
    hint: 'Por qué importa a la matriz: Prohibir o limitar en exceso empuja a los directivos a usar cuentas personales en sus teléfonos móviles, disparando el riesgo legal.',
    options: [
      {
        id: 'q1_a',
        label: 'Sin herramientas oficiales',
        description: 'No disponemos de ninguna plataforma oficial; cada empleado utiliza lo que conoce por su cuenta.',
        score: 0,
        badge: 'Riesgo Alto',
      },
      {
        id: 'q1_b',
        label: 'Entorno cerrado o sandbox básico',
        description: 'Disponemos de un chatbot o entorno piloto interno con funciones restringidas a texto básico o traducción.',
        score: 30,
        badge: 'Caso Frecuente',
      },
      {
        id: 'q1_c',
        label: 'Licencias corporativas estándar',
        description: 'Contamos con licencias oficiales de mercado (ej. ChatGPT Enterprise, Microsoft Copilot 365) para partes de la plantilla.',
        score: 70,
        badge: 'Estándar UE',
      },
      {
        id: 'q1_d',
        label: 'Plataforma multi-modelo avanzada',
        description: 'Acceso unificado que permite alternar según la tarea entre los mejores modelos (Claude 3.5, GPT-4o, Gemini 1.5, DeepSeek o modelos locales).',
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
    visualChips: ['PDFs Extensos', 'Tablas Excel', 'Fotos de Planta', 'Planos'],
    hint: 'En industria, el 80% del valor de la IA reside en interpretar pliegos, albaranes y hojas de cálculo, no en redactar texto genérico.',
    options: [
      {
        id: 'q2_a',
        label: 'Solo texto plano limitado',
        description: 'La herramienta solo admite mensajes de texto sencillos pegados en el cuadro de chat.',
        score: 0,
        badge: 'Básico',
      },
      {
        id: 'q2_b',
        label: 'Archivos individuales con restricciones',
        description: 'Se pueden adjuntar archivos pequeños, pero con límites estrictos de tamaño y sin cruzar varios a la vez.',
        score: 35,
        badge: 'Limitado',
      },
      {
        id: 'q2_c',
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
    visualChips: ['SharePoint', 'Normas Técnicas', 'Manuales Internos', 'ERP'],
    hint: 'Un RAG corporativo permite a cualquier director preguntar: "¿Qué dice la norma técnica para este perfil?" y obtener la cita exacta en 2 segundos.',
    options: [
      {
        id: 'q3_a',
        label: 'Cero conexión (copiar y pegar manual)',
        description: 'Los empleados deben copiar fragmentos manualmente cada vez que necesitan consultar un documento.',
        score: 0,
        badge: 'Manual',
      },
      {
        id: 'q3_b',
        label: 'Subida manual efímera',
        description: 'Se sube el archivo en cada conversación, pero se pierde el contexto al cerrar la sesión.',
        score: 30,
        badge: 'Parcial',
      },
      {
        id: 'q3_c',
        label: 'Bases de conocimiento indexadas (RAG)',
        description: 'La IA consulta directamente SharePoint, unidades compartidas o wikis internas respetando los permisos de cada usuario.',
        score: 75,
        badge: 'Recomendado',
      },
      {
        id: 'q3_d',
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
    title: '¿Permite la plataforma ejecutar código real para cálculos analíticos (Code Interpreter / Python)?',
    subtitle: 'Diferencia crucial entre "generar texto con números" (riesgo de alucinación) y "calcular con código matemático exacto".',
    plainExplanation: 'Los modelos de lenguaje comunes a veces se inventan cálculos matemáticos o porcentajes. El "Code Interpreter" ejecuta código informático real en segundo plano para que cualquier análisis de costes o auditoría numérica sea 100% exacto.',
    conceptTag: 'Precisión Numérica y Cálculos',
    visualChips: ['Python en Servidor', 'Auditoría Costes', 'Cero Alucinación', 'Excel'],
    hint: 'Para auditar costes, mermas o presupuestos, es indispensable que la IA ejecute código en un sandbox seguro para garantizar precisión matemática.',
    options: [
      {
        id: 'q4_a',
        label: 'No, solo generación de texto',
        description: 'La herramienta redacta respuestas pero no ejecuta código matemático (elevado riesgo de inventar cálculos).',
        score: 0,
        badge: 'Riesgo Cálculo',
      },
      {
        id: 'q4_b',
        label: 'Genera código pero sin ejecución interna',
        description: 'Ofrece código o fórmulas de Excel para que el usuario las copie y pegue fuera por su cuenta.',
        score: 40,
        badge: 'Intermedio',
      },
      {
        id: 'q4_c',
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
    visualChips: ['Chatbot Reactivo', 'Plantillas', 'GPTs / Bots', 'Flujos MCP'],
    hint: 'El protocolo MCP (Model Context Protocol) permite a los agentes consultar bases de datos, generar informes y enviar borradores bajo aprobación humana.',
    options: [
      {
        id: 'q5_a',
        label: 'Pregunta y respuesta puramente reactiva',
        description: 'Cada respuesta requiere escribir un nuevo prompt manual de forma secuencial.',
        score: 10,
        badge: 'Reactivo',
      },
      {
        id: 'q5_b',
        label: 'Uso de plantillas de prompts predefinidas',
        description: 'Los equipos disponen de librerías de prompts para estandarizar algunas consultas.',
        score: 45,
        badge: 'Básico',
      },
      {
        id: 'q5_c',
        label: 'Asistentes departamentales personalizados',
        description: 'Existen GPTs o bots internos configurados para tareas específicas (ej. Compras, Calidad, RRHH).',
        score: 75,
        badge: 'Especializado',
      },
      {
        id: 'q5_d',
        label: 'Flujos agénticos orquestados (MCP / multi-herramienta)',
        description: 'Agentes autónomos que cruzan datos entre herramientas, alertan de desviaciones y preparan borradores completos.',
        score: 100,
        badge: 'Líder 2026',
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
    visualChips: ['What-If', 'Power BI + IA', 'Análisis de Márgenes', 'Reporting'],
    hint: 'Los directivos no deben picar código; su valor está en usar la IA para simular escenarios What-If y auditar desviaciones de margen en segundos.',
    options: [
      {
        id: 'q6_a',
        label: 'No se utiliza en el comité de dirección',
        description: 'La dirección no utiliza herramientas de IA para auditar métricas de negocio ni cuadros de mando.',
        score: 0,
        badge: 'Sin Uso',
      },
      {
        id: 'q6_b',
        label: 'Uso puntual para resúmenes de actas o redacción',
        description: 'Se utiliza para sintetizar notas o preparar presentaciones, pero sin análisis cuantitativo.',
        score: 35,
        badge: 'Ofimático',
      },
      {
        id: 'q6_c',
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
    visualChips: ['Directiva Escrita', 'Clasificación Datos', 'Compliance UE', 'Art. 4 AI Act'],
    hint: 'Tener una política clara despenaliza el uso correcto y marca límites transparentes de qué información está permitida.',
    options: [
      {
        id: 'q7_a',
        label: 'Inexistente o desconocida',
        description: 'No hay ninguna directriz escrita; los empleados no saben qué está permitido y qué no.',
        score: 0,
        badge: 'Vacío Legal',
      },
      {
        id: 'q7_b',
        label: 'Circulares genéricas de advertencia',
        description: 'Mensajes de "prohibición general" o recordatorios informales sin protocolo práctico.',
        score: 30,
        badge: 'Informal',
      },
      {
        id: 'q7_c',
        label: 'Política formal de uso aceptable y compliance',
        description: 'Protocolo formal aprobado con clasificación de datos, directrices por puesto y adecuación a la normativa europea.',
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
    id: 'q8',
    dimensionId: 'governance',
    title: '¿Cómo se previene y gestiona el fenómeno del "Shadow AI" en la organización?',
    subtitle: 'Control real de empleados usando cuentas no reguladas en sus propios teléfonos u ordenadores.',
    plainExplanation: '"Shadow AI" ocurre cuando los empleados, al no tener herramientas potentes en el trabajo, recurren a sus cuentas personales de ChatGPT en sus teléfonos móviles para sacar adelante su trabajo, exponiendo información confidencial sin control.',
    conceptTag: 'Prevención de Shadow AI',
    visualChips: ['Uso en Móvil', 'Fuga de Datos', 'Herramienta Homologada', 'Control'],
    hint: 'Bloquear URLs en la oficina no frena el Shadow AI: los directivos se reenvían datos al móvil para usar ChatGPT si la herramienta de la empresa es mala.',
    options: [
      {
        id: 'q8_a',
        label: 'Se desconoce el alcance real',
        description: 'No existe monitorización; se asume que ocurre de forma opaca.',
        score: 0,
        badge: 'Riesgo Crítico',
      },
      {
        id: 'q8_b',
        label: 'Bloqueo en la red sin alternativa de valor',
        description: 'Se bloquean páginas web en la red, provocando que los empleados usen sus móviles privados.',
        score: 25,
        badge: 'Ineficaz',
      },
      {
        id: 'q8_c',
        label: 'Alternativa corporativa homologada y formación',
        description: 'Se dota a los equipos de una solución oficial potente y segura que desincentiva por completo el uso privado.',
        score: 100,
        badge: 'Solución Real',
      },
      {
        id: 'q8_unknown',
        label: 'No lo sé / Desconozco este punto',
        description: 'Desconozco si la empresa monitoriza o tiene medidas sobre el uso privado de IA.',
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
    visualChips: ['Zero Data Retention', 'Servidores UE', 'Propiedad Datos', 'Contrato B2B'],
    hint: 'Argumento de oro para Alemania: los contratos Enterprise en la UE garantizan por escrito que los datos no se guardan ni entrenan modelos públicos.',
    options: [
      {
        id: 'q9_a',
        label: 'No está garantizado o se desconoce',
        description: 'Se usan versiones comerciales públicas o no hay acuerdo de tratamiento de datos explícito.',
        score: 0,
        badge: 'No Garantizado',
      },
      {
        id: 'q9_b',
        label: 'Garantizado solo en algunos servicios piloto',
        description: 'Ciertas áreas cuentan con garantías pero no está estandarizado en toda la compañía.',
        score: 50,
        badge: 'Parcial',
      },
      {
        id: 'q9_c',
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
    visualChips: ['Autodidacta', 'Webinars', 'Talleres Prácticos', '100% Bonificado'],
    hint: 'La formación en España es 100% bonificable con cargo al crédito FUNDAE de la empresa, resultando en coste cero directo.',
    options: [
      {
        id: 'q10_a',
        label: 'Menos del 15% (aprendizaje autodidacta)',
        description: 'Cada uno aprende mirando vídeos o probando por su cuenta sin método pedagógico.',
        score: 0,
        badge: 'Autodidacta',
      },
      {
        id: 'q10_b',
        label: 'Entre el 15% y el 40% en sesiones informativas',
        description: 'Se han realizado webinars o charlas generales, pero sin talleres prácticos sobre sus archivos reales.',
        score: 45,
        badge: 'Teórico',
      },
      {
        id: 'q10_c',
        label: 'Más del 60% con itinerarios prácticos bonificados',
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
    visualChips: ['Sin Indicadores', 'Sensación Subjetiva', 'Horas Semanales', 'Auditoría ROI'],
    hint: 'Los comités de dirección que miden horas ahorradas por departamento consiguen una aprobación un 80% más rápida de nuevos presupuestos.',
    options: [
      {
        id: 'q11_a',
        label: 'No se mide de ninguna forma',
        description: 'No hay indicadores objetivos de ahorro de tiempo, reducción de costes ni productividad.',
        score: 0,
        badge: 'Sin Métricas',
      },
      {
        id: 'q11_b',
        label: 'Sensación cualitativa positiva no cuantificada',
        description: 'Se sabe que ayuda y que ahorra tiempo, pero no está recogido en ningún informe de gestión.',
        score: 40,
        badge: 'Cualitativo',
      },
      {
        id: 'q11_c',
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
    priorityAction: 'Establecer una política básica de uso y desplegar un entorno oficial seguro que sustituya el uso personal no controlado.',
  },
  {
    level: 2,
    name: 'Nivel 2 — Asistido Básico (Caso típico: Bloqueo Central)',
    scoreRange: [26, 50],
    color: '#f59e0b', // Amber
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    summary: 'Dispone de un entorno corporativo piloto o sandbox con acceso a chat básico y traducción, pero sus severas restricciones (sin análisis de datos real, sin conexión a archivos de negocio, sin agentes) impiden que los directivos y técnicos resuelvan problemas reales, acumulando una brecha de productividad de más del 30% frente a sus competidores.',
    germanMatrixNote: 'Mensaje clave para Alemania: El sandbox actual está infrautilizado porque no resuelve cuellos de botella de negocio. Se requiere autorizar entornos de análisis cuantitativo con Zero Data Retention.',
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
