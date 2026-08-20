import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCard from './components/CourseCard';
import Calculator from './components/Calculator';
import FundaeInfo from './components/FundaeInfo';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PartnersCarousel from './components/PartnersCarousel';
import ClientsReviews from './components/ClientsReviews';
import LeadsManager from './components/LeadsManager';
import CatalogSection from './components/CatalogSection';
import CatalogModal from './components/CatalogModal';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { coursesData } from './data/courses';
import { useCorporateHeaderColor } from './hooks/useCorporateHeaderColor';
import CookieBanner from './components/CookieBanner';

const CourseModal = lazy(() => import('./components/CourseModal'));

// Tema por hora: 06–18 → claro, 18–06 → oscuro
function getDefaultTheme() {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('formai-theme');
    if (saved) return saved;
  }
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export default function App() {
  useCorporateHeaderColor();
  const [theme, setTheme] = useState(getDefaultTheme);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [preSelectedCourse, setPreSelectedCourse] = useState(null);
  const [preSelectedBudget, setPreSelectedBudget] = useState(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isCatalogExpanded, setIsCatalogExpanded] = useState(false);
  const [showLeadsManager, setShowLeadsManager] = useState(() => {
    return typeof window !== 'undefined' && (window.location.hash === '#leads' || window.location.hash === '#admin');
  });

  useEffect(() => {
    const handleHashChange = () => {
      setShowLeadsManager(window.location.hash === '#leads' || window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('formai-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (showLeadsManager) {
    return (
      <>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <LeadsManager onClose={() => {
          window.location.hash = '';
          setShowLeadsManager(false);
        }} />
      </>
    );
  }

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} onOpenCatalogModal={() => setIsCatalogModalOpen(true)} />

      <main>
        {/* Hero — incluye ToolsRotator visible sin scroll */}
        <Hero onOpenCatalogModal={() => setIsCatalogModalOpen(true)} />

        {/* Carrusel de colaboradores */}
        <PartnersCarousel theme={theme} />

        {/* Cursos */}
        <section id="cursos" className="section-padding">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Catálogo de Formaciones</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 0.8vw)', fontWeight: '800', marginBottom: '16px' }}>
                Cursos <span className="gradient-text">bonificados</span> 100% FUNDAE
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Formaciones prácticas y actualizadas adaptadas a las necesidades reales de tu equipo.
              </p>
            </div>

            {/* Grid de Cursos (Colapsable / Desplegable) */}
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {(isCatalogExpanded ? coursesData : coursesData.slice(0, 3)).map((course, i) => (
                  <div key={course.id} className="animate-on-scroll" style={{ animationDelay: `${i * 0.07}s` }}>
                    <CourseCard course={course} onViewSyllabus={setSelectedCourse} />
                  </div>
                ))}
              </div>

              {/* Botón para expandir / colapsar el catálogo */}
              <div style={{
                position: 'relative',
                textAlign: 'center',
                marginTop: '40px',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }} className="expand-catalog-wrapper">
                <button
                  onClick={() => {
                    if (isCatalogExpanded) {
                      setIsCatalogExpanded(false);
                      document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setIsCatalogExpanded(true);
                    }
                  }}
                  className="expand-catalog-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    borderRadius: 'var(--border-radius-full)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '2px solid var(--accent-primary)',
                    color: 'var(--text-primary)',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span>
                    {isCatalogExpanded 
                      ? 'Mostrar menos formaciones' 
                      : `Ver todas las formaciones (${coursesData.length} cursos)`}
                  </span>
                  {isCatalogExpanded ? (
                    <ChevronUp size={20} style={{ color: 'var(--accent-primary)' }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: 'var(--accent-primary)' }} />
                  )}
                </button>

                {!isCatalogExpanded && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Excel, Power BI, ChatGPT, Copilot 365, Automate, Looker Studio y más
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Destacada de Descarga de Catálogo 2026 */}
        <CatalogSection onOpenCatalogModal={() => setIsCatalogModalOpen(true)} />

        {/* Cómo funciona FUNDAE */}
        <section id="como-funciona" className="section-padding section-parallax-bg">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="badge badge-ai" style={{ marginBottom: '16px' }}>Sin burocracia para ti</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 0.8vw)', fontWeight: '800', marginBottom: '16px' }}>
                ¿Cómo funciona la <span className="gradient-text">bonificación</span>?
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Nos encargamos de toda la gestión ante FUNDAE para que tú solo tengas que preocuparte de aprender.
              </p>
            </div>
            <FundaeInfo />
          </div>
        </section>

        {/* Clientes + Reseñas Google — justo antes de calculadora */}
        <ClientsReviews />

        {/* Calculadora */}
        <section id="calculadora" className="section-padding">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Simulador Interactivo</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 0.8vw)', fontWeight: '800', marginBottom: '16px' }}>
                Calculadora de <span className="gradient-text">crédito FUNDAE</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Descubre cuánto puede bonificar tu empresa. Cálculo en tiempo real según la normativa vigente.
              </p>
            </div>
            <Calculator onSelectCalculatorBudget={(budget) => {
              setPreSelectedCourse(null);
              setPreSelectedBudget(budget);
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }} />
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="badge badge-ai" style={{ marginBottom: '16px' }}>Escríbenos</span>
              <h2 style={{ fontSize: 'calc(1.8rem + 0.8vw)', fontWeight: '800', marginBottom: '16px' }}>
                ¿Hablamos de tu <span className="gradient-text">formación</span>?
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Sin compromiso. Te contamos cómo activar la bonificación en tu empresa y cuál es el mejor curso para tu equipo.
              </p>
            </div>
            <ContactForm preSelectedCourse={preSelectedCourse} preSelectedCalculatorBudget={preSelectedBudget} />
          </div>
        </section>
      </main>

      <Footer onOpenCatalogModal={() => setIsCatalogModalOpen(true)} />

      {/* Pop-up Modal de Descarga de Catálogo 2026 */}
      <CatalogModal 
        isOpen={isCatalogModalOpen} 
        onClose={() => setIsCatalogModalOpen(false)} 
      />

      {/* Modal de temario diferido */}
      {selectedCourse && (
        <Suspense fallback={null}>
          <CourseModal 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
            onSelectCourse={(course) => {
              setSelectedCourse(null);
              setPreSelectedBudget(null);
              setPreSelectedCourse(course);
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </Suspense>
      )}

      <CookieBanner />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-on-scroll {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </>
  );
}
