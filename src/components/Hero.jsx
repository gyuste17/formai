import React from 'react';
import { Award, ArrowRight, ShieldCheck, Zap, Download } from 'lucide-react';
import ToolsRotator from './ToolsRotator';

export default function Hero({ onOpenCatalogModal }) {
  return (
    <section className="hero-section" style={{
      background: 'radial-gradient(circle at 80% 20%, var(--accent-primary-light) 0%, transparent 50%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Imágenes de fondo sutiles con cross-fade animado en la zona izquierda */}
      <div className="hero-ambient-container" aria-hidden="true">
        <div className="hero-ambient-img hero-ambient-img-1" />
        <div className="hero-ambient-img hero-ambient-img-2" />
        <div className="hero-ambient-img hero-ambient-img-3" />
      </div>

      <div className="container hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '48px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Text Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-flex' }}>
            <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} />
              Formación Bonificada 100% FUNDAE
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'calc(2.2rem + 1.5vw)',
            fontWeight: '800',
            lineHeight: 1.15,
            letterSpacing: '-0.03em'
          }}>
            Formaciones prácticas que <span className="gradient-text">transforman</span> tu equipo
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            lineHeight: 1.6
          }}>
            Aprovecha el crédito formativo anual de tu empresa. Cursos avanzados y prácticos de <strong>Excel, Power BI, Inteligencia Artificial (ChatGPT/Copilot)</strong> y automatización sin coste para tu negocio.
          </p>

          {/* Benefits Bullet Points */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Gestión integral de la bonificación ante FUNDAE (Cero burocracia)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Temarios adaptados a las necesidades reales de tu plantilla</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Clases online en directo, presenciales o autoguiadas</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            marginTop: '16px',
            alignItems: 'center'
          }}>
            <a href="#cursos" style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              padding: '16px 28px',
              borderRadius: 'var(--border-radius-md)',
              fontWeight: '600',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-md)',
              transition: 'all var(--transition-fast)'
            }}
            className="btn-primary"
            >
              Ver Cursos
              <ArrowRight size={18} />
            </a>
            
            <a href="#calculadora" style={{
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
              Calcular Bonificación
            </a>

            <button
              type="button"
              onClick={onOpenCatalogModal}
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '16px 24px',
                borderRadius: 'var(--border-radius-md)',
                fontWeight: '600',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-catalog-trigger"
            >
              <Download size={18} style={{ color: 'var(--accent-primary)' }} />
              Descargar Catálogo 2026
            </button>
          </div>
        </div>

        {/* Visual Graphic Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Main Visual glass-card */}
          <div className="glass-card animate-fade-in animate-float" style={{
            padding: '36px',
            width: '100%',
            maxWidth: '480px',
            position: 'relative',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: 'var(--shadow-xl)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Crédito Anual de Formación</span>
                <Award style={{ color: 'var(--accent-ai)' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', lineHeight: 1 }}>
                  100%
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>Bonificable por la Seguridad Social</span>
              </div>

              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, var(--border-color) 0%, transparent 100%)'
              }} />

              {/* Mini Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>0 €</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Costo real para la empresa</p>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>+10 años</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>De experiencia docente</p>
                </div>
              </div>

              {/* Decorative graphic bar */}
              <div style={{
                background: 'var(--bg-tertiary)',
                height: '8px',
                borderRadius: 'var(--border-radius-full)',
                overflow: 'hidden',
                display: 'flex'
              }}>
                <div style={{ width: '60%', background: 'var(--accent-primary)', height: '100%' }} />
                <div style={{ width: '40%', background: 'var(--accent-ai)', height: '100%' }} />
              </div>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                *Todas las empresas con al menos 1 asalariado disponen de crédito formativo.
              </p>
            </div>
          </div>

          {/* Herramientas animadas (debajo de la pastilla de crédito) */}
          <div style={{ width: '100%', maxWidth: '480px', zIndex: 2, minHeight: '136px' }}>
            <ToolsRotator />
          </div>

          {/* Decorative floating background elements */}
          <div style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-primary-light) 0%, var(--accent-ai-light) 100%)',
            zIndex: 1,
            top: '-20px',
            right: '-20px',
            filter: 'blur(40px)',
            opacity: 0.6
          }} />
        </div>

      </div>

      <style>{`
        .hero-section {
          padding: 80px 0;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 24px 0 48px 0 !important;
          }
        }
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
            gap: 64px !important;
          }
        }
        .btn-primary:hover {
          background-color: var(--accent-primary-hover) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .btn-secondary:hover {
          background-color: var(--bg-tertiary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </section>
  );
}
