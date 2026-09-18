import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    roman: "I.",
    short: "Aprenden lo que hacen.",
    reveal: "Nuestros formadores trabajan activamente como consultores en empresas reales. No enseñan desde libros: enseñan desde el lunes por la mañana.",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)"
  },
  {
    roman: "II.",
    short: "Sin recetas de manual.",
    reveal: "Cada clase se adapta a los procesos reales de tu empresa. Los ejercicios son los tuyos, no los de una frutería ficticia.",
    bg: "linear-gradient(135deg, #15798a 0%, #0e5a67 100%)"
  },
  {
    roman: "III.",
    short: "La IA que funciona hoy.",
    reveal: "Los temarios cambian cada semana porque el sector cambia cada semana. Si hay una actualización de Copilot el martes, el jueves ya está en clase.",
    bg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
  },
  {
    roman: "IV.",
    short: "Red, no academia.",
    reveal: "Somos un colectivo de especialistas independientes. Eso nos permite asignarte el formador idóneo para tu sector, sin encajar el cliente en el hueco que sobra.",
    bg: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)"
  }
];

function PillarCard({ pillar, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'default',
        height: '280px',
        background: pillar.bg,
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 48px -12px rgba(0,0,0,0.5)'
          : '0 4px 16px -4px rgba(0,0,0,0.3)'
      }}
    >
      {/* Base state */}
      <div style={{
        position: 'absolute',
        inset: 0,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        opacity: hovered ? 0 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3rem',
          fontWeight: '800',
          color: 'rgba(255,255,255,0.18)',
          lineHeight: 1,
          marginBottom: '12px',
          letterSpacing: '-1px'
        }}>
          {pillar.roman}
        </span>
        <p style={{
          color: 'rgba(255,255,255,0.95)',
          fontSize: '1.15rem',
          fontWeight: '700',
          lineHeight: 1.35,
          margin: 0
        }}>
          {pillar.short}
        </p>
        <span style={{
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.45)',
          marginTop: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: '600'
        }}>
          Hover to reveal
        </span>
      </div>

      {/* Hover state */}
      <div style={{
        position: 'absolute',
        inset: 0,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease 0.05s',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(2px)',
        pointerEvents: 'none'
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: '800',
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1,
          marginBottom: '16px',
          letterSpacing: '-0.5px'
        }}>
          {pillar.roman}
        </span>
        <p style={{
          color: 'rgba(255,255,255,0.92)',
          fontSize: '0.975rem',
          lineHeight: 1.65,
          margin: 0,
          fontWeight: '400'
        }}>
          {pillar.reveal}
        </p>
      </div>
    </div>
  );
}

export default function SpecialistsNetwork() {
  const [counted, setCounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCounted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="especialistas"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Faint background lines (decorative) */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          opacity: 0.04,
          pointerEvents: 'none'
        }}
      >
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={`${i * 14}%`} y1="0"
            x2={`${i * 14 + 30}%`} y2="100%"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Top: editorial headline + one-liner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '16px',
          marginBottom: '60px',
          maxWidth: '780px'
        }} className="specialists-header-grid">
          <span style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent-primary)'
          }}>
            El modelo FormAI
          </span>

          <h2 style={{
            fontSize: 'calc(2rem + 1.2vw)',
            fontWeight: '800',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: 'var(--text-heading)',
            margin: 0
          }}>
            Especialistas que<br />
            <em style={{ fontStyle: 'italic', fontWeight: '800' }}>viven</em> lo que enseñan.
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '540px',
            borderLeft: '2px solid var(--accent-primary)',
            paddingLeft: '16px'
          }}>
            "Quien da clase el jueves, el martes estaba resolviendo el mismo problema en una empresa real. Eso no se improvisa."
          </p>
        </div>

        {/* Bento / Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '60px'
        }}>
          {pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Bottom: Stripe-style metrics strip + CTA */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }} className="metrics-strip">
          {[
            { value: "100%", label: "Profesionales en activo" },
            { value: "0%", label: "Teoría desactualizada" },
            { value: "4.9", label: "Satisfacción media en empresa" },
            { value: "+10", label: "Disciplinas tecnológicas" }
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'calc(1.8rem + 0.5vw)',
                fontWeight: '800',
                color: 'var(--text-heading)',
                letterSpacing: '-1px',
                lineHeight: 1,
                opacity: counted ? 1 : 0,
                transform: counted ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`
              }}>
                {m.value}
              </span>
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.35
              }}>
                {m.label}
              </span>
            </div>
          ))}

          <a
            href="#contacto"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              borderRadius: 'var(--border-radius-full)',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-ai) 100%)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '0.9rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              justifySelf: 'start'
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Hablemos de tu formación
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .specialists-header-grid {
            grid-template-columns: auto 1fr !important;
            grid-template-rows: auto auto !important;
          }
          .specialists-header-grid > span {
            grid-column: 1 / -1;
          }
          .specialists-header-grid > h2 {
            grid-column: 1;
          }
          .specialists-header-grid > p {
            grid-column: 2;
            align-self: end;
          }
        }
        @media (max-width: 640px) {
          .metrics-strip {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
