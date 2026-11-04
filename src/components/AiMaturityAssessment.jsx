import React, { useState, useEffect, useMemo } from 'react';
import {
  Cpu, Database, Bot, ShieldCheck, TrendingUp, ArrowRight, ArrowLeft,
  CheckCircle2, FileText, Download, Share2, Building2,
  Check, RefreshCw, BarChart3, HelpCircle, Sparkles, Award, Lock,
  Printer, AlertCircle, Info,
  UserX, FlaskConical, BadgeCheck, Layers, Type, Paperclip, ScanSearch,
  ClipboardPaste, Upload, FolderSearch, Link2, MessageSquareText, Code2,
  SquareTerminal, MessageCircle, ListChecks, Workflow, Ban, LineChart,
  FileX, Megaphone, ScrollText, ShieldAlert, ShieldHalf, LockKeyhole,
  MonitorPlay, Presentation, GraduationCap, EyeOff, ThumbsUp, Gauge
} from 'lucide-react';
import {
  AI_BENCHMARK_METADATA,
  AI_MATURITY_DIMENSIONS,
  AI_MATURITY_QUESTIONS,
  AI_MATURITY_LEVELS,
  calculateMaturityScore
} from '../data/aiMaturityData';
import './AiMaturityAssessment.css';

// Iconos de las opciones (el nombre viene de `icon` en aiMaturityData.js)
const OPTION_ICONS = {
  UserX, FlaskConical, BadgeCheck, Layers, Type, Paperclip, ScanSearch,
  ClipboardPaste, Upload, FolderSearch, Link2, MessageSquareText, Code2,
  SquareTerminal, MessageCircle, ListChecks, Bot, Workflow, Ban, FileText,
  LineChart, FileX, Megaphone, ScrollText, ShieldAlert, ShieldHalf,
  LockKeyhole, MonitorPlay, Presentation, GraduationCap, EyeOff, ThumbsUp, Gauge
};

const GAP_TAGS = {
  risk: { className: 'ai-maturity-gap-tag--risk', label: 'Riesgo' },
  warn: { className: 'ai-maturity-gap-tag--warn', label: 'A mejorar' },
  opp: { className: 'ai-maturity-gap-tag--opp', label: 'Oportunidad' }
};

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

  // Brechas prioritarias: las 3 preguntas con menor puntuación (orden original en empates)
  const priorityGaps = useMemo(() => {
    return AI_MATURITY_QUESTIONS
      .map((q, order) => {
        const option = q.options.find(o => o.id === answers[q.id]);
        const dim = AI_MATURITY_DIMENSIONS.find(d => d.id === q.dimensionId);
        return { q, order, score: option ? option.score : 0, dimName: dim?.shortName };
      })
      .filter(item => item.score < 100)
      .sort((a, b) => a.score - b.score || a.order - b.order)
      .slice(0, 3)
      .map(item => ({
        id: item.q.id,
        dimName: item.dimName,
        title: item.q.gap.title,
        text: item.q.gap.text,
        tone: item.score <= 30 ? 'risk' : item.score <= 70 ? 'warn' : 'opp'
      }));
  }, [answers]);

  // Dimensiones con más margen de mejora (para el dictamen)
  const weakestDimensions = useMemo(() => {
    return [...AI_MATURITY_DIMENSIONS]
      .sort((a, b) => (results.dimensions[a.id] ?? 0) - (results.dimensions[b.id] ?? 0))
      .slice(0, 2)
      .map(d => d.name);
  }, [results]);

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

          <div className="ai-maturity-topbar-badges">
            {isKommerling ? (
              <span className="ai-maturity-badge">
                <Building2 size={13} />
                Kömmerling (Profine Iberia)
              </span>
            ) : (
              <>
                <span className="ai-maturity-badge">
                  <Sparkles size={12} />
                  Benchmark 2026
                </span>
                {companyName && (
                  <span className="ai-maturity-badge ai-maturity-badge--muted">
                    <Building2 size={13} />
                    {companyName}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={`ai-maturity-container ${step === 'wizard' ? 'is-wizard' : ''}`}>
        {/* ========================================================
            VISTA 1: INTRODUCCIÓN / HERO
           ======================================================== */}
        {step === 'intro' && (
          <div>
            {/* --- VERSIÓN A: KÖMMERLING (PROFINE) - Sobria, ejecutiva, directa sin venta --- */}
            {isKommerling ? (
              <div>
                <div className="ai-maturity-hero">
                  <div className="ai-maturity-pill-tag">
                    <Building2 size={14} />
                    <span>Evaluación Corporativa de IA · Kömmerling (Profine)</span>
                  </div>

                  <h1 className="ai-maturity-title">
                    Diagnóstico Técnico de Madurez en{' '}
                    <span className="ai-maturity-gradient-text">
                      Inteligencia Artificial
                    </span>
                  </h1>

                  <p className="ai-maturity-desc">
                    Auditoría técnica de capacidades, infraestructura y gobernanza de datos para la Dirección General y Recursos Humanos frente a los estándares de la industria europea.
                  </p>
                </div>

                {/* Las 5 Dimensiones Evaluadas */}
                <div className="ai-maturity-dimensions-grid">
                  {AI_MATURITY_DIMENSIONS.map((dim) => (
                    <div key={dim.id} className="ai-maturity-dimension-card">
                      <div className="ai-maturity-dim-icon-wrapper">
                        {dim.id === 'tooling' && <Cpu size={18} />}
                        {dim.id === 'data' && <Database size={18} />}
                        {dim.id === 'agentic' && <Bot size={18} />}
                        {dim.id === 'governance' && <ShieldCheck size={18} />}
                        {dim.id === 'adoption' && <TrendingUp size={18} />}
                      </div>
                      <h4 className="ai-maturity-dim-title">{dim.name}</h4>
                      <p className="ai-maturity-dim-desc">{dim.description}</p>
                    </div>
                  ))}
                </div>

                {/* Botón de Inicio Sencillo y Directo (Sin venta ni puntos de marketing) */}
                <div className="ai-maturity-cta-stack">
                  <button
                    onClick={() => setStep('wizard')}
                    className="ai-maturity-btn-primary ai-maturity-btn-lg"
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
                    <ShieldCheck size={14} />
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
                  <div className="ai-maturity-company-card">
                    <label htmlFor="ai-maturity-company" className="ai-maturity-company-label">
                      Nombre de tu empresa (opcional para personalizar el informe):
                    </label>
                    <input
                      id="ai-maturity-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ej. Siemens, Grupo Aciturri, Mahou..."
                      className="ai-maturity-company-input"
                    />
                  </div>
                )}

                {/* Las 5 Dimensiones Evaluadas */}
                <div className="ai-maturity-dimensions-grid">
                  {AI_MATURITY_DIMENSIONS.map((dim) => (
                    <div key={dim.id} className="ai-maturity-dimension-card">
                      <div className="ai-maturity-dim-icon-wrapper">
                        {dim.id === 'tooling' && <Cpu size={18} />}
                        {dim.id === 'data' && <Database size={18} />}
                        {dim.id === 'agentic' && <Bot size={18} />}
                        {dim.id === 'governance' && <ShieldCheck size={18} />}
                        {dim.id === 'adoption' && <TrendingUp size={18} />}
                      </div>
                      <h4 className="ai-maturity-dim-title">{dim.name}</h4>
                      <p className="ai-maturity-dim-desc">{dim.description}</p>
                    </div>
                  ))}
                </div>

                {/* Llamada a la acción con puntos de venta */}
                <div className="ai-maturity-cta-stack">
                  <button
                    onClick={() => setStep('wizard')}
                    className="ai-maturity-btn-primary ai-maturity-btn-lg"
                  >
                    <span>Iniciar Autoevaluación Gratuita</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="ai-maturity-trust-row">
                    <span className="ai-maturity-trust-item">
                      <CheckCircle2 size={15} color="#059669" />
                      {AI_MATURITY_QUESTIONS.length} preguntas rápidas (3 min)
                    </span>
                    <span className="ai-maturity-trust-item">
                      <Lock size={15} color="#2563eb" />
                      100% Confidencial y Anónimo
                    </span>
                    <span className="ai-maturity-trust-item">
                      <FileText size={15} color="#4f46e5" />
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
            {/* Barra de progreso: nº de pregunta, barra y porcentaje en una línea */}
            <div className="ai-maturity-progress-bar-wrapper">
              <span className="ai-maturity-progress-label">
                Pregunta {currentQuestionIdx + 1} de {AI_MATURITY_QUESTIONS.length}
              </span>
              <div
                className="ai-maturity-progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercent}
                aria-label="Progreso de la autoevaluación"
              >
                <div
                  className="ai-maturity-progress-fill"
                  style={{ width: `${Math.max(8, progressPercent)}%` }}
                />
              </div>
              <span className="ai-maturity-progress-label">{progressPercent}%</span>
            </div>

            {/* Tarjeta de la Pregunta */}
            <div className="ai-maturity-wizard-card">
              <div className="ai-maturity-wizard-grid">
              <div className="ai-maturity-wizard-left">
              <h2 className="ai-maturity-question-title">
                {currentQuestion.title}
              </h2>
              <p className="ai-maturity-question-sub">
                {currentQuestion.subtitle}
              </p>

              {/* Explicación en palabras sencillas */}
              {currentQuestion.plainExplanation && (
                <div className="ai-maturity-plain-guide">
                  <HelpCircle size={16} className="ai-maturity-plain-guide-icon" aria-hidden="true" />
                  <p className="ai-maturity-plain-guide-text">
                    {currentQuestion.plainExplanation}
                  </p>
                </div>
              )}

              {/* Ejemplos y conceptos de la pregunta */}
              {currentQuestion.visualChips && currentQuestion.visualChips.length > 0 && (
                <div className="ai-maturity-concept-chips-wrapper">
                  <span className="ai-maturity-chips-label">Ejemplos:</span>
                  <div className="ai-maturity-concept-chips">
                    {currentQuestion.visualChips.map((chip, idx) => (
                      <span key={idx} className="ai-maturity-chip-tag">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Píldora de Contexto Estratégico */}
              {currentQuestion.hint && (
                <div className="ai-maturity-strategic-hint">
                  <Info size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    {currentQuestion.hint}
                  </div>
                </div>
              )}
              </div>

              {/* Opciones */}
              <div className="ai-maturity-options-list" role="radiogroup" aria-label={currentQuestion.title}>
                {currentQuestion.options.map((opt, optIdx, allOpts) => {
                  const isSelected = answers[currentQuestion.id] === opt.id;
                  const isUnknown = opt.isUnknown;
                  const OptIcon = opt.icon ? OPTION_ICONS[opt.icon] : null;
                  const mainCount = allOpts.filter(o => !o.isUnknown).length;
                  // Con un número impar de opciones, la última ocupa el ancho completo del mosaico
                  const isFullWidth = !isUnknown && mainCount % 2 === 1 && optIdx === mainCount - 1;

                  return (
                    <div
                      key={opt.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectOption(currentQuestion.id, opt.id);
                        }
                      }}
                      className={`ai-maturity-option-item ${isUnknown ? 'unknown-option' : ''} ${isSelected ? 'selected' : ''} ${isFullWidth ? 'is-wide' : ''}`}
                    >
                      <div className="ai-maturity-opt-top">
                        <span className="ai-maturity-opt-icon" aria-hidden="true">
                          {OptIcon ? <OptIcon size={20} strokeWidth={1.8} /> : <HelpCircle size={20} strokeWidth={1.8} />}
                        </span>
                        <div className="ai-maturity-radio-circle">
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>

                      <div className="ai-maturity-opt-body">
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
              </div>
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
            <div className="ai-maturity-results-header">
              <div>
                <span className="ai-maturity-eyebrow">Informe de Diagnóstico · FormAI</span>
                <h1 className="ai-maturity-results-title">
                  Índice de Madurez en Inteligencia Artificial
                </h1>
                {companyName && (
                  <p className="ai-maturity-results-company">
                    Organización Evaluada: <span>{companyName}</span>
                  </p>
                )}
              </div>

              {/* Botones de Compartir y Descargar PDF */}
              <div className="ai-maturity-results-actions print-hidden">
                <button onClick={handleShare} className="ai-maturity-btn-secondary">
                  <Share2 size={14} color="#64748b" />
                  <span>{copiedLink ? '¡Copiado!' : 'Compartir'}</span>
                </button>

                <button onClick={handlePrint} className="ai-maturity-btn-primary ai-maturity-btn-dark">
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
                  <strong>
                    Auditoría Técnica Pendiente ({results.unknownCount} {results.unknownCount === 1 ? 'aspecto marcado' : 'aspectos marcados'} como no confirmados)
                  </strong>
                  <p>
                    Has indicado no disponer de certeza sobre {results.unknownCount} punto{results.unknownCount === 1 ? '' : 's'} técnico{results.unknownCount === 1 ? '' : 's'}. {isKommerling
                      ? 'En el dictamen para la matriz se recogen como brechas a verificar directamente con el departamento de TI o la central en Alemania para completar la homologación.'
                      : 'Conviene verificarlos con el departamento de TI para completar la auditoría.'}
                  </p>
                </div>
              </div>
            )}

            {/* Puntuación Global y Nivel */}
            <div className="ai-maturity-score-hero-card">
              <div className="ai-maturity-circle-wrapper">
                <div className="ai-maturity-ring">
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <circle
                      className="ai-maturity-ring-track"
                      cx="50"
                      cy="50"
                      r="40"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    <circle
                      className="ai-maturity-ring-value"
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={results.levelData.color}
                      style={{ color: results.levelData.color }}
                      strokeWidth="7"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * results.overallScore) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="ai-maturity-ring-center">
                    <span className="ai-maturity-ring-number">{results.overallScore}</span>
                    <span className="ai-maturity-ring-unit">de 100 pts</span>
                  </div>
                </div>

                <div className="ai-maturity-benchmark-note">
                  Media sector UE: <strong>{AI_BENCHMARK_METADATA.averageIndustrialScore} pts</strong>
                </div>
              </div>

              <div>
                <span className={`ai-maturity-level-badge ${results.overallScore >= 50 ? 'is-strong' : 'is-weak'}`}>
                  {results.levelData.name}
                </span>

                <p className="ai-maturity-level-summary">{results.levelData.summary}</p>

                {/* Conclusión estratégica (versión Kömmerling: mensaje para la matriz) */}
                <div className="ai-maturity-conclusion">
                  <strong>
                    <ShieldCheck size={16} />
                    {isKommerling ? 'Conclusión estratégica para Dirección y Matriz:' : 'Conclusión estratégica:'}
                  </strong>
                  {isKommerling ? results.levelData.germanMatrixNote : results.levelData.generalNote}
                </div>
              </div>
            </div>

            {/* Gráfico Radar & Desglose por Dimensión */}
            <div className="ai-maturity-grid-two">
              {/* Radar Chart SVG */}
              <div className="ai-maturity-card-clean ai-maturity-radar-card">
                <div className="ai-maturity-card-head">
                  <h3 className="ai-maturity-card-title">Gráfico Radar de Capacidades</h3>
                  <p className="ai-maturity-card-sub">
                    Tu empresa (azul) vs. Media industrial europea (gris)
                  </p>
                </div>

                <div className="ai-maturity-radar-box">
                  <svg viewBox="0 0 300 300" role="img" aria-label="Gráfico radar de las cinco dimensiones de madurez en IA frente a la media del sector">
                    <defs>
                      <linearGradient id="amRadarFill" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.38" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="amRadarStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="55%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>

                    {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                      <circle
                        key={i}
                        cx="150"
                        cy="150"
                        r={100 * scale}
                        fill={scale === 1 ? 'rgba(99, 102, 241, 0.035)' : 'none'}
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
                          stroke="#e2e8f0"
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

                    {/* Empresa (degradado azul → cian) */}
                    <polygon
                      points={radarPoints.companyCoords}
                      fill="url(#amRadarFill)"
                      stroke="url(#amRadarStroke)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />

                    {/* Vértices de la empresa */}
                    {radarPoints.companyCoords.split(' ').map((pt, i) => {
                      const [cx, cy] = pt.split(',');
                      return <circle key={i} cx={cx} cy={cy} r="3.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />;
                    })}

                    {/* Etiquetas */}
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

                <div className="ai-maturity-legend">
                  <span className="ai-maturity-legend-you">
                    <span className="ai-maturity-legend-dot" />
                    Tu Empresa ({results.overallScore}%)
                  </span>
                  <span className="ai-maturity-legend-bench">
                    <span className="ai-maturity-legend-dash" />
                    Sector UE ({AI_BENCHMARK_METADATA.averageIndustrialScore}%)
                  </span>
                </div>
              </div>

              {/* Desglose por Dimensión */}
              <div className="ai-maturity-card-clean ai-maturity-breakdown-card">
                <div>
                  <div className="ai-maturity-card-head">
                    <h3 className="ai-maturity-card-title">Desglose por Dimensión</h3>
                    <p className="ai-maturity-card-sub">Comparativa frente a la media del sector</p>
                  </div>

                  <div>
                    {AI_MATURITY_DIMENSIONS.map(dim => {
                      const score = results.dimensions[dim.id] || 0;
                      const diff = score - dim.benchmarkAverage;
                      return (
                        <div key={dim.id} className="ai-maturity-bar-row">
                          <div className="ai-maturity-bar-header">
                            <span className="ai-maturity-bar-name">{dim.name}</span>
                            <div className="ai-maturity-bar-score">
                              <b>{score}%</b>
                              <span className={`ai-maturity-delta ${diff >= 0 ? 'is-up' : 'is-down'}`}>
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
                              className={`ai-maturity-bar-fill ${score >= dim.benchmarkAverage ? 'is-above' : 'is-below'}`}
                              style={{ width: `${Math.max(4, score)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="ai-maturity-bar-foot">
                  <span>Marca oscura = Media sectorial</span>
                  <b>Meta líder: &gt;80%</b>
                </div>
              </div>
            </div>

            {/* Brechas prioritarias (según las respuestas) */}
            <div className="ai-maturity-card-clean">
              <div className="ai-maturity-card-head">
                <h3 className="ai-maturity-card-title">
                  <AlertCircle size={20} color="#d97706" />
                  {priorityGaps.length > 0
                    ? `${priorityGaps.length === 1 ? 'Brecha prioritaria detectada' : `Las ${priorityGaps.length} brechas prioritarias detectadas`} en la auditoría`
                    : 'Sin brechas críticas detectadas'}
                </h3>
              </div>

              {priorityGaps.length > 0 ? (
                <div className="ai-maturity-gaps-grid">
                  {priorityGaps.map((gap, i) => (
                    <div key={gap.id} className="ai-maturity-gap-card">
                      <span className={`ai-maturity-gap-tag ${GAP_TAGS[gap.tone].className}`}>
                        {GAP_TAGS[gap.tone].label} · {gap.dimName}
                      </span>
                      <h4 className="ai-maturity-gap-title">{gap.title}</h4>
                      <p className="ai-maturity-gap-text">{gap.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="ai-maturity-gap-text">
                  Todas las respuestas alcanzan el nivel máximo. El siguiente paso es mantener la gobernanza y revisar el marco periódicamente.
                </p>
              )}
            </div>

            {/* Dossier Resumen Ejecutivo para la Matriz */}
            <div className="ai-maturity-dossier-card">
              <div className="ai-maturity-dossier-top">
                <span className="ai-maturity-dossier-tag">{isKommerling ? 'Dossier para Comité de Dirección / Matriz' : 'Dossier para el Comité de Dirección'}</span>
                <span className="ai-maturity-dossier-ref">REF: AUD-IA-{new Date().getFullYear()}</span>
              </div>

              <h3 className="ai-maturity-dossier-title">Dictamen Técnico y Hoja de Ruta de Desbloqueo</h3>

              <div className="ai-maturity-dossier-quote">
                «La evaluación concluye que la organización presenta un nivel de madurez <strong>{results.levelData.name}</strong> ({results.overallScore}/100 puntos). Las áreas con mayor margen de mejora son {weakestDimensions.join(' y ')}. Se recomienda a la Dirección un plan escalonado basado en: 1) cerrar las brechas prioritarias señaladas; 2) formalizar la gobernanza y las garantías de datos (Zero Data Retention en tenant europeo); 3) plan de capacitación directiva y técnica bonificable con cargo al crédito de formación de FUNDAE.»
              </div>

              <div className="ai-maturity-dossier-foot">
                <span>Auditoría independiente elaborada conforme a los estándares de FormAI</span>
                <button onClick={handleRestart} className="ai-maturity-link-btn print-hidden">
                  <RefreshCw size={13} />
                  <span>Repetir autoevaluación</span>
                </button>
              </div>
            </div>

            {/* CTA Final FormAI */}
            <div className="ai-maturity-card-clean ai-maturity-final-cta print-hidden">
              <div className="ai-maturity-final-cta-copy">
                <span className="ai-maturity-eyebrow">
                  {isKommerling ? 'Alineación Estratégica con FormAI' : 'Paso Siguiente · FormAI'}
                </span>
                <h3>
                  {isKommerling
                    ? '¿Quieres presentar esta auditoría y la propuesta técnica a la central en Alemania?'
                    : '¿Quieres defender esta auditoría ante tu Matriz o Comité de Dirección?'}
                </h3>
                <p>
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
