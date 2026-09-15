# 🤖 Ecosistema Multi-Agente de FormAI en Antigravity

Este workspace cuenta con una arquitectura de **4 Subagentes Especializados** diseñados para potenciar el crecimiento, contenido, presencia en redes y optimización técnica de **FormAI**.

---

## 👥 Subagentes Disponibles

| Subagente | Rol | Responsabilidad Principal |
| :--- | :--- | :--- |
| **`formai_blog_writer`** | ✍️ Redactor Jefe del Blog | Investigación, redacción y maquetación de artículos técnicos sobre IA corporativa, Copilot, Excel y bonificaciones FUNDAE. |
| **`formai_linkedin_strategist`** | 📱 Estratega LinkedIn & Social | Planificación de calendarios semanales, creación de posts de alto impacto B2B, adaptación de contenidos a carruseles y tácticas de engagement. |
| **`formai_visual_designer`** | 🎨 Diseñador Visual & Arte | Creación de portadas para el blog (1200x630, 16:9), creatividades para LinkedIn (1:1 / 4:5), infografías y diagramas bajo la identidad de marca FormAI. |
| **`formai_seo_geo_auditor`** | 🔍 Auditor SEO, GEO & UX | Optimización técnica de la web, datos estructurados Schema.org, visibilidad en motores generativos de IA (Perplexity, ChatGPT Search, Gemini) y mejora de conversión (CRO). |

---

## 🚀 Flujos de Trabajo Típicos

### 1. Publicación de un nuevo artículo de Blog
1. **Paso 1 (`formai_blog_writer`):** Investiga y redacta el artículo en Markdown listo para el blog.
2. **Paso 2 (`formai_visual_designer`):** Genera la imagen de portada corporativa (16:9) y la guarda en `public/images/`.
3. **Paso 3 (`formai_seo_geo_auditor`):** Revisa y optimiza los metadatos, encabezados y schemas JSON-LD.
4. **Paso 4 (`formai_linkedin_strategist`):** Extrae 2-3 publicaciones derivadas para LinkedIn a partir del artículo.

### 2. Planificación Semanal de LinkedIn
* Invoca a **`formai_linkedin_strategist`** para generar el calendario de la semana con copys, ganchos y llamadas a la acción, coordinando con **`formai_visual_designer`** las creatividades de soporte.

### 3. Auditoría de Salud y Posicionamiento Web
* Invoca a **`formai_seo_geo_auditor`** para analizar el código de la web (`src/`), detectar oportunidades de mejora en la calculadora FUNDAE, sitemap o indexación y aplicar las mejoras directamente.

---

## 🎨 Identidad Visual y Tono de FormAI
- **Colores:** Fondos oscuros / neutros limpios con acentos en azul eléctrico, cian y morado sutil.
- **Tono:** Profesional, directo, didáctico, orientado a resultados empresariales y retorno de inversión (ROI) en formación bonificada.
- **Público objetivo:** Directores de Recursos Humanos, CEOs, Responsables de Formación y Talento, y profesionales en España.
