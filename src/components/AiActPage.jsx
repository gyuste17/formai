import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft, 
  FileText, Users, Building2, Scale, Lock, Sparkles, BookOpen, 
  HelpCircle, ChevronDown, ChevronUp, Clock, Calendar, DownloadCloud,
  Send, Calculator as CalcIcon, Award
} from 'lucide-react';
import ContactForm from './ContactForm';

export default function AiActPage({ onBackToHome, onOpenCatalogModal }) {
  // Test interactivo de diagnóstico de obligación
  const [checklist, setChecklist] = useState({
    chatgpt: false,
    copilot: false,
    rrhh: false,
    marketing: false,
    shadowAi: false,
  });

  // FAQs desplegables
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Estado para el cálculo rápido de crédito
  const [employeesCount, setEmployeesCount] = useState(15);
  
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isObligated = checkedCount > 0;

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateEstimateCredit = (num) => {
    if (num <= 5) return 420;
    if (num <= 9) return Math.round(num * 105);
    if (num <= 49) return Math.round(num * 88);
    if (num <= 249) return Math.round(num * 72);
    return Math.round(num * 60);
  };

  const estimatedCredit = calculateEstimateCredit(employeesCount);

  const scrollToContact = (subjectText = '') => {
    const el = document.getElementById('contacto-aiact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: '¿Qué es exactamente el Artículo 4 del AI Act y a quién obliga?',
      a: 'El Artículo 4 del Reglamento Europeo de Inteligencia Artificial (Reglamento UE 2024/1689) establece la obligación de "Alfabetización en materia de IA" (AI Literacy). Obliga a los proveedores y a los responsables del despliegue (es decir, a cualquier empresa pública o privada cuyos trabajadores utilicen sistemas de IA en su operativa habitual) a adoptar medidas para asegurar que su personal cuenta con un nivel suficiente de competencias, comprensión de riesgos y uso seguro de la IA.'
    },
    {
      q: '¿Aplica esta exigencia a PYMES o solo a grandes corporaciones?',
      a: 'Aplica a todas las organizaciones sin distinción de tamaño. Si en una empresa de 4 o 40 trabajadores se utiliza ChatGPT, Microsoft Copilot, herramientas de generación de contenidos o automatización, la empresa tiene la consideración legal de "responsable del despliegue" y debe acreditar que sus empleados están formados.'
    },
    {
      q: '¿Cuándo entró en vigor esta obligación?',
      a: 'El Artículo 4 entró en aplicación directa el 2 de febrero de 2025 (a los 6 meses de la entrada en vigor del Reglamento). En España, la Agencia Española de Supervisión de la Inteligencia Artificial (AESIA) y la Inspección de Trabajo vigilan el cumplimiento normativo en las empresas.'
    },
    {
      q: '¿Se puede bonificar al 100% esta formación con FUNDAE?',
      a: 'Sí, absolutamente. Las acciones formativas en Inteligencia Artificial aplicada y seguridad informática están catalogadas como materias de nivel superior prioritarias. A través de la modalidad de Aula Virtual (clases online en directo con especialista en activo), el módulo económico máximo bonificable es de 13 €/hora por participante, lo que permite financiar el 100% del coste con el crédito de formación de la Seguridad Social de tu empresa.'
    },
    {
      q: '¿Qué evidencias documentales entrega FormAI a la empresa para auditorías?',
      a: 'FormAI proporciona un "Dossier Oficial de Cumplimiento del Art. 4" que incluye: diplomas nominales de aprovechamiento con verificación para cada trabajador, temario detallado impartido con registro horario y de asistencia, y una plantilla de Política Corporativa de Uso de IA para que la Dirección la implante formalmente en la empresa.'
    },
    {
      q: '¿Qué riesgos asume una empresa si no acredita la formación de su equipo?',
      a: 'Además de las sanciones formales contempladas en el régimen sancionador del AI Act (supervisado por AESIA), el mayor riesgo real es el laboral y legal: fugas de datos confidenciales y secretos industriales (infracciones del RGPD con multas de hasta 20 millones de euros), errores graves o alucinaciones en contratos y proyectos sin supervisión humana, o reclamaciones por uso de herramientas de IA en procesos de selección no comunicados.'
    }
  ];

  return (
    <div className="aiact-page-wrapper" style={{ paddingBottom: '80px' }}>
      
      {/* Barra de Retorno y Breadcrumbs */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={onBackToHome}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '4px 0'
            }}
          >
            <ArrowLeft size={16} />
            Volver a la portada de FormAI
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>Reglamento (UE) 2024/1689</span>
            <span>·</span>
            <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Artículo 4: AI Literacy</span>
          </div>
        </div>
      </div>

      {/* Hero Principal */}
      <section style={{
        padding: '64px 0 56px 0',
        background: 'radial-gradient(ellipse at 50% 0%, var(--accent-primary-light) 0%, transparent 70%)',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '960px', textAlign: 'center' }}>
          
          {/* Badge institucional europeo */}
          <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              padding: '8px 18px',
              borderRadius: 'var(--border-radius-full)',
              fontSize: '0.88rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🇪🇺</span>
              <span>Reglamento Europeo de IA (AI Act) · Obligación Legal en Vigor</span>
            </span>
          </div>

          <h1 style={{
            fontSize: 'calc(2.2rem + 1.3vw)',
            fontWeight: '800',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            color: 'var(--text-heading)'
          }}>
            Cumple con el <span className="gradient-text">Artículo 4 del AI Act</span>: Alfabetiza a tu plantilla en IA a coste 0€ con FUNDAE
          </h1>

          <p style={{
            fontSize: '1.18rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: '0 auto 36px auto'
          }}>
            La ley europea ya obliga a las empresas que utilizan Inteligencia Artificial a garantizar la formación continua de su personal. En <strong>FormAI</strong> diseñamos e impartimos tu plan oficial de alfabetización en IA, <strong>bonificado al 100% en los Seguros Sociales</strong> y con dossier justificativo auditable ante la AESIA.
          </p>

          {/* Quick Badges de Garantía */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Conforme a Directrices AESIA</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              <Scale size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>100% Bonificable FUNDAE (Coste 0€)</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Certificado Oficial & Dossier Auditable</span>
            </div>
          </div>

          {/* Acciones principales */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => {
                const el = document.getElementById('test-diagnostico');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                padding: '16px 32px',
                borderRadius: 'var(--border-radius-md)',
                fontWeight: '700',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-primary"
            >
              <span>Comprobar si tu empresa está obligada</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => scrollToContact()}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '16px 28px',
                borderRadius: 'var(--border-radius-md)',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="btn-secondary"
            >
              <CalcIcon size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Solicitar Plan de Formación</span>
            </button>
          </div>
        </div>
      </section>

      {/* Test de Diagnóstico Interactivo */}
      <section id="test-diagnostico" style={{ padding: '64px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Diagnóstico Rápido de Compliance</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '12px' }}>
              ¿Afecta el <span className="gradient-text">Artículo 4</span> a tu organización?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.5 }}>
              Marca las situaciones que se dan actualmente en tu empresa o entre tus empleados:
            </p>
          </div>

          <div className="glass-card" style={{
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: checklist.chatgpt ? 'var(--accent-primary-light)' : 'var(--bg-primary)',
                border: checklist.chatgpt ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}>
                <input 
                  type="checkbox" 
                  checked={checklist.chatgpt} 
                  onChange={() => toggleCheck('chatgpt')}
                  style={{ marginTop: '4px', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.98rem', marginBottom: '4px' }}>
                    1. Empleados que usan ChatGPT, Claude o Gemini
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Utilizan modelos de lenguaje para redactar correos, resumir actas, traducir o generar documentación técnica o comercial.
                  </div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: checklist.copilot ? 'var(--accent-primary-light)' : 'var(--bg-primary)',
                border: checklist.copilot ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}>
                <input 
                  type="checkbox" 
                  checked={checklist.copilot} 
                  onChange={() => toggleCheck('copilot')}
                  style={{ marginTop: '4px', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.98rem', marginBottom: '4px' }}>
                    2. Microsoft 365 Copilot o asistentes en Office / Excel
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Manejo de hojas de cálculo con IA, fórmulas generadas automáticamente o copilotos integrados en Teams, Word o PowerPoint.
                  </div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: checklist.marketing ? 'var(--accent-primary-light)' : 'var(--bg-primary)',
                border: checklist.marketing ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}>
                <input 
                  type="checkbox" 
                  checked={checklist.marketing} 
                  onChange={() => toggleCheck('marketing')}
                  style={{ marginTop: '4px', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.98rem', marginBottom: '4px' }}>
                    3. Equipos de Marketing, Ventas o Atención al Cliente
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Generación de contenidos para redes, creatividades, chatbots de respuesta a clientes o análisis de bases de datos comerciales.
                  </div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: checklist.rrhh ? 'var(--accent-primary-light)' : 'var(--bg-primary)',
                border: checklist.rrhh ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}>
                <input 
                  type="checkbox" 
                  checked={checklist.rrhh} 
                  onChange={() => toggleCheck('rrhh')}
                  style={{ marginTop: '4px', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.98rem', marginBottom: '4px' }}>
                    4. Recursos Humanos y Selección asistida por IA
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Filtrado de currículums, redacción de ofertas, evaluaciones de rendimiento o categorización automática de candidatos.
                  </div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: checklist.shadowAi ? 'var(--accent-primary-light)' : 'var(--bg-primary)',
                border: checklist.shadowAi ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}>
                <input 
                  type="checkbox" 
                  checked={checklist.shadowAi} 
                  onChange={() => toggleCheck('shadowAi')}
                  style={{ marginTop: '4px', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.98rem', marginBottom: '4px' }}>
                    5. "Shadow AI" (Uso informal sin política de seguridad definida)
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Trabajadores usando cuentas personales de IA sin directrices claras sobre qué información de la empresa se puede o no introducir.
                  </div>
                </div>
              </label>
            </div>

            {/* Resultado dinámico */}
            <div style={{
              marginTop: '28px',
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: isObligated ? 'rgba(239, 68, 68, 0.08)' : 'var(--bg-tertiary)',
              border: isObligated ? '2px solid rgba(239, 68, 68, 0.3)' : '1px dashed var(--border-color)',
              transition: 'all var(--transition-normal)'
            }}>
              {isObligated ? (
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <AlertTriangle size={32} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#b91c1c', marginBottom: '6px' }}>
                      Obligación Legal Directa: Tu empresa califica como Responsable del Despliegue (*Deployer*)
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px' }}>
                      Al utilizar herramientas de IA en la operativa diaria, el <strong>Artículo 4 del Reglamento (UE) 2024/1689</strong> te obliga a acreditar medidas formativas para evitar fugas de datos confidenciales, errores no supervisados y asegurar la alfabetización técnica de tu equipo.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => scrollToContact()}
                        style={{
                          backgroundColor: '#dc2626',
                          color: '#ffffff',
                          padding: '10px 20px',
                          borderRadius: 'var(--border-radius-sm)',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Regularizar situación con Formación FUNDAE (Coste 0€)
                        <ArrowRight size={15} />
                      </button>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Bonificable al 100% de la Seguridad Social
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  <HelpCircle size={24} style={{ margin: '0 auto 8px auto', opacity: 0.7 }} />
                  <div>Selecciona una o más opciones para evaluar el impacto legal en tu empresa.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Los 4 Pilares Exigidos por el Artículo 4 */}
      <section style={{ padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-ai" style={{ marginBottom: '12px' }}>Exigencias Regulatorias</span>
            <h2 style={{ fontSize: 'calc(1.8rem + 0.6vw)', fontWeight: '800', marginBottom: '14px' }}>
              ¿Qué exige la ley exactamente en <span className="gradient-text">Alfabetización en IA</span>?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              El legislador europeo y la AESIA en España determinan que la formación en IA debe abarcar cuatro dimensiones esenciales:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            
            {/* Pilar 1 */}
            <div className="glass-card" style={{
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>1. Comprensión Técnica y Límites</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
                Los empleados deben comprender cómo procesa la información un modelo de IA, qué son las <strong>alucinaciones</strong>, por qué pueden inventar citas o cifras y cómo validar críticamente cualquier resultado.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="glass-card" style={{
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <Lock size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>2. Privacidad y Seguridad (RGPD)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
                Prohibición de introducir secretos comerciales, datos de clientes, contratos o claves en herramientas públicas. Pautas estrictas de anonimización y configuración empresarial de privacidad.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="glass-card" style={{
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>3. Supervisión Humana Activa</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
                El principio del <em>Human-in-the-loop</em>: ninguna decisión vinculante (laboral, comercial o administrativa) puede delegarse de forma 100% automatizada sin criterio humano responsable.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="glass-card" style={{
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>4. Evidencia y Trazabilidad</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
                La empresa debe contar con registros de asistencia, temarios homologados y diplomas que demuestren que ha cumplido con la diligencia debida ante una inspección de trabajo o requerimiento de la AESIA.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Cronograma Oficial del AI Act */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '920px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Calendario de Aplicación</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '12px' }}>
              Plazos del Reglamento Europeo de IA
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              El calendario normativo ya ha comenzado a exigir responsabilidades a las empresas españolas:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Hito 1 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: '24px',
              padding: '20px 24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
              alignItems: 'center'
            }}>
              <div style={{ fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Agosto 2024
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Entrada en vigor del Reglamento (UE) 2024/1689
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Publicación oficial en el DOUE y constitución del marco regulador europeo.
                </div>
              </div>
            </div>

            {/* Hito 2 - CLAVE */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: '24px',
              padding: '24px',
              backgroundColor: 'var(--accent-primary-light)',
              borderRadius: '14px',
              border: '2px solid var(--accent-primary)',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ fontWeight: '800', color: 'var(--accent-primary)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                Febrero 2025
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Artículo 4: Alfabetización en IA de aplicación OBLIGATORIA</span>
                  <span style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '10px' }}>EN VIGOR</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Todas las empresas que usan IA deben capacitar a sus plantillas. Prohibición de prácticas de riesgo inaceptable (social scoring, manipulación cognitiva).
                </div>
              </div>
            </div>

            {/* Hito 3 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: '24px',
              padding: '20px 24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
              alignItems: 'center'
            }}>
              <div style={{ fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Agosto 2025
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Modelos de IA de uso general (GPAI)
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Obligaciones de transparencia, derechos de autor y auditorías para grandes proveedores de modelos.
                </div>
              </div>
            </div>

            {/* Hito 4 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: '24px',
              padding: '20px 24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
              alignItems: 'center'
            }}>
              <div style={{ fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Agosto 2026
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Sistemas de Alto Riesgo (Anexo III)
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Entran en vigor exigencias estrictas sobre sistemas de IA aplicados a <strong>Recursos Humanos</strong> (evaluación, contratación, promoción y despido de empleados).
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Itinerarios FormAI Especializados */}
      <section style={{ padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-ai" style={{ marginBottom: '12px' }}>Planes Formativos Conformes</span>
            <h2 style={{ fontSize: 'calc(1.8rem + 0.6vw)', fontWeight: '800', marginBottom: '14px' }}>
              Itinerarios FormAI de <span className="gradient-text">Cumplimiento del Artículo 4</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Diseñados con el principio de proporcionalidad de la UE: cada rol recibe la capacitación adecuada a su nivel de exposición y responsabilidad.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px'
          }}>
            
            {/* Itinerario 1 */}
            <div className="glass-card" style={{
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'var(--accent-primary-light)', color: 'var(--accent-primary)', padding: '4px 10px', borderRadius: '12px', fontWeight: '800' }}>
                    NIVEL 1 · OPERATIVA GENERAL
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>8h - 16h</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', lineHeight: 1.3 }}>
                  Alfabetización Transversal en IA & Buenas Prácticas Seguras
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  Ideal para toda la plantilla, administración, comerciales y soporte que utilicen ChatGPT, Claude o asistentes digitales.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Fundamentos de LLMs y cómo evitar alucinaciones.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Técnicas de prompting seguro para tareas del día a día.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Protección de datos (RGPD) y anonimización de documentos.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Revisión humana obligatoria antes de enviar o publicar.</span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-primary)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--accent-primary)'
                }}>
                  💶 100% Bonificable FUNDAE (Módulo 13€/h)
                </div>
                <button
                  onClick={() => scrollToContact()}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  Solicitar este Itinerario
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Itinerario 2 */}
            <div className="glass-card" style={{
              borderRadius: '20px',
              padding: '32px',
              border: '2px solid var(--accent-primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                padding: '3px 12px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '800'
              }}>
                MÁS DEMANDADO
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'var(--accent-primary-light)', color: 'var(--accent-primary)', padding: '4px 10px', borderRadius: '12px', fontWeight: '800' }}>
                    NIVEL 2 · PRODUCTIVIDAD AVANZADA
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>12h - 20h</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', lineHeight: 1.3 }}>
                  Microsoft 365 Copilot & Automatización Corporativa Segura
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  Para controllers, mandos intermedios y departamentos financieros que gestionan datos empresariales en el ecosistema Microsoft.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Copilot en Excel: fórmulas complejas y análisis de datos.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Copilot en Teams, Outlook y Word corporativo.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Permisos de datos sensibles dentro de Microsoft Graph.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Automatizaciones de flujos seguros con Power Automate.</span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-primary)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--accent-primary)'
                }}>
                  💶 100% Bonificable FUNDAE (Módulo 13€/h)
                </div>
                <button
                  onClick={() => scrollToContact()}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  Solicitar este Itinerario
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Itinerario 3 */}
            <div className="glass-card" style={{
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'var(--accent-primary-light)', color: 'var(--accent-primary)', padding: '4px 10px', borderRadius: '12px', fontWeight: '800' }}>
                    NIVEL 3 · GOBERNANZA & RRHH
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>8h</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', lineHeight: 1.3 }}>
                  Gobernanza de IA, Directivos & Recursos Humanos
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  Dirigido a Directores de RRHH, Compliance Officers, Directores de Operaciones y Dirección General.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Impacto del AI Act en contratación, selección y despidos.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Redacción e implantación de la Política Interna de IA.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Auditorías de la AESIA y régimen de infracciones.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Protocolo de respuesta ante incidentes de seguridad con IA.</span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-primary)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--accent-primary)'
                }}>
                  💶 100% Bonificable FUNDAE (Módulo 13€/h)
                </div>
                <button
                  onClick={() => scrollToContact()}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: 'var(--border-radius-sm)',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  Solicitar este Itinerario
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Qué Entrega FormAI: Pack de Compliance */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Tranquilidad para tu Empresa</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '12px' }}>
              El Pack de Cumplimiento Oficial FormAI
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.6 }}>
              No solo impartimos formación práctica: te entregamos todas las evidencias legales exigidas por la normativa.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <Award size={32} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Diplomas Oficiales Individuales</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Certificado nominal con código de verificación para cada trabajador participante, detallando competencias en alfabetización en IA y horas lectivas.
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <FileText size={32} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Dossier Técnico para Auditorías</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Documento justificativo firmado por formadores acreditados, preparado para presentar de inmediato ante Inspecciones de Trabajo o requerimientos de la AESIA.
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <Lock size={32} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Plantilla de Política Interna de IA</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Entregamos a la Dirección de la empresa una guía y política interna adaptada para regular el uso aceptable de herramientas de IA entre todos los trabajadores.
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <Scale size={32} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Gestión Integral de FUNDAE</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Cero burocracia para Recursos Humanos: tramitamos las altas de grupos, seguimiento de participantes y liquidación en los Seguros Sociales a coste 0€.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes sobre el AI Act */}
      <section style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-ai" style={{ marginBottom: '12px' }}>Dudas Frecuentes</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '12px' }}>
              Preguntas Frecuentes sobre el AI Act y FUNDAE
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Todo lo que Recursos Humanos y la Dirección deben saber sobre la nueva legislación.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="glass-card"
                  style={{
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      gap: '16px'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                    ) : (
                      <ChevronDown size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    )}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 20px 24px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.94rem',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '16px'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulario y Contacto Directo */}
      <section id="contacto-aiact" style={{ padding: '72px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Solicitud sin Compromiso</span>
            <h2 style={{ fontSize: 'calc(1.8rem + 0.6vw)', fontWeight: '800', marginBottom: '14px' }}>
              Solicita tu Plan de <span className="gradient-text">Alfabetización en IA</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Cuéntanos cuántos empleados componen tu plantilla y qué herramientas utilizáis. Te calculamos el crédito exacto disponible en FUNDAE y te enviamos la propuesta oficial de cumplimiento a coste 0€.
            </p>
          </div>

          <div className="glass-card" style={{
            padding: '36px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <ContactForm 
              initialSubject="Plan de Alfabetización en IA (Artículo 4 AI Act) - 100% Bonificado"
              initialMessage="Hola, nos gustaría recibir asesoramiento para implantar el plan de formación en alfabetización de Inteligencia Artificial en nuestra empresa para cumplir con el Artículo 4 del AI Act mediante la bonificación de FUNDAE."
            />
          </div>

        </div>
      </section>

    </div>
  );
}
