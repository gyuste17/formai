import React, { useState } from 'react';
import {
  FileSpreadsheet,
  BarChart3,
  Sparkles,
  Bot,
  RefreshCw,
  PieChart,
  Grid,
  AreaChart,
  BookOpen,
  Clock,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const iconMap = {
  FileSpreadsheet,
  BarChart3,
  Sparkles,
  Bot,
  RefreshCw,
  PieChart,
  Grid,
  AreaChart,
  BookOpen
};

const toolLogos = {
  'Microsoft Excel': 'Excel.webp',
  'Excel': 'Excel.webp',
  'Power Query': 'Excel.webp',
  'Power BI': 'Power BI.webp',
  'Power BI Desktop': 'Power BI.webp',
  'Power BI Service': 'Power BI.webp',
  'DAX': 'Power BI.webp',
  'ChatGPT': 'ChatGPT.webp',
  'Claude': 'ChatGPT.webp',
  'OpenAI GPTs': 'ChatGPT.webp',
  'Midjourney': 'ChatGPT.webp',
  'Microsoft Copilot': 'Copilot.webp',
  'Microsoft 365 (Word, Excel, PPT, Teams, Outlook)': 'Copilot.webp',
  'Power Automate': 'Automate.webp',
  'Power Automate Cloud': 'Automate.webp',
  'Microsoft Forms': 'Copilot.webp',
  'SharePoint': 'GW.webp',
  'OneDrive': 'GW.webp',
  'Looker Studio': 'Google Data Studio.webp',
  'Google Sheets': 'GW.webp',
  'Google Analytics': 'GA4.webp',
  'Google Ads': 'GA4.webp',
  'Google Drive': 'GW.webp',
  'Google Gemini': 'Gemini.webp',
  'Tableau': 'Tableau.webp',
  'Tableau Desktop': 'Tableau.webp',
  'Tableau Prep': 'Tableau.webp',
  'Tableau Cloud': 'Tableau.webp',
};

export function formatCourseTitle(title) {
  if (!title) return '';
  // Quitar emojis si hubiera
  const cleanTitle = title.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}-\u{2454}\u{20D0}-\u{20FF}]/gu, '').trim();

  // Palabras clave ordenadas por especificidad
  const keywords = [
    'Power BI',
    'Excel',
    'ChatGPT',
    'Copilot 365',
    'Copilot',
    'Power Automate',
    'Looker Studio',
    'Google Workspace',
    'Tableau',
    'Inteligencia Artificial'
  ];

  for (const kw of keywords) {
    if (cleanTitle.includes(kw)) {
      const index = cleanTitle.indexOf(kw);
      const before = cleanTitle.substring(0, index);
      const after = cleanTitle.substring(index + kw.length);
      return (
        <>
          {before}
          <span className="gradient-text">{kw}</span>
          {after}
        </>
      );
    }
  }

  return cleanTitle;
}

export default function CourseCard({ course, onViewSyllabus }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card course-card animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
      border: '1px solid var(--border-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Contenido Superior Siempre Visible (Vista Colapsada) */}
      <div>
        {/* Category & Languages */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em'
          }}>
            {course.category}
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {course.languages.map(lang => (
              <span key={lang} style={{
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)'
              }}>
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          lineHeight: 1.25,
          marginBottom: '16px'
        }}>
          {formatCourseTitle(course.title)}
        </h3>

        {/* Tools Badges (Logos de herramientas) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '12px'
        }}>
          {course.tools.map(tool => {
            const logo = toolLogos[tool];
            return (
              <span key={tool} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)'
              }}>
                {logo && (
                  <img
                    src={`/logos/herramientas/${logo}`}
                    alt=""
                    width="16"
                    height="16"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                  />
                )}
                {tool}
              </span>
            );
          })}
        </div>
      </div>

      {/* Contenido Desplegable (Animación de acordeón) */}
      <div>
        <div style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Description */}
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                {course.shortDescription}
              </p>

              {/* Course Attributes */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} />
                  <span>Duración: <strong>{course.duration} horas</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sliders size={16} />
                  <span>Nivel: {course.level}</span>
                </div>
              </div>

              {/* CTA Button para abrir el Temario Completo en Modal */}
              <button 
                onClick={() => onViewSyllabus(course)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--accent-primary)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: 'var(--border-radius-md)',
                  fontWeight: '600',
                  fontSize: '0.925rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)'
                }}
                className="course-card-btn"
              >
                Ver Temario Completo
                <BookOpen size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Expand / Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            backgroundColor: isExpanded ? 'var(--bg-tertiary)' : 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '10px 16px',
            borderRadius: 'var(--border-radius-md)',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all var(--transition-fast)',
            marginTop: '12px'
          }}
          className="course-toggle-btn"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Ocultar detalles' : 'Ver detalles y temario'}</span>
          {isExpanded ? (
            <ChevronUp size={16} style={{ color: 'var(--accent-primary)' }} />
          ) : (
            <ChevronDown size={16} style={{ color: 'var(--accent-primary)' }} />
          )}
        </button>
      </div>

      <style>{`
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-primary);
        }
        .course-toggle-btn:hover {
          background-color: var(--bg-tertiary) !important;
          border-color: var(--accent-primary) !important;
        }
        .course-card-btn:hover {
          background-color: var(--accent-primary-hover) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
