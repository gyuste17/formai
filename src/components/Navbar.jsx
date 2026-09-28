import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Calculator, BookOpen } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenCatalogModal, isBlogActive }) {
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
        <a href="#" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }} aria-label="FormAI - Inicio">
          <img
            src={theme === 'dark'
              ? '/logos/formAI/3-removebg-preview-trimmed.webp'
              : '/logos/formAI/1-removebg-preview-trimmed.webp'}
            alt="FormAI"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="navbar-logo"
            style={{ width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-menu">
          <a href="#" className="nav-link">Inicio</a>
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
          {/* Dropdown: ¿Cómo funciona? + Especialistas */}
          <div style={{ position: 'relative' }} className="nav-dropdown-wrapper">
            <button
              className="nav-link nav-dropdown-trigger"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                font: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'inherit'
              }}
            >
              ¿Cómo funciona?
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5, marginTop: '1px' }}>
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu glass-card" style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              left: '50%',
              transform: 'translateX(-50%)',
              minWidth: '200px',
              padding: '8px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              zIndex: 200
            }}>
              <a href="#como-funciona" className="nav-dropdown-item">
                Cómo funciona la bonificación
              </a>
              <a href="#especialistas" className="nav-dropdown-item">
                Nuestros Especialistas
              </a>
            </div>
          </div>
          <a 
            href="#blog" 
            className="nav-link" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px',
              fontWeight: isBlogActive ? '800' : '600',
              color: isBlogActive ? 'var(--accent-primary)' : 'inherit'
            }}
          >
            <BookOpen size={15} />
            <span>Blog & Guías</span>
          </a>
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
          <a href="#" onClick={() => setIsOpen(false)} style={{ fontWeight: '500' }}>Inicio</a>
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
          <a href="#blog" onClick={() => setIsOpen(false)} style={{ fontWeight: '600', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} />
            <span>Blog & Guías FUNDAE</span>
          </a>
          <a href="#como-funciona" onClick={() => setIsOpen(false)} style={{ fontWeight: '500' }}>¿Cómo funciona?</a>
          <a href="#especialistas" onClick={() => setIsOpen(false)} style={{ fontWeight: '500', paddingLeft: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--border-color)' }}>
            ↳ Nuestros Especialistas
          </a>
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
          height: 64px;
        }
        .navbar-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: height var(--transition-fast);
        }
        @media (max-width: 768px) {
          .navbar-container {
            height: 48px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            margin: 0 !important;
          }
          .navbar-logo {
            height: 38px !important;
            max-height: 38px !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .mobile-menu-panel {
            top: 48px !important;
          }
          .mobile-toggle-area {
            gap: 4px !important;
          }
          .mobile-toggle-area button {
            padding: 6px !important;
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
        /* Dropdown menu */
        .nav-dropdown-menu {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-6px);
          transition: opacity 0.18s ease, visibility 0.18s ease, transform 0.18s ease;
          pointer-events: none;
        }
        .nav-dropdown-wrapper:hover .nav-dropdown-menu,
        .nav-dropdown-wrapper:focus-within .nav-dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }
        .nav-dropdown-item {
          display: block;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 0.12s ease, color 0.12s ease;
        }
        .nav-dropdown-item:hover {
          background-color: var(--bg-tertiary);
          color: var(--accent-primary);
        }
        .nav-dropdown-trigger:hover {
          color: var(--accent-primary);
        }
      `}</style>
    </nav>
  );
}
