import React, { useState, useEffect, useRef } from 'react';

const tools = [
  { name: 'Microsoft Excel',   file: 'Excel.png',             courseId: 'excel',          size: 52 },
  { name: 'Power BI',          file: 'Power BI.png',          courseId: 'powerbi',        size: 64 },
  { name: 'ChatGPT',           file: 'ChatGPT.png',           courseId: 'chatgpt',        size: 52 },
  { name: 'Microsoft Copilot', file: 'Copilot.png',           courseId: 'copilot',        size: 52 },
  { name: 'Power Automate',    file: 'Automate.png',          courseId: 'powerautomate',  size: 52 },
  { name: 'Looker Studio',     file: 'Google Data Studio.png',courseId: 'lookerstudio',   size: 52 },
  { name: 'Google Workspace',  file: 'GW.png',                courseId: 'googleworkspace',size: 64 },
  { name: 'Tableau',           file: 'Tableau.png',           courseId: 'tableau',        size: 52 },
  { name: 'Google Analytics',  file: 'GA4.png',               courseId: 'lookerstudio',   size: 64 },
  { name: 'Google Gemini',     file: 'Gemini.png',            courseId: 'googleworkspace',size: 52 },
];

// Mostramos 3 slots, cada uno rota independientemente
const SLOTS = 3;
const INTERVAL = 2000; // ms entre rotaciones

export default function ToolsRotator() {
  // Índices actuales mostrados en cada slot
  const [visible, setVisible] = useState([0, 3, 6]);
  // Qué slot está en transición (fade out/in)
  const [fading, setFading] = useState(null);
  const nextIndexRef = useRef(tools.length - 1); // siguiente herramienta a insertar
  const slotRef = useRef(0); // qué slot rota next

  useEffect(() => {
    const tick = () => {
      const slot = slotRef.current % SLOTS;
      slotRef.current++;
      // Siguiente índice (circular, sin repetir los ya visibles)
      setFading(slot);
      setTimeout(() => {
        setVisible(prev => {
          const used = new Set(prev.filter((_, i) => i !== slot));
          let next = (nextIndexRef.current + 1) % tools.length;
          while (used.has(next)) next = (next + 1) % tools.length;
          nextIndexRef.current = next;
          const newVis = [...prev];
          newVis[slot] = next;
          return newVis;
        });
        setFading(null);
      }, 1000);
    };

    const id = setInterval(tick, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}>
      {visible.map((toolIdx, slot) => {
        const tool = tools[toolIdx];
        const isFading = fading === slot;
        return (
          <a
            key={slot}
            href="#cursos"
            title={`Ver curso de ${tool.name}`}
            onClick={e => {
              e.preventDefault();
              document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              padding: '20px 28px',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              minWidth: '110px',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease',
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'translateY(12px) scale(0.9)' : 'translateY(0) scale(1)',
              boxShadow: 'var(--shadow-sm)',
            }}
            className="tool-rotator-item"
          >
            <img
              src={`/logos/herramientas/${tool.file}`}
              alt={tool.name}
              style={{
                width: `${tool.size}px`,
                height: `${tool.size}px`,
                objectFit: 'contain',
              }}
            />
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              color: 'var(--text-muted)',
              textAlign: 'center',
              lineHeight: 1.2,
              maxWidth: '90px',
            }}>
              {tool.name}
            </span>
          </a>
        );
      })}
      <style>{`
        .tool-rotator-item:hover {
          box-shadow: var(--shadow-md) !important;
          border-color: var(--accent-primary) !important;
          transform: translateY(-3px) scale(1.03) !important;
        }
      `}</style>
    </div>
  );
}
