@GEMINI.md
@AGENTS.md
@HANDOFF.md

# Específico de Claude Code
- Coordinación con Antigravity: ver `HANDOFF.md`. Rama propia `claude/<tarea>`; Antigravity usa `gemini/<tarea>`.
- Al terminar una tarea, añadir entrada al principio de `HANDOFF.md`.
- No leer `.env`; la auditoría de IA vive en `src/components/AiMaturityAssessment.{jsx,css}` y `src/data/aiMaturityData.js`.
- Veracidad de datos: seguir la sección "Veracidad de datos y fuentes" de `AGENTS.md` (nunca cifras sin fuente verificada y enlazada).
