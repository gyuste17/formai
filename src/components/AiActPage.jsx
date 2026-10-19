import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft, 
  FileText, Users, Building2, Scale, Lock, Sparkles, BookOpen, 
  HelpCircle, ChevronDown, ChevronUp, Clock, Calendar, DownloadCloud,
  Send, Calculator as CalcIcon, Award, Zap, Sliders, Check, X,
  Layers, ArrowUpRight, ShieldAlert, Cpu, Eye
} from 'lucide-react';
import ContactForm from './ContactForm';

export default function AiActPage({ onBackToHome, onOpenCatalogModal }) {
  // Tab activo en el Esquema Interactivo de Impacto Legal
  const [activeArea, setActiveArea] = useState('ofimatica');

  // Toggle para el interactivo Human-in-the-loop en el Bento Grid
  const [isSupervised, setIsSupervised] = useState(true);

  // FAQs desplegables
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Estado para el slider de cálculo de crédito
  const [employeesCount, setEmployeesCount] = useState(18);

  const calculateEstimateCredit = (num) => {
    if (num <= 5) return 420;
    if (num <= 9) return Math.round(num * 105);
    if (num <= 49) return Math.round(num * 88);
    if (num <= 249) return Math.round(num * 72);
    return Math.round(num * 60);
  };

  const estimatedCredit = calculateEstimateCredit(employeesCount);
  const estimatedStudents = Math.min(employeesCount, Math.max(3, Math.round(employeesCount * 0.6)));

  const scrollToContact = (subject = '') => {
    const el = document.getElementById('contacto-aiact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Datos del Esquema Interactivo de Impacto Legal
  const legalImpactAreas = {
    ofimatica: {
      title: 'IA Cotidiana, Asistentes & Ofimática',
      badge: 'Riesgo Específico · Art. 4',
      badgeColor: '#0284c7',
      riskLevel: 'Moderado (Obligación de Alfabetización)',
      riskPercent: 65,
      riskTone: '#0284c7',
      tools: 'ChatGPT, Microsoft Copilot en Excel/Word/Teams, Claude, Gemini',
      whatTeamDoes: 'Redacción de correos, generación de fórmulas en hojas de cálculo, actas de reuniones y resúmenes de documentación comercial.',
      legalRule: 'Artículo 4 del Reglamento (UE) 2024/1689: Exige medidas de alfabetización continua al personal que usa IA.',
      consequence: 'Sin formación, empleados introducen datos confidenciales en prompts públicos (infracción grave RGPD hasta 20M€) y confían en alucinaciones en contratos.',
      solution: 'Itinerario 1 (Alfabetización Transversal 8h-16h) o Itinerario 2 (Copilot 365 12h-20h), 100% bonificables por FUNDAE.',
      itineraryId: 'itinerario-1'
    },
    rrhh: {
      title: 'Recursos Humanos, Selección & Evaluación',
      badge: 'ALTO RIESGO · Anexo III',
      badgeColor: '#dc2626',
      riskLevel: 'Alto Riesgo (Regulación Estricta)',
      riskPercent: 95,
      riskTone: '#dc2626',
      tools: 'Software ATS con IA, cribado automático de CVs, tests predictivos, analítica de productividad',
      whatTeamDoes: 'Filtrado previo de candidatos, redacción y ranking de perfiles, evaluación de rendimiento laboral o monitorización de empleados.',
      legalRule: 'Anexo III.4 y Artículos 26 y 27: Calificado expresamente como "Sistemas de IA de Alto Riesgo". Exige supervisión humana, transparencia y formación.',
      consequence: 'Sanciones de hasta 15 millones de euros o 3% de la facturación anual por uso no transparente o sesgos discriminatorios en contratación.',
      solution: 'Itinerario 3 (Gobernanza de IA, Directivos & RRHH 8h): diseño de protocolos humanos y marco de compliance bonificable.',
      itineraryId: 'itinerario-3'
    },
    shadowAi: {
      title: '"Shadow AI" & Cuentas Personales',
      badge: 'Riesgo Crítico de Fuga RGPD',
      badgeColor: '#ea580c',
      riskLevel: 'Crítico (Brechas de Seguridad)',
      riskPercent: 88,
      riskTone: '#ea580c',
      tools: 'Cuentas gratuitas de ChatGPT/DeepSeek/Midjourney utilizadas en ordenadores corporativos',
      whatTeamDoes: 'Los empleados recurren a la IA por iniciativa propia para resolver tareas más rápido, sin directrices de la empresa.',
      legalRule: 'Artículo 32 del RGPD y Art. 4 del AI Act: Responsabilidad directa del administrador por no disponer de política interna de uso aceptable.',
      consequence: 'Fugas masivas de secretos industriales y datos de clientes hacia servidores de entrenamiento de terceros fuera de la UE.',
      solution: 'Plan de Formación Transversal + Entrega de la Política Interna Corporativa de FormAI para su firma formal en la plantilla.',
      itineraryId: 'itinerario-1'
    },
    marketing: {
      title: 'Marketing, Ventas & Atención a Clientes',
      badge: 'Deber de Transparencia · Art. 50',
      badgeColor: '#7c3aed',
      riskLevel: 'Medio-Alto (Deber de Información)',
      riskPercent: 72,
      riskTone: '#7c3aed',
      tools: 'Generación de imágenes sintéticas, chatbots de soporte, bots de prospección comercial',
      whatTeamDoes: 'Creación de campañas, redacción de copys comerciales, respuestas automáticas a clientes y segmentación de leads.',
      legalRule: 'Artículo 50: Obligación de avisar a los usuarios de que están interactuando con un sistema de IA o visualizando contenido sintético.',
      consequence: 'Publicidad engañosa, infracción de derechos de autor e incumplimiento del deber de transparencia hacia consumidores.',
      solution: 'Itinerario de IA aplicada y ética publicitaria, bonificado 100% mediante FUNDAE.',
      itineraryId: 'itinerario-2'
    }
  };

  const currentArea = legalImpactAreas[activeArea];

  const faqs = [
    {
      q: '¿Qué es exactamente el Artículo 4 del AI Act y a quién obliga?',
      a: 'El Artículo 4 del Reglamento Europeo de Inteligencia Artificial (Reglamento UE 2024/1689) establece la obligación de "Alfabetización en materia de IA" (AI Literacy). Obliga a todos los responsables del despliegue (es decir, cualquier empresa en España cuyos trabajadores utilicen sistemas de IA en su operativa habitual) a adoptar medidas para asegurar que su personal cuenta con un nivel suficiente de competencias, comprensión de riesgos y uso seguro de la IA.'
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
    <div className="aiact-page-wrapper" style={{ paddingBottom: '90px' }}>
      
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
            <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>Artículo 4: AI Literacy</span>
          </div>
        </div>
      </div>

      {/* Hero Principal con Halo Animado y Microinteracciones */}
      <section style={{
        padding: '68px 0 60px 0',
        background: 'radial-gradient(ellipse at 50% 0%, var(--accent-primary-light) 0%, transparent 75%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '980px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* Badge institucional europeo con micro-pulso */}
          <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="badge-pulse-glow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              padding: '8px 20px',
              borderRadius: 'var(--border-radius-full)',
              fontSize: '0.88rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>🇪🇺</span>
              <span>Reglamento Europeo de IA (AI Act) · Obligación Legal en Vigor</span>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
                display: 'inline-block'
              }} />
            </span>
          </div>

          <h1 style={{
            fontSize: 'calc(2.2rem + 1.4vw)',
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
            maxWidth: '800px',
            margin: '0 auto 36px auto'
          }}>
            La legislación europea ya obliga a las empresas cuyos empleados utilizan herramientas de Inteligencia Artificial a acreditar su capacitación continua. En <strong>FormAI</strong> diseñamos e impartimos tu plan de alfabetización en IA, <strong>bonificado al 100% en los Seguros Sociales</strong> y con dossier justificativo para auditorías de la AESIA.
          </p>

          {/* Quick Badges de Garantía con elevación hover */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px'
          }}>
            <div className="hover-lift-sm" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.88rem',
              fontWeight: '600',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Conforme a Directrices AESIA</span>
            </div>

            <div className="hover-lift-sm" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.88rem',
              fontWeight: '600',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Scale size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>100% Bonificable FUNDAE (Coste 0€)</span>
            </div>

            <div className="hover-lift-sm" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: 'var(--border-radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.88rem',
              fontWeight: '600',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Certificado Oficial & Dossier Auditable</span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => {
                const el = document.getElementById('esquema-impacto');
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
              <span>Explorar Esquema de Impacto Legal</span>
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
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-secondary"
            >
              <CalcIcon size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Calcular Crédito y Solicitar Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN RENOVADA: ESQUEMA INTERACTIVO DE IMPACTO LEGAL */}
      <section id="esquema-impacto" style={{ padding: '72px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '1020px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Arquitectura Jurídica de la IA</span>
            <h2 style={{ fontSize: 'calc(1.8rem + 0.6vw)', fontWeight: '800', marginBottom: '12px' }}>
              Esquema de <span className="gradient-text">Impacto Legal y Riesgos</span> por Área
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto' }}>
              El AI Act no sanciona el uso de la IA, sino su despliegue sin formación ni control. Selecciona el área operativa de tu empresa para visualizar su flujo regulatorio, nivel de exposición y solución bonificable:
            </p>
          </div>

          {/* Navegador de Pestañas Interactivas con micro-animaciones */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {[
              { id: 'ofimatica', label: '💼 Ofimática & Copilot', subtitle: 'Excel, ChatGPT, Teams' },
              { id: 'rrhh', label: '👥 RRHH & Contratación', subtitle: 'Alto Riesgo (Anexo III)' },
              { id: 'shadowAi', label: '🛡️ "Shadow AI" Oculta', subtitle: 'Fugas de Datos RGPD' },
              { id: 'marketing', label: '🤖 Ventas & Marketing', subtitle: 'Bots y Contenido IA' }
            ].map(tab => {
              const isSelected = activeArea === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveArea(tab.id)}
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-primary)',
                    color: isSelected ? '#ffffff' : 'var(--text-primary)',
                    border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    padding: '16px 14px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                  className="interactive-tab-btn"
                >
                  <span style={{ fontWeight: '800', fontSize: '0.98rem' }}>{tab.label}</span>
                  <span style={{ fontSize: '0.8rem', opacity: isSelected ? 0.9 : 0.65 }}>{tab.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Panel Dinámico del Esquema Visual con Diagrama de Flujo Conectado */}
          <div className="glass-card animate-fade-in" style={{
            padding: '36px',
            borderRadius: '24px',
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            
            {/* Cabecera del Área con Nivel de Riesgo y Medidor */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '20px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '32px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{
                    backgroundColor: `${currentArea.riskTone}18`,
                    color: currentArea.riskTone,
                    fontWeight: '800',
                    fontSize: '0.82rem',
                    padding: '4px 12px',
                    borderRadius: 'var(--border-radius-full)',
                    border: `1px solid ${currentArea.riskTone}40`
                  }}>
                    {currentArea.badge}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Herramientas: <strong>{currentArea.tools}</strong></span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-heading)' }}>
                  {currentArea.title}
                </h3>
              </div>

              {/* Medidor Visual de Exposición Legal */}
              <div style={{
                backgroundColor: 'var(--bg-primary)',
                padding: '14px 20px',
                borderRadius: '14px',
                border: '1px solid var(--border-color)',
                minWidth: '240px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Nivel de Exposición:</span>
                  <span style={{ fontWeight: '800', color: currentArea.riskTone }}>{currentArea.riskLevel}</span>
                </div>
                {/* Barra de progreso animada */}
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--border-color)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${currentArea.riskPercent}%`,
                    height: '100%',
                    backgroundColor: currentArea.riskTone,
                    borderRadius: '4px',
                    transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>
              </div>
            </div>

            {/* Diagrama de Flujo Visual (3 Pasos Conectados) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              position: 'relative',
              marginBottom: '32px'
            }}>
              
              {/* Paso 1: Práctica Real */}
              <div style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '16px',
                padding: '22px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '700' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>1</span>
                  <span>USO EN LA PLANTILLA</span>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  ¿Qué hace el equipo?
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {currentArea.whatTeamDoes}
                </p>
              </div>

              {/* Paso 2: Impacto Normativo */}
              <div style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '16px',
                padding: '22px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: '700' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--accent-primary)'
                  }}>2</span>
                  <span>MARCO REGULATORIO</span>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  ¿Qué exige la ley?
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {currentArea.legalRule}
                </p>
              </div>

              {/* Paso 3: Consecuencia / Riesgo */}
              <div style={{
                backgroundColor: `${currentArea.riskTone}08`,
                borderRadius: '16px',
                padding: '22px',
                border: `1px solid ${currentArea.riskTone}35`,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: currentArea.riskTone, fontSize: '0.82rem', fontWeight: '700' }}>
                  <ShieldAlert size={16} />
                  <span>RIESGO DE NO FORMAR</span>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: currentArea.riskTone }}>
                  Consecuencia directa
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                  {currentArea.consequence}
                </p>
              </div>

            </div>

            {/* Solución Conforme FormAI Integrada */}
            <div style={{
              backgroundColor: 'var(--accent-primary-light)',
              borderRadius: '18px',
              padding: '22px 28px',
              border: '2px solid var(--accent-primary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: 'var(--accent-primary-text, var(--accent-primary))', fontSize: '0.92rem', marginBottom: '4px' }}>
                  <CheckCircle2 size={18} />
                  <span>Solución Oficial FormAI (Coste 0€ con FUNDAE):</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, fontWeight: '500' }}>
                  {currentArea.solution}
                </p>
              </div>

              <button
                onClick={() => {
                  const target = document.getElementById(currentArea.itineraryId);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    scrollToContact();
                  }
                }}
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  padding: '11px 22px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Ver Plan y Temario Conforme
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* BENTO GRID: CUMPLIMIENTO INNOVADOR & EVIDENCIAS */}
      <section style={{ padding: '76px 0' }}>
        <div className="container" style={{ maxWidth: '1020px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-ai" style={{ marginBottom: '12px' }}>Ecosistema de Cumplimiento</span>
            <h2 style={{ fontSize: 'calc(1.8rem + 0.6vw)', fontWeight: '800', marginBottom: '14px' }}>
              El <span className="gradient-text">Pack Integral de Compliance</span> de FormAI
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              No solo capacitamos a tu equipo: dotamos a la empresa de todas las garantías jurídicas y técnicas que exige la normativa europea.
            </p>
          </div>

          {/* Bento Grid Asimétrico */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px'
          }}>
            
            {/* Bento Card 1: Dossier Oficial para AESIA (Gran Card 7 cols) */}
            <div className="glass-card hover-lift" style={{
              gridColumn: 'span 7',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'var(--accent-primary-light)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '12px', fontWeight: '800' }}>
                    AUDITABLE ANTE AESIA E INSPECCIÓN
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px' }}>
                  Dossier Técnico Justificativo del Artículo 4
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Documento formal firmado por nuestros especialistas acreditados que certifica la diligencia debida de la empresa: horas lectivas, competencias adquiridas, módulos de mitigación de sesgos y registro fehaciente de asistencia.
                </p>
              </div>

              {/* Mockup visual de verificación digital */}
              <div style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={22} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Certificado Nominal con QR de Verificación</div>
                    <div style={{ color: 'var(--text-muted)' }}>Válido ante requerimientos laborales y regulatorios</div>
                  </div>
                </div>
                <span style={{ color: '#10b981', fontWeight: '800' }}>✓ Homologado</span>
              </div>
            </div>

            {/* Bento Card 2: Human-in-the-Loop Interactivo (5 cols) */}
            <div className="glass-card hover-lift" style={{
              gridColumn: 'span 5',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--accent-ai)' }}>
                  <Eye size={22} />
                  <span style={{ fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase' }}>Supervisión Humana Activa</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '10px' }}>
                  Human-in-the-Loop
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  El AI Act prohíbe delegar ciegamente decisiones en la IA sin supervisión humana.
                </p>

                {/* Switch interactivo de simulación */}
                <div style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '14px',
                  padding: '16px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700' }}>Estado Operativo:</span>
                    <button
                      onClick={() => setIsSupervised(!isSupervised)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        backgroundColor: isSupervised ? '#10b981' : '#ef4444',
                        color: '#ffffff',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isSupervised ? '✓ Supervisado (Conforme)' : '✗ Sin Control (Riesgo)'}
                    </button>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: isSupervised ? '#059669' : '#b91c1c', lineHeight: 1.4 }}>
                    {isSupervised 
                      ? 'Todo output de IA es validado por personal alfabetizado antes de emitirse o aplicarse.'
                      : 'La plantilla aplica datos y contratos de la IA sin filtros: riesgo inminente de alucinaciones y sanciones.'}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Enseñamos a tus empleados los protocolos de validación crítica.
              </div>
            </div>

            {/* Bento Card 3: Bonificación 100% FUNDAE (5 cols) */}
            <div className="glass-card hover-lift" style={{
              gridColumn: 'span 5',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--accent-primary)' }}>
                  <Scale size={22} />
                  <span style={{ fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase' }}>Crédito Anual Garantizado</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '10px' }}>
                  Financiación al 100% (Coste 0€)
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  Las empresas disponen de un crédito que caduca cada 31 de diciembre. La formación en IA en Aula Virtual se bonifica a <strong>13 €/hora/alumno</strong> deduciéndolo de los Seguros Sociales.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px dashed var(--accent-primary)',
                textAlign: 'center',
                fontWeight: '700',
                color: 'var(--accent-primary)',
                fontSize: '0.88rem'
              }}>
                💶 Coste Neto para tu Empresa: 0 Euros
              </div>
            </div>

            {/* Bento Card 4: Política Interna de IA de Regalo (7 cols) */}
            <div className="glass-card hover-lift" style={{
              gridColumn: 'span 7',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div>
                <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', backgroundColor: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', padding: '4px 12px', borderRadius: '12px', fontWeight: '800' }}>
                    INCLUIDO SIN COSTE ADICIONAL
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px' }}>
                  Plantilla de Política Interna de Uso de IA
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Entregamos a la Dirección de tu empresa un manual corporativo de uso ético y seguro de IA listo para implementar. Define qué datos pueden procesarse, qué herramientas están autorizadas y qué responsabilidades asumen los empleados.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>✓ Adaptado al RGPD</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>✓ Aprobado para auditorías</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>✓ Redactado en lenguaje accesible</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CRONOGRAMA DINÁMICO DE LA LEY EUROPEA */}
      <section style={{ padding: '72px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '940px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Calendario Regulatorio</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '12px' }}>
              Los Plazos del AI Act y su Estado Real
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              La ley se implanta de manera escalonada en toda la Unión Europea:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Hito 1 */}
            <div className="timeline-node" style={{
              display: 'grid',
              gridTemplateColumns: '170px 1fr',
              gap: '24px',
              padding: '20px 24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              alignItems: 'center',
              opacity: 0.85
            }}>
              <div style={{ fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Agosto 2024
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Entrada en vigor del Reglamento (UE) 2024/1689
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Publicación oficial en el DOUE y creación de la Agencia Española de Supervisión de la IA (AESIA).
                </div>
              </div>
            </div>

            {/* Hito 2 - OBLIGACIÓN EN VIGOR */}
            <div className="timeline-node timeline-node-active" style={{
              display: 'grid',
              gridTemplateColumns: '170px 1fr',
              gap: '24px',
              padding: '24px 28px',
              backgroundColor: 'var(--accent-primary-light)',
              borderRadius: '16px',
              border: '2px solid var(--accent-primary)',
              alignItems: 'center',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}>
              <div style={{ fontWeight: '800', color: 'var(--accent-primary)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.25rem' }}>⚡</span>
                Febrero 2025
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1.08rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span>Artículo 4: Alfabetización en IA de aplicación OBLIGATORIA</span>
                  <span style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff', fontSize: '0.74rem', padding: '3px 10px', borderRadius: '12px', fontWeight: '800' }}>
                    OBLIGACIÓN VIGENTE
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                  Todas las empresas que usan IA deben capacitar formalmente a sus plantillas. Prohibición tajante de prácticas de riesgo inaceptable (social scoring, manipulación cognitiva).
                </div>
              </div>
            </div>

            {/* Hito 3 */}
            <div className="timeline-node" style={{
              display: 'grid',
              gridTemplateColumns: '170px 1fr',
              gap: '24px',
              padding: '20px 24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
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
                  Obligaciones de transparencia, licencias de propiedad intelectual y auditorías para grandes proveedores de modelos.
                </div>
              </div>
            </div>

            {/* Hito 4 */}
            <div className="timeline-node" style={{
              display: 'grid',
              gridTemplateColumns: '170px 1fr',
              gap: '24px',
              padding: '20px 24px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
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
                  Exigencias exhaustivas para sistemas de IA aplicados a <strong>Recursos Humanos</strong> (evaluación, contratación, promoción y despido de empleados).
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ITINERARIOS FORMATIVOS OFICIALES */}
      <section style={{ padding: '76px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-ai" style={{ marginBottom: '12px' }}>Itinerarios Homologados</span>
            <h2 style={{ fontSize: 'calc(1.8rem + 0.6vw)', fontWeight: '800', marginBottom: '14px' }}>
              Planes de <span className="gradient-text">Alfabetización Conforme al Art. 4</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Diseñados con el principio de proporcionalidad de la UE: cada departamento recibe la formación exacta que requiere su operativa diaria.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px'
          }}>
            
            {/* Itinerario 1 */}
            <div id="itinerario-1" className="glass-card hover-lift" style={{
              borderRadius: '24px',
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
                  Para toda la plantilla, administración, comerciales y soporte que utilicen ChatGPT, Claude o asistentes digitales.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.86rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span>Fundamentos de LLMs y mitigación de alucinaciones.</span>
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
                    color: '#ffffff',
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
            <div id="itinerario-2" className="glass-card hover-lift" style={{
              borderRadius: '24px',
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
                color: '#ffffff',
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
                  Microsoft 365 Copilot & Automatización Segura
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  Para controllers, mandos intermedios y departamentos financieros que gestionan datos empresariales en Office y Teams.
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
                    <span>Permisos y aislamiento de datos en Microsoft Graph.</span>
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
                    color: '#ffffff',
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
            <div id="itinerario-3" className="glass-card hover-lift" style={{
              borderRadius: '24px',
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
                    color: '#ffffff',
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

      {/* COMPARATIVA SPLIT: EMPRESA VULNERABLE VS CERTIFICADA */}
      <section style={{ padding: '72px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Análisis de Situación</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '12px' }}>
              ¿En qué situación se encuentra tu empresa hoy?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              La diferencia entre operar expuesto o respaldado legalmente:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            
            {/* Panel Vulnerable */}
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              borderRadius: '20px',
              padding: '32px',
              border: '2px solid rgba(239, 68, 68, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#dc2626', fontWeight: '800' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} />
                </div>
                <span>EMPRESA SIN PLAN DE ALFABETIZACIÓN</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#dc2626', fontWeight: '800' }}>✗</span>
                  <span>Prompts con datos de clientes y secretos empresariales introducidos en herramientas públicas de IA.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#dc2626', fontWeight: '800' }}>✗</span>
                  <span>Alucinaciones y datos erróneos no contrastados en propuestas comerciales y contratos.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#dc2626', fontWeight: '800' }}>✗</span>
                  <span>Incumplimiento directo del Artículo 4 ante una inspección de la AESIA o de Trabajo.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#dc2626', fontWeight: '800' }}>✗</span>
                  <span>Pérdida anual del crédito formativo de FUNDAE que la empresa ya ha cotizado a la Seguridad Social.</span>
                </div>
              </div>
            </div>

            {/* Panel Certificado */}
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.06)',
              borderRadius: '20px',
              padding: '32px',
              border: '2px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontWeight: '800' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={18} />
                </div>
                <span>EMPRESA CERTIFICADA CON FORMAI</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#059669', fontWeight: '800' }}>✓</span>
                  <span>Plantilla capacitada en prompting seguro, privacidad RGPD y detección de errores.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#059669', fontWeight: '800' }}>✓</span>
                  <span>Supervisión humana reforzada y protocolo corporativo de uso aceptable formalmente implantado.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#059669', fontWeight: '800' }}>✓</span>
                  <span>Dossier técnico y diplomas oficiales con QR listos para cualquier requerimiento de auditoría.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#059669', fontWeight: '800' }}>✓</span>
                  <span><strong>Coste neto 0€</strong> gracias a la bonificación íntegra a través de los créditos FUNDAE.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SIMULADOR RÁPIDO DE CRÉDITO FUNDAE */}
      <section style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          
          <div className="glass-card" style={{
            padding: '40px',
            borderRadius: '24px',
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}>
            <span className="badge badge-primary" style={{ marginBottom: '14px' }}>Simulador de Crédito</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
              Calcula la Cobertura para tu Plan de Alfabetización
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', marginBottom: '32px' }}>
              Selecciona el número aproximado de empleados en plantilla para estimar tu crédito anual:
            </p>

            {/* Slider interactivo */}
            <div style={{ maxWidth: '480px', margin: '0 auto 28px auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-muted)' }}>Plantilla contratada:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  {employeesCount} empleados
                </span>
              </div>
              <input 
                type="range"
                min="1"
                max="120"
                value={employeesCount}
                onChange={(e) => setEmployeesCount(parseInt(e.target.value, 10))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '6px',
                  accentColor: 'var(--accent-primary)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>1 empleado</span>
                <span>50 empleados</span>
                <span>120+ empleados</span>
              </div>
            </div>

            {/* Resultado visual */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid var(--border-color)',
              marginBottom: '28px'
            }}>
              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Crédito Anual Estimado:</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '4px' }}>
                  ~{estimatedCredit.toLocaleString('es-ES')} €
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Alumnos Cubiertos al 100%:</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {estimatedStudents} participantes
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Coste Neto de Gestión:</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
                  0 € (100% Bonificado)
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToContact()}
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: 'var(--border-radius-md)',
                fontWeight: '700',
                fontSize: '0.98rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              Solicitar Validación Exacta de Crédito sin Compromiso
              <ArrowRight size={17} />
            </button>
          </div>

        </div>
      </section>

      {/* PREGUNTAS FRECUENTES SOBRE EL AI ACT */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-secondary)' }}>
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
                    borderRadius: '16px',
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

      {/* FORMULARIO DE CONTACTO PRIORITARIO */}
      <section id="contacto-aiact" style={{ padding: '76px 0' }}>
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
            borderRadius: '24px',
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

      {/* CSS ESPECÍFICO PARA ANIMACIONES Y MICRO-INTERACCIONES */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
        }
        .badge-pulse-glow {
          animation: pulseGlow 3s infinite;
        }
        .hover-lift {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease !important;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl) !important;
        }
        .hover-lift-sm {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift-sm:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .interactive-tab-btn:hover {
          transform: translateY(-2px);
        }
        .timeline-node {
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .timeline-node:hover {
          border-color: var(--accent-primary) !important;
          transform: translateX(4px);
        }
        @media (max-width: 860px) {
          .glass-card {
            padding: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .timeline-node {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          [style*="gridColumn: 'span 7'"],
          [style*="gridColumn: 'span 5'"] {
            grid-column: span 12 !important;
          }
        }
      `}</style>

    </div>
  );
}
