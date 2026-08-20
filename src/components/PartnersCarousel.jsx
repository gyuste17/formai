import React from 'react';

const partners = [
  {
    name: 'FUNDAE',
    logo: '/logos/colaboradores/fundae-logo.webp',
    url: 'http://fundae.es/',
    description: 'Fundación Estatal para la Formación en el Empleo'
  },
  {
    name: 'Imagina Formación',
    logo: '/logos/colaboradores/imagina.webp',
    url: 'https://imaginaformacion.com/',
    description: 'Formación especializada en tecnología'
  },
  {
    name: 'Prologue Formación',
    logo: '/logos/colaboradores/logo_prologue_formacion.webp',
    url: 'https://www.prologueformacion.com/',
    description: 'Formación profesional bonificada'
  },
  {
    name: 'KeepCoding',
    logo: '/logos/colaboradores/keepcoding.webp',
    url: 'https://keepcoding.io/',
    description: 'Bootcamps y formación tecnológica'
  },
  {
    name: 'Formación MECOS',
    logo: '/logos/colaboradores/mecos.webp',
    url: 'https://www.serviciosmecos.com/',
    description: 'Formación bonificada y continua'
  },
  {
    name: 'Virensis',
    logo: '/logos/colaboradores/virensis.webp',
    url: 'https://www.virensis.com/',
    description: 'Formación y Consultoría'
  },
];

// Duplicamos para el efecto de scroll infinito continuo
const allPartners = [...partners, ...partners];

export default function PartnersCarousel({ theme }) {
  return (
    <section style={{
      padding: '48px 0',
      borderTop: theme === 'dark' ? '1px solid var(--border-color)' : '1px solid #e2e8f0',
      borderBottom: theme === 'dark' ? '1px solid var(--border-color)' : '1px solid #e2e8f0',
      overflow: 'hidden',
      background: theme === 'dark' ? 'var(--bg-secondary)' : '#ffffff',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container" style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: '800',
          color: theme === 'dark' ? 'var(--text-heading)' : '#2d3f5a',
          marginBottom: '6px'
        }}>
          Colaboradores <span className="gradient-text">&amp; Partners</span>
        </h3>
        <p style={{
          color: theme === 'dark' ? 'var(--text-muted)' : '#64748b',
          fontSize: '0.85rem',
          fontWeight: '500'
        }}>
          Entidades asociadas que confían en nuestro modelo de formación programada
        </p>
      </div>

      {/* Carrusel con máscara de fade en los bordes y animación CSS acelerada por hardware */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}>
        <div className="partners-track">
          {allPartners.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.description}
              aria-label={`Partner colaborador: ${partner.name}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: theme === 'dark' ? '12px 24px' : '6px 12px',
                borderRadius: theme === 'dark' ? 'var(--border-radius-sm)' : '0px',
                backgroundColor: theme === 'dark' ? '#ffffff' : 'transparent',
                boxShadow: theme === 'dark' ? 'var(--shadow-sm)' : 'none',
                flexShrink: 0,
                minWidth: '140px',
                height: '72px',
                opacity: theme === 'dark' ? 0.9 : 0.75,
                transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
              }}
              className="partner-card"
            >
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                width="130"
                height="48"
                loading="lazy"
                decoding="async"
                style={{
                  maxHeight: '48px',
                  maxWidth: '130px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'var(--partner-logo-filter, none)',
                  transition: 'filter 0.2s ease, opacity 0.2s ease',
                  opacity: 0.85,
                }}
                className="partner-logo"
              />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partnersMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partners-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: partnersMarquee 30s linear infinite;
          will-change: transform;
        }
        .partners-track:hover {
          animation-play-state: paused;
        }
        .partner-card:hover {
          opacity: 1 !important;
          ${theme === 'dark' ? 'transform: translateY(-2px); box-shadow: var(--shadow-md);' : ''}
        }
        .partner-card:hover .partner-logo {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}

