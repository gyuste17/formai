import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, ArrowLeft, Sparkles, 
  HelpCircle, ChevronDown, ChevronUp, ExternalLink, ArrowRight, AlertTriangle, Building2
} from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogPage({ initialSlug, onBackToHome, onNavigateToContact }) {
  const [selectedSlug, setSelectedSlug] = useState(initialSlug || null);
  const [isAdminMode, setIsAdminMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.hash.includes('admin') || 
      localStorage.getItem('formai-blog-admin') === 'true'
    );
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        setSelectedSlug(slug);
      } else if (hash === '#blog' || hash === '#blog-admin') {
        setSelectedSlug(null);
        if (hash === '#blog-admin') {
          setIsAdminMode(true);
          localStorage.setItem('formai-blog-admin', 'true');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const visiblePosts = isAdminMode 
    ? blogPosts 
    : blogPosts.filter(p => p.status === 'published');

  const currentPost = selectedSlug 
    ? blogPosts.find(p => p.slug === selectedSlug) 
    : null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedSlug]);

  if (currentPost) {
    return (
      <div className="blog-article-view animate-fade-in" style={{ padding: '40px 0 80px 0', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => {
                setSelectedSlug(null);
                window.location.hash = isAdminMode ? '#blog-admin' : '#blog';
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.95rem',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <ArrowLeft size={18} />
              Volver a todas las Guías y Artículos
            </button>

            {isAdminMode && (
              <span style={{ 
                fontSize: '0.75rem', 
                backgroundColor: currentPost.status === 'published' ? '#059669' : '#d97706',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '12px',
                fontWeight: '700'
              }}>
                {currentPost.status === 'published' ? '● Publicado' : `⏳ Borrador (${currentPost.scheduledWeek || 'Programado'})`}
              </span>
            )}
          </div>

          <header style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: currentPost.categoryColor + '20',
                color: currentPost.categoryColor,
                fontWeight: '700',
                fontSize: '0.85rem',
                padding: '4px 12px',
                borderRadius: '16px'
              }}>
                {currentPost.category}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Calendar size={14} />
                {currentPost.publishedAt}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Clock size={14} />
                {currentPost.readTime}
              </span>
            </div>

            <h1 style={{
              fontSize: 'calc(1.8rem + 1vw)',
              fontWeight: '800',
              lineHeight: 1.25,
              color: 'var(--text-primary)',
              marginBottom: '20px'
            }}>
              {currentPost.title}
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              borderLeft: '4px solid var(--accent-primary)',
              paddingLeft: '16px',
              margin: '20px 0'
            }}>
              {currentPost.excerpt}
            </p>
          </header>

          <div style={{ marginBottom: '36px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <img 
              src={currentPost.coverImage} 
              alt={currentPost.title} 
              style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }} 
            />
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--accent-primary)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-primary)', fontWeight: '700', fontSize: '0.95rem' }}>
              <Sparkles size={18} />
              <span>Resumen Ejecutivo (TL;DR para Responsables de RRHH)</span>
            </div>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>
              {currentPost.tldr}
            </p>
          </div>

          <article className="blog-content-body" style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
            
            {currentPost.slug === 'guia-credito-fundae-2026-como-gastarlo' && (
              <div>
                <h2>1. La realidad del crédito FUNDAE: Dinero de tu empresa que el Estado no devolverá</h2>
                <p>
                  Cada mes, tu empresa y tus empleados cotizan a la Seguridad Social en concepto de <strong>Formación Profesional</strong> (un 0,70% de la base de cotización por contingencias comunes: 0,60% a cargo de la empresa y 0,10% a cargo del trabajador).
                </p>
                <p>
                  De esa cotización anual nace el <strong>Crédito de Formación Continua de FUNDAE</strong> (antigua Fundación Tripartita). Si al 31 de diciembre de 2026 no has ejecutado y comunicado tus acciones formativas a través de la <a href="https://www.fundae.es" target="_blank" rel="noopener noreferrer" className="external-source-link">Sede Electrónica de FUNDAE <ExternalLink size={13} style={{ verticalAlign: 'middle' }} /></a>, ese saldo desaparece de la cuenta de tu empresa y vuelve a las arcas estatales. <strong>No existe retroactividad ni devolución económica.</strong>
                </p>

                <div style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  margin: '28px 0',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <AlertTriangle size={24} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ef4444', display: 'block', marginBottom: '4px' }}>Alerta de Caducidad 2026:</strong>
                    <span>El crédito caduca el 31 de diciembre de 2026. Las PYMES de menos de 50 empleados solo pueden acumularlo para el siguiente ejercicio si solicitaron formalmente la reserva en la plataforma antes del 30 de junio según el artículo 11 del <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2017-7763" target="_blank" rel="noopener noreferrer" className="external-source-link">Real Decreto 694/2017 <ExternalLink size={12} /></a>.</span>
                  </div>
                </div>

                <h2>2. ¿Cuánto crédito tiene tu empresa en 2026?</h2>
                <p>
                  El crédito disponible depende de la cuota ingresada el año anterior y de la plantilla media según la <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-9733" target="_blank" rel="noopener noreferrer" className="external-source-link">Ley 30/2015 <ExternalLink size={13} /></a> y la normativa reguladora del <a href="https://www.sepe.es" target="_blank" rel="noopener noreferrer" className="external-source-link">SEPE <ExternalLink size={13} /></a>:
                </p>

                <div style={{ overflowX: 'auto', margin: '24px 0', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                        <th style={{ padding: '14px 16px' }}>Plantilla de la Empresa</th>
                        <th style={{ padding: '14px 16px' }}>% Bonificación Cuota</th>
                        <th style={{ padding: '14px 16px' }}>Crédito Mínimo Garantizado</th>
                        <th style={{ padding: '14px 16px' }}>Cofinanciación Privada</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: '600' }}>1 a 5 empleados</td>
                        <td style={{ padding: '12px 16px' }}>Asignación fija</td>
                        <td style={{ padding: '12px 16px', color: 'var(--accent-primary)', fontWeight: '700' }}>420 €</td>
                        <td style={{ padding: '12px 16px' }}>0% (Exentas)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: '600' }}>6 a 9 empleados</td>
                        <td style={{ padding: '12px 16px' }}>100% de la cuota ingresada</td>
                        <td style={{ padding: '12px 16px' }}>420 €</td>
                        <td style={{ padding: '12px 16px' }}>0% (Exentas)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: '600' }}>10 a 49 empleados</td>
                        <td style={{ padding: '12px 16px' }}>75% de la cuota ingresada</td>
                        <td style={{ padding: '12px 16px' }}>Según cotización</td>
                        <td style={{ padding: '12px 16px' }}>10%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: '600' }}>50 a 249 empleados</td>
                        <td style={{ padding: '12px 16px' }}>60% de la cuota ingresada</td>
                        <td style={{ padding: '12px 16px' }}>Según cotización</td>
                        <td style={{ padding: '12px 16px' }}>20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>3. Módulos Económicos Oficiales 2026</h2>
                <p>
                  En materias tecnológicas de <strong>Nivel Superior</strong> (como Inteligencia Artificial, ChatGPT, Microsoft Copilot, Power BI y Automatización), FUNDAE fija el módulo en <strong>13,00 € por hora y alumno en Aula Virtual</strong>, frente a los 7,50 €/h de la teleformación tradicional con vídeos grabados.
                </p>

                <div style={{ margin: '32px 0', borderRadius: '12px', overflow: 'hidden' }}>
                  <img 
                    src="/images/desk-3139127_1280.webp" 
                    alt="Puesto de trabajo optimizado con Inteligencia Artificial" 
                    style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} 
                  />
                  <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                    Capacitación de equipos en herramientas de IA aplicada y análisis de datos en el entorno laboral
                  </span>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderLeft: '4px solid #10b981',
                  borderRadius: '0 12px 12px 0',
                  padding: '22px',
                  margin: '32px 0'
                }}>
                  <h3 style={{ margin: '0 0 12px 0', color: '#10b981', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={20} />
                    <span>Caso Práctico Real: PYME de 22 trabajadores</span>
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><strong>Crédito disponible anual:</strong> 2.600 €</li>
                    <li><strong>Curso seleccionado:</strong> IA Generativa & Copilot en Aula Virtual (10 empleados, 20 horas en directo)</li>
                    <li><strong>Cálculo oficial de bonificación:</strong> 10 alumnos × 20 horas × 13 €/h = <strong>2.600 € bonificables</strong></li>
                    <li><strong>Coste neto final:</strong> <span style={{ color: '#10b981', fontWeight: '800' }}>0 €</span> (deducido en el RLC a través del <a href="https://www.seg-social.es" target="_blank" rel="noopener noreferrer" className="external-source-link">Sistema RED de la Seguridad Social <ExternalLink size={12} /></a>)</li>
                  </ul>
                </div>
              </div>
            )}

            {currentPost.slug === 'cursos-inteligencia-artificial-bonificables-fundae-2026' && (
              <div>
                <h2>1. Marco Legal: La IA está 100% amparada por el RD 694/2017</h2>
                <p>
                  El artículo 4 del <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2017-7763" target="_blank" rel="noopener noreferrer" className="external-source-link">Real Decreto 694/2017 <ExternalLink size={13} /></a> establece expresamente que la formación bonificada debe orientarse a la <em>actualización de competencias profesionales, la transformación digital y la capacitación tecnológica de la plantilla</em>.
                </p>
                <p>
                  Las formaciones en <strong>ChatGPT, Microsoft 365 Copilot, Power Automate y Análisis de Datos con IA</strong> cumplen al 100% con los criterios oficiales de <a href="https://www.fundae.es" target="_blank" rel="noopener noreferrer" className="external-source-link">FUNDAE <ExternalLink size={13} /></a> al aplicarse directamente a procesos laborales reales (redacción de informes, atención al cliente, automatización de tareas y análisis predictivo).
                </p>

                <div style={{ margin: '32px 0', borderRadius: '12px', overflow: 'hidden' }}>
                  <img 
                    src="/images/startup-594090_1280.webp" 
                    alt="Equipo en sesión de formación en directo sobre Inteligencia Artificial" 
                    style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} 
                  />
                  <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                    Sesión interactiva en Aula Virtual sobre flujos de trabajo con Microsoft Copilot y ChatGPT
                  </span>
                </div>

                <h2>2. Clasificación de Nivel Superior (13 €/h/participante)</h2>
                <p>
                  Al tratarse de competencias tecnológicas avanzadas, estos cursos acceden al módulo económico máximo de <strong>13,00 €/hora/alumno</strong> en modalidad Aula Virtual con formador en directo, frente al módulo básico general de 9,00 €/h.
                </p>

                <h2>3. Requisitos para la Aprobación del Expediente</h2>
                <p>
                  Para garantizar la validez legal ante el <a href="https://www.sepe.es" target="_blank" rel="noopener noreferrer" className="external-source-link">SEPE <ExternalLink size={13} /></a> y la Inspección de Trabajo, la acción formativa debe comunicarse con un mínimo de <strong>2 días naturales de antelación</strong>, contar con una guía didáctica estructurada y registrar la conexión activa de los participantes para acreditar al menos el <strong>75% de asistencia</strong>.
                </p>
              </div>
            )}

            {currentPost.slug === 'aula-virtual-vs-teleformacion-fundae-2026' && (
              <div>
                <h2>1. Comparativa Económica: 13 €/h vs 7,50 €/h</h2>
                <p>
                  Para FUNDAE, el <strong>Aula Virtual</strong> computa como formación presencial síncrona en tiempo real con módulo superior de <strong>13,00 €/hora/alumno</strong>, mientras que la <strong>Teleformación</strong> asíncrona (vídeos pregrabados en LMS) tiene un tope de <strong>7,50 €/hora/alumno</strong> según las directrices de la <a href="https://www.fundae.es" target="_blank" rel="noopener noreferrer" className="external-source-link">Guía Técnica de FUNDAE <ExternalLink size={13} /></a>.
                </p>

                <div style={{ margin: '32px 0', borderRadius: '12px', overflow: 'hidden' }}>
                  <img 
                    src="/images/laptops-593296_1280.webp" 
                    alt="Comparativa tecnológica entre Aula Virtual y Teleformación" 
                    style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} 
                  />
                  <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                    Clases en directo mediante Teams o Zoom: mayor interacción y +73% de bonificación económica
                  </span>
                </div>

                <h2>2. Requisitos Técnicos Obligatorios</h2>
                <p>
                  La plataforma utilizada (Microsoft Teams, Zoom, Google Meet) debe registrar los <strong>logs de conexión fehacientes</strong> (hora de entrada, salida y tiempo total acumulado) para justificar que cada alumno ha superado al menos el <strong>75% de asistencia mínima obligatoria</strong>.
                </p>
              </div>
            )}

            {currentPost.slug === 'copilot-chatgpt-departamento-administrativo-fundae' && (
              <div>
                <h2>1. El Retorno de Inversión (ROI) en Tareas Administrativas</h2>
                <p>
                  El personal administrativo invierte hasta el 45% de su jornada laboral en tareas manuales rutinarias. Con la capacitación adecuada en Copilot y ChatGPT, los equipos ahorran una media de <strong>4,2 horas semanales por persona</strong> en actas, conciliaciones, redacción de correos y tratamiento de datos en Excel.
                </p>

                <div style={{ margin: '32px 0', borderRadius: '12px', overflow: 'hidden' }}>
                  <img 
                    src="/images/entrepreneur-593371_1280.webp" 
                    alt="Administrativo utilizando herramientas de IA para gestión documental" 
                    style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} 
                  />
                  <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                    Automatización de tareas rutinarias: redacción de informes y extracción inteligente de datos
                  </span>
                </div>

                <h2>2. Formación 100% Bonificable a Coste Cero</h2>
                <p>
                  Un curso práctico de 16 horas en Aula Virtual para 8 personas absorbe 1.664 € de crédito de formación bonificada por la <a href="https://www.seg-social.es" target="_blank" rel="noopener noreferrer" className="external-source-link">Seguridad Social <ExternalLink size={13} /></a>, resultando a coste neto 0 € para la empresa.
                </p>
              </div>
            )}

          </article>

          {currentPost.faqs && currentPost.faqs.length > 0 && (
            <section style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <HelpCircle size={22} style={{ color: 'var(--accent-primary)' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>Preguntas Frecuentes</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentPost.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '1rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp size={18} style={{ color: 'var(--accent-primary)' }} /> : <ChevronDown size={18} />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0 20px 16px 20px', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <div style={{
            marginTop: '48px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-ai) 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '36px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '12px' }}>
              ¿Quieres saber cuánto crédito FUNDAE tiene tu empresa hoy?
            </h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 24px auto', opacity: 0.95, fontSize: '1.05rem', lineHeight: 1.6 }}>
              En FormAI consultamos el saldo oficial de tu empresa en 24h sin ningún coste ni compromiso, y te asesoramos sobre los mejores cursos de IA y Digitalización para tu equipo.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#calculadora"
                onClick={() => {
                  if (onBackToHome) onBackToHome();
                }}
                style={{
                  backgroundColor: '#ffffff',
                  color: 'var(--accent-primary)',
                  padding: '12px 28px',
                  borderRadius: 'var(--border-radius-full)',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Calcular Crédito en el Simulador
              </a>
              <a
                href="#contacto"
                onClick={() => {
                  if (onNavigateToContact) onNavigateToContact();
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  padding: '12px 28px',
                  borderRadius: 'var(--border-radius-full)',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textDecoration: 'none'
                }}
              >
                Contactar con un Especialista
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-view" style={{ padding: '48px 0 80px 0', minHeight: '80vh' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Guías y Artículos Especializados</span>
          <h1 style={{ fontSize: 'calc(2rem + 1vw)', fontWeight: '800', marginBottom: '16px' }}>
            Aprende a <span className="gradient-text">aprovechar FUNDAE</span> e Inteligencia Artificial
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Guías técnicas, cálculos de crédito, comparativas de normativas y casos prácticos reales para directores de RRHH y responsables de formación.
          </p>

          <div style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: 'var(--bg-secondary)', borderRadius: '20px', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              {isAdminMode ? '🔓 Modo Editor Activo (Viendo los 4 artículos):' : '👁️ Vista Pública (Solo artículos publicados):'}
            </span>
            <button
              onClick={() => {
                const next = !isAdminMode;
                setIsAdminMode(next);
                localStorage.setItem('formai-blog-admin', next ? 'true' : 'false');
                window.location.hash = next ? '#blog-admin' : '#blog';
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isAdminMode ? 'Cambiar a Vista Pública' : 'Ver todos los borradores'}
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className="glass-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: post.categoryColor,
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {post.category}
                </span>

                {post.status === 'draft' && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#d97706',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '12px'
                  }}>
                    ⏳ {post.scheduledWeek}
                  </span>
                )}
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      {post.publishedAt}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    marginBottom: '12px'
                  }}>
                    {post.title}
                  </h2>

                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}>
                    {post.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedSlug(post.slug);
                    window.location.hash = '#blog/' + post.slug;
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--accent-primary)',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="read-article-btn"
                >
                  <span>Leer Guía Completa</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      <style>{`
        .blog-content-body h2 {
          font-size: 1.45rem;
          font-weight: 800;
          margin-top: 36px;
          margin-bottom: 16px;
          color: var(--text-primary);
        }
        .blog-content-body p {
          margin-bottom: 18px;
        }
        .external-source-link {
          color: var(--accent-primary);
          text-decoration: underline;
          font-weight: 600;
        }
        .external-source-link:hover {
          color: var(--accent-hover);
        }
        .read-article-btn:hover {
          background-color: var(--accent-primary) !important;
          color: #ffffff !important;
          border-color: var(--accent-primary) !important;
        }
      `}</style>
    </div>
  );
}
