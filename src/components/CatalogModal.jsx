import React, { useState, useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck, Sparkles, Building, Mail, User, Phone, ArrowRight } from 'lucide-react';

export default function CatalogModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState('');

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setDownloaded(false);
      setError('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = '/catalogo-formai-2026.pdf';
    link.download = 'Catalogo-Cursos-FormAI-2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.company) {
      setError('Por favor, completa los campos obligatorios (*).');
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone || 'No especificado',
      subject: 'Descarga Catálogo Cursos 2026 (PDF)',
      message: `Solicitud de descarga de catálogo 2026.\nEmpresa: ${formData.company}\nContacto: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone || 'N/A'}`
    };

    fetch('https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(() => {
      setLoading(false);
      setDownloaded(true);
      triggerPdfDownload();
    })
    .catch((err) => {
      console.error(err);
      // Still trigger download even if lead sync has network delay
      setLoading(false);
      setDownloaded(true);
      triggerPdfDownload();
    });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.8)',
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
      <div 
        className="glass-card" 
        style={{
          backgroundColor: 'var(--bg-secondary)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          border: '1px solid var(--border-color)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Stripe */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-ai) 50%, #38bdf8 100%)'
        }} />

        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Cerrar modal"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
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
          className="modal-close-btn"
        >
          <X size={20} />
        </button>

        <div style={{ padding: '32px 36px' }} className="catalog-modal-content">
          
          {!downloaded ? (
            <>
              {/* Header Info */}
              <div style={{ marginBottom: '24px' }}>
                <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <FileText size={14} />
                  Catálogo Oficial 2026 (PDF)
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: 1.25, marginBottom: '8px' }}>
                  Descarga nuestro <span className="gradient-text">Catálogo Completo 2026</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Accede a más de 50 programas formativos bonificados 100% FUNDAE, modalidades (online y presencial), tarifas y guía de bonificación a coste 0€.
                </p>
              </div>

              {/* PDF Features Card */}
              <div style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                padding: '16px 20px',
                marginBottom: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>5 páginas completas con todas las áreas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>IA, BI, Office 365, Datos, Soft Skills</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>Tarifas por hora y condiciones FUNDAE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>Descarga instantánea en PDF</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {error && (
                  <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid #ef4444',
                    color: '#ef4444',
                    padding: '10px 14px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.88rem'
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="catalog-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Nombre y Apellidos *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        placeholder="Ej. Carmen López"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Empresa *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Building size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange}
                        placeholder="Ej. Innova Tech S.L."
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="catalog-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Email corporativo *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        placeholder="carmen@empresa.com"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                      Teléfono (opcional)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  🔒 Respetamos tu privacidad. Tus datos solo se utilizarán para enviarte el catálogo y resolver dudas formativas sin compromiso.
                </p>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-ai) 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: 'var(--border-radius-md)',
                      fontWeight: '700',
                      fontSize: '1rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: 'var(--shadow-md)',
                      opacity: loading ? 0.7 : 1,
                      width: '100%',
                      justifyContent: 'center',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="catalog-submit-btn"
                  >
                    <Download size={18} />
                    {loading ? 'Preparando descarga...' : 'Descargar Catálogo 2026 (PDF)'}
                  </button>
                </div>

              </form>
            </>
          ) : (
            /* Success state */
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(5, 150, 105, 0.15)',
                color: 'var(--accent-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <CheckCircle2 size={36} />
              </div>
              
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '8px' }}>
                ¡Tu catálogo se está descargando!
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 24px auto', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Si la descarga no ha comenzado automáticamente en unos segundos, haz clic en el botón de abajo.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={triggerPdfDownload}
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: 'var(--border-radius-md)',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <Download size={18} />
                  Descargar de nuevo
                </button>

                <button
                  onClick={onClose}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 24px',
                    borderRadius: 'var(--border-radius-md)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .modal-close-btn:hover {
          background-color: var(--border-color) !important;
        }
        .catalog-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: var(--shadow-lg);
        }
        @media (max-width: 600px) {
          .catalog-modal-content {
            padding: 24px 20px !important;
          }
          .catalog-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
