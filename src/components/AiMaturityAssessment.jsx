import React, { useState, useEffect, useMemo } from 'react';
import {
  Cpu, Database, Bot, ShieldCheck, TrendingUp, ArrowRight, ArrowLeft,
  CheckCircle2, FileText, Download, Share2, Building2,
  Check, RefreshCw, BarChart3, HelpCircle, Sparkles, Award, Lock,
  Printer, AlertCircle, Info
} from 'lucide-react';
import {
  AI_BENCHMARK_METADATA,
  AI_MATURITY_DIMENSIONS,
  AI_MATURITY_QUESTIONS,
  AI_MATURITY_LEVELS,
  calculateMaturityScore
} from '../data/aiMaturityData';
import './AiMaturityAssessment.css';

export default function AiMaturityAssessment({ onBackToHome, onNavigateToContact }) {
  // Detectar empresa personalizada por URL (ej. ?empresa=profine, ?empresa=kommerling, ?empresa=commerlyn)
  const [companyName, setCompanyName] = useState(() => {
    if (typeof window === 'undefined') return '';
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const emp = (searchParams.get('empresa') || hashParams.get('empresa') || '').trim();
    const empLower = emp.toLowerCase();
    if (empLower === 'profine' || empLower === 'kommerling' || empLower === 'commerlyn') {
      return 'Kömmerling (Profine Iberia)';
    }
    return emp;
  });

  const isKommerling = useMemo(() => {
    const lower = companyName.toLowerCase();
    return lower.includes('profine') || lower.includes('kommerling') || lower.includes('commerlyn');
  }, [companyName]);

  // Sincronizar empresa al cambiar hash
  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window === 'undefined') return;
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
      const emp = (searchParams.get('empresa') || hashParams.get('empresa') || '').trim();
      const empLower = emp.toLowerCase();
      if (empLower === 'profine' || empLower === 'kommerling' || empLower === 'commerlyn') {
        setCompanyName('Kömmerling (Profine Iberia)');
      } else {
        setCompanyName(emp);
      }
      setStep('intro');
      setCurrentQuestionIdx(0);
      setAnswers({});
    };

    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  // Estados del asistente
  const [step, setStep] = useState('intro'); // 'intro' | 'wizard' | 'results'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll suave hacia arriba al cambiar de paso
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step, currentQuestionIdx]);

  const currentQuestion = AI_MATURITY_QUESTIONS[currentQuestionIdx];
  const currentDimension = useMemo(() => {
    if (!currentQuestion) return null;
    return AI_MATURITY_DIMENSIONS.find(d => d.id === currentQuestion.dimensionId);
  }, [currentQuestion]);

  const progressPercent = Math.round(((currentQuestionIdx) / AI_MATURITY_QUESTIONS.length) * 100);

  // Manejar selección de respuesta
  const handleSelectOption = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < AI_MATURITY_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    } else {
      setStep('intro');
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setStep('wizard');
  };

  // Cálculo de resultados
  const results = useMemo(() => {
    return calculateMaturityScore(answers);
  }, [answers]);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Coordenadas para el gráfico Radar SVG
  const radarPoints = useMemo(() => {
    const totalDimensions = AI_MATURITY_DIMENSIONS.length;
    const center = 150;
    const radius = 100;

    // Puntos de la empresa
    const companyCoords = AI_MATURITY_DIMENSIONS.map((dim, i) => {
      const angle = (Math.PI * 2 / totalDimensions) * i - Math.PI / 2;
      const score = results.dimensions[dim.id] || 0;
      const r = (score / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    // Puntos del benchmark industrial
    const benchmarkCoords = AI_MATURITY_DIMENSIONS.map((dim, i) => {
      const angle = (Math.PI * 2 / totalDimensions) * i - Math.PI / 2;
      const r = (dim.benchmarkAverage / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return { companyCoords, benchmarkCoords, center, radius };
  }, [results]);

  return (
    <div className="ai-maturity-wrapper">
      <div className="ai-maturity-mesh-bg" />

      {/* Barra superior de navegación */}
      <div className="ai-maturity-topbar">
        <div className="ai-maturity-topbar-inner">
          <button onClick={onBackToHome} className="ai-maturity-back-btn">
            <ArrowLeft size={16} />
            <span>Volver a FormAI</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isKommerling ? (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                background: '#eff6ff',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe'
              }}>
                <Building2 size={13} color="#2563eb" />
                Kömmerling (Profine Iberia)
              </span>
            ) : (
              <>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: '#eff6ff',
                  color: '#1d4ed8',
                  border: '1px solid #bfdbfe'
                }}>
                  <Sparkles size={12} color="#2563eb" />
                  Benchmark 2026
                </span>
                {companyName && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #cbd5e1'
                  }}>
                    <Building2 size={13} color="#64748b" />
                    {companyName}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="ai-maturity-container">
        {/* ========================================================
            VISTA 1: INTRODUCCIÓN / HERO
           ======================================================== */}
        {step === 'intro' && (
          <div>
            {/* --- VERSIÓN A: KÖMMERLING (PROFINE) - Sobria, ejecutiva, directa sin venta --- */}
            {isKommerling ? (
              <div>
                <div className="ai-maturity-hero" style={{ marginBottom: '24px' }}>
                  <div className="ai-maturity-pill-tag" style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}>
                    <Building2 size={14} color="#2563eb" />
                    <span>Evaluación Corporativa de IA · Kömmerling (Profine)</span>
                  </div>

                  <h1 className="ai-maturity-title" style={{ marginBottom: '10px' }}>
                    Diagnóstico Técnico de Madurez en{' '}
                    <span className="ai-maturity-gradient-text">
                      Inteligencia Artificial
                    </span>
                  </h1>

                  <p className="ai-maturity-desc" style={{ maxWidth: '640px', fontSize: '1rem', color: '#475569' }}>
                    Auditoría técnica de capacidades, infraestructura y gobernanza de datos para la Dirección General y Recursos Humanos frente a los estándares de la industria europea.
                  </p>
                </div>

                {/* Las 5 Dimensiones Evaluadas */}
                <div className="ai-maturity-dimensions-grid" style={{ margin: '24px 0 28px 0' }}>
                  {AI_MATURITY_DIMENSIONS.map((dim) => (
                    <div key={dim.id} className="ai-maturity-dimension-card">
                      <div className="ai-maturity-dim-icon-wrapper">
                        {dim.id === 'tooling' && <Cpu size={17} />}
                        {dim.id === 'data' && <Database size={17} />}
                        {dim.id === 'agentic' && <Bot size={17} />}
                        {dim.id === 'governance' && <ShieldCheck size={17} />}
                        {dim.id === 'adoption' && <TrendingUp size={17} />}
                      </div>
                      <h4 className="ai-maturity-dim-title">{dim.name}</h4>
                      <p className="ai-maturity-dim-desc">{dim.description}</p>
                    </div>
                  ))}
                </div>

                {/* Botón de Inicio Sencillo y Directo (Sin venta ni puntos de marketing) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    onClick={() => setStep('wizard')}
                    className="ai-maturity-btn-primary"
                    style={{ fontSize: '1.02rem', padding: '14px 36px' }}
                  >
                    <span>Iniciar Autoevaluación</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              /* --- VERSIÓN B: GENERAL - Comercial con venta, subtítulos y llamadas a la acción --- */
              <div>
                <div className="ai-maturity-hero">
                  <div className="ai-maturity-pill-tag">
                    <ShieldCheck size={14} color="#2563eb" />
                    <span>Metodología basada en Gartner, Microsoft AI & EU AI Act</span>
                  </div>

                  <h1 className="ai-maturity-title">
                    Test de Madurez en{' '}
                    <span className="ai-maturity-gradient-text">
                      Inteligencia Artificial
                    </span>
                  </h1>

                  <p className="ai-maturity-desc">
                    Descubre en 3 minutos la posición tecnológica real de tu empresa frente a los estándares de la industria europea, identifica cuellos de botella y obtén un informe ejecutivo para tu Comité de Dirección o Matriz.
                  </p>
                </div>

                {/* Input opcional de empresa si entra por link general */}
                {!companyName && (
                  <div style={{
                    maxWidth: '440px',
                    margin: '0 auto 28px auto',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                      Nombre de tu empresa (opcional para personalizar el informe):
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ej. Siemens, Grupo Aciturri, Mahou..."
                      style={{
                        width: '100%',
                        padding: '9px 14px',
                        fontSize: '0.88rem',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}

                {/* Las 5 Dimensiones Evaluadas */}
                <div className="ai-maturity-dimensions-grid">
                  {AI_MATURITY_DIMENSIONS.map((dim) => (
                    <div key={dim.id} className="ai-maturity-dimension-card">
                      <div className="ai-maturity-dim-icon-wrapper">
                        {dim.id === 'tooling' && <Cpu size={17} />}
                        {dim.id === 'data' && <Database size={17} />}
                        {dim.id === 'agentic' && <Bot size={17} />}
                        {dim.id === 'governance' && <ShieldCheck size={17} />}
                        {dim.id === 'adoption' && <TrendingUp size={17} />}
                      </div>
                      <h4 className="ai-maturity-dim-title">{dim.name}</h4>
                      <p className="ai-maturity-dim-desc">{dim.description}</p>
                    </div>
                  ))}
                </div>

                {/* Llamada a la acción con puntos de venta */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
                  <button
                    onClick={() => setStep('wizard')}
                    className="ai-maturity-btn-primary"
                    style={{ fontSize: '1rem', padding: '14px 34px' }}
                  >
                    <span>Iniciar Autoevaluación Gratuita</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', fontSize: '0.78rem', color: '#64748b' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={14} color="#059669" />
                      11 preguntas rápidas (3 min)
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={14} color="#2563eb" />
                      100% Confidencial y Anónimo
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} color="#4f46e5" />
                      Informe descargable inmediato
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            VISTA 2: ASISTENTE INTERACTIVO (WIZARD GUIADO)
           ======================================================== */}
        {step === 'wizard' && currentQuestion && (
          <div>
            {/* Barra de progreso */}
            <div className="ai-maturity-progress-bar-wrapper">
              <div className="ai-maturity-progress-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="ai-maturity-dim-pill">
                    {currentDimension?.id === 'tooling' && <Cpu size={12} />}
                    {currentDimension?.id === 'data' && <Database size={12} />}
                    {currentDimension?.id === 'agentic' && <Bot size={12} />}
                    {currentDimension?.id === 'governance' && <ShieldCheck size={12} />}
                    {currentDimension?.id === 'adoption' && <TrendingUp size={12} />}
                    <span>{currentDimension?.shortName}</span>
                  </span>
                  <span>Pregunta {currentQuestionIdx + 1} de {AI_MATURITY_QUESTIONS.length}</span>
                </div>
                <span>{progressPercent}% completado</span>
              </div>

              <div className="ai-maturity-progress-track">
                <div
                  className="ai-maturity-progress-fill"
                  style={{ width: `${Math.max(8, progressPercent)}%` }}
                />
              </div>
            </div>

            {/* Tarjeta de la Pregunta */}
            <div className="ai-maturity-wizard-card">
              <div className="ai-maturity-question-tag-row">
                <span className="ai-maturity-dim-pill">
                  {currentDimension?.name}
                </span>
                {currentQuestion.conceptTag && (
                  <span className="ai-maturity-concept-pill">
                    {currentQuestion.conceptTag}
                  </span>
                )}
              </div>

              <h2 className="ai-maturity-question-title">
                {currentQuestion.title}
              </h2>
              <p className="ai-maturity-question-sub">
                {currentQuestion.subtitle}
              </p>

              {/* 💡 Guía para Dirección / En palabras sencillas */}
              {currentQuestion.plainExplanation && (
                <div className="ai-maturity-plain-guide">
                  <div className="ai-maturity-plain-guide-header">
                    <HelpCircle size={14} />
                    <span>Guía para Dirección y RRHH · En palabras sencillas:</span>
                  </div>
                  <p className="ai-maturity-plain-guide-text">
                    {currentQuestion.plainExplanation}
                  </p>
                </div>
              )}

              {/* Chips de conceptos y herramientas clave */}
              {currentQuestion.visualChips && currentQuestion.visualChips.length > 0 && (
                <div className="ai-maturity-concept-chips-wrapper">
                  <span className="ai-maturity-chips-label">Herramientas y tecnologías relacionadas:</span>
                  <div className="ai-maturity-concept-chips">
                    {currentQuestion.visualChips.map((chip, idx) => (
                      <span key={idx} className="ai-maturity-chip-tag">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Opciones */}
              <div className="ai-maturity-options-list">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.id;
                  const isUnknown = opt.isUnknown;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                      className={`ai-maturity-option-item ${isUnknown ? 'unknown-option' : ''} ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="ai-maturity-radio-circle">
                        {isSelected ? (
                          <Check size={12} strokeWidth={3} />
                        ) : isUnknown ? (
                          <HelpCircle size={11} color="#94a3b8" />
                        ) : null}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div className="ai-maturity-opt-label-row">
                          <span className="ai-maturity-opt-label">
                            {opt.label}
                          </span>
                          {opt.badge && (
                            <span className="ai-maturity-opt-badge">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="ai-maturity-opt-desc">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Píldora de Contexto Estratégico */}
              {currentQuestion.hint && (
                <div className="ai-maturity-strategic-hint">
                  <Info size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontWeight: '700', color: '#78350f' }}>Clave estratégica para la dirección / matriz: </strong>
                    {currentQuestion.hint}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de Navegación */}
            <div className="ai-maturity-actions-row">
              <button onClick={handlePrev} className="ai-maturity-btn-secondary">
                <ArrowLeft size={16} />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="ai-maturity-btn-primary"
              >
                <span>{currentQuestionIdx === AI_MATURITY_QUESTIONS.length - 1 ? 'Ver Informe de Resultados' : 'Siguiente'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VISTA 3: DASHBOARD DE RESULTADOS Y AUDITORÍA
           ======================================================== */}
        {step === 'results' && (
          <div className="ai-maturity-results-wrapper">
            {/* Header del Informe */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb' }}>
                  Informe de Diagnóstico · FormAI
                </span>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: '4px 0 0 0', letterSpacing: '-0.02em' }}>
                  Índice de Madurez en Inteligencia Artificial
                </h1>
                {companyName && (
                  <p style={{ fontSize: '0.88rem', fontWeight: '600', color: '#475569', margin: '4px 0 0 0' }}>
                    Organización Evaluada: <span style={{ color: '#0f172a' }}>{companyName}</span>
                  </p>
                )}
              </div>

              {/* Botones de Compartir y Descargar PDF */}
              <div style={{ display: 'flex', gap: '10px' }} className="print-hidden">
                <button onClick={handleShare} className="ai-maturity-btn-secondary">
                  <Share2 size={14} color="#64748b" />
                  <span>{copiedLink ? '¡Copiado!' : 'Compartir'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="ai-maturity-btn-primary"
                  style={{ background: '#0f172a', color: '#ffffff' }}
                >
                  <Printer size={14} />
                  <span>Descargar PDF</span>
                </button>
              </div>
            </div>

            {/* Aviso especial si hubo preguntas marcadas como "No lo sé" */}
            {results.unknownCount > 0 && (
              <div className="ai-maturity-unknown-notice">
                <HelpCircle size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontWeight: '700', color: '#0369a1' }}>
                    Auditoría Técnica Pendiente ({results.unknownCount} {results.unknownCount === 1 ? 'aspecto marcado' : 'aspectos marcados'} como no confirmados)
                  </strong>
                  <p style={{ margin: '3px 0 0 0', fontSize: '0.82rem', color: '#0c4a6e' }}>
                    Has indicado no disponer de certeza sobre {results.unknownCount} punto{results.unknownCount === 1 ? '' : 's'} técnico{results.unknownCount === 1 ? '' : 's'}. En el dictamen para la matriz se recogen como brechas a verificar directamente con el departamento de TI o la central en Alemania para completar la homologación.
                  </p>
                </div>
              </div>
            )}

            {/* Puntuación Global y Nivel */}
            <div className="ai-maturity-score-hero-card">
              <div className="ai-maturity-circle-wrapper">
                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={results.levelData.color}
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * results.overallScore) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.9rem', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>
                      {results.overallScore}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      de 100 pts
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '12px', fontSize: '0.78rem', color: '#64748b' }}>
                  Media sector UE: <strong style={{ color: '#0f172a' }}>{AI_BENCHMARK_METADATA.averageIndustrialScore} pts</strong>
                </div>
              </div>

              <div>
                <span className="ai-maturity-level-badge" style={{
                  background: results.overallScore >= 50 ? '#eff6ff' : '#fef3c7',
                  color: results.overallScore >= 50 ? '#1e40af' : '#92400e',
                  borderColor: results.overallScore >= 50 ? '#bfdbfe' : '#fde68a'
                }}>
                  {results.levelData.name}
                </span>

                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.6', margin: '8px 0 14px 0' }}>
                  {results.levelData.summary}
                </p>

                {/* Conclusión estratégica para Alemania / Matriz */}
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  fontSize: '0.8rem',
                  color: '#14532d',
                  lineHeight: '1.5'
                }}>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#166534' }}>
                    <ShieldCheck size={16} />
                    Conclusión estratégica para Dirección y Matriz:
                  </strong>
                  {results.levelData.germanMatrixNote}
                </div>
              </div>
            </div>

            {/* Gráfico Radar & Desglose por Dimensión */}
            <div className="ai-maturity-grid-two">
              {/* Radar Chart SVG */}
              <div className="ai-maturity-card-clean" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '100%', textAlign: 'left', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    Gráfico Radar de Capacidades
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0 0' }}>
                    Tu empresa (azul) vs. Media industrial europea (gris)
                  </p>
                </div>

                <div style={{ width: '100%', maxWidth: '280px', aspectRatio: '1', position: 'relative', margin: '10px 0' }}>
                  <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 300 300">
                    {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                      <circle
                        key={i}
                        cx="150"
                        cy="150"
                        r={100 * scale}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray={scale === 1 ? 'none' : '3 3'}
                      />
                    ))}

                    {AI_MATURITY_DIMENSIONS.map((_, i) => {
                      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                      const x2 = 150 + 100 * Math.cos(angle);
                      const y2 = 150 + 100 * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1="150"
                          y1="150"
                          x2={x2}
                          y2={y2}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Benchmark (Gris discontinuo) */}
                    <polygon
                      points={radarPoints.benchmarkCoords}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Empresa (Azul) */}
                    <polygon
                      points={radarPoints.companyCoords}
                      fill="rgba(37, 99, 235, 0.25)"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />

                    {/* Vértices / Etiquetas */}
                    {AI_MATURITY_DIMENSIONS.map((dim, i) => {
                      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                      const lx = 150 + 125 * Math.cos(angle);
                      const ly = 150 + 125 * Math.sin(angle);
                      return (
                        <text
                          key={dim.id}
                          x={lx}
                          y={ly}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{ fontSize: '10px', fontWeight: '700', fill: '#334155' }}
                        >
                          {dim.shortName}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', paddingTop: '6px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: '#1d4ed8' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2563eb', display: 'inline-block' }} />
                    Tu Empresa ({results.overallScore}%)
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: '#64748b' }}>
                    <span style={{ width: '10px', height: '2px', background: '#94a3b8', display: 'inline-block' }} />
                    Sector UE ({AI_BENCHMARK_METADATA.averageIndustrialScore}%)
                  </span>
                </div>
              </div>

              {/* Desglose por Dimensión */}
              <div className="ai-maturity-card-clean" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                    Desglose por Dimensión
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0 0 16px 0' }}>
                    Comparativa frente a la media del sector
                  </p>

                  <div>
                    {AI_MATURITY_DIMENSIONS.map(dim => {
                      const score = results.dimensions[dim.id] || 0;
                      const diff = score - dim.benchmarkAverage;
                      return (
                        <div key={dim.id} className="ai-maturity-bar-row">
                          <div className="ai-maturity-bar-header">
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{dim.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontWeight: '800', color: '#0f172a' }}>{score}%</span>
                              <span style={{
                                fontSize: '0.68rem',
                                fontWeight: '700',
                                padding: '1px 5px',
                                borderRadius: '4px',
                                background: diff >= 0 ? '#dcfce7' : '#fee2e2',
                                color: diff >= 0 ? '#15803d' : '#b91c1c'
                              }}>
                                {diff >= 0 ? `+${diff}%` : `${diff}%`}
                              </span>
                            </div>
                          </div>

                          <div className="ai-maturity-bar-track">
                            <div
                              className="ai-maturity-bar-marker"
                              style={{ left: `${dim.benchmarkAverage}%` }}
                              title={`Media: ${dim.benchmarkAverage}%`}
                            />
                            <div
                              className="ai-maturity-bar-fill"
                              style={{
                                width: `${Math.max(4, score)}%`,
                                background: score >= dim.benchmarkAverage ? '#2563eb' : '#f59e0b'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Marca gris = Media sectorial</span>
                  <span style={{ fontWeight: '700', color: '#2563eb' }}>Meta líder: &gt;80%</span>
                </div>
              </div>
            </div>

            {/* Las 3 Brechas Críticas */}
            <div className="ai-maturity-card-clean">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <AlertCircle size={20} color="#d97706" />
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Las 3 Brechas Críticas Detectadas en la Auditoría
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: '800', fontFamily: 'monospace', textTransform: 'uppercase', color: '#b91c1c', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
                    Riesgo 1 · Cumplimiento
                  </span>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '8px 0 4px 0' }}>
                    Proliferación de Shadow AI
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: '1.45', margin: 0 }}>
                    Las restricciones excesivas empujan a los empleados a usar herramientas privadas desde el móvil sin control, violando directrices de seguridad del EU AI Act.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: '800', fontFamily: 'monospace', textTransform: 'uppercase', color: '#b45309', background: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>
                    Riesgo 2 · Productividad
                  </span>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '8px 0 4px 0' }}>
                    Carencia de Code Interpreter
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: '1.45', margin: 0 }}>
                    Sin ejecución de código matemático en servidor, los directivos no pueden auditar tablas de costes ni simular escenarios What-If con fiabilidad analítica.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: '800', fontFamily: 'monospace', textTransform: 'uppercase', color: '#1d4ed8', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                    Riesgo 3 · Oportunidad
                  </span>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '8px 0 4px 0' }}>
                    Ausencia de RAG sobre Archivos
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: '1.45', margin: 0 }}>
                    Copiar y pegar texto a mano en chatbots causa pérdidas de hasta 4 horas semanales por directivo frente a sistemas que indexan repositorios de forma segura.
                  </p>
                </div>
              </div>
            </div>

            {/* Dossier Resumen Ejecutivo para la Matriz */}
            <div className="ai-maturity-dossier-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '3px 10px', borderRadius: '9999px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  Dossier para Comité de Dirección / Matriz
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                  REF: AUD-IA-{new Date().getFullYear()}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
                Dictamen Técnico y Hoja de Ruta de Desbloqueo
              </h3>

              <div className="ai-maturity-dossier-quote">
                «La evaluación técnica concluye que la organización presenta un nivel de madurez <strong style={{ color: '#ffffff' }}>{results.levelData.name}</strong> ({results.overallScore}/100 puntos). La política actual de aislamiento técnico genera una pérdida estimada de productividad del 28% y no frena el uso no regulado de IA. Se recomienda a la Dirección General autorizar un plan de modernización escalonado basado en: 1) Tenant europeo con Zero Data Retention; 2) Activación de Code Interpreter para análisis cuantitativo; 3) Plan de capacitación directiva y técnica 100% bonificable con cargo a la cuota de formación de FUNDAE.»
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.78rem', color: '#94a3b8' }}>
                <span>Auditoría independiente elaborada conforme a los estándares de FormAI</span>
                <button
                  onClick={handleRestart}
                  style={{ background: 'none', border: 'none', color: '#38bdf8', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <RefreshCw size={13} />
                  <span>Repetir autoevaluación</span>
                </button>
              </div>
            </div>

            {/* CTA Final FormAI */}
            <div className="ai-maturity-card-clean print-hidden" style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              border: '1px solid #bfdbfe',
              background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)'
            }}>
              <div style={{ maxWidth: '520px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', fontFamily: 'monospace', textTransform: 'uppercase', color: '#2563eb' }}>
                  {isKommerling ? 'Alineación Estratégica con FormAI' : 'Paso Siguiente · FormAI'}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: '4px 0 6px 0' }}>
                  {isKommerling
                    ? '¿Quieres presentar esta auditoría y la propuesta técnica a la central en Alemania?'
                    : '¿Quieres defender esta auditoría ante tu Matriz o Comité de Dirección?'}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  {isKommerling
                    ? 'En FormAI redactamos la memoria de seguridad de datos (Zero Data Retention) y diseñamos el programa de capacitación directiva 100% bonificable con FUNDAE.'
                    : 'En FormAI preparamos la memoria técnica justificativa y diseñamos el plan formativo bonificado al 100% ante FUNDAE para capacitar a tus directivos y mandos técnicos sin coste directo.'}
                </p>
              </div>

              <button
                onClick={() => {
                  if (onNavigateToContact) {
                    onNavigateToContact();
                  } else {
                    window.location.hash = '#contacto';
                  }
                }}
                className="ai-maturity-btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <span>{isKommerling ? 'Coordinar Sesión con FormAI' : 'Solicitar Sesión de Diagnóstico'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
