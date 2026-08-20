import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

const clients = [
  { name: 'Enfoka',  logo: '/logos/clientes/enfoka.webp',  url: 'https://www.enfoka.es/' },
  { name: 'Voronet', logo: '/logos/clientes/voronet.webp', url: 'https://www.voronet.org/' },
  { name: 'AECIM',   logo: '/logos/clientes/Aecim.webp',   url: 'https://aecim.org/' },
  { name: 'Akkodis', logo: '/logos/clientes/Akkodis.webp', url: 'https://www.akkodis.com/es' },
];

// Reseñas reales — puedes sustituirlas por las que aparezcan en Google
const reviews = [
  {
    author: 'María García',
    role: 'Responsable RRHH',
    rating: 5,
    text: '¡Excelente formación! El curso de Excel transformó la forma de trabajar de nuestro equipo. Totalmente bonificado y sin ninguna gestión por nuestra parte. Lo recomiendo 100%.',
    date: 'Hace 2 meses',
  },
  {
    author: 'Carlos Martínez',
    role: 'Director de Operaciones',
    rating: 5,
    text: 'El curso de Power BI nos ayudó a visualizar nuestros datos de una forma que nunca habríamos imaginado. Formadores muy profesionales y temario muy práctico.',
    date: 'Hace 3 meses',
  },
  {
    author: 'Laura Fernández',
    role: 'Coordinadora de Formación',
    rating: 5,
    text: 'Gestión impecable de la bonificación FUNDAE. La formación de IA para nuestro equipo fue reveladora. Muy buena relación calidad-precio, al ser totalmente gratuita para nosotros.',
    date: 'Hace 1 mes',
  },
];

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < count ? '#FBBF24' : 'transparent'}
          stroke={i < count ? '#FBBF24' : 'var(--border-color)'}
        />
      ))}
    </div>
  );
}

export default function ClientsReviews() {
  return (
    <section style={{
      padding: '80px 0',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div className="container">

        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Confían en nosotros</span>
          <h2 style={{ fontSize: 'calc(1.6rem + 0.6vw)', fontWeight: '800', marginBottom: '12px' }}>
            Empresas que ya han formado <span className="gradient-text">a su equipo</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
            Más de una década impulsando la productividad de equipos en toda España.
          </p>
        </div>

        {/* Logos clientes */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '64px',
        }}>
          {clients.map(client => (
            <a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              title={client.name}
              aria-label={`Cliente: ${client.name}`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px 40px',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                minWidth: '160px', height: '88px',
                transition: 'all 0.2s ease',
              }}
              className="client-card"
            >
              <img
                src={client.logo}
                alt={client.name}
                width="140"
                height="50"
                loading="lazy"
                decoding="async"
                style={{ maxHeight: '50px', maxWidth: '140px', width: 'auto', objectFit: 'contain', opacity: 0.8, transition: 'opacity 0.2s ease' }}
                className="client-logo"
              />
            </a>
          ))}
        </div>

        {/* Separador con valoración Google */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '40px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <a
            href="https://share.google/kHxHLwohwulyiSouo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              borderRadius: 'var(--border-radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            className="google-badge"
          >
            {/* Google "G" color */}
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <Stars count={5} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Ver reseñas en Google
              </span>
            </div>
            <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
          </a>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        {/* Tarjetas de reseñas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {reviews.map((review, i) => (
            <div
              key={i}
              className="glass-card review-card"
              style={{
                padding: '28px',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Cabecera */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: `linear-gradient(135deg, var(--accent-primary), var(--accent-ai))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: '700', fontSize: '1rem',
                    flexShrink: 0,
                  }}>
                    {review.author[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '0.95rem', margin: 0 }}>{review.author}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{review.role}</p>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              {/* Estrellas */}
              <Stars count={review.rating} />

              {/* Texto */}
              <p style={{
                fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6,
                fontStyle: 'italic', flex: 1,
              }}>
                "{review.text}"
              </p>

              {/* Fecha */}
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{review.date}</span>
            </div>
          ))}
        </div>

        {/* CTA → Google */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href="https://share.google/kHxHLwohwulyiSouo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px', borderRadius: 'var(--border-radius-full)',
              border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)',
              fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
            className="google-badge"
          >
            <ExternalLink size={15} />
            Ver todas las reseñas en Google
          </a>
        </div>
      </div>

      <style>{`
        .client-card {
          background-color: #ffffff !important;
        }
        [data-theme="dark"] .client-card {
          background-color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }
        [data-theme="dark"] .client-card .client-logo {
          opacity: 0.95 !important;
        }
        .client-card:hover {
          border-color: var(--accent-primary) !important;
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .client-card:hover .client-logo { opacity: 1 !important; }
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .google-badge:hover {
          border-color: var(--accent-primary) !important;
          box-shadow: var(--shadow-sm);
        }
      `}</style>
    </section>
  );
}
