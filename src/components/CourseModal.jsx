import React, { useEffect } from 'react';
import { X, Clock, Sliders, CheckCircle, MessageSquare } from 'lucide-react';

export default function CourseModal({ course, onClose, onSelectCourse }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!course) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(2, 6, 23, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px',
      animation: 'fadeIn 0.2s ease-out'
    }}
    onClick={onClose}
    >
      <div className="glass-card animate-fade-in" style={{
        backgroundColor: 'var(--bg-secondary)',
        width: '100%',
        maxWidth: '750px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Visual Stripe */}
        <div style={{
          height: '8px',
          background: course.id === 'chatgpt' || course.id === 'copilot'
            ? 'linear-gradient(90deg, var(--accent-ai) 0%, #a5b4fc 100%)'
            : 'linear-gradient(90deg, var(--accent-primary) 0%, #38bdf8 100%)'
        }} />

        {/* Close button */}
        <button 
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-tertiary)',
            border: 'none',
            color: 'var(--text-primary)',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background-color var(--transition-fast)'
          }}
          className="close-modal-btn"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div style={{ padding: '36px' }} className="modal-body">
          
          {/* Header Title */}
          <div style={{ marginBottom: '24px', paddingRight: '40px' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '6px'
            }}>
              Temario Oficial Bonificable
            </span>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              {course.title}
            </h2>
          </div>

          {/* Quick Meta Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            backgroundColor: 'var(--bg-primary)',
            padding: '16px 20px',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: '24px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock style={{ color: 'var(--accent-primary)' }} size={20} />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>DURACIÓN</span>
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{course.duration} horas</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders style={{ color: 'var(--accent-primary)' }} size={20} />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIVEL</span>
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{course.level}</span>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' }}>Enfoque del Curso</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{course.description}</p>
          </div>

          {/* Modules (The core Syllabus) */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px', borderBottom: '2px solid var(--border-color)', paddingBottom: '8px' }}>
              Módulos del Temario
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {course.modules.map((mod, index) => (
                <div key={index} style={{
                  backgroundColor: 'var(--bg-primary)',
                  padding: '20px',
                  borderRadius: 'var(--border-radius-md)',
                  borderLeft: `4px solid ${course.id === 'chatgpt' || course.id === 'copilot' ? 'var(--accent-ai)' : 'var(--accent-primary)'}`
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
                    {mod.title}
                  </h4>
                  <ul style={{
                    listStyleType: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4
                      }}>
                        <CheckCircle size={16} style={{
                          color: course.id === 'chatgpt' || course.id === 'copilot' ? 'var(--accent-ai)' : 'var(--accent-primary)',
                          marginTop: '3px',
                          flexShrink: 0
                        }} />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '24px'
          }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>HERRAMIENTAS CLAVE</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                {course.tools.map(t => (
                  <span key={t} style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onSelectCourse(course)}
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: 'var(--border-radius-md)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-fast)'
              }}
              className="modal-cta-btn"
            >
              <MessageSquare size={18} />
              Solicitar Curso Bonificado
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .close-modal-btn:hover {
          background-color: var(--border-color) !important;
        }
        .modal-cta-btn:hover {
          background-color: var(--accent-primary-hover) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 576px) {
          .modal-body {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
