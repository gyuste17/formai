import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Calculator } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenCatalogModal }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-card" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      transition: 'all var(--transition-normal)'
    }}>
      <div className="container navbar-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center' }} aria-label="FormAI - Inicio">
          <img
            src={theme === 'dark'
              ? '/logos/formAI/3-removebg-preview.png'
              : '/logos/formAI/1-removebg-preview.png'}
            alt="FormAI"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="navbar-logo"
            style={{ width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-menu">
          <a href="#cursos" className="nav-link">Cursos</a>
          <a 
            href="#catalogo" 
            className="nav-link" 
            onClick={(e) => {
              if (onOpenCatalogModal) {
                e.preventDefault();
                onOpenCatalogModal();
              }
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Catálogo 2026</span>
            <span style={{ fontSize: '0.68rem', backgroundColor: 'var(--accent-primary-light)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: '10px', fontWeight: '700' }}>PDF</span>
          </a>
          <a href="#como-funciona" className="nav-link">¿Cómo funciona?</a>
          <a href="#calculadora" className="nav-link">Calcular Crédito</a>
          <a href="#contacto" className="nav-link">Contacto</a>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} aria-label="Cambiar modo claro / oscuro" style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color var(--transition-fast)'
          }}
          className="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* CTA */}
          <a href="#calculadora" style={{
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-ai) 100%)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: 'var(--border-radius-full)',
            fontWeight: '600',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
          }}
          className="cta-btn"
          >
            <Calculator size={16} />
            Calcular Crédito
          </a>
        </div>

        {/* Mobile Toggle & Theme Toggle */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="mobile-toggle-area">
          <button onClick={toggleTheme} aria-label="Cambiar modo claro / oscuro" style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center'
          }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Abrir menú de navegación" 
            aria-expanded={isOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
            className="hamburger-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="glass-card animate-fade-in mobile-menu-panel" style={{
          position: 'absolute',
          top: '76px',
          left: 0,
          right: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: '1px solid var(--border-color)',
          borderRadius: 0,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 99
        }}>
          <a href="#cursos" onClick={() => setIsOpen(false)} style={{ fontWeight: '500' }}>Cursos</a>
          <a 
            href="#catalogo" 
            onClick={(e) => {
              setIsOpen(false);
              if (onOpenCatalogModal) {
                e.preventDefault();
                onOpenCatalogModal();
              }
            }} 
            style={{ fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>Catálogo 2026</span>
            <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--accent-primary-light)', color: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>PDF</span>
          </a>
          <a href="#como-funciona" onClick={() => setIsOpen(false)} style={{ fontWeight: '500' }}>¿Cómo funciona?</a>
          <a href="#calculadora" onClick={() => setIsOpen(false)} style={{ fontWeight: '500' }}>Calcular Crédito</a>
          <a href="#contacto" onClick={() => setIsOpen(false)} style={{ fontWeight: '500' }}>Contacto</a>
          <a href="#calculadora" onClick={() => setIsOpen(false)} style={{
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-ai) 100%)',
            color: '#ffffff',
            padding: '12px',
            borderRadius: 'var(--border-radius-sm)',
            fontWeight: '600',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Calculator size={18} />
            Calcular Crédito
          </a>
        </div>
      )}

      {/* Add CSS injection for desktop menu responsiveness in styles */}
      <style>{`
        .navbar-container {
          height: 76px;
        }
        .navbar-logo {
          height: 58px;
          transition: height var(--transition-fast);
        }
        @media (max-width: 768px) {
          .navbar-container {
            height: 64px !important;
          }
          .navbar-logo {
            height: 44px !important;
          }
          .mobile-menu-panel {
            top: 64px !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle-area { display: none !important; }
        }
        .nav-link:hover {
          color: var(--accent-primary);
        }
        .theme-toggle-btn:hover {
          background-color: var(--bg-tertiary) !important;
        }
        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </nav>
  );
}
