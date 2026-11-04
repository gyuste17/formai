# HANDOFF — relevo entre agentes (Claude Code ⇄ Antigravity)

Entradas más recientes arriba. Formato: fecha · agente · rama · hecho / pendiente / decisiones.

---

## 2026-11-04 · Claude · `claude/auditoria-contenido`
**Hecho:** (1) El diseño de 2026-10-30 ya está en `main` y en producción (verificado por hash de bundle en formai.es). (2) Auditoría IA, contenido y UX: quitados los rótulos "Guía para Dirección y RRHH…" y "Clave estratégica…"; chips ahora "Ejemplos:" con ejemplos reales (sin versiones de modelos); opciones en mosaico 2×2 con icono Lucide por opción (`icon` en `aiMaturityData.js`); asistente en 2 columnas (texto | mosaico), ancho 1180 px, sin pastillas de dimensión/concepto, nº de pregunta + barra + % en una línea (cabe en 1440×820 sin scroll). Preguntas: 11 → 10 (eliminada q8 Shadow AI, solapaba con q1/q7; ahora 2 por dimensión); q10 arreglada (tramos 15–40 % y >60 % dejaban hueco); quitadas cifras sin fuente (80 %, 28 %, 30 %, 4 h/semana); q4 reformulada. Resultados: las 3 brechas ahora dependen de las respuestas (campo `gap` por pregunta), dictamen sin cifras inventadas, textos "matriz/Alemania" solo en versión Kömmerling (`generalNote` por nivel para la general).
**Preguntas:** viven en `src/data/aiMaturityData.js` (`AI_MATURITY_QUESTIONS`, dimensiones en `AI_MATURITY_DIMENSIONS`, niveles en `AI_MATURITY_LEVELS`).
**Verificado:** `npm run build` OK; sin scroll en las 10 preguntas a 1440×820; 375 px sin desbordes; consola limpia. **No verificado:** PDF real, Safari/Firefox, producción tras este cambio.
**Pendiente / decisión de Guillermo:** el benchmark ("Media sector UE 48", medias por dimensión, "420 empresas") no tiene fuente en el repo; si no es dato real conviene rotularlo "referencia orientativa FormAI" o quitarlo. Rama sin merge/push.

## 2026-10-30 · Claude · `claude/auditoria-diseno`
**Hecho:** creados `CLAUDE.md` (importa `GEMINI.md`, `AGENTS.md`, `HANDOFF.md`) y este `HANDOFF.md`; `.gitignore` excluye `.claude/settings.local.json`. Rediseño visual de la auditoría de madurez en IA (`#auditoria-ia`) en `src/components/AiMaturityAssessment.{css,jsx}`: rejilla de puntos + aurora, tipografía Outfit, tarjetas con filo degradado, bento 3+2 de dimensiones, botón con degradado, opciones accesibles (`role=radio`, teclado), progreso con `role=progressbar`, tarjeta de puntuación y dossier oscuros, radar con degradado y vértices, barras con degradado, `prefers-reduced-motion`, print A4 conservando fondos oscuros. Casi todo el estilo inline pasó a clases CSS.
**Verificado:** `npm run build` (vite + prerender) OK; sin desbordes horizontales a 375 px en intro, asistente y resultados; versiones general y `?empresa=profine` OK; sin errores de consola.
**Pendiente:** revisión visual del usuario; no probado el PDF real (Ctrl+P) ni Safari/Firefox (usa `background-clip:text`, `mask-image`, `text-wrap`; degradan bien). Rama sin push ni merge a `main`; no se ha desplegado en Vercel.
**Decisiones:** solo presentación; la lógica de puntuación y los textos de `aiMaturityData.js` no cambian. Lienzo claro con piezas oscuras focales (puntuación/dossier) en vez de tema oscuro total, para mantener "limpio" y un PDF legible.
