# FormAI - Plataforma de Formación Bonificada con IA

Solución integral para maximizar el aprovechamiento del crédito FUNDAE de las empresas en España mediante itinerarios formativos en Inteligencia Artificial y herramientas corporativas.

## Stack Tecnológico y Entorno

- **Frontend:** React 18, Vite 5, Tailwind CSS, Lucide React
- **Backend / Automatizaciones:** Google Apps Script (`.clasp.json`, `google-apps-script/`), integraciones webhook y CRM
- **Repositorio Git:** [https://github.com/gyuste17/formai.git](https://github.com/gyuste17/formai.git) (Rama: `main`)

---

## Comandos Principales

```bash
# Servidor de desarrollo
npm run dev

# Compilación de producción
npm run build

# Despliegue de scripts en Google Apps Script
npm run push:gas

# Verificación de salud (Habilidad Antigravity)
# /health-check
```

---

## Ecosistema de Subagentes Especializados

Este proyecto cuenta con 4 agentes especializados (ver detalle en [AGENTS.md](file:///AGENTS.md)):
1. **`formai_blog_writer`:** Redactor de artículos técnicos y guías FUNDAE.
2. **`formai_linkedin_strategist`:** Planificación semanal y copys para LinkedIn B2B.
3. **`formai_visual_designer`:** Diseño de creatividades, infografías y portadas de blog.
4. **`formai_seo_geo_auditor`:** Optimización para motores generativos (GEO) y SEO técnico.

---

## Reglas y Habilidades

- **[.agents/rules/coding-style.md](file:///.agents/rules/coding-style.md):** Convenciones de React, Vite y Apps Script.
- **[.agents/rules/design-standards.md](file:///.agents/rules/design-standards.md):** Pautas de diseño corporativo y tonos de marca.
- **[.agents/skills/health-check/SKILL.md](file:///.agents/skills/health-check/SKILL.md):** Verificación de build y enlaces (`/health-check`).

---

## Protocolo de Notificaciones

```bash
python "../Antigravity-Master/scripts/send_alert.py" --project "formai" --status "SUCCESS" --summary "<Resumen conciso>"
```

---

## 🎨 Generación de Imágenes (OpenAI)

**OBLIGATORIO:** Para generar cualquier imagen (logos, banners, assets, mockups), usar SIEMPRE el script centralizado de Antigravity-Master:

```bash
python "C:\Users\gyust\GY Antigravity\Antigravity-Master\scripts\generate_dalle_image.py" --prompt "<descripción>" --output "<ruta/local/destino.png>" --tier draft|standard|premium
```

| Tier | Coste | Uso |
|:-----|:------|:----|
| `draft` | ~$0.006 | Pruebas, borradores, iteraciones |
| `standard` | ~$0.013 | Assets para webs (DEFAULT) |
| `premium` | ~$0.05 | Producción final |

- **NO intentar llamar a la API de OpenAI directamente desde scripts propios.**
- **NO usar modelos obsoletos como `dall-e-3` o `dall-e-2`** (ya no existen). Los modelos actuales son `gpt-image-1`, `gpt-image-2.5-flare`, `gpt-image-2.5-sunburst`.
- La clave API se gestiona de forma segura desde `Antigravity-Master/config/openai.json`.
- Para previsualizar coste sin gastar: añadir `--dry-run`.

---

## 📋 Gestión FUNDAE y Partners Operativos

- **Entidad Organizadora Homologada:** **Full Equipe S.L.** (Acreditada ante el SEPE / FUNDAE).
- **Contacto Clave FUNDAE / Mecos:** **Toñi Blázquez** (`tblazquez@serviciosmecos.com`) en **Mecos Formación**, responsable operativa de la tramitación y gestión de grupos con Full Equipe.
- **Flujo de Puesta en Marcha:** Cuando un cliente confirma una formación, se le remiten y posteriormente se envían a Toñi los 3 documentos oficiales:
  1. **Encomienda de Gestión:** Documento de adhesión firmado digitalmente por el representante legal del cliente.
  2. **Ficha Técnica:** Datos del curso (temario, fechas, horarios, formador y datos fiscales de la empresa).
  3. **Listado de Participantes:** Plantilla Excel con los datos de los alumnos (nombre, apellidos, NIF/NIE, régimen SS).

---

## 💰 Facturación y Cuentas Freelance (#FOR)

Este proyecto está vinculado a la hoja maestra oficial de contabilidad freelance:
- **Hoja Maestra:** [Freelance - Cuentas (Ingresos)](https://docs.google.com/spreadsheets/d/16IIl9BUP0rINQiDvmFX_qlpilf_Mq2YsAsKGE8qfOnA/edit?gid=720435967)
- **Gestor Seguro:** `C:\Users\gyust\GY Antigravity\Antigravity-Master\scripts\billing_client.py`
- **Configuración Fiscal de FormAI:**
  - **Originante:** `FormAI`
  - **Prefijo Factura:** `#FOR`
  - **Tipo de Servicio:** `Formación` (exenta de IVA) o `Consultoría` (IVA 21%)
  - **Retención IRPF:** `Si` (15%)
  - **IVA:** `No` (formación exenta por defecto) o `Si` según concepto
  - **Cuenta de Cobro:** `BBVA`
- **Regla de Oro:** Todo cambio se ejecuta de forma precisa, registrada en auditoría y 100% revertible (con snapshot previo automático).

---

## 📥 Protocolo Automatizado: "Gestiona el nuevo lead"

Cuando el usuario pida gestionar un nuevo lead recibido por email (o indique *"Gestiona el nuevo lead"*), ejecutar siempre el siguiente flujo de 4 pasos de forma autónoma:

1. **Lectura e Identificación:**
   - Buscar el correo entrante en Gmail (`gmail_client.py` o IMAP).
   - Extraer remitente, empresa, cargo, teléfono, temática solicitada, número de participantes, modalidad y plazos.
2. **Evaluación de Cualificación:**
   - Analizar si es B2B cualificado, semi-cualificado (intermediario/consultora de RRHH) o particular no bonificable.
   - Detectar puntos de fricción o datos faltantes (grupos < 7-8 alumnos, requerimiento presencial vs aula virtual, crédito FUNDAE disponible).
3. **Redacción de Borrador en Gmail:**
   - Crear borrador vinculado al hilo mediante `In-Reply-To` y `References`.
   - Formato corporativo FormAI: `verdana, sans-serif`, color `#073763`, párrafos cortos (1-3 líneas), viñetas limpias y cierre propositivo (llamada ágil de 10-15 min).
   - Firma oficial completa de FormAI con logotipo e imagen corporativa.
4. **Registro en Google Sheets y Panel CRM (`formai.es/#admin`):**
   - Insertar o actualizar el lead vía endpoint backend (`createLead` / `CRM.gs`) con datos de contacto, requerimientos y estado inicial (`Nuevo`), asegurando que no se generen duplicados.



