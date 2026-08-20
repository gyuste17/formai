import React from 'react';
import { Download, FileText, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, BookOpen } from 'lucide-react';

export default function CatalogSection({ onOpenCatalogModal }) {
  return (
    <section id="catalogo" className="section-padding" style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)'
    }}>
      {/* Decorative ambient gradient */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, var(--accent-primary-light) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        opacity: 0.6
      }} />

      <div className="container">
        <div className="glass-card" style={{
          padding: '48px',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top accent border */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-ai) 50%, #38bdf8 100%)'
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '48px',
            alignItems: 'center'
          }} className="catalog-section-grid">
            
            {/* Left Column: Text & CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'inline-flex' }}>
                <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} />
                  Actualizado para 2026
                </span>
              </div>

              <h2 style={{
                fontSize: 'calc(1.8rem + 0.8vw)',
                fontWeight: '800',
                lineHeight: 1.2
              }}>
                Descarga nuestro <span className="gradient-text">Catálogo Completo 2026</span>
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.6
              }}>
                Consulta todos los programas formativos bonificados para tu empresa en un único documento en PDF. Más de 50 itinerarios prácticos en Inteligencia Artificial, Business Intelligence, Ofimática, Gestión y Liderazgo.
              </p>

              {/* Highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                margin: '8px 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Formación 100% bonificable FUNDAE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Tarifas claras y modalidades</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Temarios adaptados a tu empresa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Gestión de bonificación a coste 0€</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '12px'
              }}>
                <button
                  onClick={onOpenCatalogModal}
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-ai) 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: 'var(--border-radius-md)',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="catalog-btn-cta"
                >
                  <Download size={20} />
                  Descargar Catálogo 2026 (PDF)
                </button>

                <a
                  href="#contacto"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '16px 28px',
                    borderRadius: 'var(--border-radius-md)',
                    fontWeight: '600',
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="btn-secondary"
                >
                  Solicitar Asesoramiento
                </a>
              </div>

            </div>

            {/* Right Column: Visual Catalog Booklet Card */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div 
                onClick={onOpenCatalogModal}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '340px',
                  background: 'linear-gradient(145deg, #07152b 0%, #0e3845 60%, #15798a 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 20px 35px -10px rgba(7, 21, 43, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  position: 'relative',
                  transform: 'perspective(1000px) rotateY(-4deg)',
                  transition: 'all var(--transition-normal)'
                }}
                className="catalog-booklet-card"
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}>
                    <BookOpen size={13} />
                    EDICIÓN 2026
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PDF &bull; 5 Páginas</span>
                </div>

                {/* Cover graphic */}
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    FormAI &bull; Catálogo Oficial
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2, marginTop: '4px' }}>
                    Cursos Especializados & Bonificados
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.4 }}>
                    Inteligencia Artificial, Power BI, Excel, Cloud 365, Soft Skills y Gestión.
                  </p>
                </div>

                {/* Mini topics chips */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '20px'
                }}>
                  {['ChatGPT & Copilot', 'Power BI & DAX', 'Excel Avanzado', '100% FUNDAE'].map((tag) => (
                    <span key={tag} style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: '600'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action bar */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '600' }}>Clic para descargar</span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#07152b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}>
                    <Download size={18} />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .catalog-btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .catalog-booklet-card:hover {
          transform: perspective(1000px) rotateY(0deg) translateY(-6px);
          box-shadow: 0 25px 40px -10px rgba(7, 21, 43, 0.5), 0 0 0 1px rgba(56, 189, 248, 0.4);
        }
        @media (max-width: 900px) {
          .catalog-section-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .glass-card {
            padding: 32px 24px !important;
          }
          .catalog-booklet-card {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
