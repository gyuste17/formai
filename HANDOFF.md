# HANDOFF — relevo entre agentes (Claude Code ⇄ Antigravity)

Entradas más recientes arriba. Formato: fecha · agente · rama · hecho / pendiente / decisiones.

---

## 2026-10-30 · Claude · `claude/auditoria-diseno`
**Hecho:** creados `CLAUDE.md` (importa `GEMINI.md`, `AGENTS.md`, `HANDOFF.md`) y este `HANDOFF.md`; `.gitignore` excluye `.claude/settings.local.json`. Rediseño visual de la auditoría de madurez en IA (`#auditoria-ia`) en `src/components/AiMaturityAssessment.{css,jsx}`: rejilla de puntos + aurora, tipografía Outfit, tarjetas con filo degradado, bento 3+2 de dimensiones, botón con degradado, opciones accesibles (`role=radio`, teclado), progreso con `role=progressbar`, tarjeta de puntuación y dossier oscuros, radar con degradado y vértices, barras con degradado, `prefers-reduced-motion`, print A4 conservando fondos oscuros. Casi todo el estilo inline pasó a clases CSS.
**Verificado:** `npm run build` (vite + prerender) OK; sin desbordes horizontales a 375 px en intro, asistente y resultados; versiones general y `?empresa=profine` OK; sin errores de consola.
**Pendiente:** revisión visual del usuario; no probado el PDF real (Ctrl+P) ni Safari/Firefox (usa `background-clip:text`, `mask-image`, `text-wrap`; degradan bien). Rama sin push ni merge a `main`; no se ha desplegado en Vercel.
**Decisiones:** solo presentación; la lógica de puntuación y los textos de `aiMaturityData.js` no cambian. Lienzo claro con piezas oscuras focales (puntuación/dossier) en vez de tema oscuro total, para mantener "limpio" y un PDF legible.
