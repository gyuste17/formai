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
import { coursesData } from './data/courses';

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
  const [theme, setTheme] = useState(getDefaultTheme);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [preSelectedCourse, setPreSelectedCourse] = useState(null);
  const [preSelectedBudget, setPreSelectedBudget] = useState(null);
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
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* Hero — incluye ToolsRotator visible sin scroll */}
        <Hero />

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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {coursesData.map((course, i) => (
                <div key={course.id} className="animate-on-scroll" style={{ animationDelay: `${i * 0.07}s` }}>
                  <CourseCard course={course} onViewSyllabus={setSelectedCourse} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona FUNDAE */}
        <section id="como-funciona" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

      <Footer />

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
