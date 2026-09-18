import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Brain, 
  BarChart3, 
  Cpu, 
  FileSpreadsheet, 
  ArrowRight,
  Award
} from 'lucide-react';

export default function SpecialistsNetwork() {
  const [selectedDiscipline, setSelectedDiscipline] = useState(0);

  const disciplines = [
    {
      title: "Inteligencia Artificial y Automatización",
      tag: "IA Generativa & Copilot",
      icon: Brain,
      role: "Consultores Senior de IA & Prompt Engineering",
      dailyWork: "Implementando asistentes GPT corporativos, flujos en Gemini/Claude y automatizaciones en despachos, consultoras y departamentos de marketing.",
      inClass: "Te enseñamos exactamente qué prompts funcionan de verdad, cómo integrar la IA en tu flujo diario sin alucinaciones y cómo ahorrar hasta 2h de trabajo manual cada día.",
      tools: ["ChatGPT Team / Enterprise", "Microsoft Copilot 365", "Claude 3.5 Sonnet", "Midjourney & FLUX"]
    },
    {
      title: "Business Intelligence y Analítica",
      tag: "Decisiones con Datos",
      icon: BarChart3,
      role: "Data Analysts & Especialistas en Power BI",
      dailyWork: "Modelando datos en DAX, conectando ERPs/CRMs y diseñando dashboards ejecutivos de ventas y finanzas para comités de dirección.",
      inClass: "Prácticas con datasets reales y complejos, trucos de modelado relacional para limpiar datos sucios y diseño de informes interactivos visualmente impecables.",
      tools: ["Power BI Desktop", "DAX Avanzado", "Power Query", "Looker Studio"]
    },
    {
      title: "Excel Avanzado y Modelización",
      tag: "Productividad Financiera",
      icon: FileSpreadsheet,
      role: "Especialistas en Modelos Financieros & Operaciones",
      dailyWork: "Desarrollando plantillas maestras, macros automatizadas y análisis de rentabilidad para pymes e inversores.",
      inClass: "Sin teoría académica caducada: atajos de teclado profesionales, funciones dinámicas (BUSCARX, FILTRAR, MATRICES) y tablas dinámicas para trabajar 10x más rápido.",
      tools: ["Excel 365", "Power Query en Excel", "Macros / VBA", "Google Sheets"]
    },
    {
      title: "Workflows y Flujos Autónomos",
      tag: "Cero Tareas Repetitivas",
      icon: Cpu,
      role: "Automation Specialists & No-Code Builders",
      dailyWork: "Conectando plataformas corporativas con Power Automate, APIs y webhooks para sincronizar facturación, leads y notificaciones sin intervención humana.",
      inClass: "Aprenderás a construir tus propios flujos automatizados paso a paso para que tu equipo deje de hacer tareas manuales aburridas para siempre.",
      tools: ["Power Automate", "Make / Zapier", "Python Scripts", "APIs REST"]
    }
  ];

  const comparisonPoints = [
    {
      feature: "¿Quién imparte la formación?",
      formai: "Profesionales freelance y consultores senior en activo. Quien te forma hoy, ayer estuvo resolviendo retos reales en empresas punteras.",
      tradicional: "Docentes teóricos de plantilla fija con años alejados de la operativa real y del mercado laboral diario."
    },
    {
      feature: "Actualización de temarios",
      formai: "Casos de uso vivos actualizados cada semana según las últimas novedades de IA, Copilot y versiones de software.",
      tradicional: "Temarios estáticos y diapositivas cerradas hace años que no reflejan las herramientas actuales."
    },
    {
      feature: "Casos prácticos de clase",
      formai: "100% aplicados a tu empresa: podemos trabajar sobre tus propios procesos y retos reales (bajo estricto acuerdo de confidencialidad).",
      tradicional: "Ejercicios genéricos de manual escolar que cuesta extrapolar al día a día de tu empresa."
    },
    {
      feature: "Flexibilidad y asignación",
      formai: "Seleccionamos de nuestra red independiente al formador idóneo para el perfil y sector específico de tu plantilla.",
      tradicional: "Te asignan al profesor que tenga horas libres en ese momento en la academia, encaje o no con tu sector."
    },
    {
      feature: "Cercanía y soporte post-curso",
      formai: "Trato directo y cercano de profesional a profesional, con soporte post-curso continuo para resolver dudas reales.",
      tradicional: "Atención canalizada a través de secretaría o gestores comerciales con cero soporte técnico directo."
    }
  ];

  return (
    <section id="especialistas" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Glow Decorations */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.08) 0%, rgba(79, 70, 229, 0.04) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--border-radius-full)',
            backgroundColor: 'var(--accent-primary-light)',
            color: 'var(--accent-primary-text)',
            fontSize: '0.85rem',
            fontWeight: '700',
            marginBottom: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981',
              display: 'inline-block'
            }} />
            Red de Talento Senior · 100% en Activo
          </div>

          <h2 style={{ fontSize: 'calc(1.8rem + 0.9vw)', fontWeight: '800', marginBottom: '16px', lineHeight: 1.25 }}>
            No somos una academia teórica.{' '}
            <br className="hide-mobile" />
            <span className="gradient-text">Profesionales en la trinchera real</span> enseñando a tu equipo.
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            FormAI funciona como un <strong>colectivo de especialistas independientes y consultores senior en activo</strong> coordinados técnicamente por Guillermo Yuste. Quienes imparten nuestras formaciones resuelven cada día en empresas lo mismo que enseñan en el aula.
          </p>
        </div>

        {/* Highlight Stats Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '56px'
        }}>
          {[
            { metric: "100%", label: "Profesionales en Activo", desc: "Consultores y especialistas freelance ejecutando proyectos reales", icon: Briefcase },
            { metric: "0%", label: "Teoría Obsoleta", desc: "Temarios vivos adaptados a la última versión y novedades del mercado", icon: Zap },
            { metric: "1 a 1", label: "A Medida de tu Equipo", desc: "Seleccionamos al especialista idóneo según tu sector y operativa", icon: Sparkles },
            { metric: "4.9 / 5", label: "Satisfacción en Empresas", desc: "Alumnos que aplican lo aprendido desde el primer día de clase", icon: Award }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="glass-card stat-card-hover"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
                    {stat.metric}
                  </span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-primary-light)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} />
                  </div>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>{stat.label}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{stat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content: Interactive Disciplines Showcase & Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '36px',
          alignItems: 'start'
        }} className="specialists-grid-layout">
          
          {/* Card 1: Disciplinas y Perfiles de la Red */}
          <div className="glass-card" style={{
            padding: '36px',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Especialistas en la trinchera</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>¿Quién formará a tus trabajadores?</h3>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Haz clic para explorar cada perfil:</span>
            </div>

            {/* Selector de Disciplinas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px',
              marginBottom: '28px'
            }}>
              {disciplines.map((disc, idx) => {
                const DiscIcon = disc.icon;
                const isSelected = selectedDiscipline === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDiscipline(idx)}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      fontWeight: '700',
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'center',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="discipline-tab-btn"
                  >
                    <DiscIcon size={20} />
                    <span>{disc.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Ficha Dinámica del Especialista Seleccionado */}
            {(() => {
              const current = disciplines[selectedDiscipline];
              const CurrentIcon = current.icon;
              return (
                <div style={{
                  padding: '28px',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--accent-primary-light)',
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <CurrentIcon size={24} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Perfil del Formador
                        </span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{current.role}</h4>
                      </div>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: 'var(--border-radius-full)',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      color: '#059669',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                      En consultoría activa diaria
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="specialist-details-cols">
                    <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '6px' }}>
                        <Briefcase size={14} /> ¿Qué hace en su día a día profesional?
                      </span>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {current.dailyWork}
                      </p>
                    </div>

                    <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '800', color: '#059669', marginBottom: '6px' }}>
                        <Sparkles size={14} /> Lo que traslada a tu equipo en clase:
                      </span>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {current.inClass}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Herramientas de cabecera que domina y enseña:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {current.tools.map((tool, tIdx) => (
                        <span key={tIdx} style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-color)'
                        }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Card 2: Interactive Comparison: Modelo FormAI vs Academia Clásica */}
          <div className="glass-card" style={{
            padding: '36px',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="badge badge-ai" style={{ marginBottom: '8px' }}>Comparativa Clara</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '10px' }}>
                ¿Por qué una red de talento independiente es mejor para tu empresa?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                Comprueba la diferencia entre aprender de profesionales en activo versus el modelo tradicional.
              </p>
            </div>

            {/* Comparison Table / List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {comparisonPoints.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '18px 20px',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '12px'
                  }}
                  className="comparison-row"
                >
                  <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                    {item.feature}
                  </span>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="comparison-columns">
                    {/* FormAI Model */}
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(16, 185, 129, 0.06)',
                      border: '1px solid rgba(16, 185, 129, 0.25)'
                    }}>
                      <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#059669', display: 'block', marginBottom: '2px' }}>
                          MODELO FORMAI (EN ACTIVO)
                        </span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                          {item.formai}
                        </p>
                      </div>
                    </div>

                    {/* Traditional Academy */}
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                      <XCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#ef4444', display: 'block', marginBottom: '2px' }}>
                          ACADEMIA TRADICIONAL
                        </span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                          {item.tradicional}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action within Section */}
            <div style={{
              marginTop: '32px',
              padding: '24px',
              borderRadius: 'var(--border-radius-md)',
              background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-primary) 100%)',
              border: '1px solid var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '4px' }}>
                  ¿Tienes un proyecto o necesidad específica en tu equipo?
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Cuéntanos qué necesitáis y os asignamos al especialista en activo idóneo para diseñar vuestra formación.
                </p>
              </div>

              <a 
                href="#contacto"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  borderRadius: 'var(--border-radius-full)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Hablar con un especialista</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .stat-card-hover:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary) !important;
          box-shadow: var(--shadow-lg) !important;
        }
        @media (min-width: 992px) {
          .specialists-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .specialist-details-cols {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .comparison-columns {
            grid-template-columns: 1fr !important;
          }
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
