import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '48px 0 24px 0',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Logo & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img
              src="/logos/formAI/1-removebg-preview.webp"
              alt="FormAI – Cursos Bonificados FUNDAE"
              width="160"
              height="56"
              loading="lazy"
              decoding="async"
              style={{ height: '56px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }}
            />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Formación Bonificada en Digitalización para Empresas. Llevamos más de una década impulsando la productividad de equipos en toda España a través de capacitación práctica y bonificable al 100%.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cursos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <a href="#cursos" className="footer-link">Excel para Empresas</a>
              <a href="#cursos" className="footer-link">Power BI Profesional</a>
              <a href="#cursos" className="footer-link">ChatGPT e Inteligencia Artificial</a>
              <a href="#cursos" className="footer-link">Copilot 365</a>
              <a href="#cursos" className="footer-link">Power Automate</a>
            </div>
          </div>

          {/* Legal / FUNDAE Disclosure */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FUNDAE</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>
              Las acciones formativas se bonifican a través del sistema de Formación Programada para Empresas (FUNDAE), regulado por la Ley 30/2015. Todos los trabajadores por cuenta ajena que coticen por Formación Profesional tienen derecho a la bonificación.
            </p>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <span>&copy; {currentYear} FormAI. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="footer-link">Política de Privacidad</a>
            <a href="#" className="footer-link">Aviso Legal</a>
            <a href="#" className="footer-link">Política de Cookies</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-primary);
        }
      `}</style>
    </footer>
  );
}
