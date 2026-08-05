export const coursesData = [
  {
    id: "excel",
    title: "Excel para Empresas",
    category: "Hojas de Cálculo y Datos",
    languages: ["ES", "EN"],
    duration: 20,
    level: "Todos los niveles (De Básico a Avanzado)",
    shortDescription: "Domina fórmulas avanzadas, tablas dinámicas, automatización de tareas y análisis predictivo para multiplicar tu productividad diaria.",
    description: "Una formación práctica y aplicada directamente a la casuística de tu negocio. Olvídate de la teoría inútil y aprende a manejar las herramientas que resuelven problemas reales en tiempo récord, desde funciones básicas hasta lógica condicional, gráficos dinámicos y nociones de macros.",
    tools: ["Microsoft Excel", "Power Query"],
    iconName: "FileSpreadsheet",
    modules: [
      {
        title: "Módulo 1: Fundamentos y Fórmulas Esenciales",
        topics: [
          "Interfaz de Excel y atajos de teclado clave para ahorrar tiempo.",
          "Referencias absolutas, relativas y mixtas.",
          "Funciones lógicas (SI, Y, O, SI.ERROR) y de búsqueda (BUSCARV, BUSCARX, COINCIDIR)."
        ]
      },
      {
        title: "Módulo 2: Gestión y Depuración de Datos",
        topics: [
          "Validación de datos y formatos condicionales inteligentes.",
          "Filtrado, ordenamiento avanzado y eliminación de duplicados.",
          "Introducción a Power Query para la limpieza automatizada de tablas."
        ]
      },
      {
        title: "Módulo 3: Análisis Visual y Reportes Dinámicos",
        topics: [
          "Creación y configuración de Tablas Dinámicas complejas.",
          "Segmentación de datos y escalas de tiempo para dashboards interactivos.",
          "Gráficos recomendados, gráficos combinados y buenas prácticas de diseño de reportes."
        ]
      },
      {
        title: "Módulo 4: Automatización y Macros (Opcional)",
        topics: [
          "Introducción a la grabadora de macros.",
          "Creación de botones interactivos para ejecutar tareas repetitivas.",
          "Mantenimiento básico de macros y guardado de archivos habilitados para macros."
        ]
      }
    ]
  },
  {
    id: "powerbi",
    title: "Power BI Profesional",
    category: "Business Intelligence",
    languages: ["ES", "EN"],
    duration: 25,
    level: "Iniciación a Intermedio",
    shortDescription: "Aprende a conectar múltiples fuentes de datos, modelar información con DAX y diseñar cuadros de mando interactivos que faciliten la toma de decisiones.",
    description: "Convierte filas infinitas de Excel y bases de datos dispersas en informes visuales e interactivos accesibles para todo tu equipo. Este curso abarca desde la extracción y transformación de datos hasta la publicación de informes en la nube.",
    tools: ["Power BI Desktop", "Power Query", "DAX", "Power BI Service"],
    iconName: "BarChart3",
    modules: [
      {
        title: "Módulo 1: Conexión y Limpieza de Datos (ETL)",
        topics: [
          "Conexión a orígenes de datos: Excel, PDFs, SQL, y Web.",
          "Uso de Power Query Editor: pivotar columnas, combinar consultas, añadir columnas condicionales.",
          "Estructura óptima de tablas (modelo en estrella: tablas de hechos y dimensiones)."
        ]
      },
      {
        title: "Módulo 2: Modelado de Datos y Relaciones",
        topics: [
          "Configuración de relaciones entre tablas (uno a muchos, dirección de filtrado).",
          "Concepto de cardinalidad y dirección de filtro cruzado.",
          "Creación de una tabla de calendario estándar."
        ]
      },
      {
        title: "Módulo 3: Introducción al Lenguaje DAX",
        topics: [
          "Diferencia entre Columnas Calculadas y Medidas.",
          "Funciones DAX esenciales: SUM, AVERAGE, COUNT, DIVIDE.",
          "Funciones de inteligencia de tiempo: CALCULATE, RELATED, SAMEPERIODLASTYEAR."
        ]
      },
      {
        title: "Módulo 4: Visualización y Reportes de Impacto",
        topics: [
          "Diseño de layouts interactivos y limpios para negocio.",
          "Visuales clave: Tarjetas, KPI, Gráficos de barras, Matrices y Mapas.",
          "Configuración de filtros de página, filtros cruzados y botones de navegación."
        ]
      }
    ]
  },
  {
    id: "chatgpt",
    title: "ChatGPT e Inteligencia Artificial",
    category: "Inteligencia Artificial y Productividad",
    languages: ["ES"],
    duration: 12,
    level: "Todos los niveles",
    shortDescription: "Aprende ingeniería de prompts avanzados, automatizaciones y cómo aplicar herramientas de IA generativa para optimizar la redacción, análisis y estrategia en tu puesto.",
    description: "Descubre cómo integrar la IA en tus tareas diarias para ahorrar hasta un 40% de tiempo. Aprende a redactar prompts infalibles, estructurar consultas de negocio, analizar archivos pesados de datos y automatizar la generación de contenidos con IA.",
    tools: ["ChatGPT", "Claude", "OpenAI GPTs", "Midjourney"],
    iconName: "Sparkles",
    modules: [
      {
        title: "Módulo 1: Introducción a la IA Generativa e Ingeniería de Prompts",
        topics: [
          "Cómo piensan los Modelos de Lenguaje (LLMs) y qué es un 'Prompt'.",
          "Técnicas de prompting: Zero-shot, Few-shot y Chain of Thought.",
          "Estructura del prompt perfecto: Contexto, Rol, Tarea, Formato y Restricciones."
        ]
      },
      {
        title: "Módulo 2: Aplicaciones Prácticas en el Entorno Laboral",
        topics: [
          "Redacción, traducción y síntesis de correos, contratos y reportes corporativos.",
          "Brainstorming estratégico y preparación de reuniones de negocio.",
          "Creación de GPTs personalizados entrenados con los documentos de tu empresa."
        ]
      },
      {
        title: "Módulo 3: Análisis Avanzado de Datos y Archivos",
        topics: [
          "Uso de ChatGPT Advanced Data Analysis para cargar Excel, CSV o PDFs.",
          "Generación automática de resúmenes, detección de tendencias y gráficos explicativos.",
          "Tratamiento de información confidencial y políticas de seguridad y privacidad."
        ]
      }
    ]
  },
  {
    id: "copilot",
    title: "Copilot 365",
    category: "Inteligencia Artificial y Productividad",
    languages: ["ES"],
    duration: 15,
    level: "Iniciación a Intermedio",
    shortDescription: "Domina el copiloto oficial de Microsoft para automatizar la redacción de correos en Outlook, resumir reuniones en Teams y crear presentaciones en PowerPoint.",
    description: "Saca el máximo partido a la licencia corporativa de Microsoft 365. En este curso práctico verás cómo Copilot interactúa de forma nativa con Word, Excel, Teams, Outlook y PowerPoint para agilizar el flujo de trabajo de toda la organización.",
    tools: ["Microsoft Copilot", "Microsoft 365 (Word, Excel, PPT, Teams, Outlook)"],
    iconName: "Bot",
    modules: [
      {
        title: "Módulo 1: Copilot en Outlook y Teams",
        topics: [
          "Redacción rápida de emails profesionales y resúmenes de hilos de conversación largos.",
          "Generación de actas, resúmenes de puntos clave y tareas pendientes en reuniones de Teams en tiempo real.",
          "Búsqueda inteligente de información histórica en tus chats y correos."
        ]
      },
      {
        title: "Módulo 2: Copilot en Word y PowerPoint",
        topics: [
          "Creación de borradores completos a partir de notas o documentos breves.",
          "Dar formato automático, reescribir secciones y ajustar el tono de los textos.",
          "Generación de presentaciones profesionales de PowerPoint desde un documento de Word en segundos."
        ]
      },
      {
        title: "Módulo 3: Copilot en Excel y Privacidad Corporativa",
        topics: [
          "Análisis rápido de tablas, formato condicional y creación de columnas de fórmulas asistidas.",
          "Cómo funciona la seguridad de los datos empresariales en Microsoft Copilot.",
          "Límites de Copilot y cómo evitar alucinaciones en el análisis de datos."
        ]
      }
    ]
  },
  {
    id: "powerautomate",
    title: "Power Automate",
    category: "Automatización",
    languages: ["ES"],
    duration: 16,
    level: "Iniciación a Intermedio",
    shortDescription: "Elimina tareas manuales y repetitivas conectando tus aplicaciones diarias (Outlook, Teams, SharePoint, Forms) mediante flujos automáticos sin saber programar.",
    description: "Ahorra horas de trabajo rutinario. Aprende a crear flujos que envíen notificaciones automáticas ante nuevos correos, guarden archivos adjuntos en carpetas de la nube, consoliden formularios en Excel y coordinen aprobaciones sin intervención humana.",
    tools: ["Power Automate Cloud", "Microsoft Forms", "SharePoint", "OneDrive"],
    iconName: "RefreshCw",
    modules: [
      {
        title: "Módulo 1: Fundamentos de la Automatización y Flujos en la Nube",
        topics: [
          "Concepto de desencadenadores (triggers), acciones y conectores.",
          "Creación de flujos automatizados desde plantillas estándar.",
          "Variables y expresiones básicas para manipular datos."
        ]
      },
      {
        title: "Módulo 2: Casos Prácticos en Oficina",
        topics: [
          "Guardado automático de adjuntos de Outlook en OneDrive/SharePoint.",
          "Creación de un sistema de aprobaciones automáticas vía Teams y Correo.",
          "Envío de encuestas con Microsoft Forms y registro automático de respuestas en un Excel compartido."
        ]
      },
      {
        title: "Módulo 3: Monitorización y Gestión de Errores",
        topics: [
          "Historial de ejecuciones y cómo depurar fallos en los flujos.",
          "Condiciones y bucles avanzados en Power Automate.",
          "Buenas prácticas de seguridad y orden al estructurar automatizaciones organizacionales."
        ]
      }
    ]
  },
  {
    id: "lookerstudio",
    title: "Looker Studio (Google Data Studio)",
    category: "Business Intelligence",
    languages: ["ES", "EN"],
    duration: 16,
    level: "Iniciación a Intermedio",
    shortDescription: "Crea paneles interactivos conectados a Google Analytics, Google Sheets o bases de datos de forma rápida, visual y completamente gratuita.",
    description: "La herramienta perfecta para equipos de marketing y ventas que necesitan visualizar métricas web, campañas de publicidad o bases de datos sencillas. Aprende a consolidar datos y compartirlos de manera interactiva en la nube.",
    tools: ["Looker Studio", "Google Sheets", "Google Analytics", "Google Ads"],
    iconName: "PieChart",
    modules: [
      {
        title: "Módulo 1: Conexión y Fuentes de Datos",
        topics: [
          "Conexión de orígenes: Google Sheets, BigQuery, Analytics y conectores de pago.",
          "Configuración y tipado de campos (métricas vs dimensiones).",
          "Actualización automática de los datos en el informe."
        ]
      },
      {
        title: "Módulo 2: Diseño de Gráficos y Tablas Dinámicas",
        topics: [
          "Creación de tablas de datos, tarjetas de resultados y gráficos de líneas/barras.",
          "Implementación de controles: filtros de fecha, selectores de categoría y buscadores.",
          "Fusión de datos (Data Blending) para combinar dos fuentes en una sola visualización."
        ]
      },
      {
        title: "Módulo 3: Distribución del Reporte y Colaboración",
        topics: [
          "Diseño interactivo con paletas corporativas y logos.",
          "Compartir accesos mediante enlaces o correos automáticos programados.",
          "Inserción del reporte (embed) en intranets o webs corporativas."
        ]
      }
    ]
  },
  {
    id: "googleworkspace",
    title: "Google Workspace Eficiente",
    category: "Inteligencia Artificial y Productividad",
    languages: ["ES"],
    duration: 12,
    level: "Todos los niveles",
    shortDescription: "Saca el máximo partido al ecosistema de Google (Sheets, Docs, Slides, Gmail, Drive y Gemini) para mejorar la colaboración en tiempo real de tu equipo.",
    description: "Aprende a trabajar de forma verdaderamente colaborativa y síncrona. Además, exploraremos cómo la Inteligencia Artificial integrada (Google Gemini) te asiste en la redacción, formulación en hojas de cálculo y automatización de procesos internos.",
    tools: ["Google Sheets", "Google Docs", "Google Drive", "Google Gemini"],
    iconName: "Grid",
    modules: [
      {
        title: "Módulo 1: Hojas de Cálculo Colaborativas (Google Sheets)",
        topics: [
          "Diferencias clave con Excel y funciones nativas colaborativas (IMPORTRANGE, QUERY).",
          "Historial de versiones, comentarios, asignación de tareas y filtros con vistas de filtro.",
          "Formularios de Google vinculados para recopilación de datos ágil."
        ]
      },
      {
        title: "Módulo 2: Colaboración en la Nube y Gemini integrado",
        topics: [
          "Gestión avanzada de permisos en Google Drive y carpetas compartidas.",
          "Uso de Gemini en Docs y Gmail para la redacción instantánea de correos o informes.",
          "Uso de Gemini en Sheets para ordenar datos y generar ideas."
        ]
      }
    ]
  },
  {
    id: "tableau",
    title: "Tableau Avanzado para Empresas",
    category: "Business Intelligence",
    languages: ["ES"],
    duration: 24,
    level: "Iniciación a Avanzado",
    shortDescription: "Descubre el potencial analítico de Tableau para crear visualizaciones complejas, análisis de tendencias avanzados y dashboards de alto rendimiento empresarial.",
    description: "Para empresas que necesitan ir un paso más allá en su analítica de datos. Domina los campos calculados, los conjuntos de datos, los parámetros y los dashboards interactivos y fluidos con Tableau Desktop.",
    tools: ["Tableau Desktop", "Tableau Prep", "Tableau Cloud"],
    iconName: "AreaChart",
    modules: [
      {
        title: "Módulo 1: Conexión de Datos y Limpieza con Tableau Prep",
        topics: [
          "Introducción al espacio de trabajo de Tableau y arquitectura del software.",
          "Uniones, combinaciones y relaciones lógicas de datos.",
          "Uso de Tableau Prep para limpiar y dar formato a flujos complejos."
        ]
      },
      {
        title: "Módulo 2: Cálculos Avanzados y LOD (Level of Detail)",
        topics: [
          "Fórmulas personalizadas y cálculos de tabla rápidos.",
          "Introducción a las expresiones LOD (FIXED, INCLUDE, EXCLUDE) para análisis complejos.",
          "Uso de parámetros para hacer informes interactivos y adaptables por el usuario."
        ]
      },
      {
        title: "Módulo 3: Creación de Storytelling Visual",
        topics: [
          "Diseño de dashboards fluidos, mapas personalizados y diagramas analíticos.",
          "Formatos, tooltips interactivos y acciones de filtro avanzadas.",
          "Creación de 'Historias' en Tableau para presentaciones eficaces a directivos."
        ]
      }
    ]
  }
];
