import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactForm({ preSelectedCourse, preSelectedCalculatorBudget }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill values if props change
  useEffect(() => {
    if (preSelectedCourse) {
      setFormData(prev => ({
        ...prev,
        subject: `Curso de ${preSelectedCourse.title}`,
        message: `Hola, estoy interesado en solicitar el curso bonificado de "${preSelectedCourse.title}" para mi empresa. Nos gustaría recibir más información sobre el temario y las opciones de fechas.`
      }));
    }
  }, [preSelectedCourse]);

  useEffect(() => {
    if (preSelectedCalculatorBudget) {
      setFormData(prev => ({
        ...prev,
        subject: 'Presupuesto y Bonificación FUNDAE',
        message: `Hola, he realizado una simulación en vuestra calculadora de crédito con los siguientes datos:\n- Plantilla: ${preSelectedCalculatorBudget.employees} empleados.\n- Alumnos estimativos: ${preSelectedCalculatorBudget.students} alumnos.\n- Duración del curso: ${preSelectedCalculatorBudget.hours} horas.\n- Modalidad: ${preSelectedCalculatorBudget.modality}.\n\nMe gustaría que validaseis gratuitamente nuestro crédito FUNDAE disponible y nos enviaseis una propuesta de formación.`
      }));
    }
  }, [preSelectedCalculatorBudget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      setError('Por favor, rellena todos los campos obligatorios (*).');
      setLoading(false);
      return;
    }

    fetch('https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    })
    .catch((err) => {
      console.error(err);
      setError('Hubo un error al enviar el formulario. Por favor, vuelve a intentarlo.');
      setLoading(false);
    });
  };

  return (
    <section id="contacto" className="section-padding" style={{
      background: 'radial-gradient(circle at 10% 80%, var(--accent-ai-light) 0%, transparent 40%)',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'start'
        }} className="contact-grid">
          
          {/* Info Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <span className="badge badge-ai" style={{ marginBottom: '12px' }}>¿Hablamos?</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Contacta con nosotros
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Revisamos tu crédito formativo FUNDAE en menos de 24 horas y diseñamos una propuesta adaptada sin compromiso alguno.
              </p>
            </div>

            {/* Quick Contact Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary-light)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>EMAIL</span>
                  <a href="mailto:hola@formai.es" style={{ fontWeight: '600', fontSize: '1.05rem' }} className="contact-link">
                    hola@formai.es
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary-light)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>TELÉFONO / WHATSAPP</span>
                  <a href="tel:+34609269480" style={{ fontWeight: '600', fontSize: '1.05rem' }} className="contact-link">
                    +34 609 269 480
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary-light)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>SEDE PRINCIPAL</span>
                  <span style={{ fontWeight: '600', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    Madrid, España (Formación en toda España)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-card" style={{
            padding: '36px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '24px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                animation: 'fadeIn 0.4s ease-out'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary-light)',
                  color: 'var(--accent-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={36} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>¡Mensaje recibido con éxito!</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: 1.5 }}>
                  Hemos recibido tu solicitud. Nuestro equipo revisará el crédito de tu empresa y se pondrá en contacto contigo en menos de 24 horas.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: '12px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-color)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {error && (
                  <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    padding: '12px 16px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label className="form-label">Nombre y Apellidos *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Tu nombre"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Empresa *</label>
                    <input 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      placeholder="Nombre de la empresa"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label className="form-label">Correo electrónico *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="ejemplo@empresa.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Teléfono *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="600 000 000"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Asunto (Opcional)</label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    placeholder="Curso de interés, cálculo de crédito, etc."
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Mensaje / Comentarios *</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Cuéntanos cuántos empleados queréis formar, nivel aproximado..."
                    className="form-input"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? 'var(--text-muted)' : 'var(--accent-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px 24px',
                    borderRadius: 'var(--border-radius-md)',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'background-color var(--transition-fast)'
                  }}
                  className="submit-btn"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                  {!loading && <Send size={16} />}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
            gap: 64px !important;
          }
        }
        @media (max-width: 576px) {
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        .contact-link:hover {
          color: var(--accent-primary);
        }
        .submit-btn:hover {
          background-color: var(--accent-primary-hover) !important;
        }
      `}</style>
    </section>
  );
}
