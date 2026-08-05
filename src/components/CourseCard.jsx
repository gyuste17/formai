import React from 'react';
import * as Icons from 'lucide-react';

const toolLogos = {
  'Microsoft Excel': 'Excel.png',
  'Excel': 'Excel.png',
  'Power Query': 'Excel.png',
  'Power BI': 'Power BI.png',
  'Power BI Desktop': 'Power BI.png',
  'Power BI Service': 'Power BI.png',
  'DAX': 'Power BI.png',
  'ChatGPT': 'ChatGPT.png',
  'Claude': 'ChatGPT.png',
  'OpenAI GPTs': 'ChatGPT.png',
  'Midjourney': 'ChatGPT.png',
  'Microsoft Copilot': 'Copilot.png',
  'Microsoft 365 (Word, Excel, PPT, Teams, Outlook)': 'Copilot.png',
  'Power Automate': 'Automate.png',
  'Power Automate Cloud': 'Automate.png',
  'Microsoft Forms': 'Copilot.png',
  'SharePoint': 'GW.png',
  'OneDrive': 'GW.png',
  'Looker Studio': 'Google Data Studio.png',
  'Google Sheets': 'GW.png',
  'Google Analytics': 'GA4.png',
  'Google Ads': 'GA4.png',
  'Google Drive': 'GW.png',
  'Google Gemini': 'Gemini.png',
  'Tableau': 'Tableau.png',
  'Tableau Desktop': 'Tableau.png',
  'Tableau Prep': 'Tableau.png',
  'Tableau Cloud': 'Tableau.png',
};

export default function CourseCard({ course, onViewSyllabus }) {
  // Dynamically resolve icon from name
  const IconComponent = Icons[course.iconName] || Icons.BookOpen;

  return (
    <div className="glass-card course-card animate-fade-in" style={{
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
      border: '1px solid var(--border-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Upper Content */}
      <div>
        {/* Category & Languages */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
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

        {/* Icon & Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: course.id === 'chatgpt' || course.id === 'copilot' ? 'var(--accent-ai-light)' : 'var(--accent-primary-light)',
            color: course.id === 'chatgpt' || course.id === 'copilot' ? 'var(--accent-ai)' : 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <IconComponent size={24} />
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            lineHeight: 1.2
          }}>
            {course.title}
          </h3>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.925rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '20px'
        }}>
          {course.shortDescription}
        </p>

        {/* Course Attributes */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '24px',
          fontSize: '0.875rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Clock size={16} />
            <span>Duración: <strong>{course.duration} horas</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Sliders size={16} />
            <span>Nivel: {course.level}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div>
        {/* Tools Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '24px'
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
                    style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                  />
                )}
                {tool}
              </span>
            );
          })}
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => onViewSyllabus(course)}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            border: '2px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            padding: '12px 20px',
            borderRadius: 'var(--border-radius-md)',
            fontWeight: '600',
            fontSize: '0.925rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all var(--transition-fast)'
          }}
          className="course-card-btn"
        >
          Ver Temario Completo
          <Icons.BookOpen size={16} />
        </button>
      </div>

      <style>{`
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-primary);
        }
        .course-card-btn:hover {
          background-color: var(--accent-primary) !important;
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
